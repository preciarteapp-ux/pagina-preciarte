## Página /mae — Promoção Dia das Mães

Nova landing page exclusiva com tema **romântico floral** (rosa/dourado), 100% responsiva mobile-first, mantendo os mesmos preços (Anual R$ 139,90 / Mensal R$ 39,90) e checkouts atuais.

### Estrutura da página

```
┌─────────────────────────────────────┐
│ Banner Countdown (sticky topo)      │ ← contador até 10/05/2026
├─────────────────────────────────────┤
│ HeroMae                             │
│  - Pétalas caindo (animação CSS)    │
│  - Badge "Especial Dia das Mães"    │
│  - Título com gradiente rosa→dourado│
│  - VSL ConverteAI (mesmo iframe)    │
│  - CTA "Quero meu presente"         │
├─────────────────────────────────────┤
│ PricingMae                          │
│  - Mesmos 2 planos (Anual destaque) │
│  - Card com moldura dourada + flores│
│  - Selo "Oferta Dia das Mães"       │
├─────────────────────────────────────┤
│ Testimonials (reutilizado)          │
├─────────────────────────────────────┤
│ Footer + WhatsApp + SocialProof     │
└─────────────────────────────────────┘
```

### Estilo visual (Romântico Floral)

- **Paleta**: rosa suave `#F8C8D8`, rosa profundo `#E91E63`, dourado `#D4AF37`, creme `#FFF8F0`, marrom suave para texto
- **Tipografia**: display serifada elegante (Playfair Display via Google Fonts) + Inter no corpo
- **Efeitos**:
  - Pétalas de rosa caindo em loop (CSS keyframes, ~12 elementos)
  - Gradientes suaves rosa→dourado nos CTAs
  - Bordas arredondadas + sombras douradas suaves
  - Scroll reveal nos blocos (reusa `useScrollReveal`)
  - Hover com leve brilho dourado

### Countdown

- Componente `CountdownMae` no topo, sticky em mobile
- Alvo: **10/05/2026 23:59** (Dia das Mães BR)
- Layout: 4 caixas (Dias / Horas / Min / Seg) com fundo dourado translúcido
- Mensagem: "Oferta especial encerra em:"

### Arquivos novos

- `src/pages/Mae.tsx` — página principal
- `src/components/mae/CountdownMae.tsx` — contador regressivo
- `src/components/mae/HeroMae.tsx` — hero com pétalas + VSL
- `src/components/mae/PricingMae.tsx` — pricing temático (clone de `Pricing.tsx`)
- `src/components/mae/FallingPetals.tsx` — animação de pétalas reutilizável

### Arquivos editados

- `src/App.tsx` — adicionar rota `/mae`

### Tracking

- Reutiliza `useAnalytics()`, Meta Pixel (`1503006167441659`), `buildCheckoutUrl()` para preservar UTMs/sck nos links Hotmart/Kirvano (mesmos das demais páginas).
- SEO: `<SEOHead>` com título "Promoção Dia das Mães — PreciArte".

### Responsividade

- Mobile-first: countdown empilhado em telas <380px, pétalas reduzidas (6 em mobile vs 12 desktop), tipografia fluida com `clamp()`, cards em coluna única, botões full-width.
