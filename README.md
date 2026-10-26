# Meeresleben Rotes Meer

Ein kleiner Kurs zum Staunen vor dem Tauchen bei Hurghada/Safaga. Die Startseite ist `index.html`.

Eingebettete YouTube-Videos laufen nur über einen Webserver, als lokale Datei zeigt der Player Fehler 153.
Im Kursordner starten und dann <http://localhost:8765> öffnen:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

## Steuerdateien

Drei Dateien sagen dem Agenten, der den Kurs schreibt, was er tun soll.

| Datei          | Frage                    | Inhalt                                                                         | Ändert sich      |
| -------------- | ------------------------ | ------------------------------------------------------------------------------ | ---------------- |
| `MISSION.md`   | Wozu wird gelernt?       | Ziel, woran man Erfolg erkennt, Rahmenbedingungen, was bewusst nicht dazugehört | selten           |
| `NOTES.md`     | Wie wird gelernt?        | Arbeitsregeln für Lektionen, Wiederholung und Seitenpflege, Ideen für nächste Lektionen | oft              |
| `RESOURCES.md` | Woher kommt das Wissen?  | Geprüfte Quellen mit „Use for:“, Communitys, Lücken in der Recherche           | bei neuer Recherche |

Bei der Frage, ob ein Thema in den Kurs gehört, entscheidet `MISSION.md`. Fakten in einer Lektion
stützen sich auf eine Quelle aus `RESOURCES.md`. Die Gaps dort zeigen, wo vor der nächsten Lektion noch
recherchiert werden muss.

## Wie Erkenntnisse wandern

1. Was über den Lernenden bekannt wird, etwa Vorwissen, eine Beobachtung beim Tauchen oder eine Vorliebe,
   kommt als nummerierte Notiz nach `learning-records/`.
2. Wird daraus eine dauerhafte Regel, steht sie in `NOTES.md`.
3. Die Regeln aus `NOTES.md` formen die nächste Lektion.

## Ordner

- `lessons/`: die Lektionen, nummeriert.
- `reference/`: Nachschlageseiten wie Glossar, Beobachtungs-Logbuch und Wiederholung.
- `assets/`: Styles, Skripte, Wiederholungskarten und deren Stand.
- `learning-records/`: Lernnotizen über den Lernenden.
