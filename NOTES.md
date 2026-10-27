# Notes

- Sprache: Deutsch.
- Will staunen und erzählen können, nicht pauken. Keine bewerteten Quizze. „Was meinst du?“-Vorhersagen sind okay, weil sie neugierig machen; sparsam einsetzen.
- Wiederholung ist erwünscht, damit die Geschichten hängen bleiben. Form: Karte mit Frage, aufdecken, die Antwort erzählt die Geschichte noch einmal; dann Selbsteinschätzung „Wusste ich / Halb / Neu für mich“. Keine Punkte, keine Noten.
- Wiederholung, Ablauf: Karten in `assets/cards.js` (zu jeder neuen Lektion 5–10 Karten anlegen), Seite `reference/wiederholung.html`. Der Nutzer kopiert das „Ergebnis für Claude“ in den Chat. Dann `assets/review-state.js` nachführen (`stand` = Zeitstempel aus „Wiederholung bis …“, je Karte `box` und `due` nach den Regeln in `assets/review.js`, `lektionen` ergänzen) und Auffälliges als Lernnotiz festhalten.
- Neue Lektionen beginnen mit einem kurzen „Weißt du noch?“-Kasten: zwei, drei Karten aus `review-state.js`, die „neu“ oder „halb“ waren, am liebsten mit Bezug zum neuen Thema.
- Format: kurze Geschichte + „Halte Ausschau“-Aufträge für den Tauchgang + Satz zum Erzählen auf dem Boot.
- Interessiert sich für alles, besonders soziales Verhalten zwischen Tieren.
- Mitlesende: die Freundin des Nutzers, mit der er taucht. Sie ist Tauchanfängerin, Lektionenwünsche können von ihr kommen. Gefährliche Tiere locker erzählen, ohne Angst zu machen. Sicherheit läuft auf „nichts anfassen“ hinaus, dazu höchstens zwei Sätze Erste Hilfe. Kein eigener Sicherheitsteil.
- Handzeichen für Tiere gehören in die Lektion, in der das Tier vorkommt, als Box `.signs` (Quelle: PADI, mit Hinweis, dass Zeichen regional abweichen). Kofferfisch-Zeichen vom Nutzer: Daumen und Zeigefinger beider Hände bilden ein Rechteck, kann auch „Blei“ heißen. Skorpionsfisch-Variante vom Nutzer: gekrümmter Zeigefinger (kann auch „Frage“ heißen), nicht belegt. Steinfisch-Variante vom Nutzer: Faust, gekrümmter Zeigefinger zeigt darauf; Gili Shark Conservation nennt genau das „Skorpionsfisch“.
- Keine Fotos von gefangenen oder festgehaltenen Tieren (Angelhaken, Hand). Nur Tiere in ihrem Lebensraum.
- Der lange, dünne Fisch, den Taucher im Roten Meer „Trompetenfisch“ nennen, ist fast immer der Blaupunkt-Flötenfisch (*Fistularia commersonii*). Der echte Trompetenfisch hat dort einen einzigen Fund (Eritrea 1973). Steht in Lektion 8.
- Hat auch in Thailand getaucht; Vergleiche Thailand/Rotes Meer sind willkommen.
- Tauchgebiet: Hurghada/Safaga. Beispiele möglichst von dort oder aus dem Roten Meer.
- Nach dem Tauchgang nach Beobachtungen fragen. Das ist die echte Feedbackschleife.
- Echte Fotos gehören in jede Lektion, wo sie sinnvoll sind. Quelle: Wikimedia Commons (freie Lizenz, stabile URL), Fotograf und Lizenz in der Bildunterschrift. Jedes Foto vorher ansehen, ob es zeigt, was der Text sagt. Fotos aus dem Roten Meer bevorzugen.
- Zu jeder Art einen Link zur Google-Bildersuche (`a.more-photos`, `https://www.google.com/search?tbm=isch&q=<lateinischer Name>`), in Lektion und Glossar.

- Jede neue Lektion bekommt einen Eintrag in `index.html` (Titel, Kicker-Angaben, Lede) und einen Link in den `nav.course` der Nachschlageseiten.
- Der Footer (`nav.course`) einer Lektion enthält nur zwei Links: „← Lektion n−1“ und „Lektion n+1 →“. Die erste und die letzte Lektion haben nur einen. Eine neue Lektion trägt sich also nur in den Footer ihrer Vorgängerin ein.
- Thema gehört dorthin, wo die Art schon behandelt wird: lieber eine bestehende Lektion erweitern als dieselbe Art in einer neuen Lektion wiederholen. Spätere Lektionen greifen Früheres als Wiederholung auf (Abruf, Link). Ausnahme: Eine Lektion, die der Nutzer schon gelesen hat, wird nicht mehr erweitert. Was dort zu kurz kam, wird Teil einer neuen Lektion mit eigenem Thema (Beispiel: Lektion 7 „Das Riff knistert“ statt mehr Knall in Lektion 2).
- Ein Detail, das zum Staunen taugt, bekommt gleich beim ersten Mal Platz, auch wenn es nur Nebenthema ist. Drei Sätze für den Knall des Knallkrebses waren zu wenig.

## Was Lektion 1 so gut gemacht hat
Der Nutzer nennt Lektion 1 (Putzerstation) „richtig gut“, aus drei Gründen. Jedes neue Thema an allen dreien messen:
1. **Witzige, überraschende Details.** Putzer putzen ehrlicher, wenn jemand zusieht. Solche Pointen tragen die Lektion.
2. **Praxisnah: Man sieht es bei fast jedem Tauchgang.** Putzer und Putzerstationen begegnen einem ständig, und das Detail ist selbst sichtbar: Der Kunde zuckt, wenn der Putzer Schleim statt Parasiten frisst, also betrügt. Bestes Thema = häufiges Tier + Verhalten, das man mit eigenen Augen erkennen kann. Das gilt auch für Korallen: Die pulsierende Weichkoralle in Lektion 6 kam aus demselben Grund sehr gut an.
3. **Echte Biologie, locker erzählt.** Wissenschaftlich belegt (Studien, Experimente), aber im Ton einer Geschichte, nicht eines Lehrbuchs.

## Ideen für nächste Lektionen
Alle Fakten vor der Lektion an Quellen prüfen. Der Haken nach dem Doppelpunkt ist der Kandidat für die Pointe.
- Kultur bei Fischen (vom Nutzer gewünscht): Grunzer-Wanderrouten (Helfman & Schultz 1984), Paarungsplätze Blaukopf-Junker (Warner 1988), erst Verwandte im Roten Meer prüfen (Süßlippen, Junker). Abgrenzen gegen Gewöhnung (Valerio 2019, Eilat). Soziales Lernen der Putzer steht schon in Lektion 1: nicht neu erklären, sondern als Wiederholung einbauen (kurze Abruffrage + Link auf Lektion 1).
- Korallen: Lektion 6 „Tier, Pflanze, Stein“ deckt Grundlagen, Pulsierende Weichkoralle und Hitzeresistenz ab. Ziel 1–3 Korallengeschichten, grob eine auf acht Tiergeschichten; die nächste also erst nach einigen Tierlektionen. Kandidaten, vorher prüfen: Wie sich Korallen fortpflanzen (Massenlaichen; im Golf von Akaba laichen sie nicht mehr gleichzeitig, Shlesinger & Loya 2019, Science), Wachstum und Alter großer Porites-Blöcke, Kämpfe zwischen Kolonien mit Fangtentakeln (sichtbar: Lücken zwischen Nachbarn), fluoreszierende Korallen beim UV-Nachttauchgang. Muster aus Lektion 1 gilt: ein Detail, das man selbst sieht.
- Gefährlich & giftig steht in Lektion 4 (Kugelfisch, Kofferfisch, passiv/aktiv giftig) und Lektion 5 (Rotfeuerfisch, Drachenkopf, Teufelsfisch, Steinfisch, Feuerkoralle). Feuerkoralle in der Korallenlektion nur noch als Wiederholung mit Link auf Lektion 5.
- Klang des Riffs steht in Lektion 7 „Das Riff knistert“ (Knall der Knallschere, Sonar im Weltkrieg, Fischlarven hören das Riff, Lautsprecher auf totem Riff). Lektion 2 wird nicht mehr erweitert.
- Gemeinsame Jagd steht in Lektion 8 „Wer jagt mit wem?“ (Barsch und Muräne, Kopfstand, Gelbsattel-Meerbarben, Flötenfische im Trupp, Krake boxt). Offen fürs Sammelthema Fressen: Fangschreckenkrebs schlägt mit der Keule und erzeugt dabei auch Kavitation (Patek 2004/2005, prüfen), Papageifisch frisst Fels und macht Sand (Lektion 7 kündigt das als „eigene Geschichte“ an).
- Offen aus Lektion 3: Die Paarungsszene des Nutzers in Thailand (überall Paare, einer liegt auf der Seite, der andere kreist, vielleicht ein Nest). Kandidat Gelbsaum-Drückerfisch, Gegenkandidat Putzerkunde in Pose. Nachfragen: Ort, Größe, Sandboden.
- Weitere Beziehungen: Anemonenfisch (Rotmeer-Anemonenfisch ist endemisch?) prüfen.
- Große Begegnungen: Schildkröten, Rochen, Delfine, Dugong.
- Papageifisch: Sand, Schlafsack aus Schleim.

Weitere Kandidaten nach dem Muster von Lektion 1 (häufig gesehen, sichtbares Verhalten, belegte Pointe):
- Fahnenbarsche (Anthias): Harem über jedem Korallenkopf; verschwindet das Männchen, wird ein Weibchen zum Männchen. Sichtbar: das eine orange-violette Männchen, das vor den Weibchen balzt.
- Anemonenfisch: alle starten männlich, das größte Tier wird Weibchen; strenge Größenrangfolge in der Anemone. Sichtbar: Größenstaffel, Angriffe auf Taucher. Prüfen: Rotmeer-Anemonenfisch endemisch?
- Gärtner-Riffbarsche: halten eigene Algengärten und jäten sie, verjagen dabei auch Taucher. Sichtbar: winziger Fisch greift Maske oder Hand an.
- Falscher Putzer (Säbelzahnschleimfisch): imitiert den Putzerlippfisch und beißt Flossenstücke ab. Gehört an Lektion 1 (erweitern, nicht neu); Unterscheidung am Maul ist unter Wasser zu sehen.
- Rotfeuerfisch beim Nachttauchgang: jagt im Licht der Taucherlampe. Prüfen, ob belegt. Gehört an Lektion 5 (erweitern). Nicht Lönnstedt et al. 2014 zur Gemeinschaftsjagd zitieren: Die Zeitschrift hat dazu eine „expression of concern“ veröffentlicht.
- Napoleon: frisst giftige Tiere (Kofferfische, Dornenkronen), kann das Geschlecht wechseln, kommt neugierig nah an Taucher. Kofferfisch-Gift als Abruffrage aus Lektion 4.
- Weihnachtsbaumwürmer: ziehen sich blitzschnell ein, wenn man nah kommt oder ein Schatten fällt. Kleines Mitmach-Experiment.
- Kraken und Sepien: Farbwechsel in Sekunden, obwohl farbenblind. Prüfen.
- Delfine bei Hurghada (Shaab El Erg): Spinnerdelfine ruhen tagsüber in Lagunen, „halbseitiger Schlaf“.
