# API-Tests mit Bruno

Die Postman-VS-Code-Extension hatte beim Import unserer Collection einen bekannten Bug (Cloud-Workspace-Import schlägt fehl, siehe [postmanlabs/postman-app-support#12848](https://github.com/postmanlabs/postman-app-support/issues/12848) u.a.). Deshalb testen wir stattdessen mit [Bruno](https://www.usebruno.com/) — offline-first, Collection liegt als Klartext (`.yml`) direkt hier im Repo, keine Account-Pflicht.

## Verwendung in VS Code

1. Bruno-Extension ist installiert (`bruno-api-client.bruno`, auch in `.vscode/extensions.json` empfohlen)
2. Backend starten: `cd backend && pnpm start`
3. Bruno-Icon in der VS-Code-Sidebar → **Open Collection** → diesen Ordner (`docs/bruno`) auswählen
4. Oben rechts Environment **Local** auswählen (`baseUrl = http://localhost:3000`)
5. Requests einzeln ausführen, oder ganzen Ordner mit Rechtsklick → **Run**

## Verwendung im Terminal (ohne GUI)

```
npx @usebruno/cli run --env Local -r
```
(im Ordner `docs/bruno` ausführen, Backend muss laufen)

## Enthalten

- **Teams**: vollständiges CRUD, verkettet über `{{teamId}}` (POST setzt die Variable per `after-response`-Script, GET/PUT/DELETE nutzen sie) — hinterlässt keine Testdaten
- **Projects**: vollständiges CRUD analog verkettet über `{{projectId}}`, plus `GET .../durchschnitt`
- **Evaluations**: nur POST (lt. Aufgabenstellung); jeder erfolgreiche Lauf legt eine Testbewertung an (`projectId:2, criterionId:1, jurorId:1`), die nicht automatisch gelöscht wird (keine DELETE-Route vorhanden) — beim zweiten Lauf hintereinander schlägt dieselbe Zeile daher erwartungsgemäß mit 409 fehl
- **4 Negativtests mit Assertions** (`runtime.assertions`): 400 (fehlende Pflichtfelder), zweimal 404 (ungültige ID), 409 (doppelte Bewertung)

## Herkunft

Die Collection wurde aus `openapi-source.yml` generiert (`bru import openapi --group-by tags`) und danach manuell um Verkettung, Negativtests und Assertions ergänzt. Bei neuen/geänderten Routen zuerst `openapi-source.yml` aktualisieren und neu importieren, oder die `.yml`-Dateien direkt anpassen.

## Verhältnis zu docs/postman/

Die Postman-Collection in `docs/postman/` bleibt bestehen (Pflichtformat für die Einheit-5-Abgabe laut Aufgabenstellung) und ist schemakorrekt (mit `newman` verifiziert). Für die tägliche Arbeit in VS Code nutzen wir aber Bruno, da der Postman-Import dort bei uns nicht funktioniert hat.
