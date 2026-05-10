# Feishu bot entry

This directory is reserved for the Feishu self-built app bot.

Planned first-stage flow:

1. Receive group message or bot mention event.
2. Verify Feishu signature and event payload.
3. Normalize instruction into a structured update request.
4. Pass the request to the OpenAI layer.
5. Route generated output to the GitHub PR automation layer.

Current local callback targets:

- Event callback URL path: `/webhooks/feishu`
- Setup helper endpoint: `/feishu/setup`

Expected future files:

- `events.js`: event handler and Feishu callback verification
- `commands.js`: command parsing and routing
- `templates/`: fixed prompts or response templates
