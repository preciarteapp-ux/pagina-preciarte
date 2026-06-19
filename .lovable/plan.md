## Objetivo

Garantir que o parâmetro `sck` seja sempre enviado para checkouts da Hotmart como a junção de todas as UTMs capturadas, sem alterar nada das demais UTMs (que continuam sendo propagadas exatamente como hoje).

## Situação atual (`src/lib/checkout.ts`)

Hoje o `buildHotmartSck` já existe e monta:

```
sck = utm_source|utm_medium|utm_campaign|utm_content|utm_term
```

Porém ele só é aplicado quando **não existe** `sck` nem na URL base do checkout nem nas UTMs capturadas. Se vier um `sck` qualquer pela URL, o composto não é montado.

## Mudança proposta

Apenas **1 ajuste cirúrgico**, em `src/lib/checkout.ts`, dentro de `buildCheckoutUrl`:

- Para domínios `hotmart.com`, sempre montar o `sck` composto a partir das UTMs e **sobrescrever** o `sck` na URL final, se houver pelo menos uma UTM presente.
- Se não houver nenhuma UTM (todas vazias), mantém o comportamento atual (não força `sck` vazio; preserva o `sck` que já vier na URL base, se houver).
- Nada muda para checkouts não-Hotmart (Kirvano etc.).
- Nada muda na propagação das demais UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `xcod`, `src`, `gclid`, `fbclid`) — continuam sendo adicionadas como já são hoje.

### Formato do `sck` enviado

```
sck = utm_source|utm_medium|utm_campaign|utm_content|utm_term
```

Campos ausentes ficam vazios entre os pipes, para preservar o parsing no painel da Hotmart (ex.: `google|cpc|black-friday||criativo-01`).

## Arquivos afetados

- `src/lib/checkout.ts` — ajuste apenas no bloco que decide quando montar o `sck` na Hotmart.

Nenhuma página, componente, pixel, GTM ou Clarity é tocado.