Verdade — de R$ 478,80 por R$ 119,90 dá **75% OFF**, não 48%.

**Mudança em `src/components/lp3/PricingLP3.tsx`:**
- Badge do card Anual: `48% OFF` → `75% OFF`
- Caixinha verde "Você economiza R$ 338,90 por ano" → `Você economiza R$ 358,90 por ano` (478,80 − 119,90)
- Caixinha cinza do Mensal: "apenas 36% do preço mensal" → `apenas 25% do preço mensal` (12,05 / 39,90 ≈ 30%, na verdade ~30%; melhor: `apenas 30% do preço mensal`)

**Pergunta:** atualizo só na LP3 ou também nas outras páginas (Index, LP1, LP2, Quiz) que ainda mostram "48% OFF"?
