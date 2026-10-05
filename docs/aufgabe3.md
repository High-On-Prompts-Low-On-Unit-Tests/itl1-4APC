# Aufgabe 3: Assoziationen und restliche Modelle

## Associate-Methoden ergänzt

- `Team`: `hasMany` Member, `hasMany` Project
- `Member`: `belongsTo` Team
- `Project`: `belongsTo` Team, `hasMany` Evaluation
- `Criterion`: `hasMany` Evaluation
- `Juror`: `hasMany` Evaluation
- `Evaluation`: `belongsTo` Project, Criterion, Juror

## Neue Modelle (Attribute aus Planungsvorlage abgeleitet)

| Entität | Attribut (fix) | Attribute (abgeleitet) |
|---|---|---|
| Criterion | id | `name:string`, `maxScore:integer`, `weight:float` |
| Juror | id | `name:string`, `email:string` |
| Evaluation | id, projectId, criterionId, jurorId | `score:integer`, `comment:text` |

Alle Pflichtfelder (`allowNull: false`) in Migration + Model ergänzt, `comment` bleibt optional.

Unique-Constraint auf (`projectId`, `criterionId`, `jurorId`) bei Evaluation per `queryInterface.addIndex(..., { unique: true })` in der Migration ergänzt, damit kein Juror dasselbe Kriterium für dasselbe Projekt mehrfach bewerten kann.

## Seeder

Testdaten für alle sechs Entitäten angelegt, exakt nach den Beispieldaten aus der Planungsvorlage (konsistente IDs über die Fremdschlüssel hinweg):

- `20261005080928-demo-criteria.js` — Inhalt, Präsentationstechnik, Technische Umsetzung
- `20261005081258-demo-teams.js` — Team Blockchain, Team RoboArm
- `20261005081303-demo-members.js` — Lena Huber, Tom Novak (Team Blockchain)
- `20261005081304-demo-projects.js` — Dezentrale Wahl-App, Autonomer Greifarm
- `20261005081305-demo-jurors.js` — M. Huber, S. Novak
- `20261005081307-demo-evaluations.js` — 3 Beispiel-Bewertungen

**Wichtig:** `db:seed:all` trackt Seeder standardmäßig nicht (anders als Migrationen) und hätte beim erneuten Ausführen alles dupliziert. Deshalb `"seederStorage": "sequelize"` in `config/config.json` (und `config.example.json`) ergänzt — das legt eine `SequelizeData`-Tabelle an, die bereits ausgeführte Seeder merkt.

## Verwendete CLI-Befehle

```
npx sequelize-cli model:generate --name Criterion --attributes name:string,maxScore:integer,weight:float
npx sequelize-cli model:generate --name Juror --attributes name:string,email:string
npx sequelize-cli model:generate --name Evaluation --attributes projectId:integer,criterionId:integer,jurorId:integer,score:integer,comment:text
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name demo-criteria
npx sequelize-cli seed:generate --name demo-teams
npx sequelize-cli seed:generate --name demo-members
npx sequelize-cli seed:generate --name demo-projects
npx sequelize-cli seed:generate --name demo-jurors
npx sequelize-cli seed:generate --name demo-evaluations
npx sequelize-cli db:seed:all
```

`db:migrate` lief ohne Fehler (alle drei Migrationen `migrated`), `db:seed:all` hat die drei Kriterien eingefügt.

## Screenshot

Tabellen nach Migration (alle 6 Entitäten + SequelizeMeta): [docs/screenshots/aufgabe3-tabellen.png](screenshots/aufgabe3-tabellen.png)

Seeder-Ergebnis (Criteria, 3 Zeilen, keine Duplikate): [docs/screenshots/aufgabe3-seed-criteria.png](screenshots/aufgabe3-seed-criteria.png)

**Noch offen:** Terminal-Screenshot von `db:migrate` selbst (laut Abgabekriterien gefordert) — bitte selbst machen wie bei Aufgabe 1, da Desktop-Screenshots bei dir unzuverlässig sind. Befehl einfach nochmal laufen lassen (`npx sequelize-cli db:migrate` zeigt dann "No migrations were executed, database schema was already up to date.") und mit Win+Shift+S festhalten, dann hier als `docs/screenshots/aufgabe3-migrate.png` ablegen und verlinken.
