# Unser Ägypten

Ein kleiner Kurs zum Staunen für den Urlaub in Ägypten: Soma Bay bei Safaga, El Quseir und Luxor. Zwei
Stränge: **Unter Wasser** (Meeresleben, etwa zwei Drittel) und **Über Wasser** (Land, Leute, Sprache,
altes Ägypten). Die Startseite ist `index.html`.

Eingebettete YouTube-Videos laufen nur über einen Webserver, als lokale Datei zeigt der Player Fehler 153.
Im Kursordner starten und dann <http://localhost:8765> öffnen:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

## Offline als App

Der Kurs ist eine Progressive Web App. `sw.js` (Service Worker) speichert beim ersten Besuch mit Netz
alle Seiten, die von `index.html` aus verlinkt sind, mit Stylesheet, Skripten, Aufnahmen, Fotos von
Wikimedia und Schriften. Danach geht alles ohne Netz, außer eingebetteten Videos und Links nach draußen.
Mit Netz holt er höchstens einmal pro Stunde nach, was sich geändert hat. Den Stand zeigt der Kasten
„Offline lesen“ unten auf der Übersicht. `manifest.webmanifest` und `assets/icons/` machen daraus eine
App für den Home-Bildschirm, `assets/offline.js` meldet den Service Worker an.

Service Worker laufen nur über `https` oder `localhost`, also auf GitHub Pages und mit dem Webserver
unten, nicht als lokale Datei.

## Steuerdateien

Drei Dateien sagen dem Agenten, der den Kurs schreibt, was er tun soll.

| Datei          | Frage                    | Inhalt                                                                         | Ändert sich      |
| -------------- | ------------------------ | ------------------------------------------------------------------------------ | ---------------- |
| `MISSION.md`   | Wozu wird gelernt?       | Ziel, woran man Erfolg erkennt, Rahmenbedingungen, was bewusst nicht dazugehört | selten           |
| `NOTES.md`     | Wie wird gelernt?        | Reiseplan, Arbeitsregeln für Lektionen, Wiederholung und Seitenpflege; verweist auf `notes/` | oft              |
| `RESOURCES.md` | Woher kommt das Wissen?  | Geprüfte Quellen mit „Use for:“, Communitys, Lücken in der Recherche           | bei neuer Recherche |

`NOTES.md` gilt für beide Stränge. Was nur für einen Strang gilt, samt Ideen für nächste Lektionen,
steht in `notes/unter-wasser.md` und `notes/ueber-wasser.md`.

Bei der Frage, ob ein Thema in den Kurs gehört, entscheidet `MISSION.md`. Fakten in einer Lektion
stützen sich auf eine Quelle aus `RESOURCES.md`. Die Gaps dort zeigen, wo vor der nächsten Lektion noch
recherchiert werden muss.

## Wie Erkenntnisse wandern

1. Was über den Lernenden bekannt wird, etwa Vorwissen, eine Beobachtung beim Tauchen oder eine Vorliebe,
   kommt als nummerierte Notiz nach `learning-records/`.
2. Wird daraus eine dauerhafte Regel, steht sie in `NOTES.md` oder in den Notes des Strangs.
3. Diese Regeln formen die nächste Lektion.

## Ordner

- `lessons/`: die Lektionen, über beide Stränge fortlaufend nummeriert.
- `notes/`: Arbeitsregeln und Ideen je Strang.
- `reference/`: Nachschlageseiten wie Glossar, Beobachtungs-Logbuch und Wiederholung.
- `assets/`: Styles, Skripte, Wiederholungskarten und deren Stand, Icons der App.
- `sw.js`, `manifest.webmanifest`: die Offline-App.
- `learning-records/`: Lernnotizen über den Lernenden.
