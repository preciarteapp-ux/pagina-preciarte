## Objetivo
Colocar o plano Anual em primeiro lugar (antes do Mensal) nas páginas LP3 e LP4.

## Alterações

### 1. LP3 — `src/components/lp3/PricingLP3.tsx`
- Dentro do grid de 2 colunas (`grid-cols-1 md:grid-cols-2`), mover o card **Anual** (com "Melhor Oferta" e borda `#8B1A4A`) para antes do card **Mensal**.
- O card Mensal continua com o mesmo estilo outline (`borderColor: 'rgba(44,44,44,0.15)'`, botão outline `#8B1A4A`).
- Todo o conteúdo de cada card permanece idêntico.

### 2. LP4 — `src/pages/LP4.tsx`
- Dentro de `<div className="pricing-wrap">`, mover o card **Anual** (`.pc feat` com badge "Mais econômico", largura `360px`) para antes do card **Mensal** (`.pc`, largura `300px`).
- Todo o conteúdo de cada card permanece idêntico.

## Resultado esperado
Em ambas as páginas o visitante vê primeiro o plano Anual (destacado como melhor oferta / mais econômico) e depois o plano Mensal como alternativa.