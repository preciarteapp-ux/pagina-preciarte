Objetivo: tornar a landing page LP5 acessível na rota `/lp5` e garantir que ela se comporte como as outras páginas de venda.

Tarefas:
1. Registrar a rota `/lp5` em `src/App.tsx` apontando para `src/pages/LP5.tsx`.
2. Verificar se `LP5.tsx` usa `buildCheckoutUrl` e links de checkout atualizados; corrigir se estiver desatualizado em relação ao resto do site.
3. Verificar se o popup promocional `WeekendPromoPopup` deve ser incluído na LP5 (já está nas demais páginas de venda).
4. Revisar o SEO/head da LP5 para canonical e título adequados.
5. Testar a rota `/lp5` no preview para confirmar renderização e responsividade mobile.

Arquivos afetados:
- `src/App.tsx` (adição da rota)
- `src/pages/LP5.tsx` (revisão de checkout/CTA/popup)
- `src/components/WeekendPromoPopup.tsx` (se houver ajuste de inclusão)
