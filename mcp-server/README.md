# Servidor MCP (não oficial, experimental)

Se houver MCP oficial da NeuraLake, prefira-o: este é redundante.


Node ≥ 18, zero dependências. Ferramentas: `neuralake_chat`, `neuralake_capabilities`.
**Não** expõe ações de conta (chaves, créditos, treino): só o usuário, no painel.

## Configuração (Claude Code / Claude Desktop)
```json
{
  "mcpServers": {
    "neuralake": {
      "command": "node",
      "args": ["/caminho/absoluto/neuralake-agent-kit/mcp-server/server.mjs"],
      "env": { "NEURALAKE_API_KEY": "defina-no-seu-ambiente" }
    }
  }
}
```
Prefira herdar a variável do ambiente em vez de escrevê-la no arquivo de configuração. Opcional: `NEURALAKE_MAX_TOKENS_CAP` (padrão 2000).
