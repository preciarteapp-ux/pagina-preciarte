Objetivo: desativar o popup promocional "WeekendPromoPopup" em todas as páginas do site, já que a promoção acabou.

Tarefas:
1. Localizar todas as páginas que importam e renderizam `<WeekendPromoPopup />`.
   - src/pages/Index.tsx
   - src/pages/LP1.tsx
   - src/pages/LP2.tsx
   - src/pages/LP3.tsx
   - src/pages/LP4.tsx
   - src/pages/Tiktok.tsx
   - src/pages/Mae.tsx
   - src/pages/LP5.tsx

2. Remover a importação do componente `WeekendPromoPopup` e a chamada `<WeekendPromoPopup />` em cada uma dessas páginas.

3. Verificar se `src/components/WeekendPromoPopup.tsx` e `src/lib/promoModal.ts` ficam sem uso após as remoções. Se sim, removê-los para evitar código morto.

4. Rodar o build para garantir que não restou importação quebrada ou referência órfã.

5. Verificar visualmente em uma rota de venda que o popup não aparece mais.

Arquivos afetados:
- src/pages/Index.tsx, LP1.tsx, LP2.tsx, LP3.tsx, LP4.tsx, Tiktok.tsx, Mae.tsx, LP5.tsx
- src/components/WeekendPromoPopup.tsx (remoção condicional)
- src/lib/promoModal.ts (remoção condicional)