> **Aviso:** kit não oficial, sem vínculo com a NeuraLake. Veja o README.

# AGENTS.md — Como usar a NeuraLake

Leia este arquivo antes de escrever qualquer código que chame a NeuraLake.
Detalhes: `docs/`. Skill instalável: `skills/neuralake/SKILL.md`.

## O que é
API de inferência de LLM **100% compatível com o SDK oficial da OpenAI**.
Você não usa um SDK próprio: troque `base_url` e a chave.

## Regras essenciais
1. **Base URL:** `https://api.neuralake.cloud/v1` (é a API; o painel web é outro endereço).
2. **Auth:** header `Authorization: Bearer nl_...`. A chave vem da variável de ambiente `NEURALAKE_API_KEY`. Nunca escreva a chave no código, em logs ou em commits.
3. **Modelo = capacidade, não ID de modelo.** Use apenas: `text`, `reasoning`, `reasoning-pro`, `code`, `multimodal`, `auto`.
4. **Endpoint principal:** `chat/completions` (formato OpenAI). Streaming com `stream=True`.
5. **Erros:** 400 (parâmetros/JSON), 401 (chave), 429 (rate limit → backoff), 500 (tentar de novo).

## Escolha da capacidade
| Tarefa | `model` |
|---|---|
| Resumo, extração, Q&A, texto geral | `text` |
| Lógica passo a passo | `reasoning` |
| Problemas multi-etapa difíceis | `reasoning-pro` |
| Código, refatoração, debug | `code` |
| Imagens, documentos escaneados, mockups | `multimodal` |
| Não sei / custo-benefício automático | `auto` |

Padrão: comece por `text` ou `auto`; suba de nível só se a qualidade não bastar.

## Esqueleto mínimo (Python)
```python
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["NEURALAKE_API_KEY"],
                base_url="https://api.neuralake.cloud/v1")
r = client.chat.completions.create(
    model="text",
    messages=[{"role": "user", "content": "Olá"}],
)
print(r.choices[0].message.content)
```

## Conta e custos
Chaves, créditos, cobrança e programas de treino são geridos pelo usuário no painel oficial. Veja `docs/account-safety.md`: nunca aja nessas áreas sem pedido explícito e nunca peça nem registre chave, e-mail ou saldo.

## Não faça
- Não invente IDs de modelo (`gpt-4`, `deepseek-r1`…): use as capacidades acima.
- Não presuma funcionalidades não documentadas (ver `docs/gaps.md`) sem testar antes com uma chamada pequena.
- Não envie dados sensíveis desnecessários nos prompts.
