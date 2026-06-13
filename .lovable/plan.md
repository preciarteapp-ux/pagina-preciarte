## Objetivo
Trocar em **todas as páginas** o link de checkout do plano Anual para `https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX` e atualizar a parcela exibida de `12x R$ 12,77` para `12x R$ 12,05`.

## Arquivos a alterar

1. **`src/pages/Index.tsx`** — `annualLink` → onprofit.
2. **`src/pages/Tiktok.tsx`** — `annualLink` → onprofit e `annualInstallment` → `12x R$ 12,05`.
3. **`src/components/PricingLP1.tsx`** — defaults: `annualLink` → onprofit, `annualInstallment` → `12x R$ 12,05`.
4. **`src/components/Pricing.tsx`** — `installment` e `link` do plano Anual.
5. **`src/components/PricingLP2.tsx`** — `installment` e `link` do plano Anual.
6. **`src/components/lp3/PricingLP3.tsx`** — texto `12x R$ 12,77` e `href` do botão.
7. **`src/components/quiz/QuizResult.tsx`** — `ANNUAL_LINK` e texto `12x R$ 12,77`.
8. **`src/components/mae/PricingMae.tsx`** — `link` do plano Anual (mantém preço R$ 139,90 / 12x R$ 11,66).
9. **`src/pages/LP4.tsx`** — `CHECKOUT_URL_BASE` → onprofit e os textos `R$ 12,77 por mês` → `R$ 12,05 por mês`.

## Não muda
- Preço à vista (R$ 119,90), descontos, badges, copy geral.
- Plano Mensal (Hotmart R$ 39,90) permanece inalterado.
- Lógica de `buildCheckoutUrl` (UTMs continuam sendo anexadas).
