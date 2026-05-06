## Alterar parcelamento anual de R$ 14,48 para R$ 14,05

Substituir todas as ocorrências de `12x R$ 14,48` por `12x R$ 14,05` em todo o site, mantendo o restante (preço à vista R$ 139,90, R$ 478,80 riscado, etc) inalterado.

### Arquivos a editar

- `src/components/Pricing.tsx` (linha 9)
- `src/components/PricingLP1.tsx` (linha 14)
- `src/components/PricingLP2.tsx` (linha 13)
- `src/components/lp3/PricingLP3.tsx` (linha 60)
- `src/components/quiz/QuizResult.tsx` (linha 260)
- `src/lib/quizCalculator.ts` (linhas 156 e 160)

### Observação

O usuário escreveu "colocar - 12x R$ 14,05 ... mudar para 12x R$ 14,05". Vou tratar como troca do valor atual (`14,48`) para o novo (`14,05`) em todas as páginas (home, LP1, LP2, LP3, Tiktok, Quiz e resultado do quiz).