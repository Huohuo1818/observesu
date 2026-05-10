# Observesu

Observesu is organized for long-term front-end iteration in Codex and future back-end expansion.

## Structure

- `frontend/`: static website deployed to Vercel
- `backend/`: future API and automation service, intended for Railway
  - `api/`: HTTP endpoints and future public API
  - `bots/feishu/`: Feishu app bot handlers and event flows
  - `integrations/openai/`: OpenAI orchestration layer
  - `integrations/github/`: GitHub PR / content update automation
  - `config/`: env loading and runtime config helpers
  - `server.js`: minimal runtime placeholder with `GET /health`
  - `.env.example`: future deployment and bot credentials template

## Deployment

- Frontend target: `www.observesu.com`
- Root redirect: `observesu.com` -> `www.observesu.com`
- Frontend hosting: Vercel
- Future backend hosting: Railway
- Future backend domain: `api.observesu.com`

## Feishu automation direction

Planned flow:

1. Feishu group bot receives a request.
2. Backend validates and structures the request.
3. OpenAI generates content/code update instructions.
4. GitHub integration creates a branch and PR.
5. Human reviews and merges.
6. Vercel auto-deploys the updated frontend.

## Next integration entry points

- Feishu app event callback handler: `backend/bots/feishu/`
- API routes and webhook verification: `backend/api/`
- OpenAI request pipeline: `backend/integrations/openai/`
- GitHub PR automation: `backend/integrations/github/`
- Secrets to provision later:
  - `OPENAI_API_KEY`
  - `GITHUB_TOKEN`
  - `FEISHU_APP_ID`
  - `FEISHU_APP_SECRET`
  - `FEISHU_VERIFICATION_TOKEN`
  - `FEISHU_ENCRYPT_KEY`

## Local preview

- Frontend preview: serve `frontend/` as a static directory
- Backend placeholder preview:
  - `cd backend`
  - `npm run dev`
  - open `http://localhost:3000/health`
