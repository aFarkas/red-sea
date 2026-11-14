// Unser fester Plan für Luxor. Claude trägt ihn hier ein, sobald ihr das „Ergebnis für Claude“
// aus reference/reiseplan.html in den Chat kopiert habt oder schreibt, was feststeht. Dann steht er
// auf jedem Gerät bereit und dient als Grundlage für die Lektionen zu den Tagen in Luxor.
// Format: { stand: "JJJJ-MM-TT", info: "…", notiz: "…", todo: [ids], plan: { "<tag>-<slot>": [ids, "-id" = weggehakt] } }
// Stand 13.11.: Die Vormittage mit Guide stehen fest (So 7–11 Uhr Westufer, Mo ab 7 Uhr Karnak).
// Stand 14.11.: Hatschepsut gestrichen (Empfehlung an euch), Medinet Habu am Sonntagnachmittag allein mit Lektion 15.
// Die Nachmittage sind mein Vorschlag, deshalb ist der Plan hier derselbe wie „Mein Vorschlag“.
(function () {
  const plan = Object.assign({}, window.PLAN_VORSCHLAEGE.mein);
  delete plan.name;
  window.PLAN_FEST = {
    stand: "2026-11-14",
    info: "Fest sind eure Guides: Sonntag 7 bis 11 Uhr Tal der Könige, Montag ab 7 Uhr zwei bis drei Stunden Karnak. Hatschepsut ist gestrichen, dafür habt ihr mehr Zeit im Tal. Die Nachmittage sind mein Vorschlag: Sonntag Medinet Habu allein mit Lektion 15, dann Memnon, Pause, Feluke; Montag schlendern mit Luxor-Museum, Kaffee, Souk, Sofra, Pause und abends der Tempel von Luxor.",
    notiz: "14.11.: Hatschepsut gestrichen, Medinet Habu in Ruhe. Dem Guide Bescheid sagen.",
    los: 7,
    todo: ["guide", "karnak-guide"],
    plan,
  };
})();
