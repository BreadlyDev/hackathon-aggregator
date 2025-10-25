# Projekt "Agregator"

## Beschreibung

Dies ist eine Webanwendung, die als Aggregator dient. Sie ermöglicht Benutzern, mithilfe eines Suchfelds Kriterien (wie Preis, Geschlecht und Radius) zu definieren. Die gefilterten Ergebnisse werden auf einer interaktiven Karte angezeigt. Die Anwendung ist als Single-Page-Application (SPA) konzipiert und nutzt eine moderne Frontend-Architektur.

## Kernfunktionen

-   **Interaktive Suche:** Benutzer können Suchanfragen über ein spezielles Panel eingeben.
-   **Filterung:** Ergebnisse können nach verschiedenen Kriterien wie Preis, Geschlecht oder Standortradius gefiltert werden.
-   **Kartenvisualisierung:** Gefilterte Datenpunkte werden direkt auf einer interaktiven Karte angezeigt.

## Verwendete Technologien

-   **Framework: [React](https://reactjs.org/)**
    -   Dient als Hauptbibliothek zur Erstellung der Benutzeroberfläche mit einer komponentenbasierten Architektur.

-   **Build-Tool: [Vite](https://vitejs.dev/)**
    -   Dient als modernes Build-Tool und Entwicklungsserver, der schnelles Hot-Reloading ermöglicht.

-   **Styling: [Sass (SCSS)](https://sass-lang.com/) & [Material-UI (MUI)](https://mui.com/)**
    -   Sass wird für erweitertes und strukturiertes CSS-Styling verwendet. MUI stellt eine Bibliothek von vorgefertigten UI-Komponenten zur Verfügung, um ein konsistentes Design zu gewährleisten.

-   **Karten: [React Leaflet](https://react-leaflet.js.org/) & [OpenStreetMap](https://www.openstreetmap.org/)**
    -   React Leaflet wird zur Integration interaktiver Karten verwendet. Die visuellen Kartendaten (Kacheln) werden vom kostenlosen Dienst OpenStreetMap bereitgestellt.

-   **HTTP-Client: [Axios](https://axios-http.com/)**
    -   Behandelt asynchrone HTTP-Anfragen zum Abrufen von Daten von externen APIs.

-   **State-Management: [Redux](https://redux.js.org/)**
    -   Dient zur Verwaltung des globalen Anwendungszustands, wie z. B. Suchfilter oder abgerufene Daten.

-   **Routing: [React Router](https://reactrouter.com/)**
    -   Verwaltet das clientseitige Routing und die Navigation zwischen verschiedenen Ansichten der Anwendung.

-   **Code-Qualität: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)**
    -   Stellen die Codequalität und einen einheitlichen Programmierstil im gesamten Projekt sicher.

## Projektstruktur

```
/home/sosal/projects/hack/hackathon-aggregator/
├─── public/              # Statische Dateien (index.html, Bilder)
├─── src/
│    ├─── api/           # Module für die API-Kommunikation
│    ├─── components/    # Wiederverwendbare React-Komponenten
│    ├─── App.jsx        # Hauptkomponente der Anwendung
│    └─── main.jsx       # Einstiegspunkt der Anwendung
├─── package.json         # Projekt-Metadaten und Abhängigkeiten
└─── vite.config.js       # Konfiguration für Vite
```

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

-   `npm run dev`: Startet den Entwicklungsserver mit Hot-Reload für eine effiziente Entwicklung.
-   `npm run build`: Erstellt eine optimierte Version des Projekts für die Produktion im `dist`-Verzeichnis.
-   `npm run lint`: Führt die Code-Überprüfung mit ESLint aus, um Stil- und Syntaxfehler zu finden.
-   `npm run preview`: Startet einen lokalen Server, um den finalen Produktions-Build zu testen.