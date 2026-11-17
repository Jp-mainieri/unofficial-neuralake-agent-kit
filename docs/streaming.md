# Streaming

Mesmo formato da OpenAI: `stream=True` e iterar os chunks.

```python
stream = client.chat.completions.create(
    model="text",
    messages=[{"role": "user", "content": "Escreva uma função que lê um JSON."}],
    temperature=0.5,
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)
```

Exemplos completos: `examples/python/stream.py`, `examples/node/stream.mjs`, `examples/curl/chat.sh`.
