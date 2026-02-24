# VectorShift Workflow Builder

A full-stack technical assessment project for building and validating node-based workflows. Users can compose pipelines visually, connect nodes, and execute graph validation through a backend API.

## 1. Project Overview

VectorShift Workflow Builder is a visual pipeline editor designed around a node graph interface.  
It supports both drag-and-drop and click-to-add node creation, edge connections, pipeline persistence, and backend DAG validation.

## 2. Features

- Drag-and-drop node editor
- Multiple node types:
  - Input
  - LLM
  - Output
  - API
  - Condition
  - Delay
  - Transform
  - Logger
- Visual node-to-node connections
- Pipeline execution trigger (`Run` / `Submit`)
- Save pipeline state to `localStorage`
- Export pipeline to JSON
- Node deletion:
  - Inline delete button (`×`)
  - Keyboard delete support
- Backend graph validation
- Loop / cycle detection handling (DAG check)

## 3. Tech Stack

### Frontend

- React
- React Flow
- Zustand

### Backend

- FastAPI
- Python

## 4. Project Structure

```text
vectorshift-assessment/
├── backend/
│   ├── main.py
│   └── graph_utils.py
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   ├── App.js
│   │   ├── ui.js
│   │   ├── store.js
│   │   └── submit.js
│   └── package.json
└── README.md
```

## 5. Local Development Setup

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3002` (or default CRA port if unchanged).

## 6. Deployment

### Backend Deployment (Render) 🚀

1. Push repository to GitHub.
2. In Render, create a **Web Service** from the repo.
3. Set Root Directory to `backend`.
4. Set Build Command:
   ```bash
   pip install fastapi uvicorn
   ```
5. Set Start Command:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
6. Deploy and copy the generated backend URL.

### Frontend Deployment (Vercel) 🚀

1. Import repository into Vercel.
2. Set Root Directory to `frontend`.
3. Keep framework preset as **Create React App** (or configure accordingly).
4. Add environment variable for backend API base URL if required.
5. Deploy and copy the generated frontend URL.

## 7. Demo

- 🎥 YouTube Demo: `[Add demo link here]`
- 🌐 Live Frontend: `[Add frontend URL here]`
- 🔌 Live Backend: `[Add backend URL here]`

## 8. Author

**Vasu Bansal**  
AI-Focused Full-Stack & Automation Engineer
