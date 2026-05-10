import { getEnv } from "../config/env.js";

export default function handler(_req, res) {
  const env = getEnv();
  res.status(200).json({
    ok: true,
    service: "observesu-backend",
    siteBaseUrl: env.siteBaseUrl,
    apiBaseUrl: env.apiBaseUrl
  });
}
