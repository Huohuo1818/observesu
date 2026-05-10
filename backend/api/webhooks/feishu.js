import {
  buildChallengeResponse,
  buildFeishuAck,
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

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

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
