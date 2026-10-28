# Aufgabe 6: IONIC-Frontend, Listen und Detailansicht

## Setup

- `frontend/` als Ionic/Angular-Projekt (`ionic start frontend blank --type=angular`), pnpm statt npm
- `.mise.toml` im Repo-Root: pinnt Node 24.22.1 + pnpm, projektbezogen (Volta bleibt außerhalb des Projekts unberührt)
- `environment.ts` / `environment.prod.ts`: `apiUrl: 'http://localhost:3000'`

## API-Service (`src/app/services/api.ts`)

- `getProjects()` → `GET /projects` (inkl. Team)
- `getProject(id)` → `GET /projects/:id` (inkl. Team)
- `getDurchschnitt(id)` → `GET /projects/:id/durchschnitt` (Durchschnitt pro Kriterium, inkl. Kriteriumsname)

Backend-Route `GET /projects/:id/durchschnitt` dafür minimal erweitert: liefert jetzt zusätzlich `Criterion.name` statt nur der `criterionId`, damit das Frontend keine zweite Abfrage braucht.

## Seiten

- **`pages/projekte-liste`**: Liste aller Projekte mit zugehörigem Team (Name + Klasse), Klick navigiert zu `/projekt-detail/:id`
- **`pages/projekt-detail`**: Projektdetails (Team, Titel, Beschreibung, Präsentationsdatum) + Liste der bisherigen Bewertungen (Durchschnitt pro Kriterium, aus der Einheit-4-Aggregationsroute)

## Wichtiger Stolperstein: Zoneless Change Detection

Dieses Ionic/Angular-Starter-Template ist standardmäßig **zoneless** (kein `zone.js` in den Polyfills, Angular v21+ hat Zoneless als Default). Mit dem aus der Angabe übernommenen Muster (`this.property = data` in einem `subscribe()`-Callback) kam die Daten zwar im Service an, die View hat aber nie neu gerendert — stilles Problem ohne Fehlermeldung.

Zwei Dinge waren nötig, um das zu beheben:
1. `zone.js` als Polyfill ergänzt (`pnpm add zone.js`, `angular.json` → `"polyfills": ["zone.js"]`) und `provideZoneChangeDetection()` im `AppModule` registriert
2. Trotzdem beide Seiten auf **Signals** umgestellt (`signal<T>()`, `.set()`, `projekte()` im Template) statt auf einfache Properties — robuster und zukunftssicher unabhängig von Zone/Zoneless-Konfiguration

Separat: `IonicModule.forRoot()` ist in dieser Version ebenfalls deprecated (→ `provideIonicAngular()`), die Migration wurde probiert, bricht aber `ion-app`/`ion-router-outlet` in NgModule-basierten Apps (diese Elemente brauchen `IonicModule`s Komponenten-Deklarationen, `provideIonicAngular()` liefert nur Services/Config). Deshalb bei `IonicModule.forRoot()` geblieben, die Deprecation-Warnung in der Konsole ist rein kosmetisch.

## Verifikation

Backend (Docker) + `ionic serve` gleichzeitig laufen lassen, im Browser geprüft:
- `/projekte-liste` zeigt beide Seed-Projekte mit Team
- Klick auf ein Projekt → `/projekt-detail/:id` zeigt Projektdetails + Durchschnittsbewertungen mit Kriteriumsnamen (z.B. „Inhalt: 8.0000", „Präsentationstechnik: 7.0000")
