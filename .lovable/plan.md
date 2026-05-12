# Redesign dos planos em todas as páginas

Aplicar o novo layout de pricing (referência da imagem) em todas as páginas do site, mantendo a identidade visual de cada uma.

## Novo layout (estrutura comum)

**Card Anual (destaque):**
- Badge "Melhor oferta" no topo (canto superior direito ou centro, conforme a página)
- Tag "48% OFF"
- Preço original riscado: `R$ 478,80/ano`
- Parcela em destaque grande: `12x R$ 14,48`
- Subtítulo: `ou R$ 139,90 à vista`
- Caixa verde de economia: `Você economiza R$ 338,90 por ano`
- 4 features curtas:
  - Acesso completo a todos os recursos
  - Menos que uma pizza por mês
  - O sistema se paga na 1ª venda corrigida
  - Suporte prioritário incluso
- CTA: `Assinar Anual agora`

**Card Mensal:**
- Preço: `R$ 39,90/mês`
- Subtítulo: `Acesso completo, sem fidelidade`
- 3 itens:
  - ✓ Acesso completo
  - ✓ Cancele quando quiser
  - — Sem desconto anual (em cinza/risco)
- CTA: `Assinar Mensal`
- Caixa comparativa (destaque): `No anual você paga R$ 14,48/mês — apenas 36% do preço mensal`

## Páginas afetadas e identidade visual

| Página | Arquivo | Identidade |
|---|---|---|
| Index (`/`) | `src/components/Pricing.tsx` | Tema escuro padrão (primary/accent do sistema) |
| LP1 | `src/components/PricingLP1.tsx` | Tema escuro padrão |
| LP2 | `src/components/PricingLP2.tsx` | Tema escuro + selo de desconto 50% quando ativo |
| LP3 | `src/components/lp3/PricingLP3.tsx` | Bordeaux + Amber (paleta própria LP3) |
| Quiz Resultado | `src/components/quiz/QuizResult.tsx` | Estilo do quiz |
| Dia das Mães | `src/components/mae/PricingMae.tsx` | Rosê + dourado, fundo creme, Playfair Display |

Cada página continuará usando suas próprias cores (sem cross-contamination): a estrutura HTML/visual é a mesma, apenas tokens de cor, fonte e gradientes mudam por página.

## Pontos preservados

- Links de checkout atuais de cada página (Hotmart/Onprofit/Kirvano) — sem alteração
- Tracking attributes (`data-track-id`, `data-track-type`)
- LP2: selo dinâmico "50% OFF" quando `discountApplied=true`
- Mae: link Onprofit `?off=cbP8BX` no anual
- Pricing.tsx, PricingLP1, PricingLP2, QuizResult: link Hotmart anual atual (`?off=moc4qfni` etc.)
- Countdown e demais seções não são tocados

## Detalhes técnicos

- Caixa verde de economia: usar `bg-emerald-500/10` + `text-emerald-600` (ou tokens equivalentes da página) com ícone `PiggyBank` do lucide
- Item "Sem desconto anual" no Mensal: traço `—` em vez de check, em `text-muted-foreground`
- Caixa comparativa: card interno com borda sutil, destaque no valor `R$ 14,48/mês` na cor primária da página
- Mae: manter Playfair Display nos títulos e gradiente rosê→dourado nos números
- LP3: manter paleta Bordeaux/Amber existente
- Ajustar tamanhos para o viewport mobile (`text-3xl md:text-5xl` no preço grande)

## Resultado esperado

Os 6 componentes de pricing terão a mesma estrutura visual e copy, apenas vestidos com a paleta/tipografia de cada página, melhorando consistência e conversão sem quebrar identidade.