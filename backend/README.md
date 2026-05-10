# Backend placeholder

This directory is reserved for the future Observesu backend service.

Planned responsibilities:

- Serve future API routes for `api.observesu.com`
- Receive Feishu bot events and commands
- Call OpenAI for structured content/code generation
- Create GitHub branches and PRs for site updates
- Orchestrate safe deploy-triggering workflows

Suggested subdirectories:

- `api/`
- `bots/feishu/`
- `integrations/openai/`
- `integrations/github/`
- `config/`

Current deployable endpoints:

- `GET /health`
- `GET /feishu/setup`
- `POST /webhooks/feishu`
