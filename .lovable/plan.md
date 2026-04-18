

## Adicionar parâmetro `sck` no formato Hotmart

### Diagnóstico
A Hotmart usa o `sck` como o "código de rastreio" principal no painel, no formato:
```
sck=utm_source|utm_medium|utm_campaign|utm_content|utm_term
```
Hoje o `buildCheckoutUrl` só passa as UTMs individuais — não está montando esse `sck` composto que a Hotmart exige para aparecer no dashboard de vendas.

Além disso, os botões usam `window.open()` em JS, então o script que você enviou (que altera `<a href>`) não funcionaria nesse projeto React. A solução correta é gerar o `sck` dentro do próprio `buildCheckoutUrl`.

### Mudança proposta

**Arquivo:** `src/lib/checkout.ts`

Atualizar `buildCheckoutUrl(baseUrl)` para:

1. Detectar se a URL é da Hotmart (`pay.hotmart.com`).
2. Se for Hotmart **e** o `sck` ainda não estiver setado na URL base nem vier nas UTMs capturadas, montar automaticamente:
   ```
   sck = utm_source | utm_medium | utm_campaign | utm_content | utm_term
   ```
   Usando os valores capturados da URL/sessionStorage. Campos vazios viram string vazia (mantém o formato com pipes para a Hotmart parsear corretamente).
3. Continuar mesclando as UTMs individuais como já faz hoje.
4. Se o usuário já tiver chegado com um `sck` próprio na URL, esse valor tem prioridade (não sobrescreve).

Exemplo do resultado para Hotmart com `?utm_source=facebook&utm_medium=cpc&utm_campaign=anual_promo`:
```
https://pay.hotmart.com/X105144057Q?off=moc4qfni&sck=facebook|cpc|anual_promo||&utm_source=facebook&utm_medium=cpc&utm_campaign=anual_promo
```

Para OnProfit, mantém o comportamento atual (só UTMs individuais, sem montar `sck`).

### Escopo
Apenas `src/lib/checkout.ts` precisa ser alterado. Todos os componentes que já usam `buildCheckoutUrl` (Pricing, PricingLP1, PricingLP2, PricingLP3) passam a se beneficiar automaticamente.

### Observação
Não vou usar o snippet `<script>` que você enviou porque ele:
- Depende do GTM (`{{utm_source}}`) que não está no projeto.
- Atua só em `<a href>`, mas os botões aqui disparam `window.open()` em JS.

A lógica equivalente (e mais robusta) será implementada direto no utilitário React.

