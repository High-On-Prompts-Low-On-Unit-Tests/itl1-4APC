# API-Tests in VS Code

Statt der Desktop-App: [Postman-Extension für VS Code](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode) (bereits installiert, auch über `.vscode/extensions.json` als Workspace-Empfehlung hinterlegt).

## Verwendung

1. Backend starten: `cd backend && pnpm start`
2. In VS Code links in der Sidebar auf das Postman-Icon klicken
3. **Collections** → Import → `docs/postman/bewertungsapp.postman_collection.json`
4. **Environments** → Import → `docs/postman/bewertungsapp.postman_environment.json`, dann als aktives Environment auswählen
5. Requests direkt in VS Code ausführen (kein Postman-Account nötig für lokale Collections)

## Enthalten

- **Teams**: CRUD + ein 404-Negativtest
- **Projects**: CRUD, Aggregationsroute `/durchschnitt`, ein 404-Negativtest
- **Evaluations**: POST + 400- und 409-Negativtest

Deckt bereits die für Einheit 5 geforderten "mind. 2 Negativtests" ab (hier: 400, 404, 409 — drei Stück über mehrere Ressourcen verteilt). Für die eigentliche Einheit-5-Abgabe (Testbericht etc.) noch `docs/postman/testbericht.md` ergänzen.
