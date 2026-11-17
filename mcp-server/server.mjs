#!/usr/bin/env node
// Servidor MCP (stdio, sem dependências) para a API de inferência NeuraLake.
// Só expõe chat/completions. Conta, créditos e chaves NÃO são expostos de propósito (ver docs/account-safety.md).
import readline from "node:readline";

const BASE = (process.env.NEURALAKE_BASE_URL || "https://api.neuralake.cloud/v1").replace(/\/$/, "");
const KEY = process.env.NEURALAKE_API_KEY || "";
const CAP = Number(process.env.NEURALAKE_MAX_TOKENS_CAP || 2000);
const CAPABILITIES = ["text", "reasoning", "reasoning-pro", "code", "multimodal", "auto"];

const CATALOG = {
  text: "texto geral, extração, resumos, Q&A",
  reasoning: "raciocínio passo a passo",
  "reasoning-pro": "problemas multi-etapa difíceis",
  code: "código, refatoração, debug",
  multimodal: "visão, OCR, mockups",
  auto: "roteamento dinâmico",
};

const scrub = (s) => {
  let out = String(s);
  if (KEY) out = out.split(KEY).join("[REDACTED]");
  return out.replace(/nlk?[_-][A-Za-z0-9]{8,}/g, "nl*_[REDACTED]");
};

const tools = [
  {
    name: "neuralake_chat",
    description:
      "Envia uma conversa à NeuraLake (chat/completions, compatível com OpenAI). `model` é uma capacidade, não um ID de modelo. Consome créditos pré-pagos do usuário: use max_tokens pequeno.",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string", enum: CAPABILITIES, default: "text" },
        messages: {
          type: "array",
          items: {
            type: "object",
            properties: { role: { type: "string", enum: ["system", "user", "assistant"] }, content: { type: "string" } },
            required: ["role", "content"],
          },
        },
        temperature: { type: "number", minimum: 0, maximum: 2 },
        max_tokens: { type: "integer", minimum: 1, description: `Limitado a ${CAP} (NEURALAKE_MAX_TOKENS_CAP).` },
      },
      required: ["messages"],
    },
  },
  {
    name: "neuralake_capabilities",
    description: "Lista as capacidades e usos (dados estáticos, sem chamada de rede).",
    inputSchema: { type: "object", properties: {} },
  },
];

const text = (t, isError = false) => ({ content: [{ type: "text", text: scrub(t) }], isError });

async function call(name, args = {}) {
  if (name === "neuralake_capabilities") return text(JSON.stringify(CATALOG, null, 2));
  if (!KEY) return text("NEURALAKE_API_KEY não definida. Peça ao usuário para configurá-la no ambiente (nunca no chat).", true);
  const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
  try {
    if (name === "neuralake_chat") {
      const model = args.model || "text";
      if (!CAPABILITIES.includes(model)) return text(`model inválido. Use: ${CAPABILITIES.join(", ")}`, true);
      if (!Array.isArray(args.messages) || !args.messages.length) return text("messages é obrigatório", true);
      const body = { model, messages: args.messages, max_tokens: Math.min(args.max_tokens || 500, CAP) };
      if (typeof args.temperature === "number") body.temperature = args.temperature;
      const r = await fetch(`${BASE}/chat/completions`, {
        method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(120000),
      });
      const raw = await r.text();
      if (!r.ok) {
        const hint = { 400: "requisição inválida", 401: "chave inválida/ausente: avise o usuário, não repita", 429: "rate limit: aguarde e tente de novo", 500: "erro temporário do servidor" }[r.status] || "";
        return text(`HTTP ${r.status} ${hint}\n${raw.slice(0, 500)}`, true);
      }
      const j = JSON.parse(raw);
      const out = j.choices?.[0]?.message?.content ?? "";
      const u = j.usage ? `\n\n[tokens: prompt=${j.usage.prompt_tokens} completion=${j.usage.completion_tokens}]` : "";
      return text(out + u);
    }
    return text(`ferramenta desconhecida: ${name}`, true);
  } catch (e) {
    return text(`Falha de rede/execução: ${e.message}`, true);
  }
}

const send = (o) => process.stdout.write(JSON.stringify(o) + "\n");
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", async (line) => {
  let m;
  try { m = JSON.parse(line); } catch { return; }
  const { id, method, params } = m;
  if (id === undefined) return; // notificações
  if (method === "initialize")
    return send({ jsonrpc: "2.0", id, result: { protocolVersion: params?.protocolVersion || "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "neuralake-unofficial", version: "0.1.0" } } });
  if (method === "tools/list") return send({ jsonrpc: "2.0", id, result: { tools } });
  if (method === "tools/call") return send({ jsonrpc: "2.0", id, result: await call(params?.name, params?.arguments) });
  if (method === "ping") return send({ jsonrpc: "2.0", id, result: {} });
  send({ jsonrpc: "2.0", id, error: { code: -32601, message: "method not found" } });
});
