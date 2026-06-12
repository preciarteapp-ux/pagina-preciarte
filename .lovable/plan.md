## Objetivo
Trocar em **todas as páginas** o link de checkout do plano Anual para `https://lastlink.com/p/CBAB11667/checkout-payment/` e atualizar a parcela exibida de `12x R$ 11,90` para `12x R$ 12,77`.

## Arquivos a alterar

1. **`src/pages/Index.tsx`** — `annualLink` → lastlink.
2. **`src/pages/Tiktok.tsx`** — substituir o link Hotmart atual pelo lastlink e a parcela `12x R$ 12,40` por `12x R$ 12,77` (passa a seguir o padrão; pode remover as props customizadas).
3. **`src/components/PricingLP1.tsx`** — defaults: `annualLink` → lastlink, `annualInstallment` → `12x R$ 12,77`.
4. **`src/components/Pricing.tsx`** — `installment` e `link` do plano Anual.
5. **`src/components/PricingLP2.tsx`** — `installment` e `link` do plano Anual.
6. **`src/components/lp3/PricingLP3.tsx`** — texto `12x R$ 11,90` e `href` do botão.
7. **`src/components/quiz/QuizResult.tsx`** — `ANNUAL_LINK` e texto `12x R$ 11,90`.
8. **`src/components/mae/PricingMae.tsx`** — `link` do plano Anual (e parcela, se exibida).
9. **`src/pages/LP4.tsx`** — `CHECKOUT_URL_BASE` → lastlink e os textos `R$ 11,90 por mês` → `R$ 12,77 por mês` (são apresentações do mesmo plano anual parcelado).

## Não muda
- Preço à vista (R$ 119,90), descontos, badges, copy geral.
- Plano Mensal (Hotmart R$ 39,90) permanece inalterado.
- Lógica de `buildCheckoutUrl` (UTMs continuam sendo anexadas).
