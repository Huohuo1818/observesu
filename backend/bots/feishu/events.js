export function parseJsonBody(rawBody) {
  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch {
    return null;
  }
}

export function isChallengeEvent(body) {
  return Boolean(body && body.challenge);
}

export function buildChallengeResponse(body) {
  return {
    challenge: body.challenge
  };
}

export function normalizeFeishuEvent(body) {
  const header = body?.header || {};
  const event = body?.event || {};

  return {
    schema: body?.schema || null,
    type: header.event_type || body?.type || null,
    tenantKey: header.tenant_key || null,
    appId: header.app_id || null,
    eventId: header.event_id || null,
    createTime: header.create_time || null,
    messageId: event.message?.message_id || null,
    chatId: event.message?.chat_id || null,
    chatType: event.message?.chat_type || null,
    text: event.message?.content || null,
    raw: body
  };
}

export function buildFeishuAck(event) {
  return {
    ok: true,
    source: "feishu",
    received: {
      type: event.type,
      eventId: event.eventId,
      chatId: event.chatId,
      chatType: event.chatType
    },
    next: "Wire this event into OpenAI request generation and GitHub PR automation."
  };
}
