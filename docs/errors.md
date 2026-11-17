# Erros e status

Respostas de erro vêm com status HTTP padrão e um JSON descrevendo o problema.

| Código | Significado | Causa comum | O agente deve |
|---|---|---|---|
| 400 | Bad Request | JSON malformado ou parâmetros fora dos limites | Corrigir a requisição; não repetir igual |
| 401 | Unauthorized | Chave inválida, expirada ou ausente | Parar e avisar o usuário; não tentar de novo |
| 429 | Too Many Requests | Limite de requisições/minuto excedido | Backoff exponencial com jitter |
| 500 | Internal Server Error | Falha temporária nos servidores | Tentar de novo (poucas vezes) |

Implementação de retry: `examples/python/retry.py`.
Os limites exatos de rate limit não estão documentados.
