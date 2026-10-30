# „Weißt du noch?“ ist die Hauptwiederholung

Der Nutzer sagt, er gehe wahrscheinlich seltener auf die Wiederholungsseite und eher gleich auf eine neue Lektion. Deshalb soll der „Weißt du noch?“-Kasten am Anfang der Lektion ausgebaut werden, „vielleicht drei statt immer nur zwei“.

**Implications:** Der Kasten hat jetzt drei Karten und eine Umrechenkarte mit neuem Betrag bei jedem Öffnen, mindestens eine Karte aus Sprache oder Zahlen ([[0011-sprache-und-zahlen-fallen-schwer]], [[0013-umrechnen-pfund-euro-gefaellt]]). Weil kaum Bewertungen von der Wiederholungsseite kommen, ist `review-state.js` als Grundlage für die Auswahl dünn. Die Auswahl richtet sich dann nach den letzten Lektionen und danach, was noch in keinem Kasten stand. Siehe [[NOTES.md]].
