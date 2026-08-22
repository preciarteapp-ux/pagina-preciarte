Atualizar valor do plano anual em todo o site

## O que vamos fazer

Trocar o valor do **Plano Anual** em todas as páginas e componentes, mantendo layout, links de checkout e estrutura originais:

- **Parcela:** de R$ 10,43/mês para **12x R$ 12,56**
- **À vista:** de R$ 97,90 para **R$ 117,90**

## Onde aplicar

```text
src/components/Pricing.tsx
src/components/PricingLP1.tsx
src/components/PricingLP2.tsx
src/components/lp3/PricingLP3.tsx
src/components/lp5/PrecosLP5.tsx
src/components/lp6/PrecosLP6.tsx
src/components/lp7/PrecosLP7.tsx
src/components/mae/PricingMae.tsx
src/components/mae/CTABannerMae.tsx
src/components/quiz/QuizResult.tsx
src/lib/quizCalculator.ts
src/pages/LP4.tsx
src/pages/Tiktok.tsx
```

## Alterações técnicas

1. **Componentes de precificação** — substituir apenas os números:
   - Parcela: `R$ 10,43` → `R$ 12,56`
   - À vista: `R$ 97,90` → `R$ 117,90`
   - Manter formatação visual atual ("/mês" menor, textos auxiliares, badges e estrutura de cards).

2. **LP6 e LP7** — ajustar valores que ainda estão defasados (`R$ 21,09` / `R$ 197,90`) para o novo padrão.

3. **Quiz** — atualizar referências de preço em `QuizResult.tsx` e `quizCalculator.ts` para refletir R$ 12,56/mês e R$ 117,90 à vista.

4. **Páginas de copy** — ajustar apenas os números em textos de LP4, CTABannerMae e Tiktok, sem reescrever frases.

5. **Não serão alterados:** links de checkout, ordem dos planos, estrutura de seções, cores, fontes, imagens ou comportamentos.

## Validação

- `bun run build` sem erros.
- Verificação visual rápida nos cards de preço das principais LPs.
