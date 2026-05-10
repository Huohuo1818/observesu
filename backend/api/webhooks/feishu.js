import {
  buildChallengeResponse,
  buildFeishuAck,
  decryptFeishuPayload,
  isEncryptedEvent,
  isChallengeEvent,
  normalizeFeishuEvent
} from "../../bots/feishu/events.js";
import { getEnv } from "../../config/env.js";

export default async function handler(req, res) {
  const env = getEnv();

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  let body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  if (isEncryptedEvent(body)) {
    if (!env.feishuEncryptKey) {
      res.status(400).json({
        ok: false,
        error: "missing_encrypt_key"
      });
      return;
    }

    try {
      body = decryptFeishuPayload(env.feishuEncryptKey, body.encrypt);
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: "decrypt_failed",
        detail: error instanceof Error ? error.message : "unknown_error"
      });
      return;
    }
  }

  if (isChallengeEvent(body)) {
    res.status(200).json(buildChallengeResponse(body));
    return;
  }

  const tokenInBody = body?.token || body?.header?.token || null;
  if (env.feishuVerificationToken && tokenInBody && tokenInBody !== env.feishuVerificationToken) {
    res.status(403).json({
      ok: false,
      error: "invalid_verification_token"
    });
    return;
  }

  const event = normalizeFeishuEvent(body);
  res.status(200).json(buildFeishuAck(event));
}
