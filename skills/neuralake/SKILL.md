---
name: neuralake
description: Use a API de inferência NeuraLake (compatível com OpenAI) para gerar texto, raciocínio, código ou análise multimodal. Use quando o usuário pedir para chamar, integrar, testar ou depurar a NeuraLake, ou mencionar api.neuralake.cloud, chaves nl_..., ou capacidades text/reasoning/code/multimodal/auto.
---

# NeuraLake

API compatível com o SDK da OpenAI. Só muda `base_url` e a chave.

## Passos
1. Leia a chave de `NEURALAKE_API_KEY`. Se não existir, peça ao usuário para defini-la; nunca peça a chave no chat nem a grave em arquivos versionados.
2. Use `base_url="https://api.neuralake.cloud/v1"`.
3. Escolha `model` entre: `text`, `reasoning`, `reasoning-pro`, `code`, `multimodal`, `auto`. Comece barato (`text`/`auto`).
4. Chame `client.chat.completions.create(...)`. Para respostas longas, use `stream=True`.
5. Trate erros: 401 → chave inválida (pare e avise); 429 → espere com backoff exponencial; 500 → tente de novo algumas vezes; 400 → corrija a requisição.
6. Valide com `scripts/smoke_test.py` antes de integrar.

## Referências
- Visão geral e regras: `AGENTS.md`
- Capacidades e preços: `docs/capabilities.md`
- Streaming: `docs/streaming.md`
- Erros e retry: `docs/errors.md`
- Conta, custos e segurança: `docs/account-safety.md`
- MCP opcional: `mcp-server/`
- Lacunas conhecidas: `docs/gaps.md`
- Exemplos executáveis: `examples/`

## Privacidade
Nunca grave chave, e-mail, saldo, IDs ou capturas do painel do usuário em arquivos ou commits. Ações de conta (chaves, créditos, treino) só com pedido explícito.

## Armadilhas
- O painel web não é a API: chame `api.neuralake.cloud/v1`.
- Modelo é uma capacidade, não um ID de modelo.
- Recursos além de chat/completions (tools, JSON mode, embeddings, etc.) não estão documentados: teste com chamada mínima antes de depender deles.
