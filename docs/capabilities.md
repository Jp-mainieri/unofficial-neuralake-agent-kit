# Capacidades (valor do campo `model`)

A NeuraLake não expõe IDs de modelo brutos: expõe endpoints por capacidade e roteia para a melhor arquitetura.

| `model` | Uso |
|---|---|
| `text` | Geração de texto, extração de entidades, resumos, Q&A |
| `reasoning` | Raciocínio passo a passo, lógica complexa |
| `reasoning-pro` | Problemas multi-etapa difíceis, raciocínio mais longo |
| `code` | Copilot, autocomplete, refatoração, debug |
| `multimodal` | Visão computacional, documentos escaneados, mockups de UI |
| `auto` | Roteamento dinâmico custo/desempenho |

Preços: consulte a documentação/painel oficial. Eles mudam e não são reproduzidos aqui.

## Como decidir
1. Tarefa simples → `text`. Código → `code`. Imagem → `multimodal`.
2. Precisa de cadeia de raciocínio → `reasoning`; só escale para `reasoning-pro` se falhar (mais caro).
3. Sem preferência → `auto` (custo imprevisível: defina `max_tokens`).
4. Comece pela capacidade mais barata que resolva e escale só se a qualidade não bastar.
