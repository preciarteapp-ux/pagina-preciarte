

## Otimizações de conversão na LP3

### 1. Reordenar seções — Dor antes das funcionalidades

**Ordem atual:** Hero → WhatIs → Features → Audience → PainPoints → ...
**Nova ordem:** Hero → PainPoints → ImpactBlock → WhatIs → Features → HowItWorks (novo) → Audience → Stats → Testimonials → CTA intermediário → Comparison → Pricing → CTAFinal

Mover a dor para logo após o hero para que o visitante sinta o problema antes de ver a solução.

### 2. Criar componente "Como funciona em 3 passos" (`HowItWorksLP3.tsx`)

Nova seção entre Features e Audience com 3 passos visuais:
- **Passo 1**: Cadastre seus materiais e custos — Informe o que você usa e quanto paga. O sistema organiza tudo.
- **Passo 2**: Calcule o preço certo automaticamente — O PreciArte soma custos, tempo e margem. Sem fórmula, sem planilha.
- **Passo 3**: Envie orçamentos profissionais e venda mais — PDF com sua logo, pronto pra mandar no WhatsApp em 1 clique.

Icones numerados (1→2→3) com linha conectora visual. Animação de scroll.

### 3. Adicionar CTAs intermediários (3 novos botões)

Criar um componente reutilizável `CTABannerLP3.tsx` — faixa simples com texto curto + botão "Quero começar agora" apontando para `#pricing`.

Inserir após:
- **Após Testimonials** (seção 8)
- **Após Comparison** (seção 9)
- O Pricing já tem CTAs próprios

### 4. Âncora de valor no Pricing

Adicionar texto emocional abaixo do preço anual:
> "Menos que uma pizza por mês. E o sistema se paga quando você corrigir o preço da primeira venda."

### Arquivos

| Ação | Arquivo |
|------|---------|
| Criar | `src/components/lp3/HowItWorksLP3.tsx` |
| Criar | `src/components/lp3/CTABannerLP3.tsx` |
| Editar | `src/pages/LP3.tsx` — reordenar seções + inserir novos componentes |
| Editar | `src/components/lp3/PricingLP3.tsx` — adicionar âncora de valor |

