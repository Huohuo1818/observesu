import http from "node:http";
import { getEnv } from "./config/env.js";
import {
  buildChallengeResponse,
  buildFeishuAck,
  decryptFeishuPayload,
  isEncryptedEvent,
  isChallengeEvent,
  normalizeFeishuEvent,
  parseJsonBody
} from "./bots/feishu/events.js";

const env = getEnv();

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, {
      ok: true,
      service: "observesu-backend",
      siteBaseUrl: env.siteBaseUrl,
      apiBaseUrl: env.apiBaseUrl
    });
    return;
  }

  if (req.method === "GET" && req.url === "/feishu/setup") {
    sendJson(res, 200, {
      ok: true,
      callbackUrl: `${env.apiBaseUrl}/webhooks/feishu`,
      requiredEnv: [
        "FEISHU_APP_ID",
        "FEISHU_APP_SECRET",
        "FEISHU_VERIFICATION_TOKEN"
      ],
      recommendedScopes: [
        "im:message",
        "im:message.group_at_msg",
        "im:message.p2p_msg",
        "im:chat"
      ],
      next: [
        "Create a Feishu self-built app.",
        "Enable bot capability and event subscription.",
        "Set the callback URL to /webhooks/feishu.",
        "Copy app credentials into backend/.env."
      ]
    });
    return;
  }

  if (req.method === "POST" && req.url === "/webhooks/feishu") {
    const rawBody = await readRequestBody(req);
    let body = parseJsonBody(rawBody);

    if (!body) {
      sendJson(res, 400, {
        ok: false,
        error: "invalid_json"
      });
      return;
    }

    if (isEncryptedEvent(body)) {
      if (!env.feishuEncryptKey) {
        sendJson(res, 400, {
          ok: false,
          error: "missing_encrypt_key"
        });
        return;
      }

      try {
        body = decryptFeishuPayload(env.feishuEncryptKey, body.encrypt);
      } catch (error) {
        sendJson(res, 400, {
          ok: false,
          error: "decrypt_failed",
          detail: error instanceof Error ? error.message : "unknown_error"
        });
        return;
      }
    }

    if (isChallengeEvent(body)) {
      sendJson(res, 200, buildChallengeResponse(body));
      return;
    }

    const tokenInBody = body?.token || body?.header?.token || null;
    if (env.feishuVerificationToken && tokenInBody && tokenInBody !== env.feishuVerificationToken) {
      sendJson(res, 403, {
        ok: false,
        error: "invalid_verification_token"
      });
      return;
    }

    const event = normalizeFeishuEvent(body);
    sendJson(res, 200, buildFeishuAck(event));
    return;
  }

  sendJson(res, 200, {
    ok: true,
    message: "Observesu backend placeholder",
    next: [
      "Use GET /health for health checks.",
      "Use GET /feishu/setup for Feishu callback instructions.",
      "Use POST /webhooks/feishu for Feishu event subscription callbacks.",
      "Wire OpenAI and GitHub automation into the Feishu event flow."
    ]
  });
});

server.listen(env.port, () => {
  console.log(`observesu-backend listening on http://localhost:${env.port}`);
});
