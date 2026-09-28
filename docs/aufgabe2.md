# Aufgabe 2: Datenmodell der Bewertungsapp anlegen

Ausgefüllte Planungsvorlage (ER-Diagramm, Spalten, Beispieldaten), verwendete CLI-Befehle und Screenshot der angelegten Tabellen: [docs/diagramm/planungsvorlage.md](diagramm/planungsvorlage.md)

## Kurzüberblick

- Node-Projekt in `backend/` mit Express + Sequelize aufgesetzt (pnpm)
- `config/config.example.json` als Vorlage committet, echtes `config/config.json` lokal (gitignored)
- Datenbank `bewertungsapp_db` per `sequelize-cli db:create` angelegt
- Modelle **Team**, **Member**, **Project** generiert und migriert (Details siehe Planungsvorlage)

![Tabellen in Adminer](screenshots/aufgabe2-tabellen.png)
