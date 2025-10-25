# Projekt "Agregator"

Dies ist eine Webanwendung, die als Aggregator mit einer interaktiven Karte und Suchfunktionen dient. Basierend auf der Komponentenstruktur ermöglicht die Anwendung das Suchen, Filtern und Anzeigen von Informationen zu Objekten auf einer Karte.

## Verwendete Technologien

-   **Framework:** [React](https://reactjs.org/)
-   **Build-Tool:** [Vite](https://vitejs.dev/)
-   **Styling:**
    -   [Sass (SCSS)](https://sass-lang.com/)
    -   [Material-UI (MUI)](https://mui.com/)
-   **Karten:** [React Leaflet](https://react-leaflet.js.org/)
-   **HTTP-Client:** [Axios](https://axios-http.com/)
-   **Animationen:** [Framer Motion](https://www.framer.com/motion/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **State-Management:** [Redux](https://redux.js.org/)
-   **Linting:** [ESLint](https://eslint.org/)
-   **Code-Formatierung:** [Prettier](https://prettier.io/)

## Einrichtung und Start

### 1. Klonen des Repositorys

```bash
git clone https://github.com/2pizzzza/hackathon-aggregator.git
cd hackathon-aggregator
```

### 2. Installation der Abhängigkeiten

Führen Sie den folgenden Befehl aus, um alle erforderlichen Pakete zu installieren:

```bash
npm install
```

### 3. Starten des Projekts

Verwenden Sie den folgenden Befehl, um die Anwendung im Entwicklungsmodus zu starten:

```bash
npm run dev
```

Nach Ausführung des Befehls ist das Projekt unter der im Terminal angegebenen Adresse verfügbar (normalerweise `http://localhost:5173/`).

## Verfügbare Skripte

In der `package.json` sind die folgenden Skripte definiert:

-   `npm run dev`: Startet den Entwicklungsserver mit Hot-Reload.
-   `npm run build`: Erstellt das Projekt für die Produktion im `dist`-Verzeichnis.
-   `npm run lint`: Führt die Code-Überprüfung mit ESLint aus.
-   `npm run preview`: Startet einen lokalen Server, um den Produktions-Build anzuzeigen.
