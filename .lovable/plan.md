## Atualizar preço do plano Anual em todas as páginas

Trocar **somente** os valores do plano anual (à vista e parcelado) em todos os componentes de pricing e textos relacionados. Nada mais é alterado: features, descontos, badges, links de checkout, plano mensal, layouts — tudo permanece igual.

### Novos valores
- À vista: **R$ 139,90**
- Parcelado: **12x R$ 14,48** (substitui o atual "R$ 12,44/mês")

### Arquivos a editar

1. **`src/components/Pricing.tsx`**
   - `price: "R$ 123,95"` → `"R$ 139,90"`
   - `installment: "R$ 12,44/mês"` → `"12x R$ 14,48"`

2. **`src/components/PricingLP1.tsx`**
   - `price` → `"R$ 139,90"` (ambas as variantes do ternário)
   - `installment` → `"12x R$ 14,48"`

3. **`src/components/PricingLP2.tsx`**
   - `price` → `"R$ 139,90"` (ambas as variantes do ternário)
   - `installment` → `"12x R$ 14,48"`

4. **`src/components/lp3/PricingLP3.tsx`**
   - Bloco de preço: `R$ 12,44/mês` → `12x R$ 14,48`
   - `ou R$ 123,95 à vista` → `ou R$ 139,90 à vista`

5. **`src/components/quiz/QuizResult.tsx`**
   - `R$ 12,44` (linha ~260) → `12x R$ 14,48`
   - `Plano Anual · R$ 123,95 à vista` → `Plano Anual · R$ 139,90 à vista`

6. **`src/lib/quizCalculator.ts`**
   - Duas menções a `R$ 12,44/mês` (linhas 156 e 160) → `12x R$ 14,48`

### O que NÃO muda
- Preço do plano Mensal (R$ 39,90)
- Preço riscado original (R$ 478,80) e badge "48% OFF"
- Links de checkout (Hotmart, OnProfit)
- Features, layouts, cores, tracking, social proof, popups de desconto
- Lógica do `discountApplied` — só os strings de preço do anual mudam
