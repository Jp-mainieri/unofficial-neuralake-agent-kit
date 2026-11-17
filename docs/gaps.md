# Verificado e lacunas

Testado contra a API real em 2026-11-17 (chave de teste, chamadas mínimas).

## Verificado
- [x] `chat/completions` funciona em `text`, `code`, `reasoning`, `reasoning-pro`, `multimodal` e `auto`.
- [x] Streaming (`stream: true`, SSE no formato OpenAI).
- [x] **JSON mode** (`response_format: {"type":"json_object"}`) funciona.
- [x] **Tool/function calling** funciona (`tools` + `tool_choice`; retorna `tool_calls`).
- [x] **Imagens** em `multimodal` via `image_url` com data URI (base64).
- [x] **Rate limit:** 100 requisições por janela de 60 s (headers `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` em segundos).
- [x] Formato de erro: `{"error": "mensagem"}` (string). 401 = chave inválida; 400 = modelo não suportado.
- [x] Modelos aceitos: `auto`, `text`, `code`, `reasoning`, `reasoning-pro`, `multimodal` ou um agente `agent:ag_...`.
- [x] Chaves de API têm prefixo `nlk-` (a documentação mostra `nl_`; aceite os dois).
- [x] `POST /v1/embeddings` e `GET /v1/models` **não existem** (404).

## Armadilha importante
Modelos de raciocínio (e o próprio `text` em alguns casos) gastam tokens de raciocínio dentro de `max_tokens`. Com `max_tokens` baixo o `content` pode vir **vazio** com `finish_reason: "length"` (o texto fica em `reasoning_content`). Use `max_tokens` ≥ 300–400 e verifique `finish_reason`.

## Ainda desconhecido
- [ ] Máximo de `max_tokens` e janela de contexto por capacidade
- [ ] Como criar/usar agentes `agent:ag_...` (feature separada, não coberta aqui)
- [ ] Comportamento de `reasoning_effort` e parâmetros específicos de cada capacidade

Para fechar uma lacuna: teste, documente aqui com data e marque `[x]`.
