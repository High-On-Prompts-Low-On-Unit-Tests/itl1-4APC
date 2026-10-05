# Bewertungsapp – <Vorname Nachname></vorname>

Klasse: <Klasse></klasse>

## Setup

Backend (nativ):

```Shell
cd backend
pnpm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
pnpm start
```

Alternativ alles (MySQL, Adminer, Backend) über Docker, inkl. Live-Reload bei Code-Änderungen:

```Shell
docker compose up -d
```

Container heißen `itl1_4apc-db-1`, `itl1_4apc-adminer-1`, `itl1_4apc-backend-1`. Migrationen/Seeder beim ersten Start einmalig ausführen: `docker compose exec backend npx sequelize-cli db:migrate` (bzw. `db:seed:all`).

Frontend:

```Shell
cd frontend
pnpm install
ionic serve
```

Eigene `config/config.js` lokal aus `config/config.example.js` ableiten, nicht committen. `host` ist per `DB_HOST`-Env-Var überschreibbar (Default `127.0.0.1`, Docker Compose setzt `db`).

## Einheit 1: Installation

- [X] Screenshot Toolchain (`node --version`, `ionic --version`, laufendes DB-Tool bzw. Docker-Container)
- [X] Antworten auf die vier Verständnisfragen: `docs/aufgabe1.md`

## Einheit 2: Datenmodell anlegen

- [X] Ausgefüllte Planungsvorlage: `docs/diagramm/planungsvorlage.md`
- [X] Verwendete `model:generate`-Befehle dokumentiert
- [X] Screenshot der angelegten Tabellen im DB-Tool: `docs/screenshots/aufgabe2-tabellen.png`

## Einheit 3: Assoziationen und weitere Modelle

- [X] Alle Modelle (Team, Member, Project, Criterion, Juror, Evaluation) mit ausgefüllten `associate`-Methoden
- [X] Unique-Constraint auf (projectId, criterionId, jurorId) bei Evaluation
- [X] Mindestens ein Seeder mit Testdaten: `docs/aufgabe3.md`

## Einheit 4: Backend-Routen

- [X] CRUD für Team und Project
- [X] POST-Route für Evaluation inkl. Validierung
- [X] Aggregations-Route: Durchschnitt der Punktzahl pro Projekt und Kriterium
- [X] Kurze Endpunkt-Dokumentation (Methode, Pfad, Body, Rückgabe): `docs/aufgabe4.md`

## Einheit 5: Postman-Test

- [ ] Collection: `docs/postman/bewertungsapp.postman_collection.json`
- [ ] Environment: `docs/postman/bewertungsapp.postman_environment.json`
- [ ] Mindestens zwei dokumentierte Negativtests
- [ ] Testbericht: `docs/postman/testbericht.md`

## Einheit 6: IONIC-Frontend

- [ ] Projektliste mit Team-Zuordnung
- [ ] Detailansicht eines Projekts mit bisherigen Bewertungen
- [ ] API-Service vollständig an eigenes Backend angebunden

## Einheit 7: Login und Endabgabe

- [ ] Bewertungsformular (Projekt, Kriterium, Punktzahl, Kommentar) mit Validierung
- [ ] Auswertungsseite mit Durchschnittswerten
- [ ] Juror-Login, Token-Storage mit `@capacitor/preferences`
- [ ] Nachweis: geschützte Route liefert ohne Token 401, mit gültigem Token die erwartete Antwort

## Endpunkt-Dokumentation (laufend ergänzen)

Vollständige Tabelle: `docs/aufgabe4.md`

| Methode | Pfad                     | Body                                                 | Rückgabe                                     |
| ------- | ------------------------ | ----------------------------------------------------- | ----------------------------------------------- |
| GET     | /teams                   | –                                                      | Liste aller Teams                               |
| GET     | /teams/:id                | –                                                      | Ein Team, 404 wenn nicht gefunden               |
| POST    | /teams                   | `{ name, klasse }`                                     | 201 + neues Team, 400 bei fehlenden Feldern      |
| PUT     | /teams/:id                | beliebige Team-Felder                                  | aktualisiertes Team, 404 wenn nicht gefunden     |
| DELETE  | /teams/:id                | –                                                      | 204, 404 wenn nicht gefunden                    |
| GET     | /projects                | –                                                      | Liste aller Projekte inkl. Team                 |
| GET     | /projects/:id             | –                                                      | Ein Projekt inkl. Team, 404 wenn nicht gefunden |
| POST    | /projects                | `{ teamId, titel, beschreibung?, praesentiertAm }`     | 201, 400 bei fehlenden Feldern, 404 bei ungültiger teamId |
| PUT     | /projects/:id              | beliebige Projekt-Felder                               | aktualisiertes Projekt, 404 wenn nicht gefunden |
| DELETE  | /projects/:id              | –                                                      | 204, 404 wenn nicht gefunden                    |
| GET     | /projects/:id/durchschnitt | –                                                      | Durchschnittspunktzahl gruppiert nach Kriterium |
| POST    | /evaluations              | `{ projectId, criterionId, jurorId, score, comment? }` | 201, 400/404/409 je nach Fehlerfall             |

## Bekannte Einschränkungen

<hier eintragen, was noch fehlt oder bekannt fehlerhaft ist>
