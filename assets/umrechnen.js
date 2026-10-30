// Umrechenkarten Pfund ↔ Euro aus window.UMRECHNEN (assets/cards.js). Die Beträge werden für jede Runde
// neu gezogen; die id bleibt je Bereich gleich. Die Wiederholungsseite übt damit in eigenen Runden.
// Eine Lektion setzt mit <div data-umrechnen></div> eine Karte in ihren „Weißt du noch?“-Kasten; mit
// einer id als Wert, etwa data-umrechnen="umrechnen-schild", genau diese.
(function () {
  const P = window.UMRECHNEN;
  const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
  const zahl = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const kurs = () => `Mit dem Kurs vom ${P.stand}, 1 Euro = ${zahl(P.kurs)} Pfund,`;

  function draw(def) {
    const steps = Math.round((def.bis - def.von) / def.schritt);
    return def.von + def.schritt * Math.floor(Math.random() * (steps + 1));
  }

  function inEuro(def) {
    const pfund = draw(def);
    const betrag = zahl(pfund);
    const ungefaehr = zahl(pfund / P.faustregel);
    const genau = zahl(Math.round((pfund / P.kurs) * 100) / 100);
    const arabisch = String(pfund).replace(/\d/g, (d) => ARABIC_DIGITS[d]);
    const schild = def.ziffern === "arabisch";
    return {
      titel: `${betrag} Pfund ≈ ${ungefaehr} Euro`,
      frage: schild
        ? `Auf dem Preisschild steht <span lang="ar" class="price">${arabisch}</span>. Wie viel Euro ist das ungefähr?`
        : `Wie viel Euro sind ${betrag} Pfund ungefähr?`,
      antwort: (schild ? `<p><span lang="ar">${arabisch}</span> heißt ${betrag}.</p>` : "")
        + `<p class="word">${betrag} Pfund ≈ ${ungefaehr} Euro</p>`
        + `<p>${betrag} ÷ 6 = ${zahl(pfund / 6)}, dann das Komma eine Stelle nach links: ${ungefaehr}.</p>`
        + `<p class="aside">${kurs()} sind es ${genau} Euro. Die Faustregel rechnet also ein bisschen teurer, als es ist.</p>`,
    };
  }

  function inPfund(def) {
    const euro = draw(def);
    const betrag = zahl(euro);
    const ungefaehr = zahl(euro * P.faustregel);
    return {
      titel: `${betrag} Euro ≈ ${ungefaehr} Pfund`,
      frage: `Wie viel Pfund sind ${betrag} Euro ungefähr?`,
      antwort: `<p class="word">${betrag} Euro ≈ ${ungefaehr} Pfund</p>`
        + `<p>${betrag} × 6 = ${zahl(euro * 6)}, dann eine Null dran: ${ungefaehr}.</p>`
        + `<p class="aside">${kurs()} sind es ${zahl(Math.round(euro * P.kurs))} Pfund.</p>`,
    };
  }

  function card(def) {
    return { id: def.id, lektion: P.lektion, art: "Umrechnen", ...(def.richtung === "euro" ? inPfund(def) : inEuro(def)) };
  }

  function queue(n) {
    return [...P.karten].sort(() => Math.random() - 0.5).slice(0, n).map(card);
  }

  window.Umrechnen = { card, queue };

  for (const slot of document.querySelectorAll("[data-umrechnen]")) {
    const def = P.karten.find((k) => k.id === slot.dataset.umrechnen);
    const c = def ? card(def) : queue(1)[0];
    slot.innerHTML = `<p class="q">${c.frage}</p><details class="reveal"><summary>Aufdecken</summary>${c.antwort}</details>`;
  }
})();
