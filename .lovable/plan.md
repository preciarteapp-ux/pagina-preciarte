Trocar a parcela do plano anual de **12x R$ 12,05** para **12x R$ 11,90** em todas as páginas. Apenas o texto da parcela — preço à vista (R$ 119,90), descontos e demais valores ficam inalterados.

## Arquivos a editar

- `src/components/Pricing.tsx` (linha 9): `installment: "12x R$ 12,05"` → `"12x R$ 11,90"`
- `src/components/PricingLP1.tsx` (linha 14): idem
- `src/components/PricingLP2.tsx` (linha 13): idem
- `src/components/lp3/PricingLP3.tsx`:
  - linha 67: `12x R$ 12,05` → `12x R$ 11,90`
  - linha 151: `R$ 12,05/mês` → `R$ 11,90/mês`
- `src/components/quiz/QuizResult.tsx` (linha 260): `12x R$ 12,05` → `12x R$ 11,90`