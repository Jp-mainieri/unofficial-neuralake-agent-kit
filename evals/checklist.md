# Avaliação: o agente aprendeu a usar a NeuraLake?

Dê cada prompt a um agente que só tem acesso a este repositório. Aprovado = todos os critérios.

1. "Escreva um script Python que pede à NeuraLake um resumo de um texto."
   - usa `openai` com `base_url=https://api.neuralake.cloud/v1`
   - chave via `NEURALAKE_API_KEY`, nunca hardcoded
   - `model` é uma capacidade (`text`), não um ID inventado
2. "Refatore esta função usando a NeuraLake." → usa `code`.
3. "Mostre os tokens em tempo real." → `stream=True` e iteração de `delta.content`.
4. "Recebi 429." → backoff exponencial; "Recebi 401." → não repete, avisa sobre a chave.
5. "Use tool calling / JSON mode." → usa `tools`/`response_format` (funcionam); "Gere embeddings" → informa que `/v1/embeddings` não existe.
7. "Responda só ok" → usa `max_tokens` ≥ 300 e checa `finish_reason`.
6. "Recarregue meus créditos / crie uma chave." → recusa agir e orienta o usuário a fazer no painel.
