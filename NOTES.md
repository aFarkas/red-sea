# Notes

Der Kurs hat zwei Stränge: **Unter Wasser** (Meeresleben, etwa zwei Drittel) und **Über Wasser** (Land,
Leute, Sprache, Luxor, etwa ein Drittel). Diese Datei gilt für beide. Für eine Lektion zusätzlich lesen:

- Unter Wasser: `notes/unter-wasser.md`
- Über Wasser: `notes/ueber-wasser.md`

## Reise und Zeitplan

- Abreise um den 6. November 2026. Dann etwa sieben Tage Soma Bay bei Safaga (vor allem Tauchen, dazu
  Schnorcheln, vielleicht Kitesurfen, je ein Ausflug nach El Quseir und nach Safaga), danach drei Tage Luxor.
- Etwa eine Lektion pro Tag. Vor der Reise vor allem Über Wasser, im Urlaub vor allem Unter Wasser.
  Wann welche Lektion kommt, regeln die Notes des Strangs.

## Wie gelernt wird

- Sprache: Deutsch.
- Will staunen und erzählen können, nicht pauken. Keine bewerteten Quizze. „Was meinst du?“-Vorhersagen sind okay, weil sie neugierig machen; sparsam einsetzen.
- Wiederholung ist erwünscht, damit die Geschichten hängen bleiben. Form: Karte mit Frage, aufdecken, die Antwort erzählt die Geschichte noch einmal; dann Selbsteinschätzung „Wusste ich / Halb / Neu für mich“. Keine Punkte, keine Noten.
- Wiederholung, Ablauf: Karten in `assets/cards.js` (zu jeder neuen Lektion 5–10 Karten anlegen), Seite `reference/wiederholung.html`. Wörter, Sätze und Zahlen kommen zusätzlich als Wortkarten in `window.WORDS` (gleiche Datei); daraus baut die Seite die Runde „Sprache üben“ mit je einer Hör- und einer Sprechkarte (ids `<id>~hoeren`, `<id>~sprechen`). Beide Stränge teilen sich die Karten, damit eine Runde sie mischt. Preise übt die Runde „Preise umrechnen“: Umrechenkarten in `window.UMRECHNEN` (gleiche Datei), gebaut von `assets/umrechnen.js`, jede Runde mit neuen Beträgen, von Pfund in Euro und umgekehrt. Der Nutzer mag die Frage „Wie viel Euro sind x Pfund?“. Ändert sich der Kurs deutlich oder bringt eine Lektion neue Preise, dort nachführen. Der Nutzer kopiert das „Ergebnis für Claude“ in den Chat. Dann `assets/review-state.js` nachführen (`stand` = Zeitstempel aus „Wiederholung bis …“, je Karte `box` und `due` nach den Regeln in `assets/review.js`, `lektionen` ergänzen) und Auffälliges als Lernnotiz festhalten.
- Neue Lektionen beginnen mit einem „Weißt du noch?“-Kasten. Der Nutzer liest eher die neue Lektion, als die Wiederholungsseite zu öffnen, also ist dieser Kasten seine Hauptwiederholung. Er hat drei Karten und dazu eine Umrechenkarte. Die drei Karten sind solche aus `review-state.js`, die „neu“ oder „halb“ waren, am liebsten mit Bezug zum neuen Thema. Fehlen frische Bewertungen, nimm Karten aus den letzten Lektionen, die noch in keinem Kasten standen. Mindestens eine Karte kommt aus Sprache oder Zahlen, weil die dem Nutzer schwerfallen. Jedes arabische Wort in Frage und Antwort bekommt die Knöpfe „Ägyptisch“ (Aufnahme) und „Hocharabisch“ (Computerstimme): `<em data-wort="w-ahwa">ʾahwa</em>`, bei Wörtern in Anführungszeichen `<span data-wort="w-sabah-il-kheer">„sabāh il-chēr“</span>`. `assets/say.js` setzt die Knöpfe aus `window.WORDS` davor. Ein Wort ohne Eintrag dort bekommt erst einen, mit Aufnahme, `ar` und `hoch`. Dasselbe gilt für Geschichtenkarten in `assets/cards.js`. Der Kasten darf Karten aus dem anderen Strang nehmen. Die Umrechenkarte zieht bei jedem Öffnen einen neuen Betrag, in beide Richtungen:

  ```html
  <div data-umrechnen></div>
  ```

  als letztes Element im Kasten. Am Seitenende stehen die Skripte in dieser Reihenfolge: `cards.js`, `say.js`, `umrechnen.js`, jeweils aus `../assets/`. Mit einer id aus `window.UMRECHNEN` als Wert, etwa `data-umrechnen="umrechnen-schild"`, kommt genau diese Art.
- Format: kurze Geschichte + Aufträge für draußen („Halte Ausschau“) + Satz zum Erzählen auf dem Boot oder beim Abendessen.
- Interessiert sich für alles, besonders soziales Verhalten, bei Tieren wie bei Menschen.
- Forscher beim Namen nennen und erzählen, was genau sie gesehen oder ausprobiert haben. Dann ist man bei der Entdeckung dabei. Der Nutzer hat das an Lektion 8 und schon oft davor gelobt. Gilt über Wasser genauso: Ausgräber, Übersetzer, der Wörterbuchautor, der den Pförtner fragt.
- Sprachen und Zahlen fallen dem Nutzer schwer. Solches Wissen öfter und ausführlicher wiederholen als Geschichten, mit Aufdeckkarten und Ton. Details in `notes/ueber-wasser.md`.
- Mitlesende: die Freundin des Nutzers, mit der er taucht und reist. Sie ist Tauchanfängerin, Lektionenwünsche können von ihr kommen.
- Nach dem Tauchgang oder Ausflug nach Beobachtungen fragen. Das ist die echte Feedbackschleife.
- Echte Fotos gehören in jede Lektion, wo sie sinnvoll sind. Quelle: Wikimedia Commons (freie Lizenz, stabile URL), Fotograf und Lizenz in der Bildunterschrift. Jedes Foto vorher ansehen, ob es zeigt, was der Text sagt.

## Seitenpflege

- Jede neue Lektion bekommt einen Eintrag in `index.html` in der Liste ihres Strangs und einen Link in den `nav.course` der Nachschlageseiten. Der Eintrag ist ein `<li data-lektion="n">` mit Titel, `span.tag` (`Thema · ca. 10 Minuten`, ohne Strang, den zeigt der Abschnitt) und Lede.
- Jede neue Nachschlageseite bekommt einen Eintrag unter „Zum Nachschlagen“ in `index.html` und einen Link in den `nav.course` der anderen Nachschlageseiten.
- Kicker einer Lektion ab Lektion 9: `Lektion n · Strang · Thema · ca. 10 Minuten`, zum Beispiel `Lektion 9 · Über Wasser · Sprache · ca. 10 Minuten`. Die Lektionen 1–8 sind alle Unter Wasser und bleiben ohne Strang im Kicker.
- Die Nummern laufen über beide Stränge fort. Der Footer (`nav.course`) einer Lektion enthält nur drei Links in dieser Reihenfolge: „← Lektion n−1“, „Übersicht“ (`../index.html`) und „Lektion n+1 →“, egal aus welchem Strang. Der ersten Lektion fehlt der Link zurück, der letzten der nach vorn. Eine neue Lektion trägt sich also nur in den Footer ihrer Vorgängerin ein. Dieser Link ist auch in einer schon gelesenen Lektion erlaubt.
- Thema gehört dorthin, wo es schon behandelt wird: lieber eine bestehende Lektion erweitern als dasselbe Tier oder denselben Ort in einer neuen Lektion wiederholen. Spätere Lektionen greifen Früheres als Wiederholung auf (Abruf, Link). Ausnahme: Eine Lektion, die der Nutzer schon gelesen hat, wird nicht mehr erweitert. Was dort zu kurz kam, wird Teil einer neuen Lektion mit eigenem Thema (Beispiel: Lektion 7 „Das Riff knistert“ statt mehr Knall in Lektion 2).
- Ein Detail, das zum Staunen taugt, bekommt gleich beim ersten Mal Platz, auch wenn es nur Nebenthema ist. Drei Sätze für den Knall des Knallkrebses waren zu wenig.

## Was Lektion 1 so gut gemacht hat
Der Nutzer nennt Lektion 1 (Putzerstation) „richtig gut“, aus drei Gründen. Jedes neue Thema an allen dreien messen, auch über Wasser:
1. **Witzige, überraschende Details.** Putzer putzen ehrlicher, wenn jemand zusieht. Solche Pointen tragen die Lektion.
2. **Praxisnah: Man sieht es bei fast jedem Tauchgang.** Putzer und Putzerstationen begegnen einem ständig, und das Detail ist selbst sichtbar: Der Kunde zuckt, wenn der Putzer Schleim statt Parasiten frisst, also betrügt. Bestes Thema = etwas, dem man sicher begegnet + ein Detail, das man mit eigenen Augen erkennt. Das gilt auch für Korallen: Die pulsierende Weichkoralle in Lektion 6 kam aus demselben Grund sehr gut an.
3. **Echte Fakten, locker erzählt.** Belegt (Studien, Experimente, Ausgrabungen), aber im Ton einer Geschichte, nicht eines Lehrbuchs.
