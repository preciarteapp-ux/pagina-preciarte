## Expandir página /mae com conteúdo completo

Hoje `/mae` tem só Hero + Pricing + Depoimentos + Footer. Vou deixar no mesmo nível das outras LPs (Index/LP3), mantendo 100% o tema **romântico floral** (rosa/dourado, Playfair, pétalas) e os mesmos preços/checkouts.

### Nova estrutura

```
┌─────────────────────────────────────┐
│ CountdownMae (sticky topo)          │
├─────────────────────────────────────┤
│ HeroMae (já existe)                 │
├─────────────────────────────────────┤
│ ProblemMae         ← NOVO           │ dores da papelarista
│  "Você se reconhece nisso, mãe?"    │
├─────────────────────────────────────┤
│ WhatIsMae          ← NOVO           │ o que é o PreciArte
├─────────────────────────────────────┤
│ BenefitsMae        ← NOVO           │ 6 benefícios em cards florais
├─────────────────────────────────────┤
│ FeaturesMae        ← NOVO           │ funcionalidades detalhadas
├─────────────────────────────────────┤
│ HowItWorksMae      ← NOVO           │ 3 passos (Cadastra→Calcula→Lucra)
├─────────────────────────────────────┤
│ TestimonialsMae    ← NOVO (wrapper) │ depoimentos com moldura rosa
├─────────────────────────────────────┤
│ CTABannerMae       ← NOVO           │ banner intermediário com countdown
├─────────────────────────────────────┤
│ PricingMae (já existe)              │
├─────────────────────────────────────┤
│ FAQMae             ← NOVO           │ 6-8 perguntas (accordion)
├─────────────────────────────────────┤
│ CTAFinalMae        ← NOVO           │ CTA grande "Garantir presente"   │
├─────────────────────────────────────┤
│ Footer + WhatsApp + SocialProof     │
└─────────────────────────────────────┘
```

### Conteúdo de cada nova seção

**ProblemMae** — 4 dores em cards suaves:
- "Vendo bastante mas o dinheiro não sobra"
- "Não sei se estou cobrando o preço certo"
- "Perco horas calculando no caderno/Excel"
- "Tenho medo de aumentar preço e perder cliente"

**WhatIsMae** — bloco de 2 colunas (texto + mockup) explicando o que é o PreciArte de forma carinhosa: "O sistema feito para a papelarista que quer transformar talento em renda real".

**BenefitsMae** — 6 cards com ícones florais:
1. Preço justo em segundos
2. Dashboard que mostra o lucro real
3. Catálogo online pronto
4. Gestão de clientes e orçamentos
5. Controle de materiais e estoque
6. Assistente de IA para precificar

**FeaturesMae** — lista visual mais densa das funcionalidades (reaproveita lista do PricingMae expandida com descrições curtas).

**HowItWorksMae** — 3 passos numerados com setas/pétalas conectando.

**TestimonialsMae** — wrapper que usa o componente `Testimonials` existente mas dentro de um container com fundo rosa-creme e título serifado próprio ("Mães que já transformaram o negócio"). Sem reescrever depoimentos.

**CTABannerMae** — faixa entre HowItWorks e Pricing com mini-countdown + botão.

**FAQMae** — accordion com perguntas:
- Funciona no celular?
- Posso cancelar quando quiser?
- Preciso entender de tecnologia?
- Como funciona a garantia de 7 dias?
- Atende quais nichos (papelaria, festa, personalizados)?
- Como recebo o acesso?
- A IA gasta crédito como?
- Posso presentear minha mãe?

**CTAFinalMae** — bloco final grande com gradiente rosa→dourado, título serifado, sub-headline emocional ("O melhor presente é o que muda a vida dela"), e botão que rola para `#pricing`.

### Estilo (mantém o que já existe)

- Mesma paleta `#9a1f4a / #c2185b / #d4af37 / #fff8f0 / #5a2438`
- Playfair Display para títulos, Inter para corpo
- Pétalas reaproveitadas em 1-2 seções extras (sutil)
- `useScrollReveal` em cada bloco para fade-in elegante
- `clamp()` em títulos, mobile-first, cards full-width <md

### Arquivos novos

```
src/components/mae/
  ProblemMae.tsx
  WhatIsMae.tsx
  BenefitsMae.tsx
  FeaturesMae.tsx
  HowItWorksMae.tsx
  TestimonialsMae.tsx       (wrapper temático)
  CTABannerMae.tsx
  FAQMae.tsx
  CTAFinalMae.tsx
```

### Arquivos editados

- `src/pages/Mae.tsx` — adicionar imports e novas seções na ordem acima

### Tracking

Mantém `useAnalytics`, Meta Pixel já inicializado, todos os botões com `data-track-id` (`cta-banner-mae`, `cta-final-mae`, `faq-mae-{n}`) e checkout via `buildCheckoutUrl`.

### Responsividade

100% mobile-first: grids `grid-cols-1 md:grid-cols-2/3`, FAQ accordion full-width, CTA banner empilha em <640px, pétalas só em hero/CTA final para não pesar mobile.
