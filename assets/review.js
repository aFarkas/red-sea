// Wiederholung mit Leitner-Stufen. Quelle der Wahrheit ist assets/review-state.js, den Claude pflegt.
// Bewertungen, die neuer sind als dessen "stand", liegen bis zum nächsten Abgleich im localStorage
// und gehen als Text an Claude.
(function () {
  const STORE_KEY = "rotes-meer-wiederholung";
  const MAX_PER_SESSION = 6;
  // Tage bis zur nächsten Wiederholung je Stufe; kurz gehalten, weil die Reise bald ist.
  const INTERVAL_DAYS = [1, 1, 2, 4, 8, 16];
  const RATINGS = {
    gewusst: "Wusste ich",
    halb: "Halb",
    neu: "Neu für mich",
  };

  const state = window.REVIEW_STATE;
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

  function pickDue() {
    const lessons = readLessons();
    const due = [];
    const fresh = [];
    for (const card of window.CARDS) {
      if (!lessons.includes(card.lektion)) continue;
      const s = cardState(card.id);
      if (!s) fresh.push(card);
      else if (s.due <= today()) due.push(card);
    }
    due.sort((a, b) => cardState(a.id).due.localeCompare(cardState(b.id).due));
    return [...due, ...fresh].slice(0, MAX_PER_SESSION);
  }
  function pickExtra() {
    const lessons = readLessons();
    return window.CARDS.filter((c) => lessons.includes(c.lektion))
      .sort((a, b) => (cardState(a.id)?.box ?? 0) - (cardState(b.id)?.box ?? 0))
      .slice(0, 4);
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
    const unread = [...new Set(window.CARDS.map((c) => c.lektion))].filter((n) => !lessons.includes(n));
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
    const queue = pickDue();
    root.replaceChildren();
    if (!queue.length) {
      const upcoming = window.CARDS.map((c) => cardState(c.id)?.due).filter(Boolean).sort()[0];
      root.append(el("p", {}, upcoming
        ? `Heute ist nichts fällig. Die nächste Geschichte kommt am ${new Date(upcoming + "T12:00").toLocaleDateString("de-DE")} wieder.`
        : "Noch keine Karten. Lies eine Lektion und sag hier Bescheid."));
      const again = el("button", { className: "action", type: "button" }, "Trotzdem ein paar wiederholen");
      again.addEventListener("click", () => run(pickExtra()));
      if (readLessons().length) root.append(again);
      renderUnreadLessons(root);
      renderExport(root);
      return;
    }
    const intro = el("p", {}, `${queue.length} Geschichten sind dran. Erinnere dich erst selbst, dann deck auf.`);
    const go = el("button", { className: "action", type: "button" }, "Los");
    go.addEventListener("click", () => run(queue));
    root.append(intro, go);
    renderUnreadLessons(root);
    renderExport(root);
  }

  function run(queue) {
    const total = queue.length;
    const done = [];
    const retried = new Set();

    function show() {
      root.replaceChildren();
      const card = queue.shift();
      if (!card) return finish(done);
      const node = el("div", { className: "card" });
      node.append(
        el("p", { className: "kicker" }, `Lektion ${card.lektion} · ${Math.min(done.length + 1, total)} von ${total}`),
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
      });
      node.append(reveal, answer, rateRow);
      root.append(node);
    }
    show();
  }

  function finish(done) {
    root.replaceChildren();
    root.append(el("h2", {}, `${done.length} Geschichten aufgefrischt`));
    const list = el("ul", { className: "summary" });
    for (const { card, key } of done) list.append(el("li", {}, `${card.frage} <span class="tag ${key}">${RATINGS[key]}</span>`));
    root.append(list);
    renderExport(root);
    const back = el("button", { className: "action", type: "button" }, "Zurück zum Anfang");
    back.addEventListener("click", start);
    root.append(back);
  }

  start();
})();
