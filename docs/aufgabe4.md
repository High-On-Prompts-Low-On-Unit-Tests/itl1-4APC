# Aufgabe 4: Backend-Routen, CRUD und Aggregation

## Endpunkt-Dokumentation

| Methode | Pfad | Body | Rückgabe |
|---|---|---|---|
| GET | /teams | – | Liste aller Teams |
| GET | /teams/:id | – | Ein Team, 404 wenn nicht gefunden |
| POST | /teams | `{ name, klasse }` | 201 + neues Team, 400 wenn Pflichtfelder fehlen |
| PUT | /teams/:id | beliebige Team-Felder | aktualisiertes Team, 404 wenn nicht gefunden |
| DELETE | /teams/:id | – | 204, 404 wenn nicht gefunden |
| GET | /projects | – | Liste aller Projekte inkl. Team |
| GET | /projects/:id | – | Ein Projekt inkl. Team, 404 wenn nicht gefunden |
| POST | /projects | `{ teamId, titel, beschreibung?, praesentiertAm }` | 201 + neues Projekt, 400 wenn Pflichtfelder fehlen, 404 wenn teamId nicht existiert |
| PUT | /projects/:id | beliebige Projekt-Felder | aktualisiertes Projekt, 404 wenn nicht gefunden |
| DELETE | /projects/:id | – | 204, 404 wenn nicht gefunden |
| GET | /projects/:id/durchschnitt | – | Durchschnittliche Punktzahl des Projekts, gruppiert nach `criterionId`; 404 wenn Projekt nicht existiert |
| POST | /evaluations | `{ projectId, criterionId, jurorId, score, comment? }` | 201 + neue Bewertung; 400 wenn Pflichtfelder fehlen; 404 wenn projectId/criterionId/jurorId nicht existiert; 409 wenn dieselbe Kombination (projectId, criterionId, jurorId) schon bewertet wurde |

## Verifikation

Server lokal gestartet (`pnpm start`) und alle Routen gegen die Seed-Daten aus Aufgabe 3 per `curl` durchgetestet: CRUD für Team (inkl. 404-Fall), CRUD-Lesefälle für Project inkl. Team-Include, Aggregationsroute `/projects/1/durchschnitt`, sowie alle vier Antwortfälle von `POST /evaluations` (400, 404, 409, 201). Test-Datensätze danach wieder entfernt, Seed-Stand unverändert.

```
GET /projects/1/durchschnitt
→ [{"criterionId":1,"durchschnitt":"8.0000"},{"criterionId":2,"durchschnitt":"7.0000"}]
```

## Verwendete Dateien

- `backend/routes/teams.js`
- `backend/routes/projects.js`
- `backend/routes/evaluations.js`
- Einbindung in `backend/index.js`
