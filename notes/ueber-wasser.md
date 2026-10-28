# Notes: Über Wasser

Gilt zusätzlich zu `NOTES.md` für jede Lektion über Land, Leute, Sprache, Kultur und das alte Ägypten.

## Regeln

- Orte des Urlaubs: Soma Bay, Safaga, El Quseir, die Strecke zum Nil, Luxor mit Ost- und Westufer.
- Sprache ist ägyptisches Arabisch, wie man es auf der Straße hört, nicht Hocharabisch. Umschrift so, dass
  eine Deutsche es richtig ausspricht, dazu die Aussprache in Worten, wo die Umschrift nicht reicht.
  Keine arabische Schrift lehren. Ziffern auf Preisschildern und Nummernschildern sind die Ausnahme,
  wenn sie praxisnah sind.
- Sätze zum Benutzen kommen als Box `.phrases` (wie `.signs` unter Wasser) in die Lektion, in der sie
  gebraucht werden, und als Karte in die Wiederholung. Ausprobieren im Urlaub ist die Feedbackschleife:
  danach fragen, wie es ankam.
- Sprache und Zahlen fallen dem Nutzer schwer, also üben statt nur lesen. Jedes Wort, jeder Satz und
  jede Zahl mit Aufnahme bekommt eine Wortkarte in `window.WORDS` (`assets/cards.js`), nicht nur die
  Sätze, die eine Geschichte tragen. Die Geschichtenkarten in `window.CARDS` bleiben daneben.
  „Weißt du noch?“ einer Sprachlektion holt ruhig auch Wörter der vorigen Sprachlektion zurück, zum
  Anhören. Am Ende jeder Sprachlektion auf „Sprache üben“ in `reference/wiederholung.html` verweisen.
- Lieber die Standards sicher als alles ein bisschen. Eine Sprachlektion bringt höchstens etwa ein
  Dutzend neue Wörter zum Lernen, für jede Situation eine Standardform. Lektion 10 mit 17 Zahlen und
  14 Sätzen war dem Nutzer zu viel. Varianten (zweite Antwort, Form für sie, seltene Zahl, andere
  Aussprache) darf die Lektion zeigen, aber klar als Zugabe, nicht in der Lernliste. In `window.WORDS`
  bekommen sie `extra: true`, ein Hinweis auf eine andere Aussprache oder Schreibweise kommt in
  `variante` statt `hinweis`. Dann übt der Nutzer sie erst, wenn er „Auch Varianten und Extras“ anhakt.
  In `.phrase-list` (Lektion und Sprachführer) bekommt jede Zeile mit einem Standardwort `class="std"`
  und damit einen Stern. Unter jeder Liste mit Stern steht die Legende `p.aside.legend`. Stern und
  `extra` müssen übereinstimmen.
- Land und Leute ohne Klischees und ohne Belehrung. Was über das heutige Ägypten gesagt wird, braucht
  eine aktuelle Quelle, am liebsten aus Ägypten selbst (ägyptische Autoren, Behörden, Medien). Ein
  Reiseführer reicht nur als Wegweiser. Verhaltenstipps kurz und
  freundlich, als Teil der Geschichte, nicht als Regelliste.
- Altes Ägypten als Geschichte über Menschen, die dort gearbeitet, gebaut, gestohlen und gestreikt haben.
  Jahreszahlen nur, wo sie die Geschichte tragen. Pharaonen und Götter beim ersten Auftreten kurz
  einordnen.
- Jeder Ort, den man besuchen kann, bekommt eine eingebettete Karte und einen Link nach Google Maps
  (Bauteil `figure.map`, siehe unten). Dazu Fotos vom Ort, am liebsten genau von dem, was man dort sieht
  (Relief, Grabkammer, Säule), mit Hinweis, wo im Gelände es zu finden ist.
- „Halte Ausschau“ wird hier zu Aufträgen für den Ausflug: „Such im ersten Hof …“, „Frag am Markt …“.
- Glossare dieses Strangs sind `reference/sprachfuehrer.html` (Sätze und Wörter, nach Situationen) und
  `reference/luxor.html` (Orte mit Karte, Pharaonen, Götter, Begriffe). Die erste Lektion, die eines
  davon braucht, legt es an. Jede Lektion hält sich an sie.

## Bauteil Karte

```html
<figure class="map">
  <iframe src="https://maps.google.com/maps?q=Medinet+Habu,+Luxor&z=16&output=embed"
          title="Karte: Medinet Habu" loading="lazy"></iframe>
  <figcaption>Medinet Habu am Westufer von Luxor.
    <a href="https://www.google.com/maps/search/?api=1&query=Medinet+Habu,+Luxor">In Google Maps öffnen</a></figcaption>
</figure>
```

Die Einbettung braucht keinen API-Schlüssel. `q` darf ein Name oder `Breite,Länge` sein, `z` ist die
Zoomstufe. Im Browser prüfen, ob die Karte den richtigen Ort zeigt. Beim Drucken wird die Karte
ausgeblendet, der Link bleibt.

## Plan

- Vor der Reise, ungefähr in dieser Reihenfolge: erste Sätze (Grüßen, Danken, *inschallah*, *maalesch*),
  Zahlen, Preise und Trinkgeld, Alltag und Umgangsformen, Luxor im Überblick.
- Vor den Ausflügen im Urlaub: El Quseir und Safaga.
- Vor Luxor im Detail: Tal der Könige, Deir el-Medina, Medinet Habu, dazu die Standards Karnak,
  Luxor-Tempel, Deir el-Bahari (Hatschepsut) und die Memnonkolosse.

## Ideen für Lektionen

Alles vor der Lektion an Quellen prüfen. Der Haken nach dem Doppelpunkt ist der Kandidat für die Pointe.

- Luxor im Überblick: Ostufer mit den Tempeln der Lebenden, Westufer mit den Gräbern und Totentempeln, weil dort die Sonne untergeht.
- Deir el-Medina: das Dorf der Handwerker, die die Königsgräber gebaut haben. Tausende beschriebene Scherben (Ostraka) mit Alltag: Krankmeldungen, Streit, Einkaufslisten. Unter Ramses III. der älteste belegte Streik, Proteste auch an den Totentempeln. Prüfen, wie genau das belegt ist.
- Medinet Habu: Totentempel Ramses’ III., die Seevölker-Schlacht auf der Außenwand, gezählte abgeschlagene Hände der Feinde, Farben an Decken und Säulen noch gut erhalten. Daneben ein kleiner Amun-Tempel, der älter ist. Prüfen.
- Tal der Könige: Gräber wie Tunnel in den Fels, Grabräuber-Prozesse auf Papyrus (Papyrus Abbott, Leopold-Amherst), Tutanchamun liegt noch in seinem Grab, KV5 für die Söhne Ramses’ II. Prüfen, welche Gräber das Ticket enthält und welche extra kosten.
- Hieroglyphen: eine Kartusche selbst lesen, etwa Ramses oder Tutanchamun. Ein Mitmach-Bauteil, das man vor Ort an der Wand benutzt.
- Rotes Meer trifft Nil: Von der Küste bei Mersa Gawasis (zwischen Safaga und El Quseir) fuhren Schiffe ins Goldland Punt; Hatschepsut ließ die Reise in Deir el-Bahari in Reliefs zeigen, mit Fischen aus dem Roten Meer. Das Wadi Hammamat verbindet Küste und Nil. Brücke zwischen beiden Strängen. Prüfen.
- El Quseir: alter Hafen, osmanische Festung, Pilger nach Mekka. Prüfen.
- Memnonkolosse: In der Antike „sangen“ sie bei Sonnenaufgang, bis ein Kaiser sie reparieren ließ. Prüfen.
- Karnak und Luxor-Tempel: Sphinx-Allee, Moschee Abu el-Haggag oben auf dem Luxor-Tempel. Prüfen.
- Sprache und Alltag: Gebetsruf fünfmal am Tag, Freitag als Wochenende, Handeln als Gespräch, Bakschisch, Tee und Begrüßungsrituale, Gesten (Fingerspitzen zusammen = „Moment“). Prüfen.
- Essen: Koschari, Ful, Fisch in El Quseir. Was man probieren sollte und wie man es bestellt. Sie kochen viel selbst (Lernnotiz 10): Wörter für Obst, Gemüse, Fisch und Mengen auf dem Markt.
- Restaurant und Hotelrechnung: Der Servicezuschlag gilt in Ägypten als Lohn. Bis 2024 durfte ein Hotel per Erlass 20 % davon „für Bruch, Verlust und Beschädigung“ behalten, dann kippte das Verfassungsgericht die Klausel (Ad-Dostor, 2024). Prüfen, ob und wie viel Zuschlag auf Restaurantrechnungen steht.
