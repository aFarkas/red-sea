// Bausteine für den Reiseplan Luxor (reference/reiseplan.html).
// Jeder Baustein ist eine Option, die man in einen Tag ziehen, weghaken oder wieder einblenden kann.
// preis: Eintritt pro Person in Pfund (nur Eintritte, damit die Summe stimmt), sonst null.
// Quellen stehen als Link im Text; die Liste aller Quellen steht unten auf der Seite.
(function () {
  const gm = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const EGY = "https://egymonuments.com/details/";

  window.PLAN_ARTEN = {
    west: { name: "Westufer: Stätten", icon: "⚱️" },
    ost: { name: "Ostufer: Tempel, Stadt, Museen", icon: "🏛️" },
    nil: { name: "Auf dem Nil und unterwegs", icon: "⛵" },
    essen: { name: "Essen", icon: "🍽" },
    trinken: { name: "Trinken und Sonnenuntergang", icon: "🌅" },
    orga: { name: "Organisieren und Pausen", icon: "🧭" },
  };

  window.PLAN_TAGE = [
    { id: "d14", name: "Samstag, 14. November", kurz: "Sa 14.11.", motto: "Ankommen am Westufer", sonne: "Untergang ca. 17:00",
      slots: [["nachmittag", "Ab 15 Uhr"], ["abend", "Abend"]] },
    { id: "d15", name: "Sonntag, 15. November", kurz: "So 15.11.", motto: "Westufer: Gräber und Totentempel", sonne: "Aufgang ca. 6:05 · Untergang ca. 17:00",
      slots: [["frueh", "Früh"], ["vormittag", "Vormittag"], ["mittag", "Mittag"], ["nachmittag", "Nachmittag"], ["abend", "Abend"]] },
    { id: "d16", name: "Montag, 16. November", kurz: "Mo 16.11.", motto: "Ostufer: Tempel und Stadt", sonne: "Aufgang ca. 6:05 · Untergang ca. 17:00",
      slots: [["frueh", "Früh"], ["mittag", "Mittag"], ["nachmittag", "Nachmittag"], ["abend", "Abend"]] },
    { id: "d17", name: "Dienstag, 17. November", kurz: "Di 17.11.", motto: "Gemütlich los nach Hurghada",
      slots: [["morgen", "Morgen"], ["abreise", "Abreise"]] },
  ];

  window.PLAN_BAUSTEINE = [
    // ---------- Westufer ----------
    { id: "tdk", freund: 1, art: "west", t: "Tal der Könige", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "2–3 h", preis: 750, guide: "Guide lohnt",
      txt: "{talAnkunft}. Ausflugsbusse kommen nach Reiseberichten ab etwa 8 Uhr, gegen 10 sind die Gräber voll. Also zuerst ins Tal, dann den Rest. Das Grundticket öffnet einige der über 60 Gräber, welche, sagt die Kasse.",
      more: `Die Zusatzgräber sind eigene Bausteine (Ramses V./VI., Tutanchamun, Sethos I.), zieht dazu, was ihr wollt. Hinter der Geschichte: <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>. Zeiten und Preis: <a href="${EGY}ValleyOfKings">offizielle Seite</a>. Busse ab etwa 8 Uhr: <a href="https://www.responsibletravel.com/holidays/egypt/travel-guide/how-to-avoid-the-crowds">Responsible Travel</a>; voll gegen 10 Uhr: <a href="https://www.findingouradventure.com/travel-diaries/valleyofthekings">Reisebericht</a>.`,
      map: gm("Valley of the Kings, Luxor") },
    { id: "kv9", freund: 1, art: "west", t: "+ Grab Ramses’ V./VI. (KV9)", zeit: "im Tal der Könige", dauer: "30 min", preis: 220, guide: "gut allein",
      txt: "Das Grab mit den Graffiti antiker Touristen: „Ich kann diese Schrift nicht lesen!“ Schaut knapp unter die Decke.",
      more: `Zusatzticket, Preis nach der <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste des Ministeriums</a>. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.` },
    { id: "tut", freund: 1, art: "west", t: "+ Grab des Tutanchamun (KV62)", zeit: "im Tal der Könige", dauer: "20 min", preis: 700, guide: "gut allein",
      txt: "Klein, aber der König liegt noch darin. Lohnt vor allem, wenn euch gerade dieses Grab wichtig ist.",
      more: `Zusatzticket, <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "sethos", freund: 1, art: "west", t: "+ Grab Sethos’ I. (KV17)", zeit: "im Tal der Könige", dauer: "45 min", preis: 2000, guide: "gut allein",
      txt: "Eines der längsten und am reichsten bemalten Gräber im Tal. Teuerstes Zusatzticket.",
      more: `2000 Pfund pro Person, <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "hatschepsut", freund: 1, art: "west", t: "Tempel der Hatschepsut (Deir el-Bahari)", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1–1,5 h", preis: 440, guide: "Guide lohnt",
      txt: "Terrassen vor der Felswand. Auf der mittleren Terrasse links die Expedition ins Land Punt, mit Fischen aus dem Roten Meer.",
      more: `<a href="${EGY}HatshepsutTemple">Offizielle Seite</a>. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.`,
      map: gm("Temple of Hatshepsut, Luxor") },
    { id: "deir", anders: "Nicht im Plan eures Freundes. Ich nehme es dazu, weil es in eurer Mission steht und zwischen Hatschepsut und Medinet Habu liegt, also kaum Umweg kostet. Dadurch steigt der Eintritt um 220 Pfund pro Person.", art: "west", t: "Deir el-Medina, Dorf der Grabbauer", zeit: "ab 6:00", dauer: "1 h", preis: 220, guide: "Guide lohnt",
      txt: "Hier wohnten die Handwerker der Königsgräber, die unter Ramses III. streikten. Steht in eurer Mission, fehlt aber in vielen Touren: beim Guide ausdrücklich dazubestellen.",
      more: `Grab des Paschedu extra (120 Pfund). Liegt zwischen Medinet Habu und Hatschepsut, kostet also kaum Umweg. Preise: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.`,
      map: gm("Deir el-Medina, Luxor") },
    { id: "medinet", freund: 1, art: "west", t: "Medinet Habu", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1,5–2 h", preis: 220, guide: "Guide lohnt",
      txt: "Totentempel Ramses’ III., mit Seevölker-Schlacht auf der Außenwand und Farben, die an Decken und Säulen noch leuchten. Nachmittags oft ruhig.",
      more: `<a href="${EGY}MedinetHabu">Offizielle Seite</a>. Gegenüber liegt das Café Maratonga (siehe Essen).`,
      map: gm("Medinet Habu, Luxor") },
    { id: "memnon", anders: "Euer Freund setzt die Kolosse vor das Mittagessen. Ich lege sie ans Ende, weil sie an der Hauptstraße Richtung Fähre liegen, also auf dem Heimweg. Beides geht, sie brauchen nur eine Viertelstunde.", freund: 1, art: "west", t: "Memnonkolosse", zeit: "jederzeit sichtbar", dauer: "15 min", preis: 0, guide: "gut allein",
      txt: "Zwei sitzende Riesen an der Hauptstraße, frei zugänglich. Sucht am nördlichen die Bruchlinie und die Inschriften auf den Beinen.",
      more: `Die Geschichte vom singenden Koloss und Kaiser Hadrian: <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.`,
      map: gm("Colossi of Memnon, Luxor") },
    { id: "ramesseum", art: "west", t: "Ramesseum", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1 h", preis: 220, guide: "gut allein",
      txt: "Totentempel Ramses’ II. mit dem umgestürzten Riesen. Meist leer, gut zum Selbstentdecken.",
      more: `<a href="${EGY}Ramesseum">Offizielle Seite</a>.`, map: gm("Ramesseum, Luxor") },
    { id: "koeniginnen", freund: 1, art: "west", t: "Tal der Königinnen", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1 h", preis: 220, guide: "Guide lohnt",
      txt: "Viele Standardtouren fahren hierher statt nach Medinet Habu. Das Grab der Nefertari kostet extra 2500 Pfund.",
      more: `<a href="${EGY}ValleyoftheQueens">Offizielle Seite</a>, Nefertari in der <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.`,
      map: gm("Valley of the Queens, Luxor") },
    { id: "carter", art: "west", t: "Carter-Haus mit Nachbau des Tutanchamun-Grabs", zeit: "ab 6:00", dauer: "45 min", preis: 220, guide: "gut allein",
      txt: "Das Haus, in dem Howard Carter wohnte, als er Tutanchamun fand. An der Straße zum Tal der Könige.",
      more: `Preis: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.`, map: gm("Howard Carter House, Luxor") },

    // ---------- Ostufer ----------
    { id: "karnak", freund: 1, art: "ost", t: "Karnak", zeit: "ihr seid ca. {karnak} da (offen ab 6:00)", dauer: "2–3 h", preis: 600, guide: "Guide lohnt",
      txt: "Der riesige Tempel des Amun mit der Großen Säulenhalle. Morgens, solange es kühl und ruhig ist; letzter Einlass wäre 16 Uhr.",
      more: `<a href="${EGY}KarnakTemple">Offizielle Seite</a>. Mit den Tickets von Karnak und Luxor-Tempel dürft ihr auch auf die Sphinx-Allee. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.`,
      map: gm("Karnak Temple, Luxor") },
    { id: "karnak-guide", freund: 1, art: "ost", t: "Guide nur für Karnak, ca. 2 Stunden", zeit: "am Eingang treffen", dauer: "2 h", preis: null, guide: "Guide",
      txt: "Ticket selbst kaufen, einen Ägyptologen nur für Karnak dazunehmen, danach verabschieden. Was ihr dort hört, hilft am Nachmittag im Luxor-Tempel.",
      more: "Vorschlag eures Freundes. Preis vorher fest für zwei vereinbaren, über den Gastgeber oder eine Buchungsseite." },
    { id: "luxortempel", freund: 1, art: "ost", t: "Tempel von Luxor, bis es dunkel ist", zeit: "letzter Einlass 19:00", dauer: "1,5–2 h", preis: 500, guide: "gut allein",
      txt: "Gegen 16 Uhr hinein, im Tageslicht anschauen; die Sonne geht gegen 17 Uhr unter, dann gehen die Lichter an.",
      more: `<a href="${EGY}LuxorTemple">Offizielle Seite</a>: letzter Einlass 19 Uhr, auch im Winter. Moschee Abu el-Haggag oben auf dem Tempel: <a href="../lessons/0011-beten-ist-besser-als-schlafen.html">Lektion 11</a>.`,
      map: gm("Luxor Temple") },
    { id: "souk", freund: 1, art: "ost", t: "Souk und Altstadt", zeit: "Nachmittag oder Abend", dauer: "1–2 h", preis: 0, guide: "gut allein",
      txt: "Der Markt hinter dem Tempel von Luxor, ein Teil überdacht. Vorne am meisten Schlepper, weiter hinten kaufen Einheimische. Gewürze, Tücher, Obst.",
      more: `Wikivoyage beschreibt den alten, teils mit Holzgitter überdachten Markt nahe dem Tempel und warnt vor viel Anwerben in der Hauptgasse (<a href="https://en.wikivoyage.org/wiki/Luxor">Wikivoyage Luxor</a>). Handeln und Gewürze: <a href="../lessons/0012-pfeffer-in-der-wueste.html">Lektion 12</a>, Zahlen: <a href="../lessons/0010-die-null-ist-ein-punkt.html">Lektion 10</a>.`,
      map: gm("Luxor Souq, Luxor") },
    { id: "corniche", freund: 1, art: "ost", t: "Spaziergang auf der Corniche", zeit: "jederzeit", dauer: "30–60 min", preis: 0, guide: "gut allein",
      txt: "Die Uferstraße vom Tempel von Luxor nach Norden, mit Blick hinüber auf eure Seite und die Berge.",
      more: `Lage: <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.`, map: gm("Corniche El Nile, Luxor") },
    { id: "museum", freund: 1, art: "ost", t: "Luxor-Museum", zeit: "9–13 und 17–20 Uhr Einlass", dauer: "1–1,5 h", preis: 400, guide: "gut allein",
      txt: "Kleines, schön beleuchtetes Museum direkt beim Anleger der Fähre. Hat auch abends offen, ein guter Plan für nach Sonnenuntergang.",
      more: `Winterzeiten: <a href="${EGY}LuxorMuseum">offizielle Seite</a>.`, map: gm("Luxor Museum") },
    { id: "mumien", art: "ost", t: "Mumifizierungsmuseum", zeit: "9–13 und 17–20 Uhr", dauer: "45 min", preis: 220, guide: "gut allein",
      txt: "Wie man einbalsamierte, mit Werkzeugen und Tiermumien. An der Corniche beim Tempel von Luxor.",
      more: `Preis und Zeiten: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.`, map: gm("Mummification Museum, Luxor") },
    { id: "soundlight", art: "ost", t: "Licht und Ton in Karnak", zeit: "abends, Zeiten vor Ort erfragen", dauer: "1,5 h", preis: null, guide: "—",
      txt: "Abendvorführung im Tempel. Eher etwas für Fans; Preis und Sprache der Vorstellung vorher klären.",
      more: `Wikivoyage nennt 250 Pfund, die Angabe ist nicht datiert (<a href="https://en.wikivoyage.org/wiki/Luxor/East_Bank">Wikivoyage Luxor/East Bank</a>).` },

    // ---------- Nil und unterwegs ----------
    { id: "faehre", freund: 1, art: "nil", t: "Mit der Fähre hinüber", zeit: "rund um die Uhr", dauer: "5 min", preis: null, guide: "—",
      txt: "Vom Anleger nahe eurer Unterkunft zum Luxor-Museum. 5 Pfund für Einheimische, Reisende berichten von 25.",
      more: `Alles dazu in <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },
    { id: "motorboot", freund: 1, art: "nil", t: "Motorboot direkt zum Tempel von Luxor", zeit: "jederzeit", dauer: "10 min", preis: null, guide: "—",
      txt: "Fährt sofort und ohne Fußweg. Ab etwa 100 Pfund pro Boot, also zu zweit je knapp ein Euro.",
      more: `<a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>, vier Fragen vor jeder Fahrt.` },
    { id: "feluke", freund: 1, art: "nil", t: "Feluke in den Sonnenuntergang", zeit: "ab ca. 16:00", dauer: "1–2 h", preis: null, guide: "—",
      txt: "Das alte Segelboot, privat für euch zwei. Um 16 Uhr ablegen, dann seht ihr die Sonne gegen 17 Uhr hinter den Bergen eurer Seite versinken.",
      more: `150–300 Pfund pro Boot und Stunde (<a href="https://www.thestar.com.my/lifestyle/travel/2026/06/07/luxor039s-traditional-river-fleet-on-the-nile-is-a-big-tourist-pull">The Star, 2026</a>). Vorher klären: Preis für das Boot, wie lange, und was passiert, wenn kein Wind ist. <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },
    { id: "ballon", anders: "Passt schlecht zu eurem Rhythmus: Abholung ist vor Sonnenaufgang (ca. 6:05), euer Frühstück fällt dann aus oder rückt hinter den Flug, und die Tour kommt erst ins Tal, wenn die Busse schon da sind. Euer Freund schlägt ihn optional für Sonntag vor; zum Einplanen „↺ wieder rein“.", freund: 1, art: "nil", t: "Ballon bei Sonnenaufgang", zeit: "Abholung im Dunkeln", dauer: "ca. 3–4 h mit Abholung", preis: null, guide: "—",
      txt: "Über dem Westufer, wenn die Sonne gegen 6 Uhr aufgeht. Danach seid ihr schon auf der richtigen Seite für das Tal der Könige.",
      more: `Vorher online buchen. Angebote lagen zuletzt bei etwa 55 bis 150 US-Dollar pro Person. Achtet laut eurem Freund auf: Abholung an der Unterkunft, Rückfahrt, volle Erstattung bei Absage wegen Wetter, viele aktuelle Bewertungen. Die Tour mit Guide startet dann später.` },
    { id: "rad", art: "nil", t: "Mit dem Fahrrad zur südlichen Gruppe", zeit: "früh", dauer: "halber Tag", preis: null, guide: "selbst",
      txt: "Memnon, Medinet Habu, Deir el-Medina liegen nah beieinander. Im November mild genug. Für das Tal der Könige zu weit und zu steil.",
      more: `Leihrad 30–40 Pfund am Anleger, <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },

    // ---------- Organisieren ----------
    { id: "ankommen", freund: 1, art: "orga", t: "Ankommen, auspacken, ans Nilufer", zeit: "ab ca. 15:00", dauer: "1–2 h", preis: null, guide: "—",
      txt: "Kein Tempel heute. Den Weg zum Fähranleger einmal ablaufen, dann wisst ihr morgen und übermorgen Bescheid.",
      more: "Euer Freund rät: am Ankunftstag auf dem Westufer bleiben." },
    { id: "guide-west", freund: 1, art: "orga", t: "Private Westufer-Tour: Ägyptologe und Fahrer", zeit: "Abholung {los}",
      anders: "Euer Freund schreibt 6:30 oder 7:00. Ich lege die Abholung eine Stunde nach eurem Aufstehen, im Vorschlag 7:00, damit das Frühstück bleibt. Das Tal der Könige liegt etwa 8 km Straße von euch, ihr seid also rund 20 Minuten später dort.", dauer: "bis ca. 15 Uhr", preis: null, guide: "Guide",
      txt: "Der Tag, an dem sich ein Guide am meisten lohnt. Reihenfolge vorher festlegen und ausdrücklich ohne Einkaufsstopps.",
      more: `Anfrage zum Kopieren:<br><em>We are staying on the West Bank near the ferry and would like a private tour on November 15 for two people with a licensed Egyptologist and driver: Valley of the Kings (incl. Ramses V/VI), Hatshepsut, Deir el-Medina, Medinet Habu and the Colossi of Memnon. Pick-up at {losEn}. No shopping, alabaster, papyrus or perfume stops. Please send the total price for two in writing and say whether entrance fees are included.</em><br>Fragen beim Gastgeber eurer Unterkunft und auf GetYourGuide oder Viator, dann vergleichen. Vorsicht: Viele fertige Touren nehmen das Tal der Königinnen statt Medinet Habu.` },
    { id: "taxi-west", art: "orga", t: "Selbst entdecken: Taxi für den Tag", zeit: "ab 6:30", dauer: "ganzer Tag", preis: null, guide: "selbst",
      txt: "Ein Fahrer bringt euch von Stätte zu Stätte und wartet. Ihr lest vor Ort die Lektionen. Billiger, freier, aber ohne Erklärungen.",
      more: `500–1000 Pfund für den Tag, je nach Verhandlung (<a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>).` },
    { id: "fr15", art: "orga", t: "{auf} aufstehen, in Ruhe frühstücken", zeit: "{auf}–{los}", dauer: "1 h", preis: null, guide: "—",
      txt: "Euer Rhythmus, oben auf der Seite einstellbar. Um {los} holt euch der Fahrer ab, dann {talPlan}." },
    { id: "fr16", art: "orga", t: "{auf} aufstehen, in Ruhe frühstücken", zeit: "{auf}–{los}", dauer: "1 h", preis: null, guide: "—",
      txt: "Um {los} los zur Fähre. Drüben 25 Minuten zu Fuß oder ein paar Minuten mit Microbus oder Taxi: gegen {karnak} seid ihr in Karnak." },
    { id: "pause", freund: 1, art: "orga", t: "Pause in der Unterkunft", zeit: "ca. 15:00", dauer: "1 h", preis: null, guide: "—",
      txt: "Nach Gräbern ab sieben Uhr früh: duschen, hinlegen, dann Sonnenuntergang." },
    { id: "fruehstueck", freund: 1, art: "orga", t: "Gelassen frühstücken und packen", zeit: "Morgen", dauer: "2 h", preis: null, guide: "—",
      txt: "Kein Tempel mehr. Ein letzter Spaziergang am Nil oder durch die Felder." },
    { id: "abfahrt", freund: 1, art: "orga", t: "Fahrt zum Flughafen Hurghada", zeit: "Abfahrt rund 7 h vor Abflug", dauer: "3,5–4,5 h", preis: null, guide: "—",
      txt: "Rund 290 Kilometer durch die Wüste. Mit zwei Stunden am Flughafen und Puffer: etwa sieben Stunden vor dem Abflug losfahren.",
      more: `Transferseiten nennen 3,5 bis gut 4 Stunden Fahrzeit (etwa <a href="https://www.mytransfers.com/de/destination/agypten/flughafen-luxor-lxr/hurghada/">mytransfers</a>). Fahrer vorher fest buchen, Preis für das Auto.` },

    // ---------- Essen ----------
    { id: "nubian", freund: 1, art: "essen", t: "Nubian House", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Familienbetrieb mit Garten und niedrigen Sofas, Essen aus dem eigenen Garten. Weniger schick, mehr Ägypten. Tipp eures Freundes für den ersten Abend.",
      more: `HappyCow markiert vegetarische Optionen, ein Vegan-Führer bewertet das vegane Angebot als schwach (<a href="https://www.happycow.net/widget/africa/egypt/luxor/">HappyCow</a>, <a href="https://spinach.guide/venues/nubian-house-14452/">spinach.guide</a>). Vorher fragen, was ohne Fleisch, Fisch und Butter geht.`,
      map: gm("Nubian House restaurant, West Bank, Luxor") },
    { id: "tutanchamun", anders: "Wie euer Freund, aber mit einer Warnung, die er nicht nennt: Wikivoyage berichtet von Karten ohne Preise und überhöhten Rechnungen. Lasst euch vor dem Bestellen eine Karte mit Preisen geben.", freund: 1, art: "essen", t: "Tutankhamun Restaurant", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse am Nil, 200 m südlich des Anlegers, festes Menü mit Hauptgang nach Saison. Wikivoyage warnt: Karte mit Preisen verlangen, bevor ihr bestellt.",
      more: `<a href="https://en.wikivoyage.org/wiki/Luxor/West_Bank">Wikivoyage Luxor/West Bank</a>. Erste Wahl eures Freundes nach dem Westufer-Tag.`,
      map: gm("Tutankhamun Restaurant, West Bank, Luxor") },
    { id: "sunflower", freund: 1, art: "essen", t: "Sunflower", ufer: "West", zeit: "11–23 Uhr", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse direkt am Anleger, links, wenn der Fluss hinter euch liegt. Entspannt, ägyptisches Menü, schenkt Alkohol aus.",
      more: `<a href="https://en.wikivoyage.org/wiki/Luxor/West_Bank">Wikivoyage Luxor/West Bank</a>.`, map: gm("Sunflower Restaurant, West Bank, Luxor") },
    { id: "maratonga", anders: "Euer Freund schreibt nur „Mittagessen“. Ich schlage Maratonga vor, weil es gegenüber von Medinet Habu liegt, wohin ihr nach dem Essen geht, und vegane Salate hat.", art: "essen", t: "Café Maratonga, vor Medinet Habu", ufer: "West", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Schattiger Garten gegenüber dem Tempel, Salate mit veganer Auswahl, Bier. Perfekt als Mittagspause am Westufer-Tag.",
      more: `<a href="https://www.lonelyplanet.com/pois/437446">Lonely Planet</a>, vegane Salate laut <a href="https://spinach.guide/venues/cafe-restaurant-maratonga-14455/">spinach.guide</a>.`, map: gm("Maratonga Cafe, Medinet Habu, Luxor") },
    { id: "marsam", art: "essen", t: "Marsam Hotel, Hofgarten", ufer: "West", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Altes Haus hinter den Memnonkolossen, Essen im Hof, Tagesmenü aus dem eigenen Garten. 200–350 Pfund pro Kopf.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>.`, map: gm("Marsam Hotel, Luxor") },
    { id: "wannas", art: "essen", t: "Wannas Art Café", ufer: "West", zeit: "tagsüber", dauer: "", preis: null, guide: "—",
      txt: "Buntes vegetarisches Café, zugleich Galerie, mit frischen Säften. Günstig.",
      more: `<a href="https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576">HappyCow</a>, <a href="https://exploreluxor.org/where-to-eat-in-luxor/">Explore Luxor</a>.`, map: gm("Wannas Art Cafe, Luxor") },
    { id: "sahaby", anders: "Wie euer Freund. Nur: Zur besten Zeit für die Dachterrasse, dem Sonnenuntergang gegen 17 Uhr, seid ihr laut Plan im Tempel von Luxor. Esst also danach, oder zieht den Tempel auf den frühen Nachmittag, wenn ihr den Sonnenuntergang lieber vom Dach seht.", freund: 1, art: "essen", t: "Al-Sahaby Lane", ufer: "Ost", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Seit den 1930ern in Familienhand, Dachterrasse beim Tempel von Luxor. Einfache ägyptische Küche, 200–400 Pfund pro Kopf. Tische zum Sonnenuntergang Tage vorher reservieren.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>. Wahl eures Freundes für den Ostufer-Abend.`, map: gm("Al-Sahaby Lane Restaurant, Luxor") },
    { id: "sofra", anders: "Euer Freund hatte Sofra zuerst vorgeschlagen und dann für den Abend durch Al-Sahaby Lane ersetzt. Ich setze Sofra auf das „späte Mittagessen“ am Ostufer, weil es viele vegane Gerichte hat. Achtung: nur bar.", art: "essen", t: "Sofra", ufer: "Ost", zeit: "11–24 Uhr", dauer: "", preis: null, guide: "—",
      txt: "Ägyptische Küche in einer alten Villa, mit vielen veganen Gerichten und frischen Säften. Kein Alkohol, nur bar, abends Tage vorher reservieren.",
      more: `Vegan laut <a href="https://www.happycow.net/reviews/sofra-luxor-146635">HappyCow</a>, bar und reservieren laut <a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide</a>, Zeiten laut <a href="https://en.wikivoyage.org/wiki/Luxor/East_Bank">Wikivoyage</a>.`, map: gm("Sofra Restaurant, Luxor") },
    { id: "thebes", art: "essen", t: "Thebes Bar & Grill", ufer: "Ost?", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse, Menü vom Bauernhof, laut The Luxor Guide die stärkste vegane und vegetarische Küche der Stadt. Bier und Wein. 250–500 Pfund.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide</a> sagt Ostufer, ein <a href="https://www.happycow.net/reviews/thebes-bar-and-grill-luxor-327206">HappyCow-Eintrag</a> Westufer. Vorher auf der Karte nachsehen.`, map: gm("Thebes Bar and Grill, Luxor") },
    { id: "snobs", art: "essen", t: "Snobs", ufer: "Ost", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Eigentlich ein Steakhaus, aber mit eigener vegetarischer und veganer Karte, nicht nur Beilagen.",
      more: `<a href="https://exploreluxor.org/where-to-eat-in-luxor/">Explore Luxor, September 2026</a>.`, map: gm("Snobs Restaurant, Luxor") },
    { id: "koschari", art: "essen", t: "Koschari auf die Hand", ufer: "Ost", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Reis, Nudeln, Linsen, Kichererbsen, Tomatensoße, Röstzwiebeln: vegan und billig, in jedem Koschari-Laden der Altstadt.",
      more: `Was drin ist und wie ihr bestellt: <a href="../lessons/0012-pfeffer-in-der-wueste.html">Lektion 12</a>.` },

    // ---------- Weitere Ideen eures Freundes ----------
    { id: "nilepalace", freund: 1, art: "essen", t: "West Bank Nile Palace", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      anders: "Ungeprüft: Euer Freund nennt Dachterrasse mit Nilblick, ägyptisch-mediterrane Küche, 4,9 bei wenigen Bewertungen, 200–600 Pfund. Ich habe keine Quelle gefunden, die das Restaurant beschreibt. Vor Ort anschauen und Karte zeigen lassen.",
      txt: "Laut eurem Freund: ruhiger Abend zu zweit, Dachterrasse mit Blick auf den Nil, nahe eurer Unterkunft.",
      map: gm("West Bank Nile Palace Restaurant, Luxor") },
    { id: "sayeda", freund: 1, art: "essen", t: "El Sayeda Zainab", ufer: "West", zeit: "laut Eintrag 11–2 Uhr", dauer: "", preis: null, guide: "—",
      anders: "Ungeprüft: Die Seite, die euer Freund nennt (cybo), hat mich nicht hereingelassen, eine zweite Quelle habe ich nicht gefunden. Ob es dort vegane Gerichte gibt, ist offen.",
      txt: "Laut eurem Freund: lokal und günstig, an der Hauptstraße am Westufer, weniger Aussicht, mehr Alltag.",
      map: gm("El Sayeda Zainab Restaurant, West Bank, Luxor") },
    { id: "bluesky", freund: 1, art: "trinken", t: "Blue Sky, Dachterrasse", ufer: "West", zeit: "Sonnenuntergang", dauer: "", preis: null, guide: "—",
      anders: "Ich setze Blue Sky nur für einen Drink ein, nicht zum Essen: Gelobt wird dort vor allem gegrillter Fisch. Und vom Westufer seht ihr den Himmel über dem Tempel von Luxor glühen, die Sonne selbst geht hinter euch unter. Eine weitere Quelle als die eures Freundes (trip.com) habe ich nicht gefunden.",
      txt: "Laut eurem Freund: entspannte Dachterrasse mit Nilblick, gut nach der Feluke.",
      map: gm("Blue Sky Restaurant, West Bank, Luxor") },
    { id: "kaffee", freund: 1, art: "ost", t: "Kaffee und treiben lassen", ufer: "Ost", zeit: "nach Karnak", dauer: "1 h", preis: 0, guide: "gut allein",
      txt: "Ein Kaffeehaus, ʾahwa, an der Corniche oder in der Altstadt. Tee oder Kaffee, Leute schauen, nichts abhaken. So steht es im Plan eures Freundes." },
    { id: "zurueck", freund: 1, art: "nil", t: "Abends mit der Fähre zurück", ufer: "", zeit: "nach dem Essen", dauer: "5 min", preis: null, guide: "—",
      txt: "Vom Anleger beim Luxor-Museum hinüber zu eurer Seite. Die neuen Fähren fahren laut Youm7 rund um die Uhr; spät geht auch das Motorboot.",
      more: `<a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },
    { id: "mittag-west", freund: 1, art: "essen", t: "Mittagessen unterwegs (Guide fragen)", ufer: "West", zeit: "mittags", dauer: "1 h", preis: null, guide: "—",
      txt: "So steht es im Plan eures Freundes: ohne festes Lokal. Sagt dem Guide vorher, dass ihr vegan und vegetarisch esst." },
    { id: "luxorpass", freund: 1, einig: "abraten", art: "orga", t: "Luxor Pass kaufen?", ufer: "", zeit: "", dauer: "", preis: null, guide: "—",
      txt: "Euer Freund rät ab, ich auch: Der Standard-Pass soll 2026 etwa 130 US-Dollar kosten, also über 100 Euro. Eure Eintritte im Vorschlag liegen bei rund 50 Euro pro Person. Lohnt nur, wer fünf Tage lang alles sehen will.",
      more: `Preis nur aus Reiseführern, die offizielle Seite nennt ihn nicht direkt; die Preisliste des Ministeriums von 2024 (<a href="https://www.mota.gov.eg/media/kpff2kqz/luxorcairo-pass-6-1-2024.pdf">PDF</a>) war älter.` },
    { id: "ostwest", freund: 1, einig: "abraten", art: "orga", t: "Tour „Ost- und Westufer an einem Tag“", ufer: "", zeit: "ganzer Tag", dauer: "ca. 8 h", preis: null, guide: "Guide",
      txt: "Gibt es: Tal der Könige, Hatschepsut, Memnon, Karnak und Luxor-Tempel in rund acht Stunden. Euer Freund rät deutlich ab, ich auch: Ihr habt zwei Tage, nutzt sie. Nur als Notlösung, falls ein Tag ausfällt." },

    // ---------- Trinken und Sonnenuntergang ----------
    { id: "nilevalley", anders: "Nicht von eurem Freund. Ich ergänze es für den Ankunftstag: ein Bier mit Blick auf den Tempel von Luxor, ohne über den Fluss zu müssen.", art: "trinken", t: "Nile Valley Hotel, Dachterrasse", ufer: "West", zeit: "ab Nachmittag", dauer: "", preis: null, guide: "—",
      txt: "Direkt am Anleger, Blick über den Nil auf den Tempel von Luxor. Bier, dazu ägyptische und internationale Teller, 180–350 Pfund.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>.`, map: gm("Nile Valley Hotel, Luxor") },
    { id: "gezira", art: "trinken", t: "El Gezira, Dachrestaurant", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Dach nahe dem Anleger, laut einer Bewertung „gut für ein ruhiges Bier am Ende des Tages“.",
      more: `<a href="https://www.tripadvisor.com/Restaurant_Review-g294205-d25263926-Reviews-El_Gezira_Restaurant-Luxor_Nile_River_Valley.html">Tripadvisor</a>.`, map: gm("El Gezira Hotel, Luxor") },
    { id: "winterpalace", art: "trinken", t: "Sundowner im Winter Palace", ufer: "Ost", zeit: "vor Sonnenuntergang", dauer: "1 h", preis: null, guide: "—",
      txt: "Das alte Grandhotel an der Corniche. Von der Terrasse schaut ihr nach Westen über den Nil, die Sonne geht hinter den Bergen des Westufers unter. Auch für Nicht-Gäste.",
      more: `Terrasse und Royal Bar laut Reiseberichten auch für Gäste von außen (<a href="https://shezlikethewind.com/2020/12/23/cocktails-afternoon-tea-and-a-sunset-at-winter-palace-in-luxor-egypt/">Reisebericht 2020</a>). Ordentlich angezogen hingehen, Preise eines Luxushotels.`, map: gm("Sofitel Winter Palace, Luxor") },
    { id: "saft", art: "trinken", t: "Frischer Zuckerrohrsaft", ufer: "Ost", zeit: "tagsüber", dauer: "", preis: null, guide: "—",
      txt: "An vielen Saftständen in der Stadt, frisch gepresst. Kleine Münzen und Scheine bereithalten.",
      more: `<a href="https://en.wikivoyage.org/wiki/Luxor/East_Bank">Wikivoyage Luxor/East Bank</a>.` },
  ];

  // ---------- Links zu jeder Karte: Karte, offizielle Seite, Buchen, Quellen eures Freundes ----------
  // Suchlinks statt geratener Adressen, wo es keine geprüfte offizielle Seite gibt.
  const q = encodeURIComponent;
  const TA = (x) => ["⭐ Tripadvisor", "https://www.tripadvisor.com/Search?q=" + q(x + " Luxor")];
  const WEB = (x) => ["🔎 Website suchen", "https://www.google.com/search?q=" + q(x + " Luxor")];
  const FREUND = (site, x) => [`💬 Quelle eures Freundes: ${site}`, "https://www.google.com/search?q=" + q(`site:${site} ${x} Luxor`)];
  const GYG = (x) => ["🎟 GetYourGuide", "https://www.getyourguide.com/s/?q=" + q(x)];
  const VIA = (x) => ["🎟 Viator", "https://www.viator.com/searchResults/all?text=" + q(x)];
  const OFF = (slug, label = "🏛 Offizielle Seite") => [label, EGY + slug];
  const TICKETS = ["🎟 Tickets (offiziell)", "https://egymonuments.com/"];
  const PREISE = ["📄 Preisliste Ministerium", "https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf"];
  const MEMPHIS = ["🎓 Uni Memphis: Westufer", "https://www.memphis.edu/egypt/resources/colortour/westbank.php"];
  const L14 = ["📖 Lektion 14", "../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html"];
  const L13 = ["📖 Lektion 13", "../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html"];
  const GUIDES = ["👤 Private Guides in Luxor (GoWithGuide)", "https://gowithguide.com/egypt/luxor/guides"];
  const ANLEGER_W = "https://www.google.com/maps/search/?api=1&query=25.70491,32.63566";
  const ANLEGER_O = "https://www.google.com/maps/search/?api=1&query=25.70845,32.64388";

  const LINKS = {
    tdk: [OFF("ValleyOfKings"), TICKETS, L13],
    kv9: [PREISE, L13], tut: [PREISE], sethos: [PREISE],
    hatschepsut: [OFF("HatshepsutTemple"), TICKETS],
    deir: [MEMPHIS, PREISE, TICKETS],
    medinet: [OFF("MedinetHabu"), TICKETS],
    memnon: [L13, MEMPHIS],
    ramesseum: [OFF("Ramesseum"), TICKETS],
    koeniginnen: [OFF("ValleyoftheQueens"), TICKETS],
    carter: [OFF("CarterHouse"), PREISE],
    karnak: [OFF("KarnakTemple"), TICKETS],
    "karnak-guide": [GUIDES, GYG("Karnak private guide"), VIA("Karnak Temple private guide")],
    luxortempel: [OFF("LuxorTemple"), TICKETS],
    souk: [["📘 Wikivoyage Luxor", "https://en.wikivoyage.org/wiki/Luxor"]],
    museum: [OFF("LuxorMuseum"), TICKETS],
    mumien: [OFF("MummificationMuseum"), PREISE],
    soundlight: [WEB("Karnak sound and light show"), ["📘 Wikivoyage", "https://en.wikivoyage.org/wiki/Luxor/East_Bank"]],
    faehre: [["📍 Anleger Westufer", ANLEGER_W], ["📍 Anleger Ostufer", ANLEGER_O], L14],
    zurueck: [["📍 Anleger Ostufer", ANLEGER_O], ["📍 Anleger Westufer", ANLEGER_W], L14],
    motorboot: [["📍 Anleger Westufer", ANLEGER_W], L14],
    feluke: [GYG("Luxor felucca sunset private"), VIA("Luxor private felucca sunset"), L14],
    ballon: [GYG("Luxor hot air balloon"), VIA("Luxor hot air balloon")],
    rad: [["📍 Anleger Westufer", ANLEGER_W], L14],
    "guide-west": [GUIDES, ["👤 Beispiel: private Westufer-Tagestour", "https://gowithguide.com/egypt/tour/luxor-private-luxor-highlights-full-day-tour-west-bank-24354"], GYG("Luxor West Bank private tour Egyptologist"), VIA("Luxor West Bank private tour")],
    "taxi-west": [["🚕 inDrive Luxor", "https://indrive.com/en-eg/cities/luxor"], L14],
    abfahrt: [["🚐 mytransfers", "https://www.mytransfers.com/de/destination/agypten/flughafen-luxor-lxr/hurghada/"], GYG("Luxor Hurghada airport private transfer")],
    luxorpass: [WEB("Luxor Pass egymonuments price"), ["📰 CairoScene 2025", "https://cairoscene.com/buzz/cairo-luxor-passes-expensive"]],
    ostwest: [GYG("Luxor East and West Bank one day private tour")],
    kaffee: [], pause: [], ankommen: [["📍 Anleger Westufer", ANLEGER_W]], fr15: [], fr16: [], fruehstueck: [],
    // Essen und Trinken
    nubian: [TA("Nubian House restaurant"), FREUND("mapquest.com", "Nubian House")],
    tutanchamun: [TA("Tutankhamun Restaurant West Bank"), ["📘 Wikivoyage Westufer", "https://en.wikivoyage.org/wiki/Luxor/West_Bank"], FREUND("tripadvisor.com", "Tutankhamon Restaurant")],
    sunflower: [TA("Sunflower Restaurant West Bank"), FREUND("wanderboat.ai", "Sunflower")],
    maratonga: [TA("Maratonga Cafe Medinet Habu"), ["📘 Lonely Planet", "https://www.lonelyplanet.com/pois/437446"]],
    marsam: [TA("Marsam Hotel"), WEB("Marsam Hotel")],
    wannas: [["🌱 HappyCow", "https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576"], TA("Wannas Art Cafe")],
    sahaby: [["🌐 Offizielle Seite mit Speisekarte", "https://www.nefertitihotel.com/al-sahaby-lane-restaurant"], TA("Al-Sahaby Lane")],
    sofra: [["🌱 HappyCow", "https://www.happycow.net/reviews/sofra-luxor-146635"], TA("Sofra Restaurant")],
    thebes: [["🌱 HappyCow", "https://www.happycow.net/reviews/thebes-bar-and-grill-luxor-327206"], TA("Thebes Bar and Grill")],
    snobs: [TA("Snobs Restaurant"), ["📘 Explore Luxor", "https://exploreluxor.org/where-to-eat-in-luxor/"]],
    koschari: [["📖 Lektion 12", "../lessons/0012-pfeffer-in-der-wueste.html"]],
    nilepalace: [TA("West Bank Nile Palace Restaurant"), FREUND("tripadvisor.com", "West Bank Nile Palace"), FREUND("wanderboat.ai", "West Bank Nile Palace")],
    sayeda: [["💬 Quelle eures Freundes: cybo.com", "https://www.cybo.com/search/?q=" + q("El Sayeda Zainab Restaurant Luxor")], TA("El Sayeda Zainab Restaurant")],
    bluesky: [FREUND("trip.com", "Blue Sky Restaurant"), TA("Blue Sky Restaurant West Bank")],
    "mittag-west": [],
    nilevalley: [TA("Nile Valley Hotel restaurant"), WEB("Nile Valley Hotel West Bank")],
    gezira: [["⭐ Tripadvisor", "https://www.tripadvisor.com/Restaurant_Review-g294205-d25263926-Reviews-El_Gezira_Restaurant-Luxor_Nile_River_Valley.html"]],
    winterpalace: [WEB("Sofitel Legend Old Winter Palace official"), TA("Old Winter Palace")],
    saft: [],
  };
  // Karten, die bisher keine Google-Maps-Adresse hatten
  const KARTE = {
    kv9: gm("Tomb of Ramesses VI, Valley of the Kings"), tut: gm("Tomb of Tutankhamun, Valley of the Kings"), sethos: gm("Tomb of Seti I, Valley of the Kings"),
    "karnak-guide": gm("Karnak Temple, Luxor"), kaffee: gm("Corniche El Nile, Luxor"), koschari: gm("koshary, Luxor"),
    saft: gm("juice shop, Luxor"), soundlight: gm("Karnak Temple, Luxor"), feluke: ANLEGER_W, ballon: gm("Hot air balloon launch site, West Bank, Luxor"),
    "guide-west": gm("Valley of the Kings, Luxor"), "taxi-west": gm("Valley of the Kings, Luxor"), "mittag-west": gm("Medinet Habu, Luxor"),
    fr15: null, fr16: null, fruehstueck: null, pause: null, ankommen: null, faehre: null, zurueck: null, motorboot: null, rad: null,
    abfahrt: gm("Hurghada International Airport"), luxorpass: null, ostwest: null,
  };
  window.PLAN_BAUSTEINE.forEach((b) => {
    b.links = LINKS[b.id] || [];
    if (!b.map && KARTE[b.id]) b.map = KARTE[b.id];
  });

  // Fotos von Wikimedia Commons, jedes angesehen. Fotograf und Lizenz stehen unter dem Bild.
  const BILDER = {
    tdk: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Thebes%2C_Luxor%2C_Egypt%2C_Panoramic_view_of_the_Valley_of_the_Kings.jpg/500px-Thebes%2C_Luxor%2C_Egypt%2C_Panoramic_view_of_the_Valley_of_the_Kings.jpg", alt: "Das Tal der Könige von oben: ein trockenes, verzweigtes Tal zwischen kahlen Bergen, unten Wege und Eingänge.", credit: "Foto: Vyacheslav Argenberg, CC BY 4.0", seite: "https://commons.wikimedia.org/wiki/File:Thebes%2C_Luxor%2C_Egypt%2C_Panoramic_view_of_the_Valley_of_the_Kings.jpg" },
    kv9: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/KV9_graffiti_1.jpg/500px-KV9_graffiti_1.jpg", alt: "Bemalte Grabwand mit ägyptischen Figuren, dazwischen rote griechische und lateinische Buchstaben antiker Besucher.", credit: "Foto: Agnieszka Szulc-Kajak, PCMA, CC BY-SA 4.0", seite: "https://commons.wikimedia.org/wiki/File:KV9_graffiti_1.jpg" },
    hatschepsut: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Temple_of_Hatshepsut%2C_Deir_el-Bahari%2C_Luxor%2C_Egypt.jpg/500px-Temple_of_Hatshepsut%2C_Deir_el-Bahari%2C_Luxor%2C_Egypt.jpg", alt: "Der Tempel der Hatschepsut: Säulenterrassen mit einer Rampe in der Mitte vor einer hohen Felswand.", credit: "Foto: Vyacheslav Argenberg, CC BY 4.0", seite: "https://commons.wikimedia.org/wiki/File:Temple_of_Hatshepsut%2C_Deir_el-Bahari%2C_Luxor%2C_Egypt.jpg" },
    deir: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Deir_al_Medineh_near_Luxor.jpg/500px-Deir_al_Medineh_near_Luxor.jpg", alt: "Die Grundmauern des Handwerkerdorfs Deir el-Medina in einer Senke zwischen Wüstenhügeln.", credit: "Foto: Gildas Guionnet, CC BY-SA 4.0", seite: "https://commons.wikimedia.org/wiki/File:Deir_al_Medineh_near_Luxor.jpg" },
    medinet: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Medinet_Habu_Temple_R01.jpg/500px-Medinet_Habu_Temple_R01.jpg", alt: "Medinet Habu von außen: Torbau und Tempelmauern hinter einem Hang, davor Palmen.", credit: "Foto: Marc Ryckaert (MJJR), CC BY 3.0", seite: "https://commons.wikimedia.org/wiki/File:Medinet_Habu_Temple_R01.jpg" },
    memnon: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Colossi_of_Memnon_May_2015_2.JPG/500px-Colossi_of_Memnon_May_2015_2.JPG", alt: "Die zwei Memnonkolosse, sitzende Riesenstatuen auf einem Feld.", credit: "Foto: MusikAnimal, CC BY-SA 4.0", seite: "https://commons.wikimedia.org/wiki/File:Colossi_of_Memnon_May_2015_2.JPG" },
    ramesseum: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Luxor_Ramesseum_R02.jpg/500px-Luxor_Ramesseum_R02.jpg", alt: "Im Ramesseum: eine Reihe Pfeiler mit Statuen des Königs als Osiris, die Arme vor der Brust gekreuzt.", credit: "Foto: Marc Ryckaert, CC BY 3.0", seite: "https://commons.wikimedia.org/wiki/File:Luxor_Ramesseum_R02.jpg" },
    karnak: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Templo_de_Karnak%2C_Luxor%2C_Egipto%2C_2022-04-03%2C_DD_146.jpg/500px-Templo_de_Karnak%2C_Luxor%2C_Egipto%2C_2022-04-03%2C_DD_146.jpg", alt: "In Karnak: ein Durchgang zwischen hohen Mauern voller Reliefs, hinten Säulen.", credit: "Foto: Diego Delso, CC BY-SA 4.0", seite: "https://commons.wikimedia.org/wiki/File:Templo_de_Karnak%2C_Luxor%2C_Egipto%2C_2022-04-03%2C_DD_146.jpg" },
    luxortempel: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Luxor_Temple_at_night%2C_lights%2C_Luxor%2C_Egypt.jpg/500px-Luxor_Temple_at_night%2C_lights%2C_Luxor%2C_Egypt.jpg", alt: "Der Tempel von Luxor bei Nacht, angestrahlt: Obelisk, zwei sitzende Statuen Ramses’ II. und das Tor.", credit: "Foto: Vyacheslav Argenberg, CC BY 4.0", seite: "https://commons.wikimedia.org/wiki/File:Luxor_Temple_at_night%2C_lights%2C_Luxor%2C_Egypt.jpg" },
    faehre: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Luxor_Ferry_R01.jpg/500px-Luxor_Ferry_R01.jpg", alt: "Eine voll besetzte Nilfähre mit zwei Decks, dahinter das Ostufer.", credit: "Foto: Marc Ryckaert (MJJR), CC BY 4.0", seite: "https://commons.wikimedia.org/wiki/File:Luxor_Ferry_R01.jpg" },
  };
  window.PLAN_BAUSTEINE.forEach((b) => { if (BILDER[b.id]) b.bild = BILDER[b.id]; });

  // Zwei Vorschläge. Ids mit "-" davor sind weggehakte Alternativen. Was fehlt, liegt im Ideenpool.
  window.PLAN_VORSCHLAEGE = {
    mein: {
      name: "Mein Vorschlag",
      "d14-nachmittag": ["ankommen", "nilevalley"],
      "d14-abend": ["nubian", "-sayeda", "-sunflower", "-wannas"],
      "d15-frueh": ["fr15", "guide-west", "-ballon", "-taxi-west", "-rad"],
      "d15-vormittag": ["tdk", "kv9", "-tut", "-sethos", "hatschepsut", "deir"],
      "d15-mittag": ["maratonga", "-mittag-west", "-marsam"],
      "d15-nachmittag": ["medinet", "memnon", "pause", "feluke", "-bluesky"],
      "d15-abend": ["tutanchamun", "-nilepalace", "-gezira"],
      "d16-frueh": ["fr16", "faehre", "karnak", "karnak-guide"],
      "d16-mittag": ["kaffee", "sofra", "-koschari"],
      "d16-nachmittag": ["souk", "-corniche", "-saft", "luxortempel"],
      "d16-abend": ["sahaby", "-thebes", "-snobs", "-winterpalace", "-museum", "zurueck"],
      "d17-morgen": ["fruehstueck"],
      "d17-abreise": ["abfahrt"],
    },
    freund: {
      name: "Plan eures Freundes",
      "d14-nachmittag": ["ankommen"],
      "d14-abend": ["nubian", "-sayeda"],
      "d15-frueh": ["fr15", "guide-west", "-ballon"],
      "d15-vormittag": ["tdk", "kv9", "-tut", "hatschepsut", "memnon"],
      "d15-mittag": ["mittag-west"],
      "d15-nachmittag": ["medinet", "pause", "feluke", "-bluesky"],
      "d15-abend": ["tutanchamun", "-nilepalace", "-sunflower"],
      "d16-frueh": ["fr16", "faehre", "karnak", "karnak-guide"],
      "d16-mittag": ["kaffee", "souk", "corniche", "-museum"],
      "d16-nachmittag": ["luxortempel"],
      "d16-abend": ["sahaby", "zurueck"],
      "d17-morgen": ["fruehstueck"],
      "d17-abreise": ["abfahrt"],
    },
  };
})();
