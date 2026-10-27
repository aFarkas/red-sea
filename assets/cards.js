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
  {
    id: "koralle-polypen",
    lektion: 6,
    frage: "Was ist ein Korallenblock eigentlich?",
    antwort: `<p>Eine Kolonie aus Tausenden Polypen, kleinen Schläuchen mit Mund und Tentakelkranz, ein paar Millimeter breit. Alle sind Klone eines einzigen Polypen, entstanden durch Teilung und Knospung.</p>
      <p>Korallen sind Verwandte der Seeanemonen und Quallen und fangen mit Nesselzellen kleine Tiere, meist nachts.</p>`,
  },
  {
    id: "koralle-nacht",
    lektion: 6,
    frage: "Warum sieht eine Koralle beim Nachttauchgang oft pelzig aus?",
    antwort: `<p>Die meisten Polypen fressen nachts. Dann strecken sie ihre Tentakel aus und fangen mit Nesselzellen winzige Tiere aus dem Wasser. Tagsüber sind sie meist eingezogen.</p>`,
  },
  {
    id: "zooxanthellen",
    lektion: 6,
    frage: "Wer wohnt in den Zellen einer Koralle, und was hat die Koralle davon?",
    antwort: `<p>Winzige Algen, die Zooxanthellen. Sie machen aus Sonnenlicht Zucker und geben bis zu 90 Prozent davon an die Koralle ab. Dafür bekommen sie Schutz und das Kohlendioxid der Koralle.</p>
      <p>Die Algen geben vielen Steinkorallen auch ihre Farbe.</p>`,
  },
  {
    id: "korallenbleiche",
    lektion: 6,
    frage: "Was passiert bei der Korallenbleiche, und ab wann beginnt sie?",
    antwort: `<p>Wird es zu heiß, stößt die Koralle ihre Algen ab. Dann scheint das weiße Kalkskelett durch. Das beginnt schon 0,5 bis 1,5 °C über dem üblichen Sommermaximum.</p>
      <p>Dauert es zu lange, verhungert die Koralle, denn die Algen haben sie gefüttert.</p>`,
  },
  {
    id: "pulskoralle",
    lektion: 6,
    frage: "Warum pulsiert die Pulsierende Weichkoralle Tag und Nacht?",
    antwort: `<p>Sie wedelt den Sauerstoff weg, den ihre Algen erzeugen. Zu viel Sauerstoff bremst die Algen. Mit Pulsieren schaffen sie bis zu zehnmal mehr. Das kostet die Koralle doppelt so viel Energie, bringt aber mehr als zehnmal so viel ein.</p>
      <p>Rund 37 Takte pro Minute. Lamarck hat es 1816 bemerkt, gelöst wurde das Rätsel 2013 in Eilat.</p>`,
  },
  {
    id: "hitze-refugium",
    lektion: 6,
    frage: "Warum halten die Korallen bei Hurghada mehr Hitze aus als anderswo?",
    antwort: `<p>Wahrscheinlich wegen ihrer Herkunft. In der letzten Eiszeit verschwanden die Korallen aus dem Roten Meer. Neu besiedelt wurde es von Süden, und die Larven mussten durch sehr warmes Wasser treiben. Durch kamen nur Korallen, die Wärme vertragen.</p>
      <p>Im El-Niño-Sommer 2015/16 bleichten nur die Riffe im Süden und in der Mitte des Roten Meers, und Korallen aus Hurghada hielten im Versuch mehr aus.</p>`,
  },
  {
    id: "stein-weich",
    lektion: 6,
    frage: "Was unterscheidet Steinkorallen von Weichkorallen?",
    antwort: `<p>Steinkorallen bauen ein festes Skelett aus Kalk. Darauf wachsen Generation um Generation neue Polypen, so entsteht das Riff. Weichkorallen haben kein festes Skelett, sie sind biegsam und wiegen sich in der Strömung.</p>`,
  },
  {
    id: "riff-knistern",
    lektion: 7,
    frage: "Du schwebst still am Riff und hörst ein feines Knistern. Woher kommt es?",
    antwort: `<p>Von Knallkrebsen. Sie sind nur wenige Zentimeter groß und sitzen versteckt in Spalten und Bauen, aber sie gelten als die lautesten Tiere am Riff. Viele Knalle zusammen ergeben das Knistern.</p>`,
  },
  {
    id: "knall-tempo",
    lektion: 7,
    frage: "Wie schnell schießt der Wasserstrahl aus der Knallschere, und wozu schießt der Krebs?",
    antwort: `<p>Mit rund 25 Metern pro Sekunde, also etwa 90 km/h. Im Strahl reißt das Wasser zu einer Dampfblase auf, ihr Zusammenfallen macht den Knall. Alles dauert weniger als eine Tausendstelsekunde.</p>
      <p>Der Druck vor der Schere betäubt oder tötet kleine Beutetiere. Der Krebs verteidigt sich auch damit und streitet mit Nachbarn um seinen Platz.</p>`,
  },
  {
    id: "knall-hitze",
    lektion: 7,
    frage: "Wie heiß wird es in der Blase des Knallkrebses?",
    antwort: `<p>Über 4700 °C, fast so heiß wie die Oberfläche der Sonne, für einen winzigen Augenblick. Das haben Detlef Lohse und sein Team aus dem Lichtblitz berechnet, den die Blase aussendet. Sehen kann man den Blitz mit bloßem Auge nicht.</p>`,
  },
  {
    id: "knall-sonar",
    lektion: 7,
    frage: "Wer hat zuerst herausgefunden, dass Knallkrebse das Knistern im Meer machen?",
    antwort: `<p>Das Militär. Im Zweiten Weltkrieg störte ein ständiges Knistern die Unterwassermikrofone der US-Marine, mit denen sie U-Boote suchte. Forscher fanden als Ursache versteckte Kolonien kleiner Krebse.</p>`,
  },
  {
    id: "scherentausch",
    lektion: 7,
    frage: "Ein Knallkrebs verliert seine große Knallschere. Was passiert?",
    antwort: `<p>Die Scheren tauschen die Rollen. Die kleine Schere wird zur neuen Knallschere, und wo die große war, wächst eine kleine nach. So einen Seitenwechsel kennt man sonst aus der Natur kaum.</p>`,
  },
  {
    id: "larven-hoeren",
    lektion: 7,
    frage: "Wie finden junge Riffische aus dem offenen Meer zurück zum Riff?",
    antwort: `<p>Unter anderem mit den Ohren. Stephen Simpson stellte 2005 Lautsprecher an kleine Riffe aus Korallenschutt und spielte nachts Riffgeräusche ab. Dorthin kamen etwa doppelt so viele junge Kardinalbarsche und Riffbarsche wie zu den stillen Riffen.</p>
      <p>Ein krankes Riff klingt leiser. Nach Wirbelstürmen und Bleiche ließen sich beim Klang des kaputten Riffs 40 Prozent weniger Jungfische nieder.</p>`,
  },
  {
    id: "lautsprecher-riff",
    lektion: 7,
    frage: "Was passierte, als Forscher auf totem Riff nachts den Klang eines gesunden Riffs abspielten?",
    antwort: `<p>Nach 40 Nächten lebten dort doppelt so viele Jungfische wie an stillen Riffen und 50 Prozent mehr Arten. Ein Lautsprecher ohne Ton brachte nichts, es lag also am Klang.</p>
      <p>Allein retten Lautsprecher kein Riff. Die Forscher sehen sie als Hilfe, wenn ein Riff ohnehin wieder aufgebaut wird.</p>`,
  },
  {
    id: "barsch-muraene",
    lektion: 8,
    frage: "Ein großer Barsch steht vor einer Muräne und schüttelt den Kopf. Was passiert da?",
    antwort: `<p>Er holt sie zur Jagd ab. Der Panther-Forellenbarsch schwimmt gezielt zu Muränen, die tagsüber in ihrer Spalte ruhen, und schüttelt den Kopf drei- bis sechsmal pro Sekunde vor ihrem Maul. Oft kommt die Muräne heraus und jagt mit.</p>
      <p>Der Barsch ist schnell im freien Wasser, die Muräne schlängelt sich durch Spalten. Mit Muräne fängt der Barsch fast fünfmal so viel Beute. Redouan Bshary hat das bei Ras Mohammed beobachtet, schnorchelnd.</p>`,
  },
  {
    id: "barsch-satt",
    lektion: 8,
    frage: "Barsch und Muräne jagen zusammen. Warum streiten sie nie um die Beute, und wann ruft der Barsch die Muräne nicht?",
    antwort: `<p>Wer die Beute fängt, schluckt sie sofort im Ganzen. Es bleibt nichts zum Streiten übrig. Genau deshalb, sagt Bshary, gibt es so etwas bei Fischen, bei Säugetieren dagegen kaum: Die müssten ein erlegtes Tier gegen den Partner verteidigen.</p>
      <p>Und wer satt ist, ruft nicht an: Bekam ein Barsch vorher einen Fisch zu fressen, schüttelte er zwei Stunden lang vor keiner Muräne den Kopf.</p>`,
  },
  {
    id: "barsch-kopfstand",
    lektion: 8,
    frage: "Die Beute ist dem Barsch in eine Spalte entwischt. Was macht er, und was ist daran so besonders?",
    antwort: `<p>Er stellt sich kopfüber über die Spalte und schüttelt den Kopf. Das lockt die Beute nicht heraus, es zeigt einem Partner, wo sie steckt: einer Riesenmuräne oder einem Napoleon-Lippfisch. Ist keiner da, wartet er, einmal 25 Minuten lang. Die Forscher halten es für möglich, dass sein Gedächtnis mit dem von Menschenaffen mithalten kann.</p>
      <p>So eine Zeigegeste kannte man vorher nur von Menschen, Menschenaffen und Raben. Schwimmt die Muräne in die falsche Richtung, holt der Barsch sie zurück und schiebt sie sogar, wenn auch fast immer vergeblich.</p>`,
  },
  {
    id: "meerbarben-rudel",
    lektion: 8,
    frage: "Wie jagen Gelbsattel-Meerbarben zwischen den Korallen?",
    antwort: `<p>Zu zweit bis zu sechst. Einer treibt die Beute vor sich her, die anderen schwimmen außen um den Korallenblock und schneiden ihr den Weg ab.</p>
      <p>Feste Rollen haben sie nicht. Es startet einfach der Fisch, der der Beute am nächsten ist. Jeder will die Beute für sich, und gerade so umzingeln sie sie gemeinsam.</p>`,
  },
  {
    id: "floetenfisch",
    lektion: 8,
    frage: "Du siehst einen langen, dünnen Fisch mit einem Faden am Schwanz. Ist das ein Trompetenfisch?",
    antwort: `<p>Im Roten Meer fast sicher nicht. Es ist ein Blaupunkt-Flötenfisch: bis 1,60 Meter lang, blaue Punkte oder Streifen auf dem Rücken, ein weißer Faden wie eine Peitsche am Schwanz. Den echten Trompetenfisch führt die Fischliste des Roten Meeres nur mit einem einzigen Fund aus Eritrea.</p>
      <p>Flötenfische jagen im Trupp, an Daedalus und den Brothers bis zu 32 Tiere. Bricht einer aus, fangen die Nachbarn ab, was ihm entwischt.</p>`,
  },
  {
    id: "krake-boxt",
    lektion: 8,
    frage: "Ein Krake jagt mit Meerbarben und Barschen. Wer bestimmt was, und warum boxt der Krake?",
    antwort: `<p>Die Meerbarben schwimmen voraus und bestimmen, wohin es geht. Der Krake bestimmt, ob es weitergeht. Eduardo Sampaio hat das in Eilat gefilmt.</p>
      <p>Mit einem Arm boxt der Krake Fische aus der Gruppe, am häufigsten den Baskenmützen-Zackenbarsch, der die Gruppe bremst. Die Forscher nennen das Partnerkontrolle, wie beim Stammgast, der den betrügenden Putzer jagt. Sampaio musste beim ersten Hieb so lachen, dass er sich fast am Atemregler verschluckte.</p>`,
  },
  {
    id: "sabah-ishta",
    lektion: 9,
    frage: "Der Kellner sagt „sabāh il-chēr“. Was antwortest du, und was ist der Witz daran?",
    antwort: `<p>Üblich ist „sabāh in-nūr“, ein Morgen des Lichts. Man gibt den Gruß nicht einfach zurück, man legt etwas drauf.</p>
      <p>Noch mehr drauf legen „sabāh il-full“, ein Morgen voller Jasmin, und „sabāh il-ʾishta“, ein Morgen voller Sahne.</p>`,
  },
  {
    id: "ahlan-wa-sahlan",
    lektion: 9,
    frage: "Was heißt „ahlan wa sahlan“, und was antwortest du darauf?",
    antwort: `<p>Willkommen, wörtlich etwa „Willkommen und Leichtigkeit“.</p>
      <p>Du kannst dasselbe zurücksagen oder „ahlan bīk“ zu einem Mann und „ahlan bīki“ zu einer Frau.</p>`,
  },
  {
    id: "izzayyak-izzayyik",
    lektion: 9,
    frage: "Wie fragt man auf Ägyptisch „Wie geht’s?“, und warum werdet ihr zwei verschieden gefragt?",
    antwort: `<p>„Izzayyak?“ zu ihm, „izzayyik?“ zu ihr. Im Arabischen spricht man einen Mann anders an als eine Frau.</p>
      <p>Eine fröhliche Antwort ist „mia mia, il-hamdu lillāh“, hundert Prozent, Gott sei Dank.</p>`,
  },
  {
    id: "alf-shukr",
    lektion: 9,
    frage: "Danke, danke sehr, tausend Dank, gern geschehen: Wie heißt das auf Ägyptisch?",
    antwort: `<p>„Schukran“, „schukran ʾawi“, „alf schukr“ und „ʿafwan“. „Alf schukr“ heißt wörtlich tausend Dank, genau wie im Deutschen.</p>
      <p>Zum Abschied sagen beide „maʿa s-salāma“, wörtlich etwa „mit Unversehrtheit“, gemeint ist „komm heil an“.</p>`,
  },
  {
    id: "vier-woerter",
    lektion: 9,
    frage: "Welche vier Wörter hörst du in Ägypten den ganzen Tag, und was heißen sie?",
    antwort: `<p><em>Yalla</em>, los. <em>Tamām</em>, in Ordnung. <em>Maʿlisch</em>, macht nichts oder tut mir leid. <em>Inschallah</em>, so Gott will.</p>
      <p>Maʿlisch passt auf beide Seiten. Wer sich entschuldigt, kann es sagen, und wer die Entschuldigung annimmt, auch.</p>`,
  },
  {
    id: "gamal-ahwa",
    lektion: 9,
    frage: "Warum heißt das Kamel in Kairo „gamal“ und der Kaffee „ʾahwa“?",
    antwort: `<p>Der Buchstabe, der im Hocharabischen wie ein J klingt, ist dort ein hartes G: <em>gamal</em>, <em>gamīl</em>. Das tiefe Q wird zu einem kurzen Stopp in der Kehle: Geschrieben steht <em>qahwa</em>, gesagt wird <em>ʾahwa</em>. Dasselbe Wort heißt auch Kaffeehaus.</p>
      <p>Deshalb ist die Sahne eine <em>ʾishta</em>, geschrieben <em>qishta</em>.</p>`,
  },
  {
    id: "gina-gawi",
    lektion: 9,
    frage: "Woran erkennst du, dass jemand aus Oberägypten kommt, etwa aus Qina am Nil?",
    antwort: `<p>Dort wird das Q nicht verschluckt, es wird ein G. Der Pförtner aus Qina, den Mike Green fragte, sagte <em>gawi</em> statt <em>ʾawi</em> und nannte seine Stadt <em>Gina</em>.</p>
      <p>So löste Green einen Streit über die Schreibweise von <em>ʾawi</em>: Alle Wörterbücher von 1895 bis 2004 schrieben es mit Q, und in Oberägypten hört man das Q noch, als G.</p>`,
  },
];
