## Objetivo
Atualizar `src/components/lp3/PricingLP3.tsx` para seguir a mesma estrutura visual/conteúdo do print enviado, **mantendo o tema claro atual da LP3** (fundo branco, bordas bordeaux #8B1A4A, acento âmbar #E07B2A).

## Mudanças no card Anual
- Manter badge "Melhor Oferta" (estrela) no canto superior.
- Manter badge "48% OFF" abaixo do título.
- Manter preço riscado `R$ 478,80/ano`.
- Destaque grande: `12x R$ 14,48` + linha menor `ou R$ 139,90 à vista`.
- Substituir a linha verde atual ("Economize mais de R$ 230 por ano") por uma **caixa destacada verde claro** com ícone de cofrinho: **"Você economiza R$ 338,90 por ano"** (valor calculado: 12×39,90 − 139,90).
- Remover o texto itálico "Menos que uma pizza por mês…".
- Adicionar lista de 4 bullets (✓ verdes), substituindo a lista compartilhada que hoje fica embaixo:
  - Acesso completo a todos os recursos
  - Menos que uma pizza por mês
  - O sistema se paga na 1ª venda corrigida
  - Suporte prioritário incluso
- Botão CTA: "Assinar Anual agora" (mantendo link/checkout atuais).

## Mudanças no card Mensal
- Título "Mensal" + preço `R$ 39,90/mês`.
- Subtítulo: "Acesso completo, sem fidelidade".
- Lista compacta com 3 itens:
  - ✓ Acesso completo
  - ✓ Cancele quando quiser
  - — Sem desconto anual (traço cinza, item neutro)
- Botão "Assinar Mensal" (outline bordeaux, mantendo link).
- Abaixo do botão, **caixinha cinza** com texto: "No anual você paga **R$ 14,48/mês** — apenas 36% do preço mensal" (bordeaux no valor).

## Mudanças estruturais
- Remover o bloco "Nos dois planos, tudo incluso" com a lista grande de 12 features (ela fica redundante com os bullets dentro de cada card).
- Manter linha final "Garantia de 7 dias em todos os planos".
- Manter título da seção atual ("Simples assim. Sem pegadinha.").

## Detalhes técnicos
- Arquivo único: `src/components/lp3/PricingLP3.tsx`.
- Sem mudanças de cores globais — continuar usando os hex inline já existentes na LP3 (#8B1A4A, #E07B2A, #2C2C2C, #6B6B6B, verde #16a34a).
- Não alterar checkout, links nem `buildCheckoutUrl`.
- Não tocar em outras LPs nem na página Mãe.
