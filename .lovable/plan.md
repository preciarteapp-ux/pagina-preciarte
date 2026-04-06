

## Ajustes na LP3: Mover Pricing e mudar cor do banner de desconto

### 1. Mover Pricing para o meio da página

Atualmente a ordem após o Hero é:
PainPoints → ImpactBlock → WhatIs → Features → HowItWorks → Audience → Stats → Testimonials → CTA → Comparison → CTA → **Pricing** → CTAFinal

Nova ordem — mover Pricing para antes dos Testimonials:
PainPoints → ImpactBlock → WhatIs → Features → HowItWorks → Audience → Stats → CTA → **Pricing** → Testimonials → CTA → Comparison → CTAFinal

Isso coloca os planos mais no meio do conteúdo, permitindo que o visitante veja o preço mais cedo.

**Arquivo:** `src/pages/LP3.tsx` — reordenar componentes

### 2. Mudar cor do banner de desconto

O banner usa `bg-gradient-to-r from-primary to-accent` que resulta numa cor avermelhada (tema global). Para a LP3, trocar para a paleta vinho + laranja âmbar (`#8B1A4A` → `#E07B2A`), ficando coerente com a identidade visual da página.

Como o `DiscountPopup` é compartilhado entre LPs, a melhor abordagem é aceitar uma prop opcional de cor customizada e passá-la da LP3.

**Arquivos:**
- `src/components/DiscountPopup.tsx` — adicionar prop `gradientClass?: string` com fallback para o gradiente atual
- `src/pages/LP3.tsx` — passar `gradientClass` com as cores da LP3

