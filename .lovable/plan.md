## Objetivo

Criar um popup promocional de fim de semana (Plano Anual R$ 99,90 + Plano Mensal R$ 29,90/mês), com contador até domingo, que apareça em **todas as páginas de venda** (`/`, `/lp1`, `/lp2`, `/lp3`, `/lp4`, `/tiktok`, `/mae`, `/quiz`), 100% otimizado para celular.

## Comportamento

- **Delay de abertura:** aparece 2–3s após a página carregar.
- **Contador regressivo:** conta até **domingo às 23:59:59** (horário Brasília UTC-3). Se já for depois de domingo, calcula pro próximo domingo.
- **Fechamento:** botão X discreto no canto. Se o usuário fechar, **não abre mais na sessão** (persistência em `sessionStorage` com chave `weekendPromoDismissed`).
- **Não conflita** com o `DiscountPopup` (banner do topo) — o novo é um **modal central**, o antigo continua sendo o banner slim no topo.
- **Sem toast, sem overlay bloqueante permanente:** overlay escuro clicável fecha o popup.

## Layout (mobile-first, igual ao print)

- Card branco arredondado, largura máx `~400px`, centralizado.
- **Topo** com faixa rosa (`#EC5F7A` estilo do print) com badge "🔥 PROMOÇÃO · SÓ ATÉ DOMINGO" + título "Plano anual com desconto especial" + botão X no canto superior direito.
- **Corpo:**
  - Card destacado "PLANO ANUAL" com borda rosa:
    - Badge "⭐ MAIS ESCOLHIDO"
    - Preço riscado: `De R$ 119,90/ano`
    - Preço grande: **R$ 99,90**
    - Subtexto: `por ano · ou 12x de R$ 9,32`
    - Pill rosa: `🎉 Economize R$ 20,00`
  - Card cinza claro "PLANO MENSAL":
    - **R$ 29,90/mês**
    - `cancele quando quiser`
  - Contador flip cards pretos: `DIAS : HORAS : MIN : SEG`
  - Bullets: ✓ Acesso imediato · ✓ Cancele quando quiser · ✓ Tudo incluso
  - **CTA principal (rosa full-width):** `→ Quero garantir agora` → `https://lastlink.com/p/CBB8498E8/checkout-payment/` (via `buildCheckoutUrl` para preservar UTMs/sck).
  - Link discreto abaixo: `Não, prefiro pagar mais depois` → clique no plano mensal `https://pay.hotmart.com/X105144057Q?off=rns56vc4` (via `buildCheckoutUrl`). Alternativa: só fecha o popup — **preciso confirmar** (ver pergunta abaixo).

## Arquivos afetados

**Novo:**
- `src/components/WeekendPromoPopup.tsx` — modal completo, self-contained, com contador, mobile-first, tokens semânticos (não hardcode de cores em componentes que usam design system; nas páginas Mae/LP3 que já quebram a regra com cores hardcoded, permitido seguir o mesmo padrão do card rosa/branco do print).

**Editados (apenas adicionar `<WeekendPromoPopup />` no JSX):**
- `src/pages/Index.tsx`
- `src/pages/LP1.tsx`
- `src/pages/LP2.tsx`
- `src/pages/LP3.tsx`
- `src/pages/LP4.tsx`
- `src/pages/Tiktok.tsx`
- `src/pages/Mae.tsx`
- `src/pages/Quiz.tsx`

Nada mais é tocado (checkout.ts, pricing das páginas, GTM, Clarity, UTMify — tudo permanece).

## Pergunta rápida antes de codar

O link "Não, prefiro pagar mais depois" deve:

**(A)** Apenas fechar o popup (mais honesto com a copy do print — "prefiro pagar mais depois" = adiar).
**(B)** Levar para o checkout do **plano mensal** (`?off=rns56vc4`) já que o mensal aparece no card.

Vou seguir com **(A)** por padrão se você aprovar sem responder — combina com a intenção do print. Se quiser (B), me avise.