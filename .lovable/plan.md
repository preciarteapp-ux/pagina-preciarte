# Reincluir plano Mensal na LP3 e LP4

Voltar o plano **Mensal** nas páginas LP3 e LP4 ao lado do plano Anual, usando exatamente as mesmas informações já usadas nas outras LPs (Pricing.tsx / PricingLP1 / PricingLP2).

## Dados do plano Mensal (idênticos ao usado antes)

- Nome: **Mensal**
- Preço: **R$ 39,90 / mês**
- Descrição: "Acesso completo com flexibilidade mensal"
- Link checkout: `https://pay.hotmart.com/X105144057Q` (Hotmart, o mesmo de antes)
- Features: 50 créditos de IA por mês, Dashboard completo, Calculadoras profissionais, Produtos ilimitados, Gestão de clientes, Orçamentos ilimitados, Gestão de materiais e estoque, Financeiro completo, Catálogo online, Assistente de IA, Suporte especializado, Atualizações constantes
- Sem badge "Melhor Oferta" (esse continua só no Anual)

## Mudanças

### 1) `src/components/lp3/PricingLP3.tsx`
- Alterar o grid de 1 coluna para 2 colunas em desktop (`md:grid-cols-2`) mantendo `max-w-4xl`.
- Adicionar um card "Mensal" ao lado do card Anual, no mesmo estilo visual da LP3 (borda neutra, sem o selo "Melhor Oferta", sem o bloco verde de economia, sem riscado), com:
  - Preço destacado `R$ 39,90` + `/mês`
  - Os bullets de features (versão resumida no estilo do card Anual atual)
  - Botão "Assinar Mensal" com `href={buildCheckoutUrl("https://pay.hotmart.com/X105144057Q")}`, estilo secundário (outline na cor `#8B1A4A`) para manter destaque visual no Anual
  - `data-track-id="checkout-mensal"` `data-track-type="checkout"`

### 2) `src/pages/LP4.tsx`
- Dentro de `<div className="pricing-wrap">` (linha 1099), adicionar **antes** do card `.pc.feat` (Anual) um novo card `<div className="pc" style={{ width: '300px' }}>` com:
  - `<p className="pc-name">Plano Mensal</p>`
  - `<p className="pc-price"><sup>R$</sup>39<span style={{ fontSize:'28px' }}>,90</span><span ...>/mês</span></p>`
  - `<p className="pc-per">Cancele quando quiser</p>`
  - Lista `pc-features` com as 12 features do plano mensal
  - Botão `<a className="pc-btn ghost" href="https://pay.hotmart.com/X105144057Q" target="_blank" rel="noopener noreferrer" data-track-id="checkout-mensal" data-track-type="checkout" onClick={fbq InitiateCheckout value 39.90}>Assinar mensal →</a>`
- O card Anual `.pc.feat` permanece igual (continua sendo o destaque "Mais econômico").

## Fora do escopo
- Sem alterar preços, valores das outras LPs, copy do Anual ou links já atualizados do Lastlink.
