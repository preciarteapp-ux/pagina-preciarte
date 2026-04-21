
## Adicionar "Papelaria personalizada" como primeira opção do quiz

### Mudança
No arquivo `src/pages/Quiz.tsx`, na primeira pergunta (`segmento` — "O que você produz?"), incluir **"Papelaria personalizada"** como a **primeira opção** da lista, antes de "Artesanato em geral".

### Detalhes
- **Label**: `Papelaria personalizada`
- **Value**: `papelaria`
- **Ícone**: `FileText` (lucide-react) — combina visualmente com cadernos, convites, planners e itens de papelaria

### Arquivos editados
- `src/pages/Quiz.tsx`:
  - Adicionar `FileText` no import do `lucide-react`.
  - Inserir o novo objeto `{ label: "Papelaria personalizada", value: "papelaria", icon: FileText }` como primeiro item do array `options` da pergunta `segmento`.

### Impacto
- Nenhum efeito no cálculo (`quizCalculator.ts`), pois o segmento é usado apenas para personalização visual/linguagem, não entra na fórmula de prejuízo.
- Não altera nenhum outro fluxo.
