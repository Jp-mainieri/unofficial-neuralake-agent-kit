# Setup e autenticação

- Base URL: `https://api.neuralake.cloud/v1`
- Header: `Authorization: Bearer <SUA_CHAVE>`
- As chaves têm prefixo `nlk-` (a documentação mostra `nl_`).
- SDK: `pip install openai` (o oficial; não existe SDK próprio documentado)
- A chave é gerada pelo usuário no painel da NeuraLake (ver `neuralake.global`, botão "Start inferencing", depois More > Keys). O agente nunca cria chaves nem pede a chave no chat.

```bash
export NEURALAKE_API_KEY="nl_..."   # nunca commitar
```

```python
from openai import OpenAI
import os
client = OpenAI(api_key=os.environ["NEURALAKE_API_KEY"],
                base_url="https://api.neuralake.cloud/v1")
```
