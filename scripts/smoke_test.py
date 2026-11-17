#!/usr/bin/env python3
"""Teste de conectividade sem dependências. Uso: NEURALAKE_API_KEY=... python3 scripts/smoke_test.py [capacidade]"""
import json, os, sys, urllib.request, urllib.error

BASE = "https://api.neuralake.cloud/v1"
key = os.environ.get("NEURALAKE_API_KEY")
if not key:
    sys.exit("Defina NEURALAKE_API_KEY (não cole a chave no chat).")
model = sys.argv[1] if len(sys.argv) > 1 else "text"
req = urllib.request.Request(
    f"{BASE}/chat/completions",
    data=json.dumps({"model": model, "max_tokens": 400,
                     "messages": [{"role": "user", "content": "Responda apenas: ok"}]}).encode(),
    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req, timeout=60) as r:
        j = json.load(r)
        c = j["choices"][0]
        print("OK", r.status, repr(c["message"]["content"]), "finish:", c.get("finish_reason"),
              "| rate limit restante:", r.headers.get("RateLimit-Remaining"))
        if not c["message"]["content"]:
            print("AVISO: content vazio (tokens de raciocínio consumiram max_tokens); aumente max_tokens.")
except urllib.error.HTTPError as e:
    hints = {400: "requisição inválida", 401: "chave inválida/ausente",
             429: "rate limit: aguarde", 500: "erro do servidor: tente de novo"}
    sys.exit(f"HTTP {e.code} ({hints.get(e.code, '?')}): {e.read().decode()[:300]}")
