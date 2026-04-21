

## Adicionar pergunta de segmento como **primeira pergunta** do quiz

### O que muda
Hoje o quiz tem 8 perguntas e começa direto em "Como você define o preço?". Vou inserir uma **nova pergunta 1** perguntando o segmento da pessoa, passando o quiz para **9 perguntas no total**.

### Pergunta nova (posição 1)
- **Título**: "O que você produz?"
- **Subtítulo**: "Para personalizarmos seu diagnóstico."
- **Opções** (com ícones do `lucide-react`):
  1. 📝 Papelaria personalizada
  2. 🎨 Artesanato em geral
  3. 🎁 Lembrancinhas e festas
  4. 🧵 Costura / crochê / tricô
  5. 🍰 Confeitaria / bolos
  6. 💍 Bijuterias / acessórios
  7. ✨ Outro segmento

### Comportamento
- A resposta é apenas **qualitativa** — entra como `segmento` em `QuizAnswers` mas **não afeta o cálculo** (mesma estratégia da versão anterior do quiz simples).
- Auto-advance normal (já implementado no `QuizQuestion`).
- O segmento é registrado no tracking (`quiz_events`) via `answer_label`, então aparece no dashboard `/quiz/adm` na distribuição de respostas — você consegue ver quais públicos mais respondem o quiz.

### Arquivos editados

**`src/lib/quizCalculator.ts`**
- Adicionar `segmento?: string` no type `QuizAnswers` (não usado no cálculo, só para tipagem).

**`src/pages/Quiz.tsx`**
- Inserir o novo objeto de pergunta como **primeiro item** do array `QUESTIONS`:
  ```ts
  {
    kind: "options",
    id: "segmento",
    title: "O que você produz?",
    subtitle: "Para personalizarmos seu diagnóstico.",
    options: [
      { label: "Papelaria personalizada", value: "papelaria", emoji: "📝" },
      { label: "Artesanato em geral",     value: "artesanato", emoji: "🎨" },
      { label: "Lembrancinhas e festas",  value: "lembrancinhas", emoji: "🎁" },
      { label: "Costura / crochê / tricô",value: "costura", emoji: "🧵" },
      { label: "Confeitaria / bolos",     value: "confeitaria", emoji: "🍰" },
      { label: "Bijuterias / acessórios", value: "bijuterias", emoji: "💍" },
      { label: "Outro segmento",          value: "outro", emoji: "✨" },
    ],
  }
  ```
- Atualizar copy do intro de **"Responda 8 perguntas honestas"** → **"Responda 9 perguntas rápidas"**.
- Ajustar lógica do `handleAnswer` para aceitar `value` string sem quebrar o tracking — o trecho `answer_value: typeof value === "number" ? value : null` já trata isso (string vira `null` no campo numérico, label é salva).

### O que NÃO muda
- Cálculo de prejuízo (`quizCalculator.ts`) — o segmento é só para personalização/análise.
- Visual e fluxo das demais perguntas.
- Tracking, dashboard `/quiz/adm`, pixel, checkouts Hotmart/OnProfit.
- Componente `QuizQuestion` (já suporta opções com emoji).

### Impacto no dashboard `/quiz/adm`
- O funil ganha uma etapa a mais (de 8 para 9 perguntas) — como o componente `QuizFunnel` já itera sobre as perguntas dinamicamente, ele se ajusta sozinho.
- Aparece automaticamente um novo card de distribuição "O que você produz?" no `QuizAnswersBreakdown`.

