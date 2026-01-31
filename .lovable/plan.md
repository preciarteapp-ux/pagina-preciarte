
# Plano: Personalizar Texto dos Botoes de Checkout

## Objetivo

Alterar o texto do botao de cada plano para incluir o nome do plano, melhorando o rastreamento no Analytics.

## Alteracao

| Plano | Texto Atual | Novo Texto |
|-------|-------------|------------|
| Mensal | Assinar Agora | Assinar Mensal |
| Semestral | Assinar Agora | Assinar Semestral |
| Anual | Assinar Agora | Assinar Anual |

## Arquivo a Modificar

**Arquivo:** `src/components/PricingLP1.tsx`

### Mudanca na Linha 177

```text
ANTES:
Assinar Agora

DEPOIS:
Assinar {plan.name}
```

O texto do botao usara dinamicamente o nome do plano que ja existe no objeto (`plan.name`), resultando em:
- "Assinar Mensal"
- "Assinar Semestral"  
- "Assinar Anual"

## Beneficio para Analytics

O sistema de tracking ja captura o `data-track-id` com o nome do plano (`checkout-lp1-mensal`, `checkout-lp1-semestral`, `checkout-lp1-anual`), mas agora o texto visivel do botao tambem tera essa distincao, facilitando a analise visual dos cliques no dashboard.
