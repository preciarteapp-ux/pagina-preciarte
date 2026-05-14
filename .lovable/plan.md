A Home (`/` → `src/pages/Index.tsx`) é a única página com link anual diferente. Todas as outras já usam `?off=cbP8BX`.

## Alteração

- `src/pages/Index.tsx` (linha 53):
  - De: `annualLink="https://pay.onprofit.com.br/CUTCm7GF?off=0jene1"`
  - Para: `annualLink="https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX"`

## Já corretos (sem mudança)

- `src/pages/Tiktok.tsx`, `src/components/PricingLP1.tsx` (default), `src/components/PricingLP2.tsx`, `src/components/Pricing.tsx`, `src/components/lp3/PricingLP3.tsx`, `src/components/quiz/QuizResult.tsx`, `src/components/mae/PricingMae.tsx` — todos já em `?off=cbP8BX`.