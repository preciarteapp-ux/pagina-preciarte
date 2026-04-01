

## Remover plano Semestral e atualizar plano Anual

### Alteracoes em 3 arquivos

**1. `src/components/Pricing.tsx`**
- Remover o objeto do plano Semestral (linhas 27-50)
- No plano Anual: alterar price para "R$ 123,95", adicionar campo `installment: "12x R$ 12,44"`, marcar como `popular: true`
- Ajustar grid de `lg:grid-cols-3` para `md:grid-cols-2` (2 planos lado a lado)
- Exibir parcela acima do preco a vista: "12x R$ 12,44 ou" seguido do preco a vista

**2. `src/components/PricingLP1.tsx`**
- Remover o plano Semestral do array (linhas 9-33)
- Atualizar plano Anual: price normal = "R$ 123,95", com desconto = manter logica existente, adicionar installment "12x R$ 12,44"
- Ajustar grid para 2 colunas
- Exibir parcela no card

**3. `src/components/PricingLP2.tsx`**
- Mesmo tratamento: remover Semestral, atualizar Anual com parcela e preco a vista
- Ajustar grid para 2 colunas

### Layout do preco no card Anual
```text
        48% OFF
   ——R$ 478,80——  (riscado)
   12x R$ 12,44
        ou
   R$ 123,95 à vista
```

