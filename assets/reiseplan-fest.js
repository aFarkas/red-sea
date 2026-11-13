// Unser fester Plan für Luxor. Claude trägt ihn hier ein, sobald ihr das „Ergebnis für Claude“
// aus reference/reiseplan.html in den Chat kopiert habt oder schreibt, was feststeht. Dann steht er
// auf jedem Gerät bereit und dient als Grundlage für die Lektionen zu den Tagen in Luxor.
// Format: { stand: "JJJJ-MM-TT", info: "…", notiz: "…", todo: [ids], plan: { "<tag>-<slot>": [ids, "-id" = weggehakt] } }
// Stand 13.11.: Die Vormittage mit Guide stehen fest (So 7–11 Uhr Westufer, Mo ab 7 Uhr Karnak).
// Die Nachmittage sind mein Vorschlag, deshalb ist der Plan hier derselbe wie „Mein Vorschlag“.
(function () {
  const plan = Object.assign({}, window.PLAN_VORSCHLAEGE.mein);
  delete plan.name;
  window.PLAN_FEST = {
    stand: "2026-11-13",
    info: "Fest sind eure Guides: Sonntag 7 bis 11 Uhr Tal der Könige und Hatschepsut, Montag ab 7 Uhr zwei bis drei Stunden Karnak. Die Nachmittage sind mein Vorschlag: Sonntag Medinet Habu und Memnon auf eigene Faust, Pause, Feluke; Montag schlendern mit Luxor-Museum, Kaffee, Souk, Sofra, Pause und abends der Tempel von Luxor.",
    notiz: "",
    los: 7,
    todo: ["guide", "karnak-guide"],
    plan,
  };
})();
