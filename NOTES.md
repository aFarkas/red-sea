# Notes

- Sprache: Deutsch.
- Will staunen und erzählen können, nicht pauken. Keine bewerteten Quizze. „Was meinst du?“-Vorhersagen sind okay, weil sie neugierig machen; sparsam einsetzen.
- Wiederholung ist erwünscht, damit die Geschichten hängen bleiben. Form: Karte mit Frage, aufdecken, die Antwort erzählt die Geschichte noch einmal; dann Selbsteinschätzung „Wusste ich / Halb / Neu für mich“. Keine Punkte, keine Noten.
- Wiederholung, Ablauf: Karten in `assets/cards.js` (zu jeder neuen Lektion 5–10 Karten anlegen), Seite `reference/wiederholung.html`. Der Nutzer kopiert das „Ergebnis für Claude“ in den Chat. Dann `assets/review-state.js` nachführen (`stand` = Zeitstempel aus „Wiederholung bis …“, je Karte `box` und `due` nach den Regeln in `assets/review.js`, `lektionen` ergänzen) und Auffälliges als Lernnotiz festhalten.
- Neue Lektionen beginnen mit einem kurzen „Weißt du noch?“-Kasten: zwei, drei Karten aus `review-state.js`, die „neu“ oder „halb“ waren, am liebsten mit Bezug zum neuen Thema.
- Format: kurze Geschichte + „Halte Ausschau“-Aufträge für den Tauchgang + Satz zum Erzählen auf dem Boot.
- Interessiert sich für alles, besonders soziales Verhalten zwischen Tieren.
- Hat auch in Thailand getaucht; Vergleiche Thailand/Rotes Meer sind willkommen.
- Tauchgebiet: Hurghada/Safaga. Beispiele möglichst von dort oder aus dem Roten Meer.
- Nach dem Tauchgang nach Beobachtungen fragen. Das ist die echte Feedbackschleife.
- Echte Fotos gehören in jede Lektion, wo sie sinnvoll sind. Quelle: Wikimedia Commons (freie Lizenz, stabile URL), Fotograf und Lizenz in der Bildunterschrift. Jedes Foto vorher ansehen, ob es zeigt, was der Text sagt. Fotos aus dem Roten Meer bevorzugen.
- Zu jeder Art einen Link zur Google-Bildersuche (`a.more-photos`, `https://www.google.com/search?tbm=isch&q=<lateinischer Name>`), in Lektion und Glossar.

- Jede neue Lektion bekommt einen Eintrag in `index.html` (Titel, Kicker-Angaben, Lede) und einen Link in den `nav.course` der anderen Seiten.
- Thema gehört dorthin, wo die Art schon behandelt wird: lieber eine bestehende Lektion erweitern als dieselbe Art in einer neuen Lektion wiederholen. Spätere Lektionen greifen Früheres als Wiederholung auf (Abruf, Link).

## Ideen für nächste Lektionen
- Kultur bei Fischen (vom Nutzer gewünscht): Grunzer-Wanderrouten (Helfman & Schultz 1984), Paarungsplätze Blaukopf-Junker (Warner 1988), erst Verwandte im Roten Meer prüfen (Süßlippen, Junker). Abgrenzen gegen Gewöhnung (Valerio 2019, Eilat). Soziales Lernen der Putzer steht schon in Lektion 1: nicht neu erklären, sondern als Wiederholung einbauen (kurze Abruffrage + Link auf Lektion 1).
- Korallen: Tier, Pflanze, Stein? Symbiose mit Zooxanthellen, warum die Korallen im nördlichen Roten Meer Hitze aushalten.
- Gefährlich & giftig: Rotfeuerfisch, Steinfisch, Feuerkoralle, Drückerfisch im Nestrevier.
- Weitere Beziehungen: Anemonenfisch (Rotmeer-Anemonenfisch ist endemisch?) prüfen, Zackenbarsch und Muräne jagen gemeinsam (Bshary, Rotes Meer).
- Große Begegnungen: Schildkröten, Rochen, Delfine, Dugong.
- Papageifisch: Sand, Schlafsack aus Schleim.
