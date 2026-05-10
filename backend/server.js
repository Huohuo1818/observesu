import http from "node:http";

const port = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, service: "observesu-backend" }));
    return;
  }

  res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  res.end(
    JSON.stringify({
      ok: true,
      message: "Observesu backend placeholder",
      next: [
        "Wire Feishu event callback in backend/bots/feishu",
        "Wire OpenAI request pipeline in backend/integrations/openai",
        "Wire GitHub PR automation in backend/integrations/github",
        "Expose public routes under backend/api"
      ]
    })
  );
});

server.listen(port, () => {
  console.log(`observesu-backend listening on http://localhost:${port}`);
});
