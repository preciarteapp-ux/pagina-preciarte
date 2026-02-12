

# Plano: Copiar LP1 para a Pagina Principal

## Objetivo

Tornar a pagina principal (`/`) identica a `/lp1`, incluindo popup de desconto, pricing com descontos e o mesmo Meta Pixel.

## Alteracoes no arquivo `src/pages/Index.tsx`

1. Adicionar imports de `useState`, `DiscountPopup` e `PricingLP1`
2. Remover import do `Pricing` antigo
3. Adicionar estado `discountApplied` e funcao `handleClaimDiscount` com toast
4. Trocar Meta Pixel de `24742614715430041` para `1503006167441659`
5. Adicionar `<DiscountPopup>` no JSX
6. Substituir `<Pricing />` por `<PricingLP1 discountApplied={discountApplied} />`
7. Adicionar `useEffect` para verificar desconto ja reivindicado na sessao

O resultado final sera o `Index.tsx` com exatamente a mesma logica e componentes do `LP1.tsx`.

