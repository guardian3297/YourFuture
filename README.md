# Lumina Profile AI

Lumina Profile AI is a premium full-stack SaaS platform for personal and professional analysis, behavioral scoring, contextual AI insights, and ranked recommendations.

## Stack

- Frontend: Next.js, React, TailwindCSS, Framer Motion, Recharts
- Backend: Node.js, Express
- Database: MongoDB with graceful in-memory fallback for demos
- Auth: JWT
- AI: OpenAI Responses API through the official `openai` Node SDK

## Features

- Premium landing page, login, protected dashboard and intelligent questionnaire
- Behavioral engine with weights, tags, categories, dominant profile, pattern detection and score history
- Advanced recommendation system for films, series, games, books, courses, habits, content, skills, routines and professional areas
- AI assistant that interprets metrics, detects inconsistencies, explains results and produces humanized reports
- Radar charts, trends, gamification, levels, automatic avatar, shareable profile and print-to-PDF export

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

- Web: `http://localhost:3000`
- API health: `http://localhost:4000/health`

If `OPENAI_API_KEY` is not set, the app still works with a deterministic local narrative engine. Add a key to enable live AI reports.

## Demo Login

Use any email and any password with at least 6 characters. The API will create a demo account automatically.

## Production Notes

1. Set strong `JWT_SECRET`, `OPENAI_API_KEY`, `OPENAI_MODEL` and `MONGODB_URI`.
2. Deploy `apps/api` to a Node host such as Render, Fly.io or Railway.
3. Deploy `apps/web` to Vercel and set `NEXT_PUBLIC_API_URL` to the API URL.
4. Enable MongoDB Atlas network access for the API host.
5. Keep the OpenAI key only on the backend.

## Architecture

```text
apps/
  api/
    src/
      data/             recommendation catalog and questionnaire schema
      engine/           behavioral analysis and ranking logic
      middleware/       JWT route protection
      routes/           auth, analysis, recommendations, assistant
      services/         OpenAI and Mongo services
  web/
    app/                Next.js app router screens
    components/         reusable product UI
    contexts/           auth and profile state
    lib/                API client, questionnaire and mock profile helpers
```

The analysis engine is intentionally deterministic before calling AI, so scores, categories and recommendation ranking remain auditable.
