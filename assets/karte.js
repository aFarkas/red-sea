// Karte Luxor (reference/karte.html): alle Orte aus dem Reiseplan als Pins, mit Filtern und eigenem Standort.
// Die Pins kommen aus denselben Daten wie der Planer (assets/reiseplan-daten.js: PLAN_ORTE und das Feld
// „ort“ jedes Bausteins), der Plan aus demselben Speicher (assets/reiseplan-zustand.js). Ein neuer
// Baustein mit Ort ist also sofort ein Pin, und was man hier einplant oder weghakt, steht im Planer.
(function () {
  const Z = window.PLAN_ZUSTAND, ORTE = window.PLAN_ORTE, BY_ID = Z.BY_ID;
  const FILTERKEY = "karte-luxor-filter"; // nur Ansicht, pro Gerät
  const LUXOR = [25.712, 32.625];

  const TYPEN = {
    staette: { name: "Tempel & Gräber", icon: "⚱️", farbe: "#c8553d" },
    museum: { name: "Museen", icon: "🏛️", farbe: "#7b5ea7" },
    sonst: { name: "Übriges", icon: "📍", farbe: "#2f7fa3" },
    wege: { name: "Wege & Praktisches", icon: "🧭", farbe: "#5c6b75" },
    lokal: { name: "Restaurants", icon: "🍽", farbe: "#2e7d4f" },
  };
  const MAHL = {
    fruehstueck: { name: "Frühstück", icon: "☕" },
    mittag: { name: "Mittag", icon: "🥗" },
    abend: { name: "Abend", icon: "🌙" },
    drinks: { name: "Drinks", icon: "🍺" },
  };
  // Lokale ohne Pin und warum (die übrigen Bausteine ohne Ort sind Touren, Pausen und Wege).
  const OHNE_PIN = {
    thebes: "Ufer unklar: The Luxor Guide sagt Ostufer, HappyCow Westufer.",
    snobs: "Lage in OpenStreetMap nicht gefunden.",
    koschari: "Gibt es in vielen Läden der Altstadt.",
    saft: "Saftstände überall in der Stadt.",
  };

  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k);
    return n;
  };
  const gmSuche = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const gmRoute = (geo) => `https://www.google.com/maps/dir/?api=1&destination=${geo[0]},${geo[1]}`;

  let state = Z.load();
  let vonLink = false; // Seite über einen Link zu einem Ort geöffnet (#ort=…)
  const T = (s) => Z.T(s, state.los);

  // ---------- Filter (pro Gerät gemerkt) ----------
  let filter = { typ: Object.keys(TYPEN), mahl: Object.keys(MAHL) };
  try {
    const alt = JSON.parse(localStorage.getItem(FILTERKEY) || "{}");
    Object.assign(filter, alt);
    delete filter.zeigen; // früherer Wann-Filter, gibt es nicht mehr
    // Sorten, die es beim letzten Besuch noch nicht gab, sind an.
    const bekannt = alt.bekannt || ["staette", "museum", "sonst", "lokal"];
    filter.typ = filter.typ.concat(Object.keys(TYPEN).filter((k) => !bekannt.includes(k) && !filter.typ.includes(k)));
  } catch (e) {}
  const merken = () => { try { localStorage.setItem(FILTERKEY, JSON.stringify(Object.assign({}, filter, { bekannt: Object.keys(TYPEN) }))); } catch (e) {} };

  // ---------- Was liegt wo, was ist eingeplant? ----------
  const BAUSTEINE_AM_ORT = {};
  for (const b of window.PLAN_BAUSTEINE) (b.ort || []).forEach((o) => (BAUSTEINE_AM_ORT[o] = BAUSTEINE_AM_ORT[o] || []).push(b));

  function status(id) {
    const slot = Z.slotOf(state, id);
    return { slot, an: slot !== "pool" && !state.off[id], s: Z.SLOT_BY_ID[slot] };
  }
  const slotName = (s) => `${s.tag.kurz} · ${s.label}`;
  // Eingeplante Bausteine eines Ortes, in der Reihenfolge der Tage.
  function eingeplant(ortId) {
    const reihe = Z.SLOTS.map((s) => s.id);
    return (BAUSTEINE_AM_ORT[ortId] || []).map((b) => Object.assign({ b }, status(b.id))).filter((x) => x.an)
      .sort((a, c) => reihe.indexOf(a.slot) - reihe.indexOf(c.slot));
  }
  function sichtbar(ortId) {
    const o = ORTE[ortId];
    if (!filter.typ.includes(o.typ)) return false;
    if (o.typ === "lokal" && !(o.mahl || []).some((m) => filter.mahl.includes(m))) return false;
    return true;
  }

  // ---------- Karte ----------
  const map = L.map("karte", { zoomControl: true, tap: true }).setView(LUXOR, 13);
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19, attribution: "Luftbild © Esri, Maxar, Earthstar Geographics",
  });
  L.control.layers({ "Karte": osm, "Luftbild": sat }, null, { position: "topright" }).addTo(map);
  L.control.scale({ imperial: false }).addTo(map);

  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function icon(ortId) {
    const o = ORTE[ortId], t = TYPEN[o.typ];
    const plan = eingeplant(ortId);
    const tage = [...new Set(plan.map((x) => x.s.tag.kurz.slice(0, 2)))];
    const tag = tage.length ? `<span class="pin-tag">${tage.join(" · ")}</span>` : "";
    const name = `<span class="pin-name">${esc(o.name)}</span>`;
    // im-plan: steht im Plan · aus: hat Karten, aber weggehakt oder im Pool · info: Ort aus Lektionen, ohne Karte im Plan
    const art = plan.length ? " im-plan" : BAUSTEINE_AM_ORT[ortId] ? " aus" : " info";
    if (o.typ === "lokal") {
      // Lokale zeigen, wofür sie taugen: ☕ 🥗 🌙 🍺. Ist ein Mahlzeit-Filter an, verblassen die anderen.
      const teil = filter.mahl.length < Object.keys(MAHL).length;
      const ms = Object.keys(MAHL).filter((m) => (o.mahl || []).includes(m));
      const w = 12 + ms.length * 21;
      const html = `<span class="pin-pille" style="--farbe:${t.farbe}">` +
        ms.map((m) => `<i class="${teil && !filter.mahl.includes(m) ? "blass" : ""}" title="${MAHL[m].name}">${MAHL[m].icon}</i>`).join("") + `</span>` + tag + name;
      return L.divIcon({ className: "pin lokal" + art, html, iconSize: [w, 30], iconAnchor: [w / 2, 15], popupAnchor: [0, -14] });
    }
    const html = `<span class="pin-kreis" style="--farbe:${t.farbe}">${o.icon || t.icon}</span>` + tag + name;
    return L.divIcon({ className: "pin" + art, html, iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -16] });
  }
  // Namen an den Pins erst, wenn genug Platz ist.
  const namenZeigen = () => map.getContainer().classList.toggle("mit-namen", map.getZoom() >= 16);
  map.on("zoomend", namenZeigen);

  const PINS = {}, LINIEN = {};
  const popupHoehe = () => Math.max(200, map.getSize().y - 90);
  for (const [id, o] of Object.entries(ORTE)) {
    const m = L.marker(o.geo, { title: o.name, keyboard: true, riseOnHover: true });
    m.bindPopup(() => popup(id), { maxWidth: 320, minWidth: 240, maxHeight: popupHoehe(), autoPanPadding: [16, 16] });
    PINS[id] = m;
    if (o.linie) LINIEN[id] = L.polyline(o.linie, { color: TYPEN[o.typ].farbe, weight: 6, opacity: 0.7, dashArray: "2 10", lineCap: "round" })
      .on("click", () => m.openPopup());
  }
  // Ein offenes Popup verdecken die Knöpfe oben nicht: Sie machen solange Platz.
  map.on("popupopen", () => map.getContainer().classList.add("popup-offen"));
  map.on("popupclose", () => map.getContainer().classList.remove("popup-offen"));
  // Popups nie höher als die Karte, auch nach Drehen des Geräts oder im Vollbild.
  map.on("resize", () => Object.values(PINS).forEach((m) => { m.getPopup().options.maxHeight = popupHoehe(); }));

  function zeichnen() {
    for (const [id, m] of Object.entries(PINS)) {
      m.setIcon(icon(id));
      const soll = sichtbar(id);
      if (soll && !map.hasLayer(m)) m.addTo(map);
      if (!soll && map.hasLayer(m)) m.remove();
      const linie = LINIEN[id];
      if (linie && soll !== map.hasLayer(linie)) soll ? linie.addTo(map) : linie.remove();
      m.setZIndexOffset(eingeplant(id).length ? 500 : 0);
      if (m.isPopupOpen()) m.setPopupContent(popup(id));
    }
    filterKnoepfe();
    ohnePin();
  }

  // ---------- Popup eines Ortes: alle Bausteine dort, mit Einplanen und Weghaken ----------
  function popup(ortId) {
    const o = ORTE[ortId], t = TYPEN[o.typ];
    const alle = BAUSTEINE_AM_ORT[ortId] || [];
    const originale = alle.filter((b) => !b.zweit || !alle.some((x) => x.id === b.zweit));
    const box = el("div", { class: "pop" },
      el("p", { class: "pop-art" }, `${t.icon} ${t.name}` + (o.mahl ? " · " + o.mahl.map((m) => MAHL[m].icon + " " + MAHL[m].name).join(", ") : "")),
      el("h3", {}, o.name),
      o.ungefaehr ? el("p", { class: "pop-hinweis" }, "⚠ Lage ungefähr. " + o.ungefaehr) : null,
      o.txt ? el("p", { class: "pop-txt" }, o.txt) : null);

    for (const b of originale) {
      const varianten = [b].concat(alle.filter((x) => x.zweit === b.id));
      const eintrag = el("div", { class: "pop-baustein" });
      if (originale.length > 1 || T(b.t) !== o.name) eintrag.append(el("p", { class: "pop-titel" }, T(b.t)));
      if (b.zeit || b.preis != null) eintrag.append(el("p", { class: "pop-meta" },
        [b.zeit ? "🕑 " + T(b.zeit) : null, b.preis === 0 ? "frei" : b.preis ? `${b.preis.toLocaleString("de-DE")} £E p. P.` : null].filter(Boolean).join(" · ")));
      eintrag.append(el("p", { class: "pop-txt" }, T(b.txt)));
      for (const v of varianten) eintrag.append(planZeile(v, ortId));
      box.append(eintrag);
    }
    box.append(el("p", { class: "pop-links" },
      el("a", { href: gmSuche(o.q), target: "_blank", rel: "noopener" }, "📍 In Google Maps"),
      el("a", { href: gmRoute(o.geo), target: "_blank", rel: "noopener" }, "🧭 Route"),
      originale.length ? el("a", { href: "reiseplan.html#karte=" + encodeURIComponent(originale[0].id) }, "🗂 Im Reiseplan") : null,
      (o.lesen || []).map(([label, url]) => el("a", { href: url }, label))));
    return box;
  }

  function planZeile(b, ortId) {
    const st = status(b.id);
    const wo = st.slot === "pool" ? "Ideenpool" : slotName(st.s);
    const text = st.an ? `✓ Im Plan: ${wo}` : state.off[b.id] && st.slot !== "pool" ? `Weggehakt: ${wo}` : st.slot === "pool" ? "Im Ideenpool" : wo;
    const knopf = st.slot === "pool" ? null : el("button", { type: "button", class: "pop-knopf",
      onclick: () => { if (state.off[b.id]) delete state.off[b.id]; else state.off[b.id] = 1; aendern(ortId, state.off[b.id] ? `„${T(b.t)}“ weggehakt.` : `„${T(b.t)}“ wieder im Plan.`); } },
      state.off[b.id] ? "↺ wieder rein" : "✓ weghaken");
    const ziel = el("select", { class: "pop-ziel", "aria-label": `${T(b.t)} einplanen in`,
      onchange: (e) => { if (!e.target.value) return; Z.move(state, b.id, e.target.value); aendern(ortId, `„${T(b.t)}“ → ${e.target.value === "pool" ? "Ideenpool" : slotName(Z.SLOT_BY_ID[e.target.value])}.`); } },
      el("option", { value: "" }, st.an ? "Verschieben nach …" : "Einplanen in …"),
      Z.TAGE.map((t) => el("optgroup", { label: t.kurz }, t.slots.map(([s, label]) => {
        const sid = `${t.id}-${s}`;
        return el("option", { value: sid, disabled: sid === st.slot && st.an }, `${t.kurz} · ${label}`);
      }))),
      el("option", { value: "pool", disabled: st.slot === "pool" }, "Zurück in den Ideenpool"));
    return el("div", { class: "pop-plan" + (st.an ? " an" : "") }, el("span", {}, text), el("span", { class: "pop-aktion" }, knopf, ziel));
  }

  function aendern(ortId, text) {
    Z.save(state);
    zeichnen();
    const m = PINS[ortId];
    if (m && map.hasLayer(m)) { if (!m.isPopupOpen()) m.openPopup(); }
    meldung(text + " Steht so auch im Reiseplan.");
  }

  function meldung(text) {
    const m = document.getElementById("karte-meldung");
    m.textContent = text;
    clearTimeout(meldung.t);
    meldung.t = setTimeout(() => (m.textContent = ""), 6000);
  }

  // ---------- Filter ----------
  // Regel für alle Knöpfe: Ist alles an, zeigt ein Tipp nur diese Sorte. Danach schaltet jeder Tipp
  // eine Sorte dazu oder weg. Eine Mahlzeit schaltet die Restaurants mit ein. „Alle“ zeigt wieder alles.
  const ALLE_TYPEN = Object.keys(TYPEN), ALLE_MAHL = Object.keys(MAHL);
  const nichtLokal = ALLE_TYPEN.filter((k) => k !== "lokal");
  const allesAn = () => filter.typ.length === ALLE_TYPEN.length && filter.mahl.length === ALLE_MAHL.length;
  const lokalAn = () => filter.typ.includes("lokal");
  const umschalten = (liste, k) => (liste.includes(k) ? liste.filter((x) => x !== k) : liste.concat(k));
  function zuruecksetzen() { filter.typ = ALLE_TYPEN.slice(); filter.mahl = ALLE_MAHL.slice(); }

  function tippTyp(k) {
    if (allesAn()) filter.typ = [k];
    else filter.typ = umschalten(filter.typ, k);
    if (k === "lokal" && lokalAn()) filter.mahl = ALLE_MAHL.slice();
    if (!filter.typ.length) zuruecksetzen();
    nachFilter();
  }
  function tippMahl(m) {
    if (allesAn()) { filter.typ = ["lokal"]; filter.mahl = [m]; }
    else if (!lokalAn()) { filter.typ = filter.typ.concat("lokal"); filter.mahl = [m]; }
    else if (filter.mahl.length === ALLE_MAHL.length) filter.mahl = [m];
    else {
      filter.mahl = umschalten(filter.mahl, m);
      if (!filter.mahl.length) { filter.typ = filter.typ.filter((x) => x !== "lokal"); filter.mahl = ALLE_MAHL.slice(); }
    }
    if (!filter.typ.length) zuruecksetzen();
    nachFilter();
  }
  function nachFilter() { merken(); zeichnen(); allesZeigen(); }

  // Wie viele Orte brächte ein Knopf?
  const zahl = (pruef) => Object.keys(PINS).filter((id) => pruef(ORTE[id])).length;

  // kurz: Beschriftung für schmale Bildschirme, damit eine Zeile reicht.
  const chip = (attrs, icon, text, zahlId, kurz) => el("button", Object.assign({ type: "button", class: "chipknopf", title: text }, attrs),
    icon ? el("span", { class: "chip-icon", "aria-hidden": "true" }, icon) : null,
    el("span", { class: kurz ? "lang" : null }, text), kurz ? el("span", { class: "kurz", "aria-hidden": "true" }, kurz) : null,
    zahlId ? el("span", { class: "zahl", "data-zahl": zahlId }) : null);
  const KURZ = { staette: "Tempel", wege: "Wege", lokal: "Essen", fruehstueck: "Früh" };

  function filterAufbauen() {
    const was = document.getElementById("karte-was");
    was.append(chip({ "data-alle": "", onclick: () => { zuruecksetzen(); nachFilter(); } }, null, "Alle", "alle"));
    for (const k of nichtLokal) was.append(chip({ "data-typ": k, style: `--farbe:${TYPEN[k].farbe}`, onclick: () => tippTyp(k) }, TYPEN[k].icon, TYPEN[k].name, k, KURZ[k]));
    const essen = el("div", { class: "gruppe", role: "group", "aria-label": "Restaurants", style: `--farbe:${TYPEN.lokal.farbe}` },
      chip({ "data-typ": "lokal", class: "chipknopf kopf", onclick: () => tippTyp("lokal") }, TYPEN.lokal.icon, TYPEN.lokal.name, "lokal", KURZ.lokal),
      Object.entries(MAHL).map(([k, m]) => chip({ "data-mahl": k, onclick: () => tippMahl(k) }, m.icon, m.name, "m-" + k, KURZ[k])));
    document.getElementById("karte-essen").append(essen);
  }
  function filterKnoepfe() {
    const alle = allesAn();
    document.querySelectorAll("[data-alle]").forEach((b) => b.setAttribute("aria-pressed", String(alle)));
    document.querySelectorAll("[data-typ]").forEach((b) => b.setAttribute("aria-pressed", String(!alle && filter.typ.includes(b.dataset.typ))));
    document.querySelectorAll("[data-mahl]").forEach((b) => b.setAttribute("aria-pressed", String(!alle && lokalAn() && filter.mahl.length < ALLE_MAHL.length && filter.mahl.includes(b.dataset.mahl))));
    // „aus“: Die Sorte ist gerade ausgeblendet, weil etwas anderes gewählt ist.
    document.querySelectorAll("[data-typ]").forEach((b) => b.toggleAttribute("data-aus", !alle && !filter.typ.includes(b.dataset.typ)));
    document.querySelectorAll("[data-mahl]").forEach((b) => b.toggleAttribute("data-aus", !alle && (!lokalAn() || !filter.mahl.includes(b.dataset.mahl))));
    // Bei „Alle“ sind die Sortenknöpfe nicht gedrückt, aber auch nicht aus: Sie sind Angebote.
    document.getElementById("karte-was").closest(".kartenbereich").classList.toggle("alles-an", alle);
    const setz = (id, n) => document.querySelectorAll(`[data-zahl="${id}"]`).forEach((z) => (z.textContent = n));
    setz("alle", zahl(() => true));
    for (const k of ALLE_TYPEN) setz(k, zahl((o) => o.typ === k));
    for (const m of ALLE_MAHL) setz("m-" + m, zahl((o) => o.typ === "lokal" && (o.mahl || []).includes(m)));
    const n = Object.keys(PINS).filter(sichtbar).length;
    const zeile = document.getElementById("karte-anzahl");
    zeile.textContent = `${n} ${n === 1 ? "Ort" : "Orte"} auf der Karte`;
    if (!alle) zeile.append(" · ", el("button", { type: "button", class: "zuruecksetzen",
      onclick: () => { zuruecksetzen(); nachFilter(); } }, "Filter zurücksetzen"));
  }
  function allesZeigen(animiert = true) {
    const sicht = Object.entries(PINS).filter(([id]) => sichtbar(id)).map(([, m]) => m.getLatLng());
    if (sicht.length) map.fitBounds(L.latLngBounds(sicht), { padding: [36, 36], maxZoom: 16, animate: animiert });
  }

  // ---------- Bausteine ohne Pin ----------
  function ohnePin() {
    const ul = document.getElementById("ohne-pin");
    if (!ul) return;
    ul.innerHTML = "";
    for (const [id, warum] of Object.entries(OHNE_PIN)) {
      const b = BY_ID[id];
      if (!b || b.ort) continue;
      const st = status(id);
      ul.append(el("li", {}, el("a", { href: "reiseplan.html#karte=" + encodeURIComponent(id) }, T(b.t)),
        ` · ${st.an ? "im Plan: " + slotName(st.s) : st.slot === "pool" ? "Ideenpool" : "weggehakt"} · ${warum}`,
        b.map ? [" ", el("a", { href: b.map, target: "_blank", rel: "noopener" }, "In Google Maps suchen")] : null));
    }
  }

  // ---------- Eigener Standort ----------
  let watch = null, ich = null, genau = null, ersterFix = true;
  const knopf = document.getElementById("karte-ich");
  function standort(auto) {
    if (!("geolocation" in navigator)) { meldung("Dieses Gerät gibt keinen Standort heraus."); return; }
    if (watch != null) { // zweites Tippen: auf den Standort zentrieren
      if (ich) map.setView(ich.getLatLng(), Math.max(map.getZoom(), 16));
      return;
    }
    knopf.setAttribute("aria-pressed", "true");
    if (auto !== true) meldung("Standort wird gesucht …");
    watch = navigator.geolocation.watchPosition((pos) => {
      const ll = [pos.coords.latitude, pos.coords.longitude];
      if (!ich) {
        genau = L.circle(ll, { radius: pos.coords.accuracy, color: "#1a73e8", weight: 1, fillOpacity: 0.12, interactive: false }).addTo(map);
        ich = L.circleMarker(ll, { radius: 8, color: "#fff", weight: 3, fillColor: "#1a73e8", fillOpacity: 1 }).addTo(map).bindTooltip("Ihr seid hier");
      } else { ich.setLatLng(ll); genau.setLatLng(ll).setRadius(pos.coords.accuracy); }
      if (ersterFix) {
        ersterFix = false;
        const km = map.distance(ll, LUXOR) / 1000;
        // Beim Öffnen in Luxor gleich dorthin, wo ihr seid; nicht, wenn ein Link einen bestimmten Ort zeigt.
        if (auto === true && (vonLink || km >= 40)) return;
        if (km < 40) { map.setView(ll, Math.max(map.getZoom(), 15)); meldung("Der blaue Punkt seid ihr. Er wandert mit."); }
        else meldung(`Euer Standort ist ${Math.round(km).toLocaleString("de-DE")} km von Luxor entfernt. Der blaue Punkt erscheint, sobald ihr in die Gegend schaut.`);
      }
    }, (err) => {
      navigator.geolocation.clearWatch(watch); watch = null;
      knopf.setAttribute("aria-pressed", "false");
      meldung(err.code === 1 ? "Standort nicht erlaubt. Auf dem iPad: Einstellungen → Datenschutz → Ortungsdienste → Safari-Websites → „Beim Verwenden“." : "Standort gerade nicht verfügbar.");
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 30000 });
  }
  knopf.addEventListener("click", () => standort(false));
  // Der Knopf sitzt auf der Karte, unten rechts, wo der Daumen ist.
  const Ich = L.Control.extend({ options: { position: "bottomright" }, onAdd: () => { const d = L.DomUtil.create("div", "leaflet-bar ich-steuer"); d.append(knopf); L.DomEvent.disableClickPropagation(d); return d; } });
  new Ich().addTo(map);
  // Hat das Gerät den Standort schon einmal erlaubt, gleich anzeigen.
  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions.query({ name: "geolocation" }).then((p) => { if (p.state === "granted") standort(true); }).catch(() => {});
  }

  // ---------- Export für Google My Maps ----------
  function kml() {
    const x = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const ordner = Object.entries(TYPEN).map(([k, t]) => {
      const orte = Object.keys(PINS).filter((id) => ORTE[id].typ === k && sichtbar(id));
      if (!orte.length) return "";
      return `<Folder><name>${x(t.name)}</name>` + orte.map((id) => {
        const o = ORTE[id];
        const plan = eingeplant(id).map((p) => `${slotName(p.s)}: ${T(p.b.t)}`);
        const b = (BAUSTEINE_AM_ORT[id] || [])[0];
        const text = [b ? (plan.length ? "Im Plan: " + plan.join("; ") : "Nicht im Plan") : "", o.txt || "", b ? T(b.txt) : "", o.ungefaehr ? "Lage ungefähr." : ""].filter(Boolean).join("\n");
        return `<Placemark><name>${x(o.name)}</name><description>${x(text)}</description><Point><coordinates>${o.geo[1]},${o.geo[0]},0</coordinates></Point></Placemark>`;
      }).join("") + "</Folder>";
    }).join("");
    const datei = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Reiseplan Luxor</name>${ordner}</Document></kml>`;
    const a = el("a", { href: URL.createObjectURL(new Blob([datei], { type: "application/vnd.google-earth.kml+xml" })), download: "reiseplan-luxor.kml" });
    document.body.append(a); a.click(); a.remove();
    meldung("KML-Datei gespeichert. In Google My Maps: Neue Karte → Importieren → Datei wählen.");
  }
  document.getElementById("karte-kml").addEventListener("click", kml);

  // ---------- Vollbild ----------
  // Die Karte füllt den ganzen Bildschirm, Filter liegen oben darüber. Standard in der App vom
  // Home-Bildschirm und auf kleinen Touch-Geräten; die letzte Wahl merkt sich das Gerät.
  const VOLLKEY = "karte-luxor-vollbild";
  const html = document.documentElement;
  const vollKnopf = el("a", { href: "#", role: "button", class: "voll-knopf", title: "Vollbild", "aria-label": "Vollbild" });
  function vollbild(an, merkenAuch) {
    html.classList.toggle("vollbild", an);
    vollKnopf.textContent = an ? "✕" : "⛶";
    vollKnopf.title = an ? "Vollbild verlassen" : "Vollbild";
    vollKnopf.setAttribute("aria-label", vollKnopf.title);
    if (merkenAuch) try { localStorage.setItem(VOLLKEY, an ? "1" : "0"); } catch (e) {}
    // Wo der Browser es kann (MacBook, iPad), auch seine Leisten ausblenden; nicht in der App, die ist schon randlos.
    const app = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    if (merkenAuch && !app) {
      const fs = document.fullscreenElement || document.webkitFullscreenElement;
      try {
        if (an && !fs) (html.requestFullscreen || html.webkitRequestFullscreen || (() => {})).call(html);
        if (!an && fs) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } catch (e) {}
    }
    setTimeout(() => map.invalidateSize(), 60);
  }
  vollKnopf.addEventListener("click", (e) => { e.preventDefault(); vollbild(!html.classList.contains("vollbild"), true); });
  const Voll = L.Control.extend({ options: { position: "topleft" }, onAdd: () => { const d = L.DomUtil.create("div", "leaflet-bar"); d.append(vollKnopf); L.DomEvent.disableClickPropagation(d); return d; } });
  new Voll().addTo(map);
  window.addEventListener("resize", () => map.invalidateSize());
  let vollStart = null;
  try { vollStart = localStorage.getItem(VOLLKEY); } catch (e) {}
  const klein = matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 700;
  const app = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  vollbild(vollStart != null ? vollStart === "1" : (app || klein), false);

  // ---------- Start ----------
  filterAufbauen();
  zeichnen();
  // Vom Planer kommend (#ort=<id>): Ort zeigen, auch wenn ein Filter ihn gerade versteckt.
  function zuOrt() {
    const ziel = location.hash.match(/ort=([^&]+)/);
    const id = ziel && decodeURIComponent(ziel[1]);
    if (!id || !PINS[id]) return false;
    const o = ORTE[id];
    if (!filter.typ.includes(o.typ)) filter.typ.push(o.typ);
    if (o.mahl && !o.mahl.some((m) => filter.mahl.includes(m))) filter.mahl = filter.mahl.concat(o.mahl);
    zeichnen();
    map.setView(o.geo, 16);
    PINS[id].openPopup();
    history.replaceState(null, "", location.pathname);
    return true;
  }
  vonLink = zuOrt();
  if (!vonLink) allesZeigen(false); // ohne Animation, sonst überschreibt sie den Sprung zum Standort
  window.addEventListener("hashchange", zuOrt);
  const Alle = L.Control.extend({ options: { position: "topleft" }, onAdd: () => {
    const d = L.DomUtil.create("div", "leaflet-bar");
    const a = el("a", { href: "#", role: "button", class: "voll-knopf", title: "Alle Pins zeigen", "aria-label": "Alle Pins zeigen",
      onclick: (e) => { e.preventDefault(); allesZeigen(); } }, "⤢");
    d.append(a); L.DomEvent.disableClickPropagation(d); return d;
  } });
  new Alle().addTo(map);
  namenZeigen();

  Z.beobachten((st) => { state = st; zeichnen(); });
})();
