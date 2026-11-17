# Conta, custos e segurança (regras para agentes)

A conta (chaves, saldo/créditos, cobrança, treino de modelos, agentes personalizados) é gerenciada pelo usuário no painel oficial. Este kit **não documenta** essas telas nem usa APIs não documentadas para elas.

Regras:
1. Nunca crie/rotacione chaves, recarregue créditos, contrate planos, envie dados para treino ou solicite acesso a programas sem pedido explícito do usuário.
2. Nunca peça nem registre a chave, e-mail, saldo ou IDs do usuário. Chave só em `NEURALAKE_API_KEY`.
3. Se a API falhar por chave (401) ou por saldo/limite (4xx/429), pare e avise o usuário; não tente contornar.
4. Chamadas consomem créditos pré-definidos pelo usuário: use `max_tokens` e a capacidade mais barata que resolva.
5. Envie nos prompts o mínimo de dados do usuário.
