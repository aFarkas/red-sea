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
  {
    id: "laich-wolke",
    lektion: 3,
    frage: "Am späten Nachmittag ballen sich dunkle Fische zu einer Wolke, kleine Trupps schießen blitzartig nach oben. Was passiert da?",
    antwort: `<p>Braune Doktorfische beim Laichen. Vor Eilat treffen sich in der Laichzeit von Mai bis September jeden Tag 2000 bis 2500 Tiere an festen Plätzen. Kleine Trupps lösen sich aus der Wolke, schießen nach oben und geben gleichzeitig Eier und Samen ab.</p>
      <p>Gelaicht wird zwischen 18 und 18:30 Uhr. Den Startschuss gibt das schwindende Licht.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Acanthurus_nigrofuscus%2C_Egipto.jpg",
      alt: "Dunkelbrauner, hochrückiger Fisch über hellem Riffboden",
      credit: "Foto: Andrey Velichko, Ägypten. Wikimedia Commons, CC BY 3.0",
    },
  },
  {
    id: "laich-sprint",
    lektion: 3,
    frage: "Warum ist der Sprint nach oben beim Laichen so blitzschnell?",
    antwort: `<p>Wegen der Raubfische. Jack Moyer zählte in Japan 171 Angriffe während solcher Sprints. Kein einziger war erfolgreich.</p>
      <p>Die Eltern sind also sicher, die Eier nicht: Bei 42&nbsp;% der Laichvorgänge fraßen Planktonfresser wie Riffbarsche die Eier weg.</p>`,
  },
  {
    id: "laich-dammerung",
    lektion: 3,
    frage: "Wann und wo laichen Braune Doktorfische, und was wird danach aus den Eiern?",
    antwort: `<p>Am Abend, kurz vor Sonnenuntergang, an der äußersten, meerseitigen Spitze des Riffs. Die Eier treiben ins offene Wasser, niemand passt auf sie auf.</p>
      <p>In der Dämmerung sind weniger Raubfische unterwegs. Danach ziehen die Doktorfische zu ihren Schlafplätzen im Riff.</p>`,
  },
  {
    id: "nest-drucker",
    lektion: 3,
    frage: "Wie kümmert sich ein Riesendrückerfisch um seine Eier?",
    antwort: `<p>Ganz anders als der Doktorfisch: Er laicht paarweise in eine Mulde, die er in Sand oder Geröll gräbt. Meist bewacht das Weibchen das Gelege. Es umkreist das Nest, jagt andere Fische weg und bläst Wasser auf die Eier.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pez_ballesta_%28Balistes_capriscus%29_y_su_nido%2C_Monte_da_Guia%2C_isla_de_Fayal%2C_Azores%2C_Portugal%2C_2020-07-26%2C_DD_29.jpg/960px-Pez_ballesta_%28Balistes_capriscus%29_y_su_nido%2C_Monte_da_Guia%2C_isla_de_Fayal%2C_Azores%2C_Portugal%2C_2020-07-26%2C_DD_29.jpg",
      alt: "Drückerfisch über einer runden Mulde im Sand",
      credit: "Foto: Diego Delso, Azoren. Wikimedia Commons, CC BY-SA 4.0",
    },
  },
  {
    id: "nest-kegel",
    lektion: 3,
    frage: "Ein Riesendrückerfisch greift dich an. Welche Form hat sein Revier, und wohin weichst du aus?",
    antwort: `<p>Das Revier ist ein Kegel: Er beginnt am Nest, wird nach oben breiter und reicht bis zur Oberfläche. Steigst du auf, bleibst du länger darin.</p>
      <p>Also waagerecht wegschwimmen. Die Angriffe sind Warnungen, können aber mit einem Biss enden.</p>`,
  },
  {
    id: "kugel-flossen",
    lektion: 4,
    frage: "Was haben Kugelfisch, Kofferfisch und Drückerfisch gemeinsam, das du beim Tauchen sehen kannst?",
    antwort: `<p>Sie sind Vettern, alle drei Kugelfischverwandte. Und sie schwimmen gleich: Der Körper bleibt steif, Rücken- und Afterflosse rudern, der Schwanz lenkt wie ein Steuer.</p>
      <p>Den Schwanz nehmen sie nur für einen kurzen Sprint. Darum sieht es aus, als würden sie schweben.</p>`,
  },
  {
    id: "kugel-aufblasen",
    lektion: 4,
    frage: "Hält ein Kugelfisch die Luft an, solange er aufgeblasen ist?",
    antwort: `<p>Nein. Er schluckt Wasser in den Magen, bis er drei- bis viermal so groß ist, und atmet dabei fünfmal so viel wie in Ruhe, über die Kiemen.</p>
      <p>Danach braucht er im Schnitt 5,6 Stunden, bis sein Stoffwechsel wieder normal läuft. Wer ihn zum Aufblasen bringt, nimmt ihm für Stunden seine beste Verteidigung.</p>`,
  },
  {
    id: "kugel-gift-bakterien",
    lektion: 4,
    frage: "Woher hat der Kugelfisch sein Gift?",
    antwort: `<p>Nicht von sich selbst. Das Tetrodotoxin stammt von Meeresbakterien und kommt über die Nahrungskette in den Fisch, vor allem in Leber und Eierstöcke.</p>
      <p>In Japan wurden über 6000 Kugelfische mit giftfreiem Futter gezüchtet. Kein einziger war giftig.</p>`,
  },
  {
    id: "gift-passiv-aktiv",
    lektion: 4,
    frage: "Was ist der Unterschied zwischen passiv und aktiv giftig? Je ein Beispiel.",
    antwort: `<p><strong>Passiv giftig</strong>, englisch „poisonous“: Das Gift wirkt, wenn man das Tier berührt oder isst. Kugelfisch, Kofferfisch.</p>
      <p><strong>Aktiv giftig</strong>, englisch „venomous“: Das Tier spritzt sein Gift mit Stachel oder Biss ein. Steinfisch, Rotfeuerfisch.</p>`,
  },
  {
    id: "koffer-auto",
    lektion: 4,
    frage: "Welches Auto hat ein Fisch inspiriert, und was war daran ein Irrtum?",
    antwort: `<p>Das Mercedes-Benz Bionic Car von 2005, nach dem Gelbbraunen Kofferfisch. Die Kastenform sollte das Auto ruhig geradeaus halten.</p>
      <p>2015 zeigten Messungen: Das Wasser um den Kasten bringt den Fisch aus der Spur. Das macht ihn wendig, ideal zwischen Korallen. Gebaut für enge Kurven, nicht für die Autobahn.</p>`,
    bild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ostracion_cubicus_%28juvenile%29.jpg/960px-Ostracion_cubicus_%28juvenile%29.jpg",
      alt: "Junger Kofferfisch, gelb mit schwarzen Punkten",
      credit: "Foto: Leonard Low. Wikimedia Commons, CC BY 2.0",
    },
  },
  {
    id: "koffer-gift",
    lektion: 4,
    frage: "Wie wehrt sich ein Kofferfisch unter Stress?",
    antwort: `<p>Seine Haut gibt ein Gift ins Wasser ab, das Pahutoxin. Es löst sich schnell und schadet Fischen in der Nähe. Dazu kommt der Panzer aus Knochenplatten.</p>`,
  },
  {
    id: "stachel-verteidigung",
    lektion: 5,
    frage: "Wofür benutzen Rotfeuerfisch, Drachenkopf und Steinfisch ihre Giftstacheln, und wann wird ein Taucher gestochen?",
    antwort: `<p>Nur zur Verteidigung, nie zum Jagen. Keiner von ihnen greift an. Gestochen wird, wer drauftritt oder sich abstützt.</p>
      <p>Darum: nichts anfassen, nicht hinknien, über Sand und Geröll schweben.</p>`,
  },
  {
    id: "rotfeuer-wasserstrahl",
    lektion: 5,
    frage: "Welchen Trick benutzt der Rotfeuerfisch kurz vor dem Zuschnappen?",
    antwort: `<p>Er bläst der Beute kleine Wasserstrahlen entgegen. Das verwirrt sie, und oft dreht sie sich zu ihm hin. So kann er sie mit dem Kopf voran schlucken.</p>
      <p>Vorher treibt er sie mit seinen großen Brustflossen in eine Ecke, meist in der Dämmerung.</p>`,
  },
  {
    id: "teufelsfisch-beine",
    lektion: 5,
    frage: "Wie bewegt sich der Teufelsfisch über den Sand, und wie warnt er?",
    antwort: `<p>Er läuft. Die beiden hintersten Strahlen jeder Brustflosse sind vom Rest getrennt, auf ihnen stakst er wie auf Beinen.</p>
      <p>Tagsüber gräbt er sich halb ein. Wird er bedroht, klappt er plötzlich leuchtend bunte Brust- und Schwanzflossen auf.</p>`,
  },
  {
    id: "steinfisch-saebel",
    lektion: 5,
    frage: "Was hat der Steinfisch unter den Augen, und seit wann weiß man das?",
    antwort: `<p>Eine Knochenklinge unter jedem Auge, die er ausklappen und einrasten lassen kann, wie ein Klappmesser. Beschrieben erst 2018 von William Leo Smith, „lachrymal saber“.</p>
      <p>Dabei ist der Steinfisch berühmt: bis 40 cm, 13 Giftstacheln, giftigster Fisch der Welt.</p>`,
  },
  {
    id: "feuerkoralle",
    lektion: 5,
    frage: "Warum ist die Feuerkoralle keine echte Koralle, und was passiert, wenn man sie berührt?",
    antwort: `<p>Sie ist ein Hydrozoon, näher verwandt mit dem Süßwasserpolypen Hydra. Aus winzigen Poren ragen Härchen mit Nesselzellen.</p>
      <p>Berührt man sie, brennt die Haut wie nach Brennnesseln, manchmal tagelang. Gefährlich ist das nicht. Erkennbar: gelbbraun, glatt, weiße Spitzen.</p>`,
  },
  {
    id: "stich-heisswasser",
    lektion: 5,
    frage: "Was hilft nach einem Stich durch einen Steinfisch oder Rotfeuerfisch, und warum?",
    antwort: `<p>Heißes, aber nicht verbrühendes Wasser, 42 bis 45 °C, 30 bis 90 Minuten oder bis der Schmerz nachlässt. Das Gift verträgt keine Hitze.</p>
      <p>Dazu dem Guide Bescheid sagen und zum Arzt.</p>`,
  },
];
