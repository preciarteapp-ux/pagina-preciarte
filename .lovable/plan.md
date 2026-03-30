

## Atualizar link de checkout do plano Mensal

Substituir o link do plano Mensal em 3 arquivos:

| Arquivo | Linha | De | Para |
|---------|-------|----|------|
| `src/components/Pricing.tsx` | 25 | `https://pay.kirvano.com/b11cd8e9-d117-424b-bc61-a50432c25223` | `https://pay.hotmart.com/X105144057Q` |
| `src/components/PricingLP1.tsx` | 55 | `https://pay.kirvano.com/b11cd8e9-d117-424b-bc61-a50432c25223` | `https://pay.hotmart.com/X105144057Q` |
| `src/components/PricingLP2.tsx` | 55 | `https://pay.kirvano.com/b11cd8e9-d117-424b-bc61-a50432c25223` | `https://pay.hotmart.com/X105144057Q` |

Apenas o plano Mensal sera alterado. Os planos Semestral e Anual permanecem com os links atuais.

