function readEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

export function getEnv() {
  return {
    port: Number(readEnv("PORT", "3000")),
    siteBaseUrl: readEnv("SITE_BASE_URL", "https://www.observesu.com"),
    apiBaseUrl: readEnv("API_BASE_URL", "https://api.observesu.com"),
    githubOwner: readEnv("GITHUB_OWNER"),
    githubRepo: readEnv("GITHUB_REPO", "observesu"),
    feishuAppId: readEnv("FEISHU_APP_ID"),
    feishuAppSecret: readEnv("FEISHU_APP_SECRET"),
    feishuVerificationToken: readEnv("FEISHU_VERIFICATION_TOKEN"),
    feishuEncryptKey: readEnv("FEISHU_ENCRYPT_KEY"),
    feishuBotName: readEnv("FEISHU_BOT_NAME", "observesu-bot")
  };
}
