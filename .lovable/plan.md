

## Tornar o plano mensal visível no final do quiz

Hoje o plano mensal aparece como um simples link sublinhado pequeno (`"Prefiro testar no plano mensal (R$ 39,90/mês)"`) abaixo do botão anual. Vou transformá-lo em um card/botão secundário bem visível, mantendo o anual como destaque principal.

### O que muda no `QuizResult.tsx`

- **Plano Anual (continua em destaque)**: mantém o botão grande com cor `accent`, texto "Quero parar de perder dinheiro agora" e preço "R$ 12,44/mês".
- **Plano Mensal (deixa de ser link escondido)**: vira um card com:
  - Borda sutil (`border-white/20`)
  - Fundo escuro semi-transparente (`bg-white/5`)
  - Preço destacado "R$ 39,90/mês"
  - Texto curto de valor ("Teste com flexibilidade mensal")
  - Botão de ação próprio com borda e hover, mantendo o tracking `checkout-quiz-mensal`
- **Layout**: os dois planos ficam empilhados verticalmente dentro do bloco CTA, com o anual em cima e o mensal logo abaixo como opção secundária clara.

### Detalhes técnicos
- Alteração apenas no bloco CTA do `src/components/quiz/QuizResult.tsx` (linhas ~254-281).
- Tracking existente (`data-track-id`, `data-track-type`, `goMonthly`, `goAnnual`) permanece inalterado.
- Sticky bottom CTA continua apontando só para o anual.
- Nenhuma mudança em outros componentes, páginas ou tracking.

