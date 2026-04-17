

## Trocar checkout Anual da página / para Hotmart

A página `/` (Index.tsx) usa o componente `PricingLP1.tsx`. Atualmente o link do plano Anual está apontando para a OnProfit, e precisa ser trocado para a Hotmart.

### Mudança

**Arquivo:** `src/components/PricingLP1.tsx`

- Plano **Anual**: trocar de `https://pay.onprofit.com.br/CUTCm7GF?off=0jene1` para `https://pay.hotmart.com/X105144057Q?off=moc4qfni`
- Plano **Mensal**: manter `https://pay.hotmart.com/X105144057Q` (sem alteração)

### Escopo

Apenas a página `/` (PricingLP1) será afetada. As LPs `/lp1` (na verdade também usa PricingLP1 — ver observação), `/lp2` e `/lp3` permanecem com seus links atuais.

**Observação importante:** o componente `PricingLP1.tsx` é usado tanto em `Index.tsx` (rota `/`) quanto possivelmente em `LP1.tsx`. Preciso confirmar se a alteração deve afetar somente a `/` ou ambas. Se for somente a `/`, será necessário separar os componentes (criar um `PricingIndex.tsx` específico para a Index ou passar o link via prop). Vou verificar onde o `PricingLP1` é importado antes de implementar e, se necessário, isolar a mudança apenas na rota `/`.

