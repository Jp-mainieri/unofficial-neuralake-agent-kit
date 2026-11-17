#!/usr/bin/env bash
curl -sS https://api.neuralake.cloud/v1/chat/completions \
  -H "Authorization: Bearer $NEURALAKE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"text","messages":[{"role":"user","content":"Olá"}],"max_tokens":50}'
