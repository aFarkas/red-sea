# Lektionen für das Rote Meer

Dieses Repo ist ein Lern-Workspace des `teach`-Skills (`.claude/skills/teach/SKILL.md`). Der Skill legt
fest, welche Dateien es gibt. Diese Datei legt fest, wie eine Lektion entsteht. Ziel des Ganzen:
`MISSION.md`. Vorlieben, Bauteile und Einbindung einer Lektion: `NOTES.md`.

## Maßstab  [#standard]

Eine Lektion ist eine gute Geschichte aus echter Biologie.

- **Faktentreu**, immer: Jede Aussage steht in einer Quelle, die in diesem Durchgang gelesen wurde.
- Jedes Detail ist außerdem **praxisnah** oder **nerdy**. Eins von beiden reicht.
  - Praxisnah: Man kann es beim Tauchen bei Hurghada/Safaga selbst sehen, hören oder erkennen.
  - Nerdy: Es ist überraschend, witzig oder spannend und wird auf dem Boot weitererzählt.
- Ist ein Detail beides, muss es in die Lektion.

Ein Detail wird so erzählt, wie es ist: das Witzige witzig, das Nerdige nerdig, das Spannende
spannend, und mit genug Platz, um zu wirken. Gekürzt wird an der Erklärung, nicht an der Pointe.

Eine Lektion ist ein Happen von 5–10 Minuten Lesezeit, ein Thema. Die Lektionen 1–7 haben 1100–1800
Wörter, Kästen und Quellen mitgezählt.

## Ablauf  [#workflow]

Jede Lektion durchläuft alle vier Schritte in dieser Reihenfolge, auch eine kleine.

### 1. Recherchieren  [#research]

- Lies zuerst `MISSION.md`, `NOTES.md`, `learning-records/`, `RESOURCES.md`, die letzte Lektion und
  `assets/`. Nennt der Nutzer kein Thema, wähl eins aus den Ideen in `NOTES.md`, das in seiner Zone der
  nächsten Entwicklung liegt.
- Recherchier frisch mit WebSearch und WebFetch, auch wenn `RESOURCES.md` schon Quellen nennt. Was du
  zu wissen glaubst, ist eine Hypothese, die eine Quelle bestätigen muss.
- Rangfolge der Quellen: Studie (frei lesbar bevorzugt), Review, Forschungsinstitut oder Museum.
  Wikipedia dient nur als Wegweiser zu Belegen. Prüf bei jeder Studie, ob es einen Rückzug oder eine
  „expression of concern“ gibt.
- Prüf für jede Art: Kommt sie im Roten Meer vor, bei Hurghada/Safaga, wie häufig, in welcher Tiefe,
  zu welcher Tageszeit, wo am Riff?
- Such gezielt nach Pointen: Experimente, Rekordzahlen, Vergleiche aus dem Alltag, Verhalten, das man
  mit eigenen Augen erkennt.
- Trag neue Quellen in `RESOURCES.md` ein.

Fertig, wenn jede geplante Aussage und jede Zahl in einer gelesenen Quelle steht, jedes geplante
Detail praxisnah oder nerdy ist, die Details, die beides sind, gesammelt sind, jeder Beobachtungsauftrag ein Verhalten nennt, das im Tauchgebiet vorkommt, und eine
Primärquelle als Leseempfehlung feststeht.

### 2. Schreiben  [#write]

- Erzähl eine Geschichte: Ein Einstieg mit Szene oder Frage zieht hinein, ein roter Faden trägt, die
  Pointe löst auf. Ton einer Erzählung, nicht eines Lehrbuchs.
- Nimm nur das Wissen auf, das die Geschichte trägt. Jeder Fachbegriff wird beim ersten Auftreten
  erklärt, so dass eine Tauchanfängerin ohne Vorwissen folgen kann.
- Setz den Beleg als Link direkt an die Aussage.
- Bau aus `assets/` (zuerst `course.css`) und halte dich an `reference/glossar.html`.
- Verlink frühere Lektionen und Nachschlageseiten, wo die Geschichte an sie anknüpft.
- Empfiehl die Primärquelle aus Schritt 1 und erinnere daran, dass man dem Agenten Fragen stellen kann.
- Alle übrigen Bauteile und Einbindungen stehen in `NOTES.md`.

Fertig, wenn die Lektion in `lessons/` liegt, jedes Bauteil aus `NOTES.md` da ist und die Länge im
Rahmen von [#standard] liegt.

### 3. Reviewen  [#review]

Das Review läuft in einem Subagenten mit frischem Kontext (Agent-Tool, `general-purpose`). Er bekommt
absolute Pfade zur Lektion, zu dieser Datei, zu `MISSION.md` und `NOTES.md`, aber keine
Recherchenotizen, damit er die Quellen selbst öffnet. Er prüft:

- **Fakten:** Jede Aussage und jede Zahl gegen die verlinkte Quelle. Steht dort wirklich, was die
  Lektion sagt? Stimmen Artnamen und Vorkommen im Roten Meer? Zeigt jedes Foto, was der Text sagt?
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
- **Praxis:** Ist jeder Beobachtungsauftrag bei Hurghada/Safaga zu sehen?
- **Form:** Länge nach [#standard], Regeln aus `NOTES.md`.

Er liefert eine Liste von Befunden, jeder mit Zitat aus der Lektion, Beleg und Schwere.

### 4. Fixen  [#fix]

- Prüf jeden Befund. Ist er berechtigt, behebe ihn. Ist er es nicht, verwirf ihn mit Begründung.
- Einen Faktenbefund behebst du mit einer gelesenen Quelle.
- Hat der Fix die Geschichte umgebaut, läuft [#review] erneut.

Fertig, wenn jeder Befund behoben oder begründet verworfen ist. Dann öffne die Lektion für den Nutzer
und sag in wenigen Zeilen, was das Review gefunden hat und was sich geändert hat.
