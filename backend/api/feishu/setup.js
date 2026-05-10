import { getEnv } from "../../config/env.js";

export default function handler(_req, res) {
  const env = getEnv();
  res.status(200).json({
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
}
