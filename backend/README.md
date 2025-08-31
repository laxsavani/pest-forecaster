# Pest Infestation Forecaster

## Tools & Technologies
Frontend (React + Vite + Tailwind) Backend (FastAPI + SQLite + scikit-learn)

## How to run (local)

### Backend
Unzip → open backend/ in a terminal.

(Recommended) Create venv:

Windows: python -m venv .venv && .venv\Scripts\activate

macOS/Linux: python -m venv .venv && source .venv/bin/activate

Install deps: pip install -r requirements.txt

Start API: uvicorn app.main:app --reload

API docs: http://localhost:8000/docs

### Frontend
Open a new terminal in frontend/.

Install: npm install

Start: npm run dev

App: http://localhost:5173

(The frontend points to http://localhost:8000 via .env. Change if needed.)

## Key features
Submit field reports (crop, pest, location, weather).

Predict risk instantly using a baseline ML model (or heuristic before training).

Retrain model anytime via POST /train (uses DB reports + sample CSV).

Advisories auto-adjust by risk level (Low/Moderate/High/Severe).

Minimal, modern UI (cards, soft shadows, rounded corners) that’s easy to extend.
