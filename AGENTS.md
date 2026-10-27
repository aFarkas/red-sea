# Lektionen für den Urlaub in Ägypten

Dieses Repo ist ein Lern-Workspace des `teach`-Skills (`.claude/skills/teach/SKILL.md`). Der Skill legt
fest, welche Dateien es gibt; sein `NOTES.md` ist hier um die Notes je Strang in `notes/` ergänzt.
Diese Datei legt fest, wie eine Lektion entsteht. Ziel des Ganzen: `MISSION.md`. Vorlieben, Bauteile
und Einbindung einer Lektion: `NOTES.md`, dazu die Notes des Strangs, die `NOTES.md` nennt (Unter
Wasser oder Über Wasser).

## Maßstab  [#standard]

Eine Lektion ist eine gute Geschichte aus echter Biologie, echter Geschichte oder dem echten Ägypten
von heute.

- **Faktentreu**, immer: Jede Aussage steht in einer Quelle, die in diesem Durchgang gelesen wurde.
- Jedes Detail ist außerdem **praxisnah** oder **nerdy**. Eins von beiden reicht.
  - Praxisnah: Man kann es im Urlaub selbst sehen, hören, erkennen oder benutzen. Unter Wasser heißt
    das beim Tauchen oder Schnorcheln bei Soma Bay/Safaga, über Wasser im Hotel, auf dem Markt, im
    Taxi, in El Quseir oder Safaga und in Luxor vor Ort.
  - "Nerdy": Es ist überraschend, witzig, detailliert, wissenschaftlich oder spannend und wird auf dem Boot 
    oder beim Abendessen weitererzählt.
- Ist ein Detail beides, muss es in die Lektion.

Ein Detail wird so erzählt, wie es ist: das Witzige witzig, das Nerdige nerdig, das Spannende
spannend, und mit genug Platz, um zu wirken. Gekürzt wird an der Erklärung, nicht an der Pointe.

Eine Lektion ist ein Happen von 5–10 Minuten Lesezeit, ein Thema. Die Lektionen 1–7 haben 1100–1800
Wörter, Kästen und Quellen mitgezählt. Das gilt für beide Stränge.

## Ablauf  [#workflow]

Jede Lektion durchläuft alle vier Schritte in dieser Reihenfolge, auch eine kleine.

### 1. Recherchieren  [#research]

- Lies zuerst `MISSION.md`, `NOTES.md`, die Notes des Strangs, `learning-records/`, `RESOURCES.md`, die
  letzte Lektion und `assets/`. Nennt der Nutzer kein Thema, wähl eins aus den Ideen und dem Plan in den
  Notes, das in seiner Zone der nächsten Entwicklung liegt.
- Recherchier frisch mit WebSearch und WebFetch, auch wenn `RESOURCES.md` schon Quellen nennt. Was du
  zu wissen glaubst, ist eine Hypothese, die eine Quelle bestätigen muss.
- Rangfolge der Quellen: Studie (frei lesbar bevorzugt), Review, Forschungsinstitut oder Museum.
  Über Wasser zählen dazu Grabungsprojekte, Universitäten, Übersetzungen der Originaltexte und für
  Reise- und Sicherheitsfragen amtliche Stellen. Wikipedia dient nur als Wegweiser zu Belegen. Prüf bei
  jeder Studie, ob es einen Rückzug oder eine „expression of concern“ gibt.
- Prüf für jede Art: Kommt sie im Roten Meer vor, bei Soma Bay/Safaga, wie häufig, in welcher Tiefe,
  zu welcher Tageszeit, wo am Riff?
- Prüf für jeden Ort: Ist er offen, was enthält das Ticket, wo im Gelände steht das, wovon die Lektion
  erzählt? Prüf für jeden Brauch und jeden Satz: Gilt das heute in Ägypten, und sagt man das im
  ägyptischen Arabisch so?
- Such gezielt nach Pointen: Experimente, Rekordzahlen, Vergleiche aus dem Alltag, Verhalten, das man
  mit eigenen Augen erkennt.
- Trag neue Quellen in `RESOURCES.md` ein.

Fertig, wenn jede geplante Aussage und jede Zahl in einer gelesenen Quelle steht, jedes geplante
Detail praxisnah oder nerdy ist, die Details, die beides sind, gesammelt sind, jeder
Beobachtungsauftrag etwas nennt, das man im Tauchgebiet oder am Reiseort erlebt, und eine Primärquelle
als Leseempfehlung feststeht.

### 2. Schreiben  [#write]

- Erzähl eine Geschichte: Ein Einstieg mit Szene oder Frage zieht hinein, ein roter Faden trägt, die
  Pointe löst auf. Ton einer Erzählung, nicht eines Lehrbuchs.
- Nimm nur das Wissen auf, das die Geschichte trägt. Jeder Fachbegriff wird beim ersten Auftreten
  erklärt, so dass eine Tauchanfängerin ohne Vorwissen folgen kann.
- Setz den Beleg als Link direkt an die Aussage.
- Bau aus `assets/` (zuerst `course.css`) und halte dich an die Glossare, die die Notes des Strangs nennen.
- Verlink frühere Lektionen und Nachschlageseiten, wo die Geschichte an sie anknüpft.
- Empfiehl die Primärquelle aus Schritt 1 und erinnere daran, dass man dem Agenten Fragen stellen kann.
- Alle übrigen Bauteile und Einbindungen stehen in `NOTES.md` und den Notes des Strangs.

Fertig, wenn die Lektion in `lessons/` liegt, jedes Bauteil aus den Notes da ist und die Länge im
Rahmen von [#standard] liegt.

### 3. Reviewen  [#review]

Das Review läuft in einem Subagenten mit frischem Kontext (Agent-Tool, `general-purpose`). Er bekommt
absolute Pfade zur Lektion, zu dieser Datei, zu `MISSION.md`, `NOTES.md` und den Notes des Strangs,
aber keine Recherchenotizen, damit er die Quellen selbst öffnet. Er prüft:

- **Fakten:** Jede Aussage und jede Zahl gegen die verlinkte Quelle. Steht dort wirklich, was die
  Lektion sagt? Stimmen Artnamen und Vorkommen im Roten Meer,
  Namen, Orte und Daten? Zeigt jedes Foto und jede Karte, was der Text sagt?
- **Geschichte:** Ist sie rund? Zieht der Einstieg, hält der rote Faden, löst das Ende auf? Versteht
  eine Tauchanfängerin jeden Satz?
- **Folgen können:** Lies die Lektion einmal von vorn bis hinten wie ein Leser. Baut jeder Absatz auf
  dem vorigen auf? Ist an jeder Stelle klar, welches Tier gerade was tut und warum? Ein Befund ist
  eine Lücke, ein Sprung oder Wissen, das die Lektion voraussetzt, ohne es zu erzählen. Eine Frage
  oder ein Rätsel, das die Lektion bewusst offen lässt und später auflöst, hält den Leser bei der
  Stange und ist gewollt. Befund ist es nur, wenn die Auflösung fehlt.
- **Lust auf mehr:** Ist jedes Detail praxisnah oder nerdy? Ist jedes Detail, das beides ist, drin?
  Kommt das Witzige, Nerdige, Spannende so heraus, wie es ist, oder ist ein starkes Detail zu kurz
  gekommen?
- **Praxis:** Ist jeder Beobachtungsauftrag im Tauchgebiet oder am Reiseort zu erleben?
- **Form:** Länge nach [#standard], Regeln aus `NOTES.md` und den Notes des Strangs.

Er liefert eine Liste von Befunden, jeder mit Zitat aus der Lektion, Beleg und Schwere.

### 4. Fixen  [#fix]

- Prüf jeden Befund. Ist er berechtigt, behebe ihn. Ist er es nicht, verwirf ihn mit Begründung.
- Einen Faktenbefund behebst du mit einer gelesenen Quelle.
- Hat der Fix die Geschichte umgebaut, läuft [#review] erneut.

Fertig, wenn jeder Befund behoben oder begründet verworfen ist. Dann öffne die Lektion für den Nutzer
und sag in wenigen Zeilen, was das Review gefunden hat und was sich geändert hat.
