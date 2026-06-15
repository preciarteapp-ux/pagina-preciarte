## Objetivo
Remover Meta Pixel, TikTok Pixel, UTMify Pixel e UTMify UTMs loader do projeto. **Manter Google Tag Manager e Microsoft Clarity.**

## O que será removido

### 1. `index.html` (head)
- Bloco Meta Pixel base script (`fbq` loader)
- Bloco TikTok Pixel (`ttq.load('D7GP8ARC77UFJ111M58G')` + `ttq.page()`)
- Bloco UTMify Pixel (`window.pixelId = "6a305052ddfaa08cbeb75ef0"`)
- Bloco UTMify UTMs loader (`cdn.utmify.com.br/scripts/utms/latest.js`)
- Comentário `<!-- Meta Pixel Noscript handled per page -->` no body

### 2. Páginas — remover blocos `fbq(...)` (init/track PageView/Lead/InitiateCheckout/Purchase)
- `src/pages/Index.tsx`
- `src/pages/LP1.tsx`
- `src/pages/LP2.tsx`
- `src/pages/LP3.tsx`
- `src/pages/LP4.tsx` (3 blocos: PageView + 2 InitiateCheckout)
- `src/pages/Mae.tsx`
- `src/pages/Tiktok.tsx`
- `src/pages/Quiz.tsx`
- `src/pages/Obrigado.tsx` (Purchase + PageView)
- `src/components/quiz/QuizResult.tsx` (Lead + InitiateCheckout)

Em cada caso, removo apenas o `if (window.fbq) { ... }` (e o `useEffect` envolvente se ficar vazio). Não mexo em UI, conversão ou navegação.

## O que será mantido
- **Google Tag Manager** (`GTM-M8DD3RTK`) — head + `<noscript>` no body
- **Microsoft Clarity** (`ucbv9rkpfv`)
- Lógica própria de UTMs: `persistUtmsFromUrl` em `App.tsx`, `buildCheckoutUrl` em `src/lib/checkout.ts` e o hook `useAnalytics` (Supabase)

## Memória
Atualizo `mem://analytics/pixel-implementation-per-page` para refletir que apenas GTM + Clarity estão ativos e removo as menções de Meta/TikTok/UTMify.