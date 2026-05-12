## Ajuste
Restaurar o bloco de funcionalidades que foi removido por engano da LP3. A reestruturação dos cards (Anual/Mensal no formato do print) fica como está.

## Mudança em `src/components/lp3/PricingLP3.tsx`
- Voltar a renderizar, **abaixo dos dois cards de preço**, o bloco original:
  - Título: "Nos dois planos, tudo incluso:"
  - Lista com os 12 itens (700 créditos de IA / 50 por mês, Dashboard completo, Calculadoras profissionais, Produtos ilimitados, Gestão de clientes, Orçamentos ilimitados, Gestão de materiais e estoque, Financeiro completo, Catálogo online, Assistente de IA, Suporte especializado, Atualizações constantes).
- Manter os cards Anual/Mensal exatamente como estão agora (preços, badges, caixinha verde de economia, bullets internos, caixinha cinza com "No anual você paga R$ 14,48/mês").
- Manter linha final "Garantia de 7 dias em todos os planos".
- Não alterar checkouts, cores ou outros componentes.
