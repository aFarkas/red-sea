// Wiederholung mit Leitner-Stufen. Quelle der Wahrheit ist assets/review-state.js, den Claude pflegt.
// Bewertungen, die neuer sind als dessen "stand", liegen bis zum nächsten Abgleich im localStorage
// und gehen als Text an Claude.
(function () {
  const STORE_KEY = "rotes-meer-wiederholung";
  const MAX_PER_SESSION = 6;
  // Wörter sind kürzer als Geschichten, eine Runde darf mehr davon haben.
  const MAX_WORDS_PER_SESSION = 10;
  // Tage bis zur nächsten Wiederholung je Stufe; kurz gehalten, weil die Reise bald ist.
  const INTERVAL_DAYS = [1, 1, 2, 4, 8, 16];
  const RATINGS = {
    gewusst: "Wusste ich",
    halb: "Halb",
    neu: "Neu für mich",
  };

  const state = window.REVIEW_STATE;
  const STORIES = window.CARDS;
  const WORD_CARDS = (window.WORDS || []).flatMap(wordCards);
  const root = document.getElementById("review");

  function loadLocal() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { karten: {}, lektionen: [], log: [] };
  }
  function saveLocal() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(local));
    } catch (e) {}
  }
  const local = loadLocal();

  // Ortszeit statt toISOString(), sonst springt das Datum abends um eine Zeitzone daneben.
  function stamp(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  const now = () => stamp(new Date());
  const today = () => now().slice(0, 10);
  function addDays(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return stamp(d).slice(0, 10);
  }
  const isNew = (entry) => entry && entry.am > state.stand;

  function cardState(id) {
    const mine = local.karten[id];
    return isNew(mine) ? mine : state.karten[id];
  }
  function readLessons() {
    return [...new Set([...state.lektionen, ...local.lektionen])].sort();
  }
  function pendingLog() {
    return local.log.filter(isNew);
  }

  // Jedes Wort wird zweimal abgefragt: einmal selbst sagen, einmal beim Hören verstehen.
  function wordCards(w) {
    const play = window.Say.buttons(w);
    const hint = (w.hinweis ? `<p>${w.hinweis}</p>` : "") + (w.variante ? `<p class="variante">${w.variante}</p>` : "");
    const titel = `${w.wort} – ${w.de}`;
    return [
      {
        id: `${w.id}~sprechen`,
        lektion: w.lektion,
        extra: !!w.extra,
        art: "Sprechen",
        titel,
        frage: `Wie sagst du auf Ägyptisch: ${w.de}?`,
        antwort: `<p class="word">${play}<span class="say-word">${w.wort}</span></p>${hint}<p class="aside">Sprich es laut nach.</p>`,
      },
      {
        id: `${w.id}~hoeren`,
        lektion: w.lektion,
        extra: !!w.extra,
        art: "Hören",
        titel,
        frage: `${play} Was heißt das?`,
        antwort: `<p class="word"><span class="say-word">${w.wort}</span> – ${w.de}</p>${hint}`,
      },
    ];
  }

  function pickDue(deck, max) {
    const lessons = readLessons();
    const due = [];
    const fresh = [];
    for (const card of deck) {
      if (!lessons.includes(card.lektion)) continue;
      const s = cardState(card.id);
      if (!s) fresh.push(card);
      else if (s.due <= today()) due.push(card);
    }
    due.sort((a, b) => cardState(a.id).due.localeCompare(cardState(b.id).due));
    return [...due, ...fresh].slice(0, max);
  }

  const PRICES = window.UMRECHNEN;
  const PRICES_PER_SESSION = 5;
  const priceQueue = () => window.Umrechnen.queue(PRICES_PER_SESSION);

  // Mischen vor dem Sortieren, damit bei gleicher Stufe nicht immer dieselben Karten kommen.
  function pickExtra(deck, max) {
    const lessons = readLessons();
    return deck.filter((c) => lessons.includes(c.lektion))
      .map((c) => [Math.random(), c])
      .sort((a, b) => a[0] - b[0])
      .map(([, c]) => c)
      .sort((a, b) => (cardState(a.id)?.box ?? 0) - (cardState(b.id)?.box ?? 0))
      .slice(0, max);
  }

  function rate(card, rating) {
    const box = cardState(card.id)?.box ?? 0;
    const next = rating === "gewusst" ? Math.min(box + 1, 5) : rating === "halb" ? Math.max(box, 1) : 0;
    const days = rating === "halb" ? 1 : INTERVAL_DAYS[next];
    const am = now();
    local.karten[card.id] = { box: next, due: addDays(days), am };
    local.log.push({ id: card.id, bewertung: rating, am });
    saveLocal();
  }

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    Object.assign(node, attrs);
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function exportText() {
    const log = pendingLog();
    const byDay = {};
    for (const e of log) (byDay[e.am.slice(0, 10)] ??= []).push(`${e.id} ${e.bewertung}`);
    const lines = [`Wiederholung bis ${log.at(-1).am}`, `gelesen: ${readLessons().join(", ")}`];
    for (const [day, items] of Object.entries(byDay)) lines.push(`${day}: ${items.join(", ")}`);
    return lines.join("\n");
  }

  function renderExport(parent) {
    if (!pendingLog().length) return;
    const box = el("div", { className: "box ask" });
    box.append(
      el("div", { className: "box-title" }, "Ergebnis für Claude"),
      el("p", {}, "Kopier das in den Chat. Ich trage es ein, plane danach die nächsten Wiederholungen und weiß, welche Geschichten ich in neuen Lektionen noch einmal aufgreife."),
    );
    const text = el("textarea", { className: "export", readOnly: true, rows: 5, value: exportText() });
    const copy = el("button", { className: "action", type: "button" }, "Kopieren");
    copy.addEventListener("click", async () => {
      text.select();
      try {
        await navigator.clipboard.writeText(text.value);
      } catch (e) {
        document.execCommand("copy");
      }
      copy.textContent = "Kopiert";
    });
    box.append(text, copy);
    parent.append(box);
  }

  function renderUnreadLessons(parent) {
    const lessons = readLessons();
    const unread = [...new Set([...STORIES, ...WORD_CARDS].map((c) => c.lektion))].filter((n) => !lessons.includes(n));
    if (!unread.length) return;
    const p = el("p", { className: "unread" }, "Schon gelesen und mit aufnehmen? ");
    for (const n of unread) {
      const b = el("button", { className: "action small", type: "button" }, `Lektion ${n}`);
      b.addEventListener("click", () => {
        local.lektionen.push(n);
        // Ein Eintrag im Log, damit Claude die gelesene Lektion auch ohne Bewertung erfährt.
        local.log.push({ id: `lektion-${n}`, bewertung: "gelesen", am: now() });
        saveLocal();
        start();
      });
      p.append(b);
    }
    parent.append(p);
  }

  function start() {
    root.classList.toggle("extras", !!local.extras);
    const queue = pickDue(STORIES, MAX_PER_SESSION);
    root.replaceChildren();
    if (!queue.length) {
      const upcoming = STORIES.map((c) => cardState(c.id)?.due).filter(Boolean).sort()[0];
      root.append(el("p", {}, upcoming
        ? `Heute ist nichts fällig. Die nächste Geschichte kommt am ${new Date(upcoming + "T12:00").toLocaleDateString("de-DE")} wieder.`
        : "Noch keine Karten. Lies eine Lektion und sag hier Bescheid."));
      const again = el("button", { className: "action", type: "button" }, "Trotzdem ein paar wiederholen");
      again.addEventListener("click", () => run(pickExtra(STORIES, 4), "Geschichten"));
      if (readLessons().length) root.append(again);
    } else {
      const intro = el("p", {}, `${queue.length} Geschichten sind dran. Erinnere dich erst selbst, dann deck auf.`);
      const go = el("button", { className: "action", type: "button" }, "Los");
      go.addEventListener("click", () => run(queue, "Geschichten"));
      root.append(intro, go);
    }
    renderWords(root);
    renderPrices(root);
    renderUnreadLessons(root);
    renderExport(root);
  }

  // Erst hören, dann selbst sagen. So stehen die beiden Karten eines Wortes nicht direkt hintereinander,
  // und das leichtere Wiedererkennen kommt vor dem schwereren Sprechen.
  function listenFirst(queue) {
    return [...queue].sort((a, b) => (a.art === "Hören" ? 0 : 1) - (b.art === "Hören" ? 0 : 1));
  }

  // Ohne Haken nur der Grundwortschatz: lieber die Standards sicher als alles ein bisschen.
  function wordDeck() {
    return WORD_CARDS.filter((c) => local.extras || !c.extra);
  }

  // Wörter und Sätze bekommen eine eigene Runde, die man so oft spielen kann, wie man mag.
  function renderWords(parent) {
    const lessons = readLessons();
    if (!WORD_CARDS.some((c) => lessons.includes(c.lektion))) return;
    const due = pickDue(wordDeck(), MAX_WORDS_PER_SESSION);
    const box = el("div", { className: "box phrases" });
    box.append(
      el("div", { className: "box-title" }, "Sprache üben"),
      el("p", {}, due.length
        ? `${due.length} Wörter und Sätze sind dran. Mal sagst du sie selbst, mal hörst du sie und sagst, was sie heißen.`
        : "Heute ist kein Wort fällig. Üben kannst du trotzdem, so oft du magst."),
    );
    const go = el("button", { className: "action", type: "button" }, due.length ? "Sprache üben" : "Trotzdem üben");
    const more = () => listenFirst(pickExtra(wordDeck(), MAX_WORDS_PER_SESSION));
    go.addEventListener("click", () => run(due.length ? listenFirst(due) : more(), "Wörter", more));
    const toggle = el("label", { className: "extras-toggle" });
    const check = el("input", { type: "checkbox", checked: !!local.extras });
    check.addEventListener("change", () => {
      local.extras = check.checked;
      saveLocal();
      start();
    });
    toggle.append(check, " Auch Varianten und Extras üben, für alle, die gut mit Sprachen können: zweite Antworten, die Form für sie, seltene Zahlen, andere Aussprachen.");
    box.append(go, toggle);
    parent.append(box);
  }

  // Umrechnen ist Übung wie die Wörter: immer da, jede Runde mit neuen Beträgen.
  function renderPrices(parent) {
    if (!PRICES || !readLessons().includes(PRICES.lektion)) return;
    const box = el("div", { className: "box phrases" });
    box.append(
      el("div", { className: "box-title" }, "Preise umrechnen"),
      el("p", {}, `${PRICES_PER_SESSION} Preise, jedes Mal neue, in beide Richtungen. Rechne mit ${PRICES.faustregel} Pfund pro Euro. Pfund in Euro: durch 6 teilen, Komma eine Stelle nach links. Euro in Pfund: mal 6, eine Null dran.`),
    );
    const go = el("button", { className: "action", type: "button" }, "Preise umrechnen");
    go.addEventListener("click", () => run(priceQueue(), "Preise", priceQueue));
    box.append(go);
    parent.append(box);
  }

  // more: baut die Karten für „Noch eine Runde“. Ohne more gibt es den Knopf nicht.
  function run(queue, label, more) {
    const total = queue.length;
    const done = [];
    const retried = new Set();

    function show() {
      root.replaceChildren();
      const card = queue.shift();
      if (!card) return finish(done, label, more);
      const node = el("div", { className: "card" });
      node.append(
        el("p", { className: "kicker" }, [`Lektion ${card.lektion}`, card.art, `${Math.min(done.length + 1, total)} von ${total}`].filter(Boolean).join(" · ")),
        el("p", { className: "q" }, card.frage),
      );
      const reveal = el("button", { className: "action", type: "button" }, "Aufdecken");
      const answer = el("div", { className: "answer" }, card.antwort);
      if (card.bild) {
        answer.append(el("figure", { className: "photo" },
          `<img src="${card.bild.src}" alt="${card.bild.alt}" loading="lazy"><figcaption><span class="credit">${card.bild.credit}</span></figcaption>`));
      }
      const rateRow = el("div", { className: "rate" });
      rateRow.append(el("span", {}, "Wie war's?"));
      for (const [key, label] of Object.entries(RATINGS)) {
        const b = el("button", { type: "button", className: key }, label);
        b.addEventListener("click", () => {
          rate(card, key);
          // Was neu war, kommt am Ende der Runde einmal wieder, solange es noch frisch ist.
          if (key === "neu" && !retried.has(card.id)) {
            retried.add(card.id);
            queue.push(card);
          } else {
            done.push({ card, key });
          }
          show();
        });
        rateRow.append(b);
      }
      reveal.addEventListener("click", () => {
        node.classList.add("revealed");
        reveal.remove();
        // Beim Sprechen kommt die Aufnahme erst mit der Antwort.
        if (card.art === "Sprechen") answer.querySelector("button.say")?.click();
      });
      node.append(reveal, answer, rateRow);
      root.append(node);
      // Ein Klick hat die Karte gerade gebracht, also darf der Browser sofort abspielen.
      if (card.art === "Hören") node.querySelector(".q button.say")?.click();
    }
    show();
  }

  function finish(done, label, more) {
    root.replaceChildren();
    root.append(el("h2", {}, `${done.length} ${label} aufgefrischt`));
    const list = el("ul", { className: "summary" });
    for (const { card, key } of done) {
      const text = card.titel ? `${card.art}: ${card.titel}` : card.frage.replace(/<[^>]+>/g, "");
      list.append(el("li", {}, `${text} <span class="tag ${key}">${RATINGS[key]}</span>`));
    }
    root.append(list);
    renderExport(root);
    if (more) {
      const again = el("button", { className: "action", type: "button" }, "Noch eine Runde");
      again.addEventListener("click", () => run(more(), label, more));
      root.append(again, " ");
    }
    const back = el("button", { className: "action", type: "button" }, "Zurück zum Anfang");
    back.addEventListener("click", start);
    root.append(back);
  }

  start();
})();
