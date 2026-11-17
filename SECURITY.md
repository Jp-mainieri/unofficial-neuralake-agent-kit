# Segurança e privacidade

- Este repositório **não contém** chaves, e-mails, saldos, IDs de conta/job nem capturas de tela do painel do usuário. Mantenha assim.
- Chave da API: apenas em `NEURALAKE_API_KEY` (veja `.env.example`). `.env` está no `.gitignore`.
- O servidor MCP nunca imprime a chave e a remove de mensagens de erro.
- Antes de commitar: `scripts/check_secrets.sh`.
- Se uma chave vazar: revogue no painel (More > Keys) e gere outra.
