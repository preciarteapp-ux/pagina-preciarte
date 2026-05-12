## Objetivo

Deixar a página `/mae` 100% otimizada para celular, já que 99% do tráfego é mobile. Manter o visual desktop intacto, mas refinar tipografia, espaçamentos, paddings e elementos críticos para telas pequenas (320–430px).

## O que será ajustado

### 1. CountdownMae (sticky topo)
- Reduzir altura no mobile, fonte do título menor, e blocos de contagem mais compactos para não ocupar 1/4 da tela.
- Garantir que título + relógio caibam empilhados sem quebrar layout.

### 2. HeroMae
- Reduzir padding vertical no mobile (`py-12` → `py-8`).
- H1: clamp ajustado (`1.6rem` mínimo) para evitar quebras feias.
- Badge, subtítulo e CTA com tamanhos mobile-first.
- VSL já é responsiva (16:9), mas reduzir o blur decorativo no mobile.

### 3. ProblemMae / BenefitsMae / FeaturesMae / HowItWorksMae
- Reduzir padding `py-16` → `py-12` no mobile.
- Cards com padding interno menor (`p-6` → `p-5`).
- Garantir grid 1 coluna até `sm`, com gaps menores.
- Títulos de seção com clamp menor no mobile.

### 4. PricingMae (CRÍTICO — é onde converte)
- No mobile: remover `scale(1.02)` do plano popular (corta as bordas).
- Reduzir padding dos cards (`p-7` → `p-5` mobile).
- Preço parcelado: garantir que `12x R$ 11,66` não quebre — reduzir tamanho no mobile.
- Badge "Melhor Oferta" com fonte e padding menores.
- Botão CTA com altura confortável para toque (mínimo 48px) e fonte legível.
- Lista de features: espaçamento menor (`space-y-3` → `space-y-2.5`).

### 5. CTABannerMae / CTAFinalMae
- Padding interno reduzido no mobile.
- Botões CTA full-width no mobile para área de toque maior.
- Títulos com clamp mais baixo.

### 6. TestimonialsMae / FAQMae
- Padding vertical reduzido.
- FAQ: padding do container menor no mobile.

### 7. WhatIsMae
- Padding e tamanho de texto ajustados ao mobile.

### 8. Geral
- Garantir que nenhum elemento cause overflow horizontal (checar blobs decorativos com `pointer-events-none` e `overflow-hidden` nas seções).
- Áreas de toque mínimo 44x44px em todos os botões/links.
- Revisar `container px-4` — ok, mas adicionar `px-5` em seções críticas se necessário.

## Detalhes técnicos

- Tudo via classes Tailwind responsivas (`text-base md:text-lg`, `py-12 md:py-20`, etc).
- Manter todos os tokens de cor e gradientes atuais (paleta Bordeaux/Dourado/Rosa).
- Sem alterações em lógica, links de checkout, tracking ou conteúdo textual.
- Validar com viewport 375x812 (iPhone padrão) após as mudanças.

## Arquivos afetados

- `src/components/mae/CountdownMae.tsx`
- `src/components/mae/HeroMae.tsx`
- `src/components/mae/ProblemMae.tsx`
- `src/components/mae/WhatIsMae.tsx`
- `src/components/mae/BenefitsMae.tsx`
- `src/components/mae/FeaturesMae.tsx`
- `src/components/mae/HowItWorksMae.tsx`
- `src/components/mae/CTABannerMae.tsx`
- `src/components/mae/PricingMae.tsx`
- `src/components/mae/FAQMae.tsx`
- `src/components/mae/CTAFinalMae.tsx`
- `src/components/mae/TestimonialsMae.tsx`
