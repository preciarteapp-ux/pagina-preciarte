## Criar página `/tiktok` (cópia da home)

### O que será criado

**Novo arquivo**: `src/pages/Tiktok.tsx`
- Cópia idêntica de `src/pages/Index.tsx` (mesmos componentes, mesma ordem: Hero, Benefits, Features, PricingLP1, Testimonials, CTA, Footer, WhatsAppButton, SocialProofNotification, DiscountPopup, SEOHead).
- Mesmo tracking (Meta Pixel `1503006167441659`, useAnalytics, Utmify, Clarity — herdados via `index.html` + hook).
- Única diferença: `annualLink` do `<PricingLP1>` apontará para o checkout Hotmart anual com tag de origem TikTok:
  `https://pay.hotmart.com/X105144057Q?off=moc4qfni&src=tiktok`

### O que será editado

**`src/App.tsx`**: registrar a rota `/tiktok` apontando para o novo componente `Tiktok`, acima da rota catch-all `*`.

### O que NÃO muda
- Página `/` (home) permanece igual.
- Componentes compartilhados (Hero, Pricing, etc.) não são duplicados nem alterados.
- Pixels, analytics, social proof, discount popup e SEO funcionam idênticos à home.

### Detalhes técnicos
- Plano mensal continua no link Hotmart padrão (definido dentro do `PricingLP1.tsx`).
- Apenas o link do plano **anual** recebe o parâmetro `&src=tiktok` para rastrear origem da campanha.