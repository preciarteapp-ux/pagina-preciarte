## Mudanças no Plano Anual (todas as páginas, exceto Dia das Mães)

**Novos valores:**
- Parcela: `12x R$ 12,05`
- À vista: `R$ 119,90`
- Preço original riscado: manter `R$ 478,80` (75% OFF agora — atualizar badge)
- Novo link de checkout: `https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX`

**Arquivos a atualizar:**

1. `src/components/Pricing.tsx` — price, installment, link
2. `src/components/PricingLP1.tsx` — price, installment, link padrão (annualLink default)
3. `src/components/PricingLP2.tsx` — price, installment, link
4. `src/components/lp3/PricingLP3.tsx` — price, installment, link
5. `src/components/quiz/QuizResult.tsx` — price, installment, link
6. `src/pages/Tiktok.tsx` — passa `annualLink` próprio do Hotmart; **confirmar com usuário** se também troca para o novo link OnProfit ou mantém Hotmart com `src=tiktok`

**Não mexer:**
- `src/components/mae/PricingMae.tsx` (página Dia das Mães preserva valores antigos)
- Plano Mensal (R$ 39,90) em todas as páginas
- Caixinha cinza da LP3 que diz "No anual você paga R$ 14,48/mês" → atualizar para `R$ 12,05/mês` (consistência)

**Pergunta:** Atualizo também o desconto exibido (badge "48% OFF" → "75% OFF") já que R$ 119,90 vs R$ 478,80 = 75% off? Ou mantenho "48% OFF"?
