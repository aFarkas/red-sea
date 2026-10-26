// Wiederholungskarten. Die id ist der Schlüssel in assets/review-state.js und im Ergebnis für Claude,
// also nie umbenennen. Eine Antwort erzählt die Geschichte noch einmal, nicht nur das Stichwort.
window.CARDS = [
  {
    id: "putzer-pose",
    lektion: 1,
    frage: "Du schwebst an einem Korallenblock. Woran erkennst du, dass ein Fisch gerade geputzt werden will?",
    antwort: `<p>Er stellt sich in Pose: Er steht still, oft schräg oder sogar senkrecht, das Maul offen, Flossen und Kiemendeckel gespreizt. Der Putzer begrüßt ihn mit einem kleinen Tanz und wippt dabei mit dem Hinterkörper.</p>
      <p>Am Elphinstone Reef wurde ein Barrakuda fotografiert, der senkrecht vor der Wand hängt und sich putzen lässt. Wer so still im Wasser steht, ist fast immer Kunde.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Baracuda_hanging_vertically_being_cleaned_by_cleaner_wrasses%2C_Elphinstone_Reef%2C_Red_Sea%2C_Egypt._%2835570987620%29.jpg/960px-Baracuda_hanging_vertically_being_cleaned_by_cleaner_wrasses%2C_Elphinstone_Reef%2C_Red_Sea%2C_Egypt._%2835570987620%29.jpg",
      alt: "Ein Barrakuda hängt senkrecht mit dem Kopf nach oben vor einer Riffwand",
      credit: "Foto: Derek Keats, Elphinstone Reef. Wikimedia Commons, CC BY 2.0",
    },
  },
  {
    id: "putzer-arbeitstag",
    lektion: 1,
    frage: "Wie viele Kunden bedient ein Putzerlippfisch ungefähr an einem Tag?",
    antwort: `<p>Rund 2300. Alexandra Grutter hat das am Great Barrier Reef gezählt. Dabei frisst ein Putzer rund 1200 Parasiten am Tag, vor allem Larven winziger Asseln, der Gnathiiden.</p>
      <p>Das sind mehrere Kunden pro Minute, den ganzen Tag lang. Eine Station ist ein Betrieb mit Hochbetrieb.</p>`,
  },
  {
    id: "putzer-schleim",
    lektion: 1,
    frage: "Was frisst ein Putzer eigentlich lieber als Parasiten? Und woran siehst du unter Wasser, dass er es getan hat?",
    antwort: `<p>Den Schleim, der die Haut des Kunden schützt. Für den Kunden ist das ein Schaden, die Forscher nennen es Betrug.</p>
      <p>Du siehst es am Zucken: Der Kunde zuckt zusammen, wenn der Putzer in den Schleim beißt. Genau diese Zuckungen zählen Forscher, wenn sie messen, wie oft ein Putzer betrügt.</p>`,
  },
  {
    id: "putzer-strafe",
    lektion: 1,
    frage: "Stammgast, Laufkundschaft, Raubfisch: Wie reagiert jeder davon, wenn der Putzer betrügt?",
    antwort: `<p><strong>Stammgäste</strong> sind kleine Fische mit eigenem Revier und nur dieser einen Station. Sie jagen den Putzer wütend hinterher. Das ist Strafe.</p>
      <p><strong>Laufkundschaft</strong> kennt mehrere Stationen. Sie streitet nicht, sie geht einfach zur Konkurrenz.</p>
      <p><strong>Raubfische</strong> müssen nichts tun. Sie könnten den Putzer fressen, die Drohung reicht.</p>
      <p>Im Experiment lernten Putzer schon nach sechs Durchgängen mit Strafe oder Weggehen, gegen ihren Geschmack zu fressen.</p>`,
  },
  {
    id: "putzer-vorrang",
    lektion: 1,
    frage: "Ein großer Fisch auf Durchreise und ein kleiner Anwohner warten gleichzeitig. Wer kommt zuerst dran, und warum?",
    antwort: `<p>Der große auf Durchreise. Lässt der Putzer ihn warten, schwimmt er zur nächsten Station und ist verloren. Der Anwohner kommt sowieso wieder.</p>
      <p>Marktlogik, bei einem Fisch von zehn Zentimetern.</p>`,
  },
  {
    id: "putzer-ruf",
    lektion: 1,
    frage: "Was ändert sich, wenn andere Fische einem Putzer bei der Arbeit zusehen?",
    antwort: `<p>Er arbeitet ehrlicher. Wartende Fische bleiben lieber bei Putzern, die sie ehrlich arbeiten gesehen haben. Ein guter Ruf bringt also Kundschaft.</p>
      <p>Bshary und Grutter zeigten das 2006 in Nature. Der Fachbegriff heißt <em>Image Scoring</em>, und man kannte es bis dahin vor allem vom Menschen.</p>`,
  },
  {
    id: "putzer-massage",
    lektion: 1,
    frage: "Ein Putzer hat zu fest zugebissen. Wie macht er es wieder gut?",
    antwort: `<p>Mit einer Massage. Er stellt sich quer über den Rücken des Kunden, den Kopf vom Kunden weg, und streichelt ihn mit flatternden Bauchflossen. Der Kunde bleibt dann eher und jagt ihn nicht.</p>
      <p>Raubfische bekommen diese Massage öfter als andere. Bestechung oder Beschwichtigung, beides passt.</p>`,
  },
  {
    id: "falscher-putzer",
    lektion: 1,
    frage: "Der Falsche Putzerfisch kopiert Farbe, Streifen und Tanz. Woran erkennst du ihn trotzdem?",
    antwort: `<p>Am Maul. Beim echten Putzer sitzt es vorn an der spitzen Schnauze. Beim Falschen Putzerfisch, einem Schleimfisch, sitzt es unten, die runde Schnauze steht darüber.</p>
      <p>Und er beißt seltener zu, als sein Ruf sagt. Erwachsene fressen meist Fischeier und die Tentakel von Röhrenwürmern. Flossen beißen vor allem die Jungen, wenn andere Nahrung knapp ist.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Blenio_falso_limpiador_%28Aspidontus_taeniatus%29%2C_Anilao%2C_Filipinas%2C_2023-08-21%2C_DD_109.jpg/960px-Blenio_falso_limpiador_%28Aspidontus_taeniatus%29%2C_Anilao%2C_Filipinas%2C_2023-08-21%2C_DD_109.jpg",
      alt: "Kopf eines Falschen Putzerfisches; die Schnauze steht über dem Maul",
      credit: "Foto: Diego Delso, Philippinen. Wikimedia Commons, CC BY-SA 4.0",
    },
  },
  {
    id: "putzer-riff",
    lektion: 1,
    frage: "Was passiert mit einem Riff, wenn man die Putzer jahrelang fernhält?",
    antwort: `<p>Es verarmt. Am Great Barrier Reef hielten Forscher Putzer 8,5 Jahre lang von kleinen Riffen fern. Danach lebten dort 37&nbsp;% weniger standorttreue Fische und 23&nbsp;% weniger Arten.</p>
      <p>Im Roten Meer, bei Marsa Bareika auf dem Sinai, waren Fische mit Zugang zu Putzern in besserer Verfassung als Fische ohne.</p>`,
  },
  {
    id: "putzer-geschlecht",
    lektion: 1,
    frage: "Eine Station gehört einem Männchen mit mehreren Weibchen. Was passiert, wenn das Männchen stirbt?",
    antwort: `<p>Ein großes Weibchen wird zum Männchen und übernimmt die Station.</p>
      <p>Arbeiten zwei als Paar, wacht das größere Männchen übrigens über das Weibchen. Betrügt sie und vertreibt damit den gemeinsamen Kunden, jagt er sie.</p>`,
  },
  {
    id: "grundel-arbeitsteilung",
    lektion: 2,
    frage: "Grundel und Knallkrebs teilen sich einen Bau im Sand. Wer macht was, und was hat jeder davon?",
    antwort: `<p>Der Krebs gräbt und hält den Bau instand, den ganzen Tag schiebt er Sand nach draußen. Er sieht aber schlecht. Die Grundel liegt am Eingang und schaut.</p>
      <p>Der Krebs bekommt Augen, die Grundel eine Wohnung als Fluchtloch und Futter aus dem aufgewühlten Sand. Und es ist keine Krabbe, sondern ein Knallkrebs, ein garnelenartiger Krebs der Gattung <span class="sci">Alpheus</span>.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Steinitz%27_Partner_Goby_with_Alpheus_Djeddensis.jpg",
      alt: "Grundel am Loch im Sand, daneben ein Knallkrebs, der Sand aus dem Bau schiebt",
      credit: "Foto: Silke Baron, Ägypten. Wikimedia Commons, CC BY 2.0",
    },
  },
  {
    id: "grundel-antenne",
    lektion: 2,
    frage: "Der Krebs schiebt gerade Sand nach draußen. Wie erfährt er, dass ein Räuber kommt?",
    antwort: `<p>Er spürt es. Eine seiner langen Antennen liegt fast immer auf der Grundel. Sieht die Grundel Gefahr, schlägt sie schnell mit Schwanz und Flossen. Der Krebs fühlt das Zucken und verschwindet im Bau.</p>
      <p>Ilan Karplus hat diese Sprache aus Berührung ab den 1970er-Jahren im Roten Meer entschlüsselt.</p>`,
  },
  {
    id: "grundel-abwesend",
    lektion: 2,
    frage: "Die Grundel ist gerade nicht am Eingang. Was macht der Krebs?",
    antwort: `<p>Er bleibt im Bau. In Karplus' Versuchen kam der Krebs nur heraus, wenn die Grundel da war. Ohne Wächter kein Ausgang.</p>
      <p>Und drinnen im Bau putzte der Krebs die Grundel.</p>`,
  },
  {
    id: "knallkrebs-knall",
    lektion: 2,
    frage: "Woher kommt der Knall des Knallkrebses?",
    antwort: `<p>Nicht vom Zuschnappen der Schere. Die Schere schließt so schnell, dass ein Wasserstrahl entsteht, in dem sich eine Dampfblase bildet. Der Knall kommt vom Zusammenfallen dieser Blase.</p>
      <p>Die Blase fällt so heftig zusammen, dass sie einen winzigen Lichtblitz aussendet. Die Forscher nannten das „Shrimpoluminescence“.</p>`,
  },
  {
    id: "grundel-bootslaerm",
    lektion: 2,
    frage: "Ein lautes Motorboot fährt über einen Grundelbau. Was passiert mit der Warnung?",
    antwort: `<p>Sie funktioniert weiter. Bei 123 gefilmten Paaren am Great Barrier Reef blieben Grundeln und Krebse bei Bootslärm zwar kürzer draußen, die Krebse bis zu 34&nbsp;%. Die Verständigung lief aber weiter.</p>
      <p>Berührung braucht kein ruhiges Wasser.</p>`,
  },
];
