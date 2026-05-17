Alterar apenas a página `/tiktok` para usar o checkout Hotmart e parcela diferente, sem afetar outras páginas.

## Mudanças

**1. `src/components/PricingLP1.tsx`**
- Adicionar prop opcional `annualInstallment?: string` (default `"12x R$ 11,90"`).
- Usar essa prop no plano Anual em vez do valor hardcoded.

**2. `src/pages/Tiktok.tsx`**
- Passar para `<PricingLP1>`:
  - `annualLink="https://pay.hotmart.com/X105144057Q?off=moc4qfni"`
  - `annualInstallment="12x R$ 12,40"`

## Não muda

- `/` (Index), `/lp1`, `/lp2`, `/lp3`, `/mae`, `/quiz` e todos os outros componentes de pricing permanecem com `12x R$ 11,90` e link OnProfit `?off=cbP8BX`.
- Preço à vista, badges, descontos e textos de desconto da página /tiktok não mudam (somente parcela e link).