# 🌍 TravelMap
TravelMap is an interactive travel planning and map visualization app built with React, Leaflet, and Vite. It allows users to explore cities, view them on a map, and log travel plans with ease. This project is designed for quick development and smooth developer experience using modern tooling.

## 🚀 Features
🗺️ Interactive maps with Leaflet
📍 City data served via a local JSON server
📅 Travel date selection using react-datepicker
🔄 Routing with react-router-dom
🧭 Fully modular and easy to extend

## 📦 Tech Stack
- React 18
- Vite for fast development
- Leaflet and React Leaflet for mapping
- JSON Server for mock API
- ESLint for linting and code quality

## 🛠️ Development Instructions
1. Clone the repository
```bash
git clone https://github.com/your-username/travelmap.git
cd travelmap
```
2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

This starts the Vite dev server. The app should now be running at http://localhost:5173.

4. Start the JSON API server
```bash
npm run server
```

This launches a mock API using JSON Server at http://localhost:9000, serving data from data/cities.json.

> 💡 Make sure the JSON server is running in a separate terminal for API requests to work.

## 📁 Project Structure (Overview)

```bash
travelmap/
├── data/              # Contains JSON data for mock API
├── public/            # Static assets
├── src/               # React components and logic
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── package.json
└── vite.config.js
```

## 🧪 Requirements
Node.js 20+
