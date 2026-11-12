// Gemeinsamer Zustand des Reiseplans Luxor, für den Planer (reference/reiseplan.html) und die Karte
// (reference/karte.html). Beide lesen und schreiben denselben Plan im Browser (localStorage):
// Was man auf der Karte einplant oder weghakt, steht danach im Planer, und umgekehrt.
// Braucht vorher assets/reiseplan-daten.js und assets/reiseplan-fest.js.
(function () {
  const KEY = "reiseplan-luxor-v1";
  const TAGE = window.PLAN_TAGE, VORSCHLAEGE = window.PLAN_VORSCHLAEGE;
  const FEST = window.PLAN_FEST;
  if (FEST && FEST.plan && !VORSCHLAEGE.fest) VORSCHLAEGE.fest = Object.assign({ name: "Unser fester Plan" }, FEST.plan);
  const BY_ID = Object.fromEntries(window.PLAN_BAUSTEINE.map((b) => [b.id, b]));
  const LOS = [6, 7, 8, 9]; // Abfahrt morgens; aufstehen eine Stunde vorher, nie vor 6 an der Stätte

  const SLOTS = [];
  TAGE.forEach((t) => t.slots.forEach(([s, label]) => SLOTS.push({ id: `${t.id}-${s}`, tag: t, label })));
  const SLOT_IDS = new Set(SLOTS.map((s) => s.id).concat(["pool"]));
  const SLOT_BY_ID = Object.fromEntries(SLOTS.map((s) => [s.id, s]));

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
    const off = st.off || {};
    for (const id of Object.keys(BY_ID)) {
      if (seen.has(id)) continue;
      // Zweitkarten, die ein gespeicherter Plan noch nicht kennt, kommen weggehakt an ihren Ort aus meinem Vorschlag.
      const ziel = BY_ID[id].zweit && Object.keys(VORSCHLAEGE.mein).find((s) => s !== "name" && VORSCHLAEGE.mein[s].includes("-" + id));
      if (ziel && SLOT_IDS.has(ziel)) { (slots[ziel] = slots[ziel] || []).push(id); off[id] = 1; }
      else slots.pool.push(id);
    }
    return { slots, off, todo: st.todo || {}, zeigen: st.zeigen || {}, kompakt: !!st.kompakt, bilder: st.bilder !== false, notiz: st.notiz || "", los: LOS.includes(+st.los) ? +st.los : 7, geaendert: st.geaendert || null };
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
  function save(st) {
    st.geaendert = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
  }
  function slotOf(st, id) {
    for (const [s, ids] of Object.entries(st.slots)) if (ids.includes(id)) return s;
    return "pool";
  }
  // Verschieben ans Ende eines Abschnitts (oder an index). Was man verschiebt, will man dabeihaben.
  function move(st, id, toSlot, index) {
    const from = slotOf(st, id);
    st.slots[from] = st.slots[from].filter((x) => x !== id);
    const list = (st.slots[toSlot] = st.slots[toSlot] || []);
    if (index == null || index > list.length) index = list.length;
    list.splice(index, 0, id);
    delete st.off[id];
  }

  // Uhrzeiten nach dem Rhythmus: Abfahrt 6, 7, 8 oder 9 Uhr, aufstehen eine Stunde vorher.
  const uhr = (min) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
  function T(str, losH) {
    if (!str || str.indexOf("{") < 0) return str;
    losH = losH || 7;
    const los = losH * 60;
    const en = losH < 12 ? `${losH}:00 am` : `${losH - 12}:00 pm`;
    return str.replace(/\{auf\}/g, uhr(los - 60)).replace(/\{los\}/g, uhr(los)).replace(/\{losEn\}/g, en)
      .replace(/\{talPlan\}/g, losH <= 7 ? `seid ihr gegen ${uhr(los + 20)} im Tal der Könige` : "fahrt zuerst nach Medinet Habu, ins Tal der Könige erst ab etwa 14 Uhr")
      .replace(/\{talAnkunft\}/g, losH <= 7 ? `Ihr seid gegen ${uhr(los + 20)} da` : "Bei eurer späteren Abfahrt kommt ihr erst ab etwa 14 Uhr her, wenn die Busse wieder abfahren").replace(/\{tal\}/g, uhr(los + 20)).replace(/\{karnak\}/g, uhr(los + 30));
  }

  // Ändert ein anderer Tab den Plan, oder kommt die Seite aus dem Zurück-Speicher des Browsers,
  // ruft onChange den frischen Plan ab.
  function beobachten(onChange) {
    window.addEventListener("storage", (e) => { if (e.key === KEY) onChange(load()); });
    window.addEventListener("pageshow", (e) => { if (e.persisted) onChange(load()); });
  }

  window.PLAN_ZUSTAND = { KEY, LOS, BY_ID, SLOTS, SLOT_IDS, SLOT_BY_ID, TAGE, VORSCHLAEGE, FEST, einig, vorschlag, normalize, load, save, slotOf, move, T, beobachten };
})();
