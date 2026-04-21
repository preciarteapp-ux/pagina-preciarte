

## Funil visual "Etapas do Funil" no `/quiz/adm`

Adicionar um bloco novo no topo do dashboard, **idêntico ao da imagem**, com formato afunilado e 4 etapas (Visitantes → Respostas → Leads → Conclusões).

### Layout (igual à imagem)

```text
[ETAPAS DO FUNIL]

Taxa de conclusão     Total de conclusões
28.30%                65

                ┌──────────────────┐
Visitantes      │█████ azul ███████│        100%   481
                └────┬────────┬────┘
                     │ magenta│              47.8%  231
Respostas            └──┬──┬──┘
                        │  │
Leads                ┌──┴──┴──┐ roxo         47.2%  227
                     └─┬────┬─┘
                       │    │
Conclusões             ║âmbâr║                13.5%  65
```

- KPIs grandes no topo (taxa de conclusão + total de conclusões)
- 3 colunas: **label à esquerda** | **trapézio colorido afunilando** | **% e count à direita**
- Cores fiéis ao print: azul (#3FA9FF), magenta (#E91E8C), roxo (#5B5BE5), âmbar (#F59E0B)
- Cada trapézio tem largura proporcional ao count, ligando suavemente ao próximo (clip-path polygon)

### De onde vem cada métrica

| Etapa | Fonte | Lógica |
|---|---|---|
| **Visitantes** | `page_views` | sessões únicas com `page_path = '/quiz'` |
| **Respostas** | `quiz_events` | sessões únicas com `question_answered` |
| **Leads** | `quiz_events` | sessões únicas com `quiz_completed` |
| **Conclusões** | `quiz_events` | sessões únicas com `checkout_clicked` |

Respeita o filtro de período já existente (Hoje · 7d · 30d · Tudo).

### Arquivos

**Novo**: `src/components/quiz-admin/QuizVisualFunnel.tsx` — busca visitantes em `page_views` e renderiza o funil afunilado.

**Editado**: `src/pages/QuizAdmin.tsx` — importa e renderiza `<QuizVisualFunnel>` logo abaixo dos KPI cards e acima do funil detalhado por pergunta (que continua existindo).

### O que NÃO muda
- O funil detalhado atual com as 9 perguntas continua igual, logo abaixo
- Tracking, fluxo do quiz, demais blocos do dashboard intactos

