

## Propagar UTMs para os checkouts (Hotmart e OnProfit)

### Objetivo
Garantir que toda visita que chega com `utm_source`, `utm_medium`, `utm_campaign` (e `utm_term`, `utm_content`, além de `sck`, `xcod`, `gclid`, `fbclid`) leve esses parâmetros até o checkout — principalmente o da Hotmart, que aceita UTMs nativamente via querystring.

### Diagnóstico atual
- O Utmify já está carregado no `index.html`, mas ele injeta UTMs apenas em `<a href>` de domínios suportados. Hoje os botões de checkout usam `window.open(plan.link)` em JS, então o Utmify **não consegue interceptar**.
- Componentes afetados: `PricingLP1.tsx`, `Pricing.tsx`, `PricingLP2.tsx`, `lp3/PricingLP3.tsx`, `CTA.tsx`, `CTALP2.tsx`, `Hero.tsx`, `HeroLP2.tsx`, `lp3/HeroLP3.tsx`, `lp3/CTABannerLP3.tsx`, `lp3/CTAFinalLP3.tsx`, `lp3/PricingLP3.tsx` (e qualquer outro botão que abre checkout).

### Solução
Criar um utilitário central `src/lib/checkout.ts` com duas funções:

1. **`getStoredUtms()`** — lê UTMs/click IDs da URL atual; se ausentes, faz fallback para `sessionStorage` (persistido no primeiro carregamento). Captura: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `sck`, `xcod`, `src`, `gclid`, `fbclid`.
2. **`buildCheckoutUrl(baseUrl)`** — recebe o link base do checkout e retorna a URL com os parâmetros UTM mesclados (preserva querystring existente como `?off=...`).

Depois substituir, em todos os botões de checkout, o uso direto do link por `buildCheckoutUrl(link)` — tanto em `window.open(...)` quanto em `<a href={...}>`.

Adicionalmente, no `index.html` (ou em um pequeno hook no `App.tsx`), na primeira carga salvar as UTMs da URL no `sessionStorage` para garantir persistência durante a navegação interna.

### Arquivos a alterar
- **Novo:** `src/lib/checkout.ts` (utilitário UTM + builder de URL)
- **Atualizar (envolver links em `buildCheckoutUrl`):**
  - `src/components/PricingLP1.tsx`
  - `src/components/Pricing.tsx`
  - `src/components/PricingLP2.tsx`
  - `src/components/lp3/PricingLP3.tsx`
  - `src/components/CTA.tsx`, `CTALP2.tsx`
  - `src/components/Hero.tsx`, `HeroLP2.tsx`
  - `src/components/lp3/HeroLP3.tsx`, `CTABannerLP3.tsx`, `CTAFinalLP3.tsx`
- **Persistência inicial das UTMs:** adicionar pequeno bloco no `App.tsx` que, no mount, salva as UTMs da URL no `sessionStorage` (caso existam).

### Compatibilidade
- Hotmart aceita `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` e `sck` direto na querystring — vai aparecer no painel da Hotmart e no Utmify.
- OnProfit também aceita UTMs via querystring — funciona da mesma forma.
- Não quebra os offers existentes (`?off=moc4qfni`, `?off=0jene1`) porque o builder mescla com o querystring atual.

### Resultado esperado
Ao acessar, por exemplo, `https://lp.preciarte.com.br/?utm_source=facebook&utm_campaign=anual_promo&utm_medium=cpc` e clicar em "Assinar Anual", o usuário será enviado para `https://pay.hotmart.com/X105144057Q?off=moc4qfni&utm_source=facebook&utm_campaign=anual_promo&utm_medium=cpc`.

