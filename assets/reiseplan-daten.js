// Bausteine für den Reiseplan Luxor (reference/reiseplan.html).
// Jeder Baustein ist eine Option, die man in einen Tag ziehen, weghaken oder wieder einblenden kann.
// preis: Eintritt pro Person in Pfund (nur Eintritte, damit die Summe stimmt), sonst null.
// Quellen stehen als Link im Text; die Liste aller Quellen steht unten auf der Seite.
(function () {
  const gm = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const EGY = "https://egymonuments.com/details/";
  // Welche Gräber im Tal der Könige offen sind, Stand 3. November 2026 (wechselt, die Tafel an der Kasse gilt).
  const WS = `<a href="https://www.weseektravel.com/best-tombs-in-valley-of-the-kings/">Liste der offenen Gräber, Stand 3. November 2026</a>`;

  window.PLAN_ARTEN = {
    west: { name: "Westufer: Stätten", icon: "⚱️" },
    ost: { name: "Ostufer: Tempel, Stadt, Museen", icon: "🏛️" },
    nil: { name: "Auf dem Nil und unterwegs", icon: "⛵" },
    essen: { name: "Essen", icon: "🍽" },
    trinken: { name: "Trinken und Sonnenuntergang", icon: "🌅" },
    orga: { name: "Organisieren und Pausen", icon: "🧭" },
  };

  window.PLAN_TAGE = [
    { id: "d14", datum: "2026-11-14", name: "Samstag, 14. November", kurz: "Sa 14.11.", motto: "Ankommen am Westufer", sonne: "Untergang ca. 17:00",
      slots: [["nachmittag", "Ab 15 Uhr"], ["abend", "Abend"]] },
    { id: "d15", datum: "2026-11-15", name: "Sonntag, 15. November", kurz: "So 15.11.", motto: "Westufer: Gräber und Totentempel", sonne: "Aufgang ca. 6:05 · Untergang ca. 17:00",
      slots: [["frueh", "Früh"], ["vormittag", "Vormittag"], ["mittag", "Mittag"], ["nachmittag", "Nachmittag"], ["abend", "Abend"]] },
    { id: "d16", datum: "2026-11-16", name: "Montag, 16. November", kurz: "Mo 16.11.", motto: "Ostufer: Tempel und Stadt", sonne: "Aufgang ca. 6:05 · Untergang ca. 17:00",
      slots: [["frueh", "Früh"], ["vormittag", "Vormittag"], ["mittag", "Mittag"], ["nachmittag", "Nachmittag"], ["abend", "Abend"]] },
    { id: "d17", datum: "2026-11-17", name: "Dienstag, 17. November", kurz: "Di 17.11.", motto: "Gemütlich los nach Hurghada",
      slots: [["morgen", "Morgen"], ["abreise", "Abreise"]] },
  ];

  window.PLAN_BAUSTEINE = [
    // ---------- Westufer ----------
    { id: "tdk", freund: 1, art: "west", t: "Tal der Könige", zeit: "7:00–10:30", dauer: "2,5–3,5 h", preis: 750, guide: "Guide lohnt",
      txt: "Mit eurem Guide um 7 Uhr da. Ausflugsbusse kommen nach Reiseberichten ab etwa 8 Uhr, gegen 10 sind die Gräber voll. Also zuerst ins Tal, dann den Rest. Das Grundticket öffnet drei Gräber nach Wahl. Ramses III. (KV11) gehört zu den zehn, die zur Wahl stehen: Nehmt es als eines der drei, am Nachmittag seht ihr in Medinet Habu seinen Tempel. Ramses II. (KV7) ist nicht offen. Ohne Hatschepsut habt ihr hier keine Eile.",
      more: `Welche Gräber offen sind, wechselt; es gilt die Tafel an der Kasse. Ramses III. offen, Ramses II. nicht: ${WS}. Die Zusatzgräber sind eigene Bausteine (Ramses V./VI., Tutanchamun, Sethos I.), zieht dazu, was ihr wollt. Hinter der Geschichte: <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>. Zeiten und Preis: <a href="${EGY}ValleyOfKings">offizielle Seite</a>. Busse ab etwa 8 Uhr: <a href="https://www.responsibletravel.com/holidays/egypt/travel-guide/how-to-avoid-the-crowds">Responsible Travel</a>; voll gegen 10 Uhr: <a href="https://www.findingouradventure.com/travel-diaries/valleyofthekings">Reisebericht</a>.` },
    { id: "kv9", freund: 1, art: "west", t: "+ Grab Ramses’ V./VI. (KV9)", zeit: "im Tal der Könige", dauer: "30 min", preis: 220, guide: "gut allein",
      txt: "Das Grab mit den Graffiti antiker Touristen: „Ich kann diese Schrift nicht lesen!“ Schaut knapp unter die Decke.",
      more: `Zusatzticket, Preis nach der <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste des Ministeriums</a>. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.` },
    { id: "tut", freund: 1, art: "west", t: "+ Grab des Tutanchamun (KV62)", zeit: "im Tal der Könige", dauer: "20 min", preis: 700, guide: "gut allein",
      txt: "Klein, aber der König liegt noch darin. Lohnt vor allem, wenn euch gerade dieses Grab wichtig ist.",
      more: `Zusatzticket, <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "sethos", freund: 1, art: "west", t: "+ Grab Sethos’ I. (KV17)", zeit: "im Tal der Könige", dauer: "45 min", preis: 2000, guide: "gut allein",
      txt: "Eines der längsten und am reichsten bemalten Gräber im Tal. Teuerstes Zusatzticket.",
      more: `2000 Pfund pro Person, <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "hatschepsut", anders: "Euch wurde empfohlen, Hatschepsut zu streichen und dafür Medinet Habu in Ruhe anzuschauen. Deshalb weggehakt; wer sie doch will, holt sie mit „↺ wieder rein“ zurück. Ein Stück Hatschepsut seht ihr trotzdem: Den kleinen Amun-Tempel in Medinet Habu hat sie begonnen (Lektion 15).", freund: 1, art: "west", t: "Tempel der Hatschepsut (Deir el-Bahari)", zeit: "ca. 9:45", dauer: "1 h", preis: 440, guide: "Guide lohnt",
      txt: "Terrassen vor der Felswand. Auf der mittleren Terrasse links die Expedition ins Land Punt, mit Fischen aus dem Roten Meer.",
      more: `<a href="${EGY}HatshepsutTemple">Offizielle Seite</a>. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.` },
    { id: "deir", anders: "Nicht in eurer Guide-Tour. Steht aber in eurer Mission und liegt knapp einen Kilometer nördlich von Medinet Habu: Wer am Nachmittag noch Lust hat, nimmt es statt der Pause dazu. Eintritt 220 Pfund pro Person.", art: "west", t: "Deir el-Medina, Dorf der Grabbauer", zeit: "ab 6:00", dauer: "1 h", preis: 220, guide: "Guide lohnt",
      txt: "Hier wohnten die Handwerker der Königsgräber, die unter Ramses III. streikten. Steht in eurer Mission, fehlt aber in vielen Touren.",
      more: `Grab des Paschedu extra (120 Pfund). Liegt zwischen Medinet Habu und Hatschepsut, kostet also kaum Umweg. Preise: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "medinet", freund: 1, art: "west", t: "Medinet Habu", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1,5–2 h", preis: 220, guide: "gut allein",
      txt: "Totentempel Ramses’ III.: Torburg, Seeschlacht gegen die Seevölker an der Nordwand außen, im zweiten Hof Farben, die unter der Tünche der Kopten überlebt haben. Nachmittags oft ruhig. Ihr geht allein, Lektion 15 ist euer Guide. Karte vorher an der Hauptkasse oder online, am Tempel gibt es keine.",
      more: `Rundgang mit allen Stellen: <a href="../lessons/0015-ein-bierzimmer-fuer-die-richter.html">Lektion 15</a>. <a href="${EGY}MedinetHabu">Offizielle Seite</a>. Gegenüber liegt das Café Maratonga (siehe Essen).` },
    { id: "memnon", anders: "Euer Freund setzt die Kolosse vor das Mittagessen. Ich lege sie ans Ende, weil sie an der Hauptstraße Richtung Fähre liegen, also auf dem Heimweg. Beides geht, sie brauchen nur eine Viertelstunde.", freund: 1, art: "west", t: "Memnonkolosse", zeit: "jederzeit sichtbar", dauer: "15 min", preis: 0, guide: "gut allein",
      txt: "Zwei sitzende Riesen an der Hauptstraße, frei zugänglich. Sucht am nördlichen die Bruchlinie und die Inschriften auf den Beinen.",
      more: `Die Geschichte vom singenden Koloss und Kaiser Hadrian: <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.` },
    { id: "ramesseum", art: "west", t: "Ramesseum", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1 h", preis: 220, guide: "gut allein",
      txt: "Totentempel Ramses’ II. mit dem umgestürzten Riesen. Meist leer, gut zum Selbstentdecken.",
      more: `<a href="${EGY}Ramesseum">Offizielle Seite</a>.` },
    { id: "koeniginnen", freund: 1, art: "west", t: "Tal der Königinnen", zeit: "ab 6:00, letzter Einlass 16:00", dauer: "1 h", preis: 220, guide: "Guide lohnt",
      txt: "Viele Standardtouren fahren hierher statt nach Medinet Habu. Das Grab der Nefertari kostet extra 2500 Pfund.",
      more: `<a href="${EGY}ValleyoftheQueens">Offizielle Seite</a>, Nefertari in der <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
    { id: "carter", art: "west", t: "Carter-Haus mit Nachbau des Tutanchamun-Grabs", zeit: "ab 6:00", dauer: "45 min", preis: 220, guide: "gut allein",
      txt: "Das Haus, in dem Howard Carter wohnte, als er Tutanchamun fand. An der Straße zum Tal der Könige.",
      more: `Preis: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },

    // ---------- Ostufer ----------
    { id: "karnak", freund: 1, art: "ost", t: "Karnak", zeit: "7:00–9:30", dauer: "2–3 h", preis: 600, guide: "Guide lohnt",
      txt: "Der riesige Tempel des Amun mit der Großen Säulenhalle. Mit eurem Guide ab 7 Uhr, solange es kühl und ruhig ist.",
      more: `<a href="${EGY}KarnakTemple">Offizielle Seite</a>. Mit den Tickets von Karnak und Luxor-Tempel dürft ihr auch auf die Sphinx-Allee. <a href="../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html">Lektion 13</a>.` },
    { id: "karnak-guide", freund: 1, gebucht: 1, art: "ost", t: "Euer Guide in Karnak", zeit: "7:00–9:30", dauer: "2–3 h", preis: null, guide: "Guide",
      txt: "Um 7 Uhr in Karnak, etwa zwei Stunden. In eurer Nachricht steht „Karnak und der Amun-Tempel“: Das ist derselbe Ort, der große Bezirk in der Mitte von Karnak gehört dem Gott Amun-Re. Kurz beim Guide klären, damit er nicht den Tempel von Luxor mitmeint, den macht ihr am Nachmittag selbst.",
      more: "Was ihr dort hört, hilft am Nachmittag im Tempel von Luxor, der ebenfalls Amun geweiht war. Eure Nachricht an den Guide: <em>Montag: Wir möchten um 7:00 Uhr mit dem Tempel von Karnak und dem Amun-Tempel beginnen. Wir denken, dass uns an diesem Tag etwa 2 Stunden reichen würden.</em>" },
    { id: "luxortempel", freund: 1, art: "ost", t: "Tempel von Luxor, bis es dunkel ist", zeit: "letzter Einlass 19:00", dauer: "1,5–2 h", preis: 500, guide: "gut allein",
      txt: "Gegen 16 Uhr hinein, im Tageslicht anschauen; die Sonne geht gegen 17 Uhr unter, dann gehen die Lichter an.",
      more: `<a href="${EGY}LuxorTemple">Offizielle Seite</a>: letzter Einlass 19 Uhr, auch im Winter. Moschee Abu el-Haggag oben auf dem Tempel: <a href="../lessons/0011-beten-ist-besser-als-schlafen.html">Lektion 11</a>.` },
    { id: "souk", freund: 1, art: "ost", t: "Souk und Altstadt", zeit: "Nachmittag oder Abend", dauer: "1–2 h", preis: 0, guide: "gut allein",
      txt: "Der Markt hinter dem Tempel von Luxor, ein Teil überdacht. Vorne am meisten Schlepper, weiter hinten kaufen Einheimische. Gewürze, Tücher, Obst.",
      more: `Wikivoyage beschreibt den alten, teils mit Holzgitter überdachten Markt nahe dem Tempel und warnt vor viel Anwerben in der Hauptgasse (<a href="https://en.wikivoyage.org/wiki/Luxor">Wikivoyage Luxor</a>). Handeln und Gewürze: <a href="../lessons/0012-pfeffer-in-der-wueste.html">Lektion 12</a>, Zahlen: <a href="../lessons/0010-die-null-ist-ein-punkt.html">Lektion 10</a>.` },
    { id: "corniche", freund: 1, art: "ost", t: "Spaziergang auf der Corniche", zeit: "jederzeit", dauer: "30–60 min", preis: 0, guide: "gut allein",
      txt: "Die Uferstraße vom Tempel von Luxor nach Norden, mit Blick hinüber auf eure Seite und die Berge.",
      more: `Lage: <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },
    { id: "museum", freund: 1, art: "ost", t: "Luxor-Museum", zeit: "9–13 und 17–20 Uhr Einlass", dauer: "1–1,5 h", preis: 400, guide: "gut allein",
      txt: "Kleines, schön beleuchtetes Museum direkt beim Anleger der Fähre. Hat auch abends offen, ein guter Plan für nach Sonnenuntergang.",
      more: `Winterzeiten: <a href="${EGY}LuxorMuseum">offizielle Seite</a>.` },
    { id: "mumien", art: "ost", t: "Mumifizierungsmuseum", zeit: "9–13 und 17–20 Uhr", dauer: "45 min", preis: 220, guide: "gut allein",
      txt: "Wie man einbalsamierte, mit Werkzeugen und Tiermumien. An der Corniche beim Tempel von Luxor.",
      more: `Preis und Zeiten: <a href="https://mota.gov.eg/media/5a2ja2iu/ticket-english-5-11-2024-1.pdf">Preisliste</a>.` },
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
    { id: "guide-west", freund: 1, gebucht: 1, art: "orga", t: "Euer Guide am Westufer: Tal der Könige", zeit: "7:00–11:00", dauer: "4 h", preis: null, guide: "Guide",
      txt: "Um 7 Uhr beginnt ihr im Tal der Könige, mit dem Grab Ramses’ V./VI. und, statt des geschlossenen Ramses II., mit Ramses III. Hatschepsut ist gestrichen, also mehr Zeit im Tal. Danach setzt euch der Fahrer am Café Maratonga ab, Medinet Habu macht ihr selbst.",
      more: `Eure Nachricht an den Guide: <em>Sonntag: Wir möchten um 7:00 Uhr mit dem Tal der Könige beginnen, einschließlich des Grabes von Ramses V./VI. und, wenn möglich, von Ramses II. und/oder III. Anschließend möchten wir gerne den Tempel der Hatschepsut besuchen. Vier Stunden sollten für uns perfekt sein.</em><br>Neu (14.11.): Hatschepsut fällt weg. Dem Guide sagen, dass ihr lieber mehr Zeit im Tal habt und er euch danach am Café Maratonga gegenüber Medinet Habu absetzt.<br>Ramses II. (KV7) ist nicht offen, Ramses III. (KV11) liegt auf dem Grundticket: ${WS}. Beim Guide klären: Abholzeit (das Tal liegt rund 20 Minuten Fahrt von euch, also gegen 6:40) und ob der Fahrer euch zum Schluss am Café Maratonga gegenüber Medinet Habu absetzt.` },
    { id: "taxi-west", art: "orga", t: "Selbst entdecken: Taxi für den Tag", zeit: "ab 6:30", dauer: "ganzer Tag", preis: null, guide: "selbst",
      txt: "Ein Fahrer bringt euch von Stätte zu Stätte und wartet. Ihr lest vor Ort die Lektionen. Billiger, freier, aber ohne Erklärungen.",
      more: `500–1000 Pfund für den Tag, je nach Verhandlung (<a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>).` },
    { id: "fr15g", art: "orga", t: "Früh aufstehen, Abholung gegen 6:40", zeit: "5:45–6:40", dauer: "1 h", preis: null, guide: "—",
      txt: "Um 7 Uhr beginnt der Guide im Tal der Könige, rund 20 Minuten Fahrt von euch. Gibt es so früh noch kein Frühstück, am Abend vorher nach einem Paket fragen." },
    { id: "fr16g", art: "orga", t: "Früh aufstehen, um 6:30 los nach Karnak", zeit: "5:45–6:30", dauer: "45 min", preis: null, guide: "—",
      txt: "Fähre hinüber, drüben ein paar Minuten Taxi oder 25 Minuten zu Fuß: Um 7 Uhr wartet der Guide in Karnak." },
    { id: "taxi-nachm", art: "orga", t: "Mittags nach Medinet Habu, später heim", zeit: "ca. 11:00", dauer: "15 min", preis: null, guide: "selbst",
      txt: "Am einfachsten setzt euch der Fahrer des Guides nach dem Tal der Könige am Café Maratonga ab, gegenüber Medinet Habu. Wichtig: Die Karte für Medinet Habu gibt es nicht am Tempel. Lasst den Fahrer an der Hauptkasse halten oder kauft sie vorher online. Heim zur Fähre sind es knapp 5 Kilometer: den Fahrer fragen, ob er wartet (Preis vorher), oder per inDrive bestellen.",
      more: `inDrive und Taxi: <a href="../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html">Lektion 14</a>.` },
    { id: "pause16", art: "orga", t: "Mittagspause in der Unterkunft", zeit: "ca. 14:00–15:30", dauer: "1,5 h", preis: null, guide: "—",
      txt: "Seit Viertel vor sechs auf den Beinen: mit der Fähre heim, ausruhen. Um halb vier mit dem Motorboot direkt zum Tempel von Luxor." },
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
      more: `HappyCow markiert vegetarische Optionen, ein Vegan-Führer bewertet das vegane Angebot als schwach (<a href="https://www.happycow.net/widget/africa/egypt/luxor/">HappyCow</a>, <a href="https://spinach.guide/venues/nubian-house-14452/">spinach.guide</a>). Vorher fragen, was ohne Fleisch, Fisch und Butter geht.` },
    { id: "tutanchamun", anders: "Wie euer Freund, aber mit einer Warnung, die er nicht nennt: Wikivoyage berichtet von Karten ohne Preise und überhöhten Rechnungen. Lasst euch vor dem Bestellen eine Karte mit Preisen geben.", freund: 1, art: "essen", t: "Tutankhamun Restaurant", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse am Nil, 200 m südlich des Anlegers, festes Menü mit Hauptgang nach Saison. Wikivoyage warnt: Karte mit Preisen verlangen, bevor ihr bestellt.",
      more: `<a href="https://en.wikivoyage.org/wiki/Luxor/West_Bank">Wikivoyage Luxor/West Bank</a>. Erste Wahl eures Freundes nach dem Westufer-Tag.` },
    { id: "sunflower", freund: 1, art: "essen", t: "Sunflower", ufer: "West", zeit: "11–23 Uhr", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse direkt am Anleger, links, wenn der Fluss hinter euch liegt. Entspannt, ägyptisches Menü, schenkt Alkohol aus.",
      more: `<a href="https://en.wikivoyage.org/wiki/Luxor/West_Bank">Wikivoyage Luxor/West Bank</a>.` },
    { id: "maratonga", anders: "Euer Freund schreibt nur „Mittagessen“. Ich schlage Maratonga vor, weil es gegenüber von Medinet Habu liegt, wohin ihr nach dem Essen geht, und vegane Salate hat.", art: "essen", t: "Café Maratonga, vor Medinet Habu", ufer: "West", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Schattiger Garten gegenüber dem Tempel, Salate mit veganer Auswahl, Bier. Perfekt als Mittagspause am Westufer-Tag.",
      more: `<a href="https://www.lonelyplanet.com/pois/437446">Lonely Planet</a>, vegane Salate laut <a href="https://spinach.guide/venues/cafe-restaurant-maratonga-14455/">spinach.guide</a>.` },
    { id: "marsam", art: "essen", t: "Marsam Hotel, Hofgarten", ufer: "West", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Altes Haus hinter den Memnonkolossen, Essen im Hof, Tagesmenü aus dem eigenen Garten. 200–350 Pfund pro Kopf.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>.` },
    { id: "wannas", art: "essen", t: "Wannas Art Café", ufer: "West", zeit: "tagsüber", dauer: "", preis: null, guide: "—",
      txt: "Buntes vegetarisches Café, zugleich Galerie, mit frischen Säften. Günstig.",
      more: `<a href="https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576">HappyCow</a>, <a href="https://exploreluxor.org/where-to-eat-in-luxor/">Explore Luxor</a>.` },
    { id: "sahaby", anders: "Wie euer Freund. Nur: Zur besten Zeit für die Dachterrasse, dem Sonnenuntergang gegen 17 Uhr, seid ihr laut Plan im Tempel von Luxor. Esst also danach, oder zieht den Tempel auf den frühen Nachmittag, wenn ihr den Sonnenuntergang lieber vom Dach seht.", freund: 1, art: "essen", t: "Al-Sahaby Lane", ufer: "Ost", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Seit den 1930ern in Familienhand, Dachterrasse beim Tempel von Luxor. Einfache ägyptische Küche, 200–400 Pfund pro Kopf. Tische zum Sonnenuntergang Tage vorher reservieren.",
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>. Wahl eures Freundes für den Ostufer-Abend.` },
    { id: "sofra", anders: "Euer Freund hatte Sofra zuerst vorgeschlagen und dann für den Abend durch Al-Sahaby Lane ersetzt. Ich setze Sofra auf das „späte Mittagessen“ am Ostufer, weil es viele vegane Gerichte hat. Achtung: nur bar.", art: "essen", t: "Sofra", ufer: "Ost", zeit: "11–24 Uhr", dauer: "", preis: null, guide: "—",
      txt: "Ägyptische Küche in einer alten Villa, mit vielen veganen Gerichten und frischen Säften. Kein Alkohol, nur bar, abends Tage vorher reservieren.",
      more: `Vegan laut <a href="https://www.happycow.net/reviews/sofra-luxor-146635">HappyCow</a>, bar und reservieren laut <a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide</a>, Zeiten laut <a href="https://en.wikivoyage.org/wiki/Luxor/East_Bank">Wikivoyage</a>.` },
    { id: "thebes", anders: "Nicht von eurem Freund, aber euch in Luxor wärmstens empfohlen. Ich setze es als Alternative an beide Westufer-Abende und für den Ostufer-Abend nach der Fähre: Es liegt rund 300 m südlich des Anlegers, und es hat von allen Lokalen im Plan die beste vegane Auswahl.", art: "essen", t: "Thebes (Tebaa) Bar & Grill", ufer: "West", zeit: "ca. 7:30–22:30", dauer: "", preis: null, guide: "—",
      txt: "Dachterrasse mit Nilblick am Westufer, nahe dem Anleger. Eigene vegane Karte mit etwa fünf bis zehn Gerichten: Linsen-Kofta, Falafel, vegane Moussaka, Curry, Tajine, Mezze, Hummus, Baba Ghanoush, Linsensuppe, dazu vegane Würstchen und Tagesgerichte. Auch Frühstück. Bier und Wein. 250–500 Pfund pro Kopf. Vorsicht beim veganen Burger: Ein Gast fand Mayonnaise mit Ei darin; nachfragen.",
      more: `Vegane Karte, „sehr vegan-freundlich“ und Lage laut <a href="https://spinach.guide/venues/thebes-bar-and-grill-14456/">spinach.guide</a> (Stand 13.11.2026); Gerichte, Ei-Mayo und Öffnungszeiten laut <a href="https://www.happycow.net/reviews/thebes-bar-and-grill-luxor-327206">HappyCow</a> (dort freitags erst ab 13 Uhr), Google nennt täglich 7:30–23 Uhr. „Die stärkste vegane und vegetarische Küche, die ich in Luxor gefunden habe“, Bier, Wein und Preis laut <a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide</a>; der schreibt Ostufer, euer Google-Link und beide Vegan-Führer zeigen aber dasselbe Haus am Westufer (Plus-Code PJ2M+Q54). Reservieren per Telefon.` },
    { id: "snobs", art: "essen", t: "Snobs", ufer: "Ost", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Eigentlich ein Steakhaus, aber mit eigener vegetarischer und veganer Karte, nicht nur Beilagen.",
      more: `<a href="https://exploreluxor.org/where-to-eat-in-luxor/">Explore Luxor, September 2026</a>.`, map: gm("Snobs Restaurant, Luxor") },
    { id: "koschari", art: "essen", t: "Koschari auf die Hand", ufer: "Ost", zeit: "mittags", dauer: "", preis: null, guide: "—",
      txt: "Reis, Nudeln, Linsen, Kichererbsen, Tomatensoße, Röstzwiebeln: vegan und billig, in jedem Koschari-Laden der Altstadt.",
      more: `Was drin ist und wie ihr bestellt: <a href="../lessons/0012-pfeffer-in-der-wueste.html">Lektion 12</a>.` },

    // ---------- Weitere Ideen eures Freundes ----------
    { id: "nilepalace", freund: 1, art: "essen", t: "West Bank Nile Palace", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      anders: "Ungeprüft: Euer Freund nennt Dachterrasse mit Nilblick, ägyptisch-mediterrane Küche, 4,9 bei wenigen Bewertungen, 200–600 Pfund. Ich habe keine Quelle gefunden, die das Restaurant beschreibt. Vor Ort anschauen und Karte zeigen lassen.",
      txt: "Laut eurem Freund: ruhiger Abend zu zweit, Dachterrasse mit Blick auf den Nil, nahe eurer Unterkunft." },
    { id: "sayeda", freund: 1, art: "essen", t: "El Sayeda Zainab", ufer: "West", zeit: "laut Eintrag 11–2 Uhr", dauer: "", preis: null, guide: "—",
      anders: "Ungeprüft: Die Seite, die euer Freund nennt (cybo), hat mich nicht hereingelassen, eine zweite Quelle habe ich nicht gefunden. Ob es dort vegane Gerichte gibt, ist offen.",
      txt: "Laut eurem Freund: lokal und günstig, an der Hauptstraße am Westufer, weniger Aussicht, mehr Alltag." },
    { id: "bluesky", freund: 1, art: "trinken", t: "Blue Sky, Dachterrasse", ufer: "West", zeit: "Sonnenuntergang", dauer: "", preis: null, guide: "—",
      anders: "Ich setze Blue Sky nur für einen Drink ein, nicht zum Essen: Gelobt wird dort vor allem gegrillter Fisch. Und vom Westufer seht ihr den Himmel über dem Tempel von Luxor glühen, die Sonne selbst geht hinter euch unter. Eine weitere Quelle als die eures Freundes (trip.com) habe ich nicht gefunden.",
      txt: "Laut eurem Freund: entspannte Dachterrasse mit Nilblick, gut nach der Feluke." },
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
      more: `<a href="https://www.theluxorguide.com/city/luxor/articles/where-to-eat-in-luxor-after-a-day-at-the-temples">The Luxor Guide, August 2026</a>.` },
    { id: "gezira", art: "trinken", t: "El Gezira, Dachrestaurant", ufer: "West", zeit: "abends", dauer: "", preis: null, guide: "—",
      txt: "Dach nahe dem Anleger, laut einer Bewertung „gut für ein ruhiges Bier am Ende des Tages“.",
      more: `<a href="https://www.tripadvisor.com/Restaurant_Review-g294205-d25263926-Reviews-El_Gezira_Restaurant-Luxor_Nile_River_Valley.html">Tripadvisor</a>.` },
    { id: "winterpalace", art: "trinken", t: "Sundowner im Winter Palace", ufer: "Ost", zeit: "vor Sonnenuntergang", dauer: "1 h", preis: null, guide: "—",
      txt: "Das alte Grandhotel an der Corniche. Von der Terrasse schaut ihr nach Westen über den Nil, die Sonne geht hinter den Bergen des Westufers unter. Auch für Nicht-Gäste.",
      more: `Terrasse und Royal Bar laut Reiseberichten auch für Gäste von außen (<a href="https://shezlikethewind.com/2020/12/23/cocktails-afternoon-tea-and-a-sunset-at-winter-palace-in-luxor-egypt/">Reisebericht 2020</a>). Ordentlich angezogen hingehen, Preise eines Luxushotels.` },
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
  const L15 = ["📖 Lektion 15: euer Rundgang", "../lessons/0015-ein-bierzimmer-fuer-die-richter.html"];
  const GUIDES = ["👤 Private Guides in Luxor (GoWithGuide)", "https://gowithguide.com/egypt/luxor/guides"];
  const ANLEGER_W = "https://www.google.com/maps/search/?api=1&query=25.70491,32.63566";
  const ANLEGER_O = "https://www.google.com/maps/search/?api=1&query=25.70845,32.64388";

  const LINKS = {
    tdk: [OFF("ValleyOfKings"), TICKETS, L13],
    kv9: [PREISE, L13], tut: [PREISE], sethos: [PREISE],
    hatschepsut: [OFF("HatshepsutTemple"), TICKETS],
    deir: [MEMPHIS, PREISE, TICKETS],
    medinet: [L15, OFF("MedinetHabu"), TICKETS],
    memnon: [L13, MEMPHIS],
    ramesseum: [OFF("Ramesseum"), TICKETS],
    koeniginnen: [OFF("ValleyoftheQueens"), TICKETS],
    carter: [OFF("CarterHouse"), PREISE],
    karnak: [OFF("KarnakTemple"), TICKETS],
    "karnak-guide": [OFF("KarnakTemple"), L13],
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
    "guide-west": [["📋 Offene Gräber, Nov. 2026", "https://www.weseektravel.com/best-tombs-in-valley-of-the-kings/"], L13],
    "taxi-west": [["🚕 inDrive Luxor", "https://indrive.com/en-eg/cities/luxor"], L14],
    abfahrt: [["🚐 mytransfers", "https://www.mytransfers.com/de/destination/agypten/flughafen-luxor-lxr/hurghada/"], GYG("Luxor Hurghada airport private transfer")],
    luxorpass: [WEB("Luxor Pass egymonuments price"), ["📰 CairoScene 2025", "https://cairoscene.com/buzz/cairo-luxor-passes-expensive"]],
    ostwest: [GYG("Luxor East and West Bank one day private tour")],
    kaffee: [], pause: [], ankommen: [["📍 Anleger Westufer", ANLEGER_W]], fr15: [], fr16: [], fr15g: [], fr16g: [], pause16: [], "taxi-nachm": [["🚕 inDrive Luxor", "https://indrive.com/en-eg/cities/luxor"], L14], fruehstueck: [],
    // Essen und Trinken
    nubian: [TA("Nubian House restaurant"), FREUND("mapquest.com", "Nubian House")],
    tutanchamun: [TA("Tutankhamun Restaurant West Bank"), ["📘 Wikivoyage Westufer", "https://en.wikivoyage.org/wiki/Luxor/West_Bank"], FREUND("tripadvisor.com", "Tutankhamon Restaurant")],
    sunflower: [TA("Sunflower Restaurant West Bank"), FREUND("wanderboat.ai", "Sunflower")],
    maratonga: [TA("Maratonga Cafe Medinet Habu"), ["📘 Lonely Planet", "https://www.lonelyplanet.com/pois/437446"]],
    marsam: [TA("Marsam Hotel"), WEB("Marsam Hotel")],
    wannas: [["🌱 HappyCow", "https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576"], TA("Wannas Art Cafe")],
    sahaby: [["🌐 Offizielle Seite mit Speisekarte", "https://www.nefertitihotel.com/al-sahaby-lane-restaurant"], TA("Al-Sahaby Lane")],
    sofra: [["🌱 HappyCow", "https://www.happycow.net/reviews/sofra-luxor-146635"], TA("Sofra Restaurant")],
    thebes: [["🌱 spinach.guide", "https://spinach.guide/venues/thebes-bar-and-grill-14456/"], ["🌱 HappyCow", "https://www.happycow.net/reviews/thebes-bar-and-grill-luxor-327206"], TA("Thebes Bar and Grill")],
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
    "guide-west": gm("Valley of the Kings, Luxor"), "taxi-west": gm("Valley of the Kings, Luxor"), "mittag-west": gm("Medinet Habu, Luxor"), "taxi-nachm": gm("Maratonga Cafe, Medinet Habu, Luxor"),
    fr15: null, fr16: null, fr15g: null, fr16g: null, pause16: null, fruehstueck: null, pause: null, ankommen: null, faehre: null, zurueck: null, motorboot: null, rad: null,
    abfahrt: gm("Hurghada International Airport"), luxorpass: null, ostwest: null,
  };
  window.PLAN_BAUSTEINE.forEach((b) => {
    b.links = LINKS[b.id] || [];
    if (!b.map && KARTE[b.id]) b.map = KARTE[b.id];
  });

  // ---------- Orte für die Karte (reference/karte.html) ----------
  // Jeder Ort steht hier einmal; die Bausteine verweisen über ORT darauf. So zeigen Reiseplan und Karte
  // immer dieselben Orte: Ein neuer Baustein mit Ort erscheint von selbst als Pin, mehrere Bausteine am
  // selben Ort (Zusatzgräber, Zweitkarten der Lokale) teilen sich einen Pin.
  // geo: [Breite, Länge] aus OpenStreetMap (Nominatim), abgerufen am 12. November 2026.
  // q: Suchbegriff für Google Maps. typ: staette | museum | sonst | wege | lokal. icon: eigenes Symbol statt dem des Typs.
  // txt, lesen: für Orte, die keine Karte im Plan haben (aus Lektionen und „Luxor zum Nachschlagen“); lesen auch sonst.
  // linie: Verlauf als Linie, etwa die Sphinx-Allee (OpenStreetMap, Weg 90384477).
  // mahl (nur Lokale): fruehstueck | mittag | abend | drinks, nach Öffnungszeiten und Angaben auf den Karten.
  // ungefaehr: Lage nur aus einer Beschreibung abgeleitet. Die Unterkunft selbst steht nicht hier (öffentliches Repo), nur der Weg nach Hause.
  window.PLAN_ORTE = {
    // Tempel und Gräber
    tdk: { name: "Tal der Könige", geo: [25.74049, 32.60176], q: "Valley of the Kings, Luxor", typ: "staette" },
    hatschepsut: { name: "Tempel der Hatschepsut", geo: [25.73724, 32.60869], q: "Temple of Hatshepsut, Luxor", typ: "staette" },
    deir: { name: "Deir el-Medina", geo: [25.72838, 32.60104], q: "Deir el-Medina, Luxor", typ: "staette" },
    medinet: { name: "Medinet Habu", geo: [25.71997, 32.60073], q: "Medinet Habu, Luxor", typ: "staette" },
    memnon: { name: "Memnonkolosse", geo: [25.72049, 32.61044], q: "Colossi of Memnon, Luxor", typ: "staette" },
    ramesseum: { name: "Ramesseum", geo: [25.72805, 32.61000], q: "Ramesseum, Luxor", typ: "staette" },
    koeniginnen: { name: "Tal der Königinnen", geo: [25.72772, 32.59276], q: "Valley of the Queens, Luxor", typ: "staette" },
    karnak: { name: "Karnak", geo: [25.71840, 32.65825], q: "Karnak Temple, Luxor", typ: "staette" },
    luxortempel: { name: "Tempel von Luxor", geo: [25.69953, 32.63907], q: "Luxor Temple", typ: "staette" },
    // Museen
    museum: { name: "Luxor-Museum", geo: [25.70766, 32.64449], q: "Luxor Museum", typ: "museum" },
    mumien: { name: "Mumifizierungsmuseum", geo: [25.70253, 32.63988], q: "Mummification Museum, Luxor", typ: "museum" },
    carter: { name: "Carter-Haus", geo: [25.73889, 32.62817], q: "Howard Carter House, Luxor", typ: "museum" },
    // Übrige Sehenswürdigkeiten und Wege
    souk: { name: "Souk", geo: [25.69804, 32.64655], q: "Luxor Souq, Luxor", typ: "sonst" },
    corniche: { name: "Corniche", geo: [25.70550, 32.64190], q: "Corniche El Nile, Luxor", typ: "sonst" },
    haggag: { name: "Moschee des Abu el-Haggag", geo: [25.69999, 32.63965], q: "Abu Haggag Mosque, Luxor", typ: "sonst", icon: "🕌",
      txt: "Fast neun Meter über dem Boden auf Hof und Mauer Ramses’ II. gebaut, oben auf dem Tempel von Luxor. Zugang über eine Treppe von der Straße, nicht vom Tempel aus." },
    sphinx: { name: "Sphinx-Allee", geo: [25.70713, 32.64724], q: "Avenue of Sphinxes, Luxor", typ: "sonst", linie: [[25.70075, 32.64022], [25.71355, 32.65422]],
      txt: "2,7 Kilometer von Karnak bis zum Tempel von Luxor, die Strecke der Götterstatuen zum Opet-Fest. Seit 2021 wieder offen, Zugang mit den Tickets beider Tempel." },
    // Wege und Praktisches
    "anleger-west": { name: "Fähranleger Westufer", geo: [25.70494, 32.63562], q: "25.70491,32.63566", typ: "wege", icon: "⛴️" },
    "anleger-ost": { name: "Fähranleger Ostufer", geo: [25.70845, 32.64388], q: "25.70845,32.64388", typ: "wege", icon: "⛴️" },
    krankenhaus: { name: "El Karnak International Hospital", geo: [25.70872, 32.64552], q: "El Karnak International Hospital, Luxor", typ: "wege", icon: "🏥",
      txt: "Gegenüber legt die Fähre am Ostufer an, kurz vor dem Luxor-Museum. Eine gute Wegmarke, und gut zu wissen, wo es ist." },
    heim: { name: "Weg nach Hause (Golden Mountain)", geo: [25.7050978, 32.6312600], q: "25.7050978,32.6312600", typ: "wege", icon: "🏠",
      txt: "Hier geht es nach Hause. Vom Fähranleger am Westufer gut 400 Meter nach Westen, landeinwärts." },
    bahnhof: { name: "Bahnhof Luxor", geo: [25.69654, 32.64497], q: "Luxor Railway Station", typ: "wege", icon: "🚉",
      txt: "Am Ostufer hinter der Altstadt und dem Souk. Eine Wegmarke, falls ihr euch in den Gassen verlauft." },
    // Lokale
    nubian: { name: "Nubian House", geo: [25.69843, 32.63077], q: "Nubian House restaurant, West Bank, Luxor", typ: "lokal", mahl: ["abend"] },
    tutanchamun: { name: "Tutankhamun Restaurant", geo: [25.70325, 32.63415], q: "Tutankhamun Restaurant, West Bank, Luxor", typ: "lokal", mahl: ["abend"],
      ungefaehr: "In OpenStreetMap nicht verzeichnet. Der Pin steht dort, wo Wikivoyage das Lokal beschreibt: am Nil, etwa 200 m südlich des Anlegers." },
    sunflower: { name: "Sunflower", geo: [25.70308, 32.63341], q: "Sunflower Restaurant, West Bank, Luxor", typ: "lokal", mahl: ["mittag", "abend", "drinks"] },
    maratonga: { name: "Café Maratonga", geo: [25.71822, 32.60232], q: "Maratonga Cafe, Medinet Habu, Luxor", typ: "lokal", mahl: ["mittag"] },
    marsam: { name: "Marsam Hotel", geo: [25.72420, 32.60660], q: "Marsam Hotel, Luxor", typ: "lokal", mahl: ["mittag"] },
    wannas: { name: "Wannas Art Café", geo: [25.70468, 32.63255], q: "Wannas Art Cafe, Luxor", typ: "lokal", mahl: ["fruehstueck", "mittag", "abend"] },
    sahaby: { name: "Al-Sahaby Lane", geo: [25.70150, 32.64233], q: "Al-Sahaby Lane Restaurant, Luxor", typ: "lokal", mahl: ["abend"] },
    sofra: { name: "Sofra", geo: [25.69489, 32.64226], q: "Sofra Restaurant, Luxor", typ: "lokal", mahl: ["mittag", "abend"] },
    nilepalace: { name: "West Bank Nile Palace", geo: [25.70182, 32.63308], q: "West Bank Nile Palace Restaurant, Luxor", typ: "lokal", mahl: ["abend"] },
    sayeda: { name: "El Sayeda Zainab", geo: [25.70922, 32.63126], q: "El Sayeda Zainab Restaurant, West Bank, Luxor", typ: "lokal", mahl: ["mittag", "abend"] },
    bluesky: { name: "Blue Sky", geo: [25.70205, 32.63328], q: "Blue Sky Restaurant, West Bank, Luxor", typ: "lokal", mahl: ["drinks", "abend"] },
    nilevalley: { name: "Nile Valley Hotel", geo: [25.70429, 32.63363], q: "Nile Valley Hotel, Luxor", typ: "lokal", mahl: ["drinks", "abend"] },
    gezira: { name: "El Gezira", geo: [25.70508, 32.63283], q: "El Gezira Hotel, Luxor", typ: "lokal", mahl: ["drinks", "abend"] },
    winterpalace: { name: "Winter Palace", geo: [25.69624, 32.63801], q: "Sofitel Winter Palace, Luxor", typ: "lokal", mahl: ["drinks"] },
    // Diese beiden aus euren Google-Maps-Links (Plus-Codes), nicht aus OpenStreetMap.
    thebes: { name: "Thebes (Tebaa)", geo: [25.70194, 32.63294], q: "PJ2M+Q54, Luxor", typ: "lokal", mahl: ["fruehstueck", "mittag", "abend", "drinks"] },
    hamada: { name: "Hamada Market", geo: [25.69996, 32.63189], q: "MJXJ+XQJ, Luxor", typ: "sonst", icon: "🛒",
      txt: "Von euch eingetragen: laut Google Maps in Al Bairat am Westufer, rund 200 m vom Nubian House. Eine andere Quelle habe ich nicht gefunden, was es dort gibt und wann offen ist, also vor Ort sehen." },
  };
  // Weiterlesen zu jedem Ort: Lektionen und „Luxor zum Nachschlagen“ (reference/luxor.html#ort-…).
  const LEKTION = { 11: "../lessons/0011-beten-ist-besser-als-schlafen.html", 12: "../lessons/0012-pfeffer-in-der-wueste.html",
    13: "../lessons/0013-ich-kann-die-hieroglyphen-nicht-lesen.html", 14: "../lessons/0014-fuenf-pfund-fuer-den-faehrmann.html",
    15: "../lessons/0015-ein-bierzimmer-fuer-die-richter.html" };
  const LESEN = {
    luxortempel: [11, 13, "luxortempel"], haggag: [11, "haggag"], karnak: [13, "karnak"], sphinx: [13, "sphinx"],
    memnon: [13, "memnon"], tdk: [13, "tdk"], deir: [13, "deir"], medinet: [15, 13, "medinet"], hatschepsut: [13, 15, "hatschepsut"],
    "anleger-west": [14, "faehre"], "anleger-ost": [14, "faehre"], krankenhaus: [14, "faehre"], bahnhof: [14], souk: [12], corniche: [14],
  };
  for (const [ort, was] of Object.entries(LESEN)) {
    window.PLAN_ORTE[ort].lesen = was.map((x) => typeof x === "number" ? [`📖 Lektion ${x}`, LEKTION[x]] : ["📘 Luxor zum Nachschlagen", `luxor.html#ort-${x}`]);
  }
  // Welcher Baustein liegt wo? Bausteine ohne Eintrag (Touren, Pausen, Koschari irgendwo,
  // Snobs ohne gefundene Lage) bekommen keinen Pin; die Karte listet sie unter „Ohne Pin“.
  const ORT = {
    tdk: "tdk", kv9: "tdk", tut: "tdk", sethos: "tdk", hatschepsut: "hatschepsut", deir: "deir", medinet: "medinet",
    memnon: "memnon", ramesseum: "ramesseum", koeniginnen: "koeniginnen", carter: "carter",
    karnak: "karnak", "karnak-guide": "karnak", soundlight: "karnak", luxortempel: "luxortempel",
    museum: "museum", mumien: "mumien", souk: "souk", corniche: "corniche", kaffee: "corniche",
    faehre: ["anleger-west", "anleger-ost"], zurueck: ["anleger-ost", "anleger-west"], motorboot: "anleger-west",
    feluke: "anleger-west", rad: "anleger-west",
    nubian: "nubian", tutanchamun: "tutanchamun", sunflower: "sunflower", maratonga: "maratonga", marsam: "marsam",
    wannas: "wannas", sahaby: "sahaby", sofra: "sofra", nilepalace: "nilepalace", sayeda: "sayeda", bluesky: "bluesky",
    nilevalley: "nilevalley", gezira: "gezira", winterpalace: "winterpalace", thebes: "thebes",
  };
  window.PLAN_BAUSTEINE.forEach((b) => {
    if (!ORT[b.id]) return;
    b.ort = [].concat(ORT[b.id]);
    if (!b.map && KARTE[b.id] !== null) b.map = gm(window.PLAN_ORTE[b.ort[0]].q); // KARTE null: Karte hat eigene Anleger-Links
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
      // Vormittage: eure Guides, wie angefragt
      "d15-frueh": ["fr15g", "guide-west", "-ballon", "-taxi-west"],
      // Hatschepsut gestrichen (Empfehlung vom 14.11.), dafür mehr Zeit im Tal und Medinet Habu in Ruhe
      "d15-vormittag": ["tdk", "kv9", "-tut", "-sethos", "-hatschepsut", "-carter"],
      // Nachmittag selbst: Medinet Habu liegt auf dem Heimweg vom Guide
      "d15-mittag": ["taxi-nachm", "maratonga", "-mittag-west", "-marsam"],
      "d15-nachmittag": ["medinet", "-deir", "memnon", "pause", "feluke", "-bluesky"],
      "d15-abend": ["tutanchamun", "-thebes", "-nilepalace", "-gezira"],
      "d16-frueh": ["fr16g", "faehre", "karnak", "karnak-guide"],
      // Danach schlendern: Museum, Kaffee, Souk, und ein, zwei Dinge selbst
      "d16-vormittag": ["museum", "kaffee", "-mumien", "-corniche"],
      "d16-mittag": ["souk", "saft", "sofra", "-koschari"],
      "d16-nachmittag": ["pause16", "motorboot", "luxortempel"],
      "d16-abend": ["sahaby", "-snobs", "-winterpalace", "-soundlight", "zurueck"],
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

  // ---------- Zweitkarten: weggehakte Lokale, die auch an einem anderen Ort des Plans in der Nähe liegen ----------
  // Jeder Baustein steht nur einmal im Plan. Liegt ein Lokal auch nahe einer anderen Station, bekommt es dort
  // eine weitere Karte (id "<original>@<slot>"), auch an mehreren Orten, weggehakt, damit es auch dort zur Wahl steht.
  const SPINACH_WANNAS = `<a href="https://spinach.guide/venues/wannas-art-cafe-14451/">spinach.guide</a>`;
  const ZWEIT = [
    ["sunflower", "d14-nachmittag", "Auch für den ersten Drink: Dachterrasse direkt am Anleger, schenkt Alkohol aus. Eine Alternative zum Nile Valley nebenan.", {}],
    ["sunflower", "d15-nachmittag", "Nach der Feluke legt ihr am Anleger an, und Sunflower liegt direkt dort: Dachterrasse mit Bier, eine Alternative zu Blue Sky.", {}],
    ["sunflower", "d15-abend", "Auch nach dem Westufer-Tag eine Wahl: Sunflower liegt direkt am Anleger, keine 200 m vom Tutankhamun. Euer Freund nennt es für diesen Abend als Alternative.", {}],
    ["wannas", "d14-nachmittag", "Zum Ankommen: Ein Café mit frischen Säften in Ramla, hinter dem Hotel Al Masala, ein Stück die Straße hoch vom Sunflower, also nahe dem Anleger und eurer Unterkunft.", { zeit: "ca. 9–22 Uhr", more: `Lage und Zeiten laut ${SPINACH_WANNAS} und <a href="https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576">HappyCow</a>.` }],
    ["wannas", "d15-abend", "Liegt in Ramla hinter dem Hotel Al Masala, ein Stück die Straße hoch vom Sunflower, also nahe dem Anleger und eurer Unterkunft. Offen etwa bis 22 Uhr.", { zeit: "ca. 9–22 Uhr", more: `Lage und Zeiten laut ${SPINACH_WANNAS} und <a href="https://www.happycow.net/reviews/wannas-art-cafe-luxor-191576">HappyCow</a>.` }],
    ["sayeda", "d15-abend", "Auch für den Sonntagabend: laut eurem Freund an der Hauptstraße am Westufer. Wie weit es von eurer Unterkunft liegt, vorher auf der Karte prüfen.", {}],
    ["bluesky", "d14-nachmittag", "Auch am Ankunftstag eine Option: Blue Sky liegt laut Bewertungen in Ramla am Westufer, am Nil nahe dem Anleger und damit nahe eurer Unterkunft. Eine Alternative zum Nile Valley für den ersten Drink.", {}],
    ["bluesky", "d14-abend", "Auch zum Essen am ersten Abend, nahe dem Anleger. Gelobt werden vor allem Gegrilltes, laut Bewertungen auch Pizza: nach Gerichten ohne Fleisch und Fisch fragen.", {}],
    ["bluesky", "d15-abend", "Auch zum Essen nach dem Westufer-Tag, nahe dem Anleger. Gelobt werden vor allem Gegrilltes, laut Bewertungen auch Pizza: nach Gerichten ohne Fleisch und Fisch fragen.", {}],
    ["nilepalace", "d14-abend", "Liegt laut eurem Freund nahe eurer Unterkunft, passt also auch zum ersten Abend.", {}],
    ["gezira", "d14-nachmittag", "Dach nahe dem Anleger, auch am Ankunftstag für ein Bier zum Sonnenuntergang nur ein paar Schritte von der Unterkunft.", {}],
    ["gezira", "d14-abend", "Liegt nahe dem Anleger am Westufer, also auch am Ankunftsabend nur ein paar Schritte von der Unterkunft.", {}],
    ["gezira", "d15-nachmittag", "Nach der Feluke seid ihr wieder am Anleger, und El Gezira liegt in der Nähe: ein ruhiges Bier am Ende des Tages.", {}],
    ["thebes", "d14-abend", "Auch für den ersten Abend: rund 300 m südlich des Anlegers, nahe eurer Unterkunft, mit der besten veganen Karte im Plan.", {}],
    ["thebes", "d16-abend", "Oder erst mit der Fähre heim und dann auf eurer Seite essen: Das Thebes liegt nahe dem Anleger am Westufer, die Küche schließt gegen halb elf.", {}],
    ["winterpalace", "d16-nachmittag", "Das Hotel steht an der Corniche gleich neben dem Tempel von Luxor. Wer den Sonnenuntergang sehen will, trinkt hier gegen 17 Uhr etwas und geht danach in den Tempel: Einlass bis 19 Uhr.", {}],
  ];

  const ORIG = Object.fromEntries(window.PLAN_BAUSTEINE.map((b) => [b.id, b]));
  ZWEIT.forEach(([orig, slot, warum, extra]) => {
    const b = ORIG[orig];
    const id = `${orig}@${slot}`;
    window.PLAN_BAUSTEINE.push(Object.assign({}, b, { id, zweit: orig, txt: warum + " " + b.txt }, extra));
    const liste = window.PLAN_VORSCHLAEGE.mein[slot];
    if (liste && !liste.includes("-" + id)) liste.push("-" + id);
  });
})();
