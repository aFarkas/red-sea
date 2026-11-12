// Reiseplan Luxor: Bausteine in Tage ziehen, weghaken, wieder einblenden.
// Ziehen geht mit Maus (MacBook) und Finger (iPad) über Pointer Events am Griff ⠿;
// dazu gibt es an jeder Karte das Menü „Verschieben nach …“.
// Gespeichert wird im Browser (localStorage). Zwischen Geräten wandert der Plan als Link.
(function () {
  const KEY = "reiseplan-luxor-v1";
  const ARTEN = window.PLAN_ARTEN, TAGE = window.PLAN_TAGE, VORSCHLAEGE = window.PLAN_VORSCHLAEGE;
  const FEST = window.PLAN_FEST;
  if (FEST && FEST.plan) VORSCHLAEGE.fest = Object.assign({ name: "Unser fester Plan" }, FEST.plan);
  const BY_ID = Object.fromEntries(window.PLAN_BAUSTEINE.map((b) => [b.id, b]));
  const FAUST = 60; // Faustregel aus Lektion 10: 60 Pfund ≈ 1 Euro
  const LOS = [6, 7, 8, 9]; // Abfahrt morgens; aufstehen eine Stunde vorher, nie vor 6 an der Stätte

  const root = document.getElementById("planer");

  // Wo sind sich der Freund und mein Vorschlag einig? Beide planen den Baustein am selben Tag ein,
  // oder beide raten ab (einig: "abraten" in den Daten).
  function lage(preset, id) {
    for (const [slot, ids] of Object.entries(preset)) {
      if (slot === "name") continue;
      for (const x of ids) if (x.replace(/^-/, "") === id) return { tag: slot.split("-")[0], an: !x.startsWith("-") };
    }
    return null;
  }
  function einig(b) {
    if (b.einig) return b.einig;
    if (!b.freund) return null;
    const f = lage(VORSCHLAEGE.freund, b.id), m = lage(VORSCHLAEGE.mein, b.id);
    return f && m && f.an && m.an && f.tag === m.tag ? "dabei" : null;
  }
  const SLOTS = [];
  TAGE.forEach((t) => t.slots.forEach(([s, label]) => SLOTS.push({ id: `${t.id}-${s}`, tag: t, label })));
  const SLOT_IDS = new Set(SLOTS.map((s) => s.id).concat(["pool"]));

  // ---------- Zustand ----------
  function vorschlag(welcher = "mein") {
    const st = { slots: {}, off: {}, todo: {}, zeigen: {}, geaendert: null };
    for (const [slot, ids] of Object.entries(VORSCHLAEGE[welcher])) {
      if (slot === "name") continue;
      st.slots[slot] = ids.map((x) => {
        const id = x.replace(/^-/, "");
        if (x.startsWith("-")) st.off[id] = 1;
        return id;
      });
    }
    return normalize(st);
  }
  // Jeder Baustein steht genau einmal irgendwo; Unbekanntes fliegt raus, Neues kommt in den Pool.
  function normalize(st) {
    const seen = new Set();
    const slots = {};
    for (const [slot, ids] of Object.entries(st.slots || {})) {
      if (!SLOT_IDS.has(slot)) continue;
      slots[slot] = (ids || []).filter((id) => BY_ID[id] && !seen.has(id) && seen.add(id));
    }
    slots.pool = slots.pool || [];
    for (const id of Object.keys(BY_ID)) if (!seen.has(id)) slots.pool.push(id);
    return { slots, off: st.off || {}, todo: st.todo || {}, zeigen: st.zeigen || {}, kompakt: !!st.kompakt, notiz: st.notiz || "", los: LOS.includes(+st.los) ? +st.los : 7, geaendert: st.geaendert || null };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return normalize(JSON.parse(raw));
    } catch (e) {}
    if (VORSCHLAEGE.fest) {
      const st = vorschlag("fest");
      (FEST.todo || []).forEach((id) => (st.todo[id] = 1));
      st.notiz = FEST.notiz || "";
      if (FEST.los) st.los = FEST.los;
      return st;
    }
    return vorschlag();
  }
  let state = load();
  function save() {
    state.geaendert = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---------- Link zum Teilen (iPad ↔ MacBook) ----------
  function encode(st) {
    const compact = { s: st.slots, o: Object.keys(st.off), d: Object.keys(st.todo), n: st.notiz || "", l: st.los };
    const json = JSON.stringify(compact);
    return btoa(String.fromCharCode(...new TextEncoder().encode(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function decode(str) {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const c = JSON.parse(new TextDecoder().decode(bytes));
    const flag = (arr) => Object.fromEntries((arr || []).map((k) => [k, 1]));
    return normalize({ slots: c.s, off: flag(c.o), todo: flag(c.d), notiz: c.n || "", los: c.l });
  }
  function fromHash() {
    const m = location.hash.match(/plan=([A-Za-z0-9_-]+)/);
    if (!m) return;
    try {
      const st = decode(m[1]);
      if (confirm("Diesen Plan aus dem Link übernehmen? Dein bisheriger Plan auf diesem Gerät wird ersetzt.")) {
        state = st; save();
      }
    } catch (e) { alert("Der Link enthält keinen lesbaren Plan."); }
    history.replaceState(null, "", location.pathname);
  }
  async function teilen() {
    const url = location.origin + location.pathname + "#plan=" + encode(state);
    if (navigator.share) {
      try { await navigator.share({ title: "Unser Reiseplan Luxor", url }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); meldung("Link kopiert. Auf dem anderen Gerät öffnen, dann ist der Plan dort."); }
    catch (e) { prompt("Diesen Link auf dem anderen Gerät öffnen:", url); }
  }

  // ---------- Rhythmus: Abfahrt 6, 7, 8 oder 9 Uhr, aufstehen eine Stunde vorher ----------
  const uhr = (min) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
  function T(str) {
    if (!str || str.indexOf("{") < 0) return str;
    const los = (state.los || 7) * 60;
    const en = state.los < 12 ? `${state.los}:00 am` : `${state.los - 12}:00 pm`;
    return str.replace(/\{auf\}/g, uhr(los - 60)).replace(/\{los\}/g, uhr(los)).replace(/\{losEn\}/g, en)
      .replace(/\{talPlan\}/g, state.los <= 7 ? `seid ihr gegen ${uhr(los + 20)} im Tal der Könige` : "fahrt zuerst nach Medinet Habu, ins Tal der Könige erst ab etwa 14 Uhr")
      .replace(/\{talAnkunft\}/g, state.los <= 7 ? `Ihr seid gegen ${uhr(los + 20)} da` : "Bei eurer späteren Abfahrt kommt ihr erst ab etwa 14 Uhr her, wenn die Busse wieder abfahren").replace(/\{tal\}/g, uhr(los + 20)).replace(/\{karnak\}/g, uhr(los + 30));
  }
  const RHYTHMUS = {
    6: "Früher geht es nicht: Die Stätten öffnen um 6, ihr seid gegen 6:20 im Tal der Könige, so leer wie den ganzen Tag nicht. Den Sonnenaufgang gegen 6:05 seht ihr unterwegs. Aufstehen um 5. Mittags habt ihr dann viel Zeit für eine lange Pause.",
    7: "Euer gewohnter Rhythmus: gegen 7:20 im Tal der Könige, vor den Ausflugsbussen, die nach Reiseberichten ab etwa 8 Uhr kommen. Das Tal zuerst, dann der Rest.",
    8: "Ihr kommt gegen 8:20 mit den ersten Bussen. Besser die Reihenfolge am Westufer umdrehen: erst Medinet Habu, Deir el-Medina und Hatschepsut, das Tal der Könige ab etwa 14 Uhr, wenn die Busse laut Reiseberichten wieder abfahren. Letzter Einlass ist 16 Uhr. Zieht die Karten entsprechend um.",
    9: "Um 10 sind die Gräber nach Reiseberichten voll. Dreht die Reihenfolge am Westufer um: erst Medinet Habu, Deir el-Medina und Hatschepsut, das Tal der Könige ab etwa 14 Uhr, letzter Einlass 16 Uhr. Am Ostufer ist es weniger heikel, Karnak lässt bis 16 Uhr ein.",
  };
  function renderRhythmus() {
    const sel = document.getElementById("planer-los");
    const hint = document.getElementById("rhythmus-hinweis");
    if (sel) {
      if (!sel.options.length) {
        LOS.forEach((h) => sel.append(el("option", { value: h }, `Los um ${h}:00 · aufstehen ${h - 1}:00`)));
        sel.addEventListener("change", () => { state.los = +sel.value; save(); render(); meldung(`Rhythmus: aufstehen ${state.los - 1}:00, los ${state.los}:00.`); });
      }
      sel.value = String(state.los);
    }
    if (hint) hint.textContent = RHYTHMUS[state.los];
  }

  // ---------- Hilfen ----------
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k);
    return n;
  };
  const pfund = (n) => n.toLocaleString("de-DE");
  const euro = (n) => Math.round(n / FAUST).toLocaleString("de-DE");
  function meldung(text) {
    const m = document.getElementById("planer-meldung");
    if (!m) return;
    m.textContent = text;
    clearTimeout(meldung.t);
    meldung.t = setTimeout(() => (m.textContent = ""), 5000);
  }
  function slotOf(id) {
    for (const [s, ids] of Object.entries(state.slots)) if (ids.includes(id)) return s;
    return "pool";
  }
  function move(id, toSlot, index) {
    const from = slotOf(id);
    state.slots[from] = state.slots[from].filter((x) => x !== id);
    const list = (state.slots[toSlot] = state.slots[toSlot] || []);
    if (index == null || index > list.length) index = list.length;
    list.splice(index, 0, id);
    delete state.off[id]; // was man verschiebt, will man dabeihaben
    save(); render();
  }

  // ---------- Karte eines Bausteins ----------
  function karte(id, slot) {
    const b = BY_ID[id];
    const off = !!state.off[id];
    const art = ARTEN[b.art];
    const chips = [];
    if (b.ufer) chips.push(el("span", { class: "chip" }, b.ufer === "West" ? "Westufer" : b.ufer === "Ost" ? "Ostufer" : b.ufer === "Ost?" ? "Ufer prüfen" : b.ufer));
    if (b.zeit) chips.push(el("span", { class: "chip" }, "🕑 " + T(b.zeit)));
    if (b.dauer) chips.push(el("span", { class: "chip" }, "⏳ " + b.dauer));
    if (b.preis != null) chips.push(el("span", { class: "chip preis" }, b.preis === 0 ? "frei" : `${pfund(b.preis)} £E p. P. ≈ ${euro(b.preis)} €`));
    const e = einig(b);
    if (e) chips.push(el("span", { class: "chip einig" }, e === "abraten" ? "✓ einig: beide raten ab" : "✓ Freund und ich einig"));
    else if (b.freund) chips.push(el("span", { class: "chip freund" }, "💬 Tipp des Freundes"));
    if (b.anders) chips.push(el("span", { class: "chip anders" }, "⚠ Hinweis"));
    if (b.guide === "Guide lohnt" || b.guide === "Guide") chips.push(el("span", { class: "chip guide" }, "👤 mit Guide besser"));
    if (b.guide === "gut allein" || b.guide === "selbst") chips.push(el("span", { class: "chip allein" }, "🧭 gut selbst"));

    const ziel = el("select", { class: "ziel", "aria-label": `${b.t} verschieben nach`,
      onchange: (e) => { if (e.target.value) move(id, e.target.value); } },
      el("option", { value: "" }, "Verschieben nach …"),
      TAGE.map((t) => el("optgroup", { label: t.kurz }, t.slots.map(([s, label]) => {
        const sid = `${t.id}-${s}`;
        return el("option", { value: sid, disabled: sid === slot }, `${t.kurz} · ${label}`);
      }))),
      el("option", { value: "pool", disabled: slot === "pool" }, "Zurück in den Ideenpool"));

    const haken = el("button", { type: "button", class: "haken", "aria-pressed": off ? "false" : "true",
      title: off ? "Wieder einblenden" : "Weghaken",
      onclick: () => { if (off) delete state.off[id]; else state.off[id] = 1; save(); render(); } },
      off ? "↺ wieder rein" : "✓");

    return el("li", { class: "karte" + (off ? " off" : "") + (e ? " einig" : ""), "data-id": id, "data-art": b.art },
      el("div", { class: "kopf" },
        el("button", { type: "button", class: "griff", "aria-label": `${b.t} ziehen`, title: "Ziehen zum Verschieben" }, "⠿"),
        el("span", { class: "art", title: art.name, "aria-hidden": "true" }, art.icon),
        el("span", { class: "titel" }, T(b.t)),
        haken),
      off ? null : el("div", { class: "chips" }, chips),
      off ? null : el("p", { class: "txt" }, T(b.txt)),
      off || !b.anders ? null : el("p", { class: "anders-text" }, el("strong", {}, !b.freund ? "Ergänzung: " : e ? "Hinweis: " : "Anders als euer Freund: "), T(b.anders)),
      off ? null : el("details", { class: "mehr" },
        el("summary", {}, "Mehr"),
        b.more ? el("p", { html: T(b.more) }) : null,
        b.map ? el("p", {}, el("a", { href: b.map, target: "_blank", rel: "noopener" }, "📍 In Google Maps öffnen")) : null,
        el("p", {}, ziel)));
  }

  // ---------- Ein Abschnitt (Slot) mit Weggehakten dahinter ----------
  function slotListe(slotId, ids, attrs = {}) {
    const an = ids.filter((id) => !state.off[id]);
    const weg = ids.filter((id) => state.off[id]);
    const ul = el("ul", Object.assign({ class: "liste", "data-slot": slotId }, attrs), an.map((id) => karte(id, slotId)));
    const out = [ul];
    if (weg.length) {
      const offen = !!state.zeigen[slotId];
      out.push(el("button", { type: "button", class: "weg-toggle", "aria-expanded": String(offen),
        onclick: () => { if (offen) delete state.zeigen[slotId]; else state.zeigen[slotId] = 1; save(); render(); } },
        `${weg.length} weggehakt · ${offen ? "verbergen" : "zeigen"}`));
      if (offen) out.push(el("ul", { class: "liste weg" }, weg.map((id) => karte(id, slotId))));
    }
    return out;
  }

  // ---------- Ganze Seite ----------
  function summe(ids) {
    return ids.filter((id) => !state.off[id]).reduce((s, id) => s + (BY_ID[id].preis || 0), 0);
  }
  function render() {
    const y = window.scrollY;
    root.innerHTML = "";

    let gesamt = 0;
    const tage = el("div", { class: "tage" }, TAGE.map((t) => {
      let tagSumme = 0;
      const abschnitte = t.slots.map(([s, label]) => {
        const sid = `${t.id}-${s}`;
        const ids = state.slots[sid] || [];
        tagSumme += summe(ids);
        return el("section", { class: "slot" }, el("h4", {}, label), slotListe(sid, ids));
      });
      gesamt += tagSumme;
      return el("article", { class: "tagkarte", id: t.id },
        el("header", {},
          el("h3", {}, t.name),
          el("p", { class: "motto" }, t.motto),
          el("p", { class: "meta" }, [t.sonne ? "☀ " + t.sonne : null, tagSumme ? `Eintritt ${pfund(tagSumme)} £E p. P. ≈ ${euro(tagSumme)} €` : null].filter(Boolean).join(" · "))),
        abschnitte);
    }));

    const pool = state.slots.pool;
    const poolEl = el("aside", { class: "pool", "aria-label": "Ideenpool" },
      el("h3", {}, "Ideenpool"),
      el("p", { class: "meta" }, "Alles, was noch in keinem Tag steht. Ziehen oder über „Mehr → Verschieben nach …“ einplanen."),
      Object.entries(ARTEN).map(([art, a]) => {
        const ids = pool.filter((id) => BY_ID[id].art === art);
        if (!ids.length) return null;
        return el("section", { class: "slot" }, el("h4", {}, `${a.icon} ${a.name}`), slotListe("pool", ids, { "data-art": art }));
      }),
      pool.length ? null : el("p", { class: "meta" }, "Leer: Alles ist eingeplant."),
      el("ul", { class: "liste leer-ziel", "data-slot": "pool" }));

    const bilanz = el("p", { class: "bilanz" },
      el("strong", {}, `Eintritte im Plan: ${pfund(gesamt)} £E pro Person ≈ ${euro(gesamt)} €`),
      ` · zu zweit ${pfund(gesamt * 2)} £E ≈ ${euro(gesamt * 2)} €. Euro nach der Faustregel (60 Pfund ≈ 1 €), bezahlt wird an den Kassen nur mit Karte.`);

    root.classList.toggle("kompakt", !!state.kompakt);
    const kb = document.querySelector('[data-planer="kompakt"]');
    if (kb) kb.textContent = state.kompakt ? "Ausführlich" : "Kompakt";
    root.append(bilanz, el("div", { class: "planer-layout" }, tage, poolEl));
    window.scrollTo(0, y);

    const stand = document.getElementById("planer-stand");
    if (stand) stand.textContent = state.geaendert
      ? "Zuletzt geändert auf diesem Gerät: " + new Date(state.geaendert).toLocaleString("de-DE", { weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" })
      : "Noch unverändert: das ist der Vorschlag.";

    renderTodo();
    renderRhythmus();
  }

  // ---------- Vorab erledigen ----------
  function renderTodo() {
    document.querySelectorAll("[data-todo]").forEach((li) => {
      const id = li.dataset.todo;
      let cb = li.querySelector("input");
      if (!cb) {
        cb = el("input", { type: "checkbox", "aria-label": li.textContent.trim() });
        cb.addEventListener("change", () => { if (cb.checked) state.todo[id] = 1; else delete state.todo[id]; save(); li.classList.toggle("erledigt", cb.checked); });
        li.prepend(cb);
      }
      cb.checked = !!state.todo[id];
      li.classList.toggle("erledigt", cb.checked);
    });
  }

  // ---------- Ergebnis für Claude ----------
  // Lesbar für den Chat, dazu der Plan-Code im Format von assets/reiseplan-fest.js.
  function exportText() {
    const L = [];
    const jetzt = new Date().toLocaleString("de-DE", { weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" });
    L.push(`Reiseplan Luxor, Ergebnis für Claude (Stand ${jetzt})`);
    L.push(`Rhythmus: aufstehen ${state.los - 1}:00, los ${state.los}:00`);
    const plan = {};
    let gesamt = 0;
    for (const t of TAGE) {
      L.push("", t.name.toUpperCase());
      for (const [s, label] of t.slots) {
        const sid = `${t.id}-${s}`;
        const ids = state.slots[sid] || [];
        if (!ids.length) continue;
        plan[sid] = ids.map((id) => (state.off[id] ? "-" : "") + id);
        const an = ids.filter((id) => !state.off[id]), weg = ids.filter((id) => state.off[id]);
        gesamt += summe(ids);
        L.push(`${label}: ${an.map((id) => T(BY_ID[id].t)).join("; ") || "–"}` + (weg.length ? ` (weggehakt: ${weg.map((id) => T(BY_ID[id].t)).join("; ")})` : ""));
      }
    }
    L.push("", `Eintritt im Plan: ${pfund(gesamt)} Pfund pro Person`);
    const todos = [...document.querySelectorAll("[data-todo]")];
    const erledigt = todos.filter((li) => state.todo[li.dataset.todo]).map((li) => li.dataset.todo);
    const offen = todos.filter((li) => !state.todo[li.dataset.todo]).map((li) => li.dataset.todo);
    L.push(`Vorab erledigt: ${erledigt.join(", ") || "nichts"} · offen: ${offen.join(", ") || "nichts"}`);
    if (state.notiz.trim()) L.push("", "Notizen:", state.notiz.trim());
    L.push("", "Plan-Code: " + JSON.stringify({ los: state.los, todo: erledigt, plan }));
    return L.join("\n");
  }
  function renderExport() {
    const notiz = document.getElementById("planer-notiz");
    const btn = document.querySelector('[data-planer="claude"]');
    const out = document.getElementById("planer-export");
    if (!notiz || !btn || !out) return;
    notiz.value = state.notiz;
    notiz.addEventListener("input", () => { state.notiz = notiz.value; save(); out.hidden = true; });
    btn.addEventListener("click", async () => {
      const ta = out.querySelector("textarea");
      ta.value = exportText();
      out.hidden = false;
      ta.select();
      try { await navigator.clipboard.writeText(ta.value); meldungIn(out, "Kopiert. Jetzt in den Chat einfügen."); }
      catch (e) { meldungIn(out, "Text markiert: kopieren und in den Chat einfügen."); }
    });
    out.querySelector("button").addEventListener("click", async () => {
      const ta = out.querySelector("textarea");
      ta.select();
      try { await navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand("copy"); }
      meldungIn(out, "Kopiert.");
    });
  }
  // E-Mail an euch selbst, als Ablage. Die Adresse bleibt nur auf diesem Gerät (das Repo ist öffentlich).
  const MAILKEY = "reiseplan-luxor-mail";
  function renderMail() {
    const out = document.getElementById("planer-export");
    const feld = document.getElementById("planer-mail");
    if (!out || !feld) return;
    try { feld.value = localStorage.getItem(MAILKEY) || ""; } catch (e) {}
    feld.addEventListener("change", () => { try { localStorage.setItem(MAILKEY, feld.value.trim()); } catch (e) {} });
    out.querySelector('[data-export="mail"]').addEventListener("click", () => {
      const text = out.querySelector("textarea").value;
      const an = feld.value.trim();
      try { localStorage.setItem(MAILKEY, an); } catch (e) {}
      location.href = "mailto:" + encodeURIComponent(an).replace(/%40/g, "@") + "?subject=" + encodeURIComponent("Reiseplan Luxor für Claude") + "&body=" + encodeURIComponent(text);
    });
    const teilen = out.querySelector('[data-export="teilen"]');
    if (!navigator.share) teilen.hidden = true;
    teilen.addEventListener("click", async () => {
      try { await navigator.share({ title: "Reiseplan Luxor für Claude", text: out.querySelector("textarea").value }); } catch (e) {}
    });
  }
  function meldungIn(box, text) { const p = box.querySelector(".export-meldung"); if (p) p.textContent = text; }

  // ---------- Fester Plan, von Claude eingetragen ----------
  function renderFest() {
    const box = document.getElementById("planer-fest");
    if (!box) return;
    if (!VORSCHLAEGE.fest) { box.hidden = true; return; }
    const stand = new Date(FEST.stand).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
    box.hidden = false;
    box.querySelector("[data-fest-stand]").textContent = stand;
  }

  // ---------- Ziehen mit Maus und Finger ----------
  let drag = null;
  root.addEventListener("pointerdown", (e) => {
    const griff = e.target.closest(".griff");
    if (!griff || e.button > 0) return;
    const li = griff.closest(".karte");
    if (!li || li.classList.contains("off")) return;
    e.preventDefault();
    const r = li.getBoundingClientRect();
    const ph = el("li", { class: "platzhalter" });
    ph.style.height = r.height + "px";
    li.after(ph);
    li.classList.add("zieht");
    Object.assign(li.style, { width: r.width + "px", left: r.left + "px", top: r.top + "px" });
    document.body.append(li);
    drag = { li, ph, id: li.dataset.id, dx: e.clientX - r.left, dy: e.clientY - r.top, x: e.clientX, y: e.clientY, pid: e.pointerId };
    try { griff.releasePointerCapture(e.pointerId); } catch (_) {}
    document.documentElement.classList.add("am-ziehen");
    requestAnimationFrame(autoScroll);
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.pid) return;
    e.preventDefault();
    drag.x = e.clientX; drag.y = e.clientY;
    position();
  }, { passive: false });
  function position() {
    const { li, ph, x, y } = drag;
    li.style.left = x - drag.dx + "px";
    li.style.top = y - drag.dy + "px";
    const unter = document.elementFromPoint(x, y);
    let liste = unter && unter.closest(".liste:not(.weg)");
    if (!liste) {
      const slot = unter && unter.closest(".slot, .pool");
      liste = slot && slot.querySelector(".liste:not(.weg)");
    }
    if (!liste) return;
    const kinder = [...liste.children].filter((c) => c !== ph);
    const vor = kinder.find((c) => { const r = c.getBoundingClientRect(); return y < r.top + r.height / 2; });
    if (vor) liste.insertBefore(ph, vor); else liste.append(ph);
  }
  function autoScroll() {
    if (!drag) return;
    const rand = 70, y = drag.y, h = window.innerHeight;
    const v = y < rand ? -(rand - y) / 3 : y > h - rand ? (y - (h - rand)) / 3 : 0;
    if (v) { window.scrollBy(0, v); position(); }
    const pool = document.querySelector(".pool");
    if (pool && pool.scrollHeight > pool.clientHeight) {
      const r = pool.getBoundingClientRect();
      if (drag.x > r.left && drag.x < r.right) {
        if (y < r.top + 50 && y > r.top) pool.scrollTop -= 8;
        else if (y > r.bottom - 50 && y < r.bottom) pool.scrollTop += 8;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  function ende(e) {
    if (!drag || (e && e.pointerId !== drag.pid)) return;
    const { li, ph, id } = drag;
    drag = null;
    document.documentElement.classList.remove("am-ziehen");
    const liste = ph.parentElement;
    const slot = liste && liste.dataset.slot;
    li.remove();
    if (!slot || (e && e.type === "pointercancel")) { ph.remove(); render(); return; }
    // Position unter den sichtbaren Karten in die Liste des Zustands übersetzen.
    const nachbarn = [...liste.children].filter((c) => c.dataset && c.dataset.id && c !== li);
    const idx = [...liste.children].indexOf(ph);
    const nach = nachbarn.filter((c) => [...liste.children].indexOf(c) < idx).pop();
    ph.remove();
    const from = slotOf(id);
    state.slots[from] = state.slots[from].filter((x) => x !== id);
    const list = (state.slots[slot] = state.slots[slot] || []);
    const pos = nach ? list.indexOf(nach.dataset.id) + 1 : (nachbarn[0] ? list.indexOf(nachbarn[0].dataset.id) : list.length);
    list.splice(pos < 0 ? list.length : pos, 0, id);
    save(); render();
    const neu = root.querySelector(`[data-id="${id}"]`);
    if (neu) { neu.classList.add("neu"); setTimeout(() => neu.classList.remove("neu"), 900); }
  }
  window.addEventListener("pointerup", ende);
  window.addEventListener("pointercancel", ende);

  // ---------- Knöpfe oben ----------
  document.querySelectorAll("[data-planer]").forEach((b) => b.addEventListener("click", () => {
    const was = b.dataset.planer;
    if (was === "teilen") teilen();
    if (was === "drucken") window.print();
    if ((was === "mein" || was === "freund" || was === "fest") && confirm(`„${VORSCHLAEGE[was].name}“ laden? Eure Änderungen gehen verloren (die Häkchen bei „Vorab erledigen“ bleiben).`)) {
      const todo = state.todo, kompakt = state.kompakt;
      const notiz = state.notiz, los = state.los;
      state = vorschlag(was); state.todo = todo; state.kompakt = kompakt; state.notiz = notiz; state.los = los;
      if (was === "fest") { (FEST.todo || []).forEach((id) => (state.todo[id] = 1)); if (!notiz) state.notiz = FEST.notiz || ""; if (FEST.los) state.los = FEST.los; }
      save(); render();
      meldung(`„${VORSCHLAEGE[was].name}“ geladen.`);
    }
    if (was === "kompakt") {
      state.kompakt = !state.kompakt; save(); render();
    }
    if (was === "alle-zeigen") {
      const alle = SLOTS.map((s) => s.id).concat("pool").every((s) => state.zeigen[s]);
      state.zeigen = {};
      if (!alle) SLOTS.map((s) => s.id).concat("pool").forEach((s) => (state.zeigen[s] = 1));
      save(); render();
    }
  }));

  fromHash();
  render();
  renderFest();
  renderExport();
  renderMail();
})();
