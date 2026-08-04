Inverter o destaque de preço do plano anual na LP7

## O que vamos fazer

Ajustar o card do **Plano Anual** na LP7 para destacar o valor parcelado em vez do valor total, conforme solicitado:

- **Destaque principal (grande):** `R$ 20,98/mês`
- **Subtexto (pequeno):** `ou R$ 197,00 no plano anual`

## Onde aplicar

```text
src/components/lp7/PrecosLP7.tsx
```

## Alteração técnica

No card do Plano Anual, inverter a ordem e os valores exibidos:

- Linha 51: substituir `R$ 197,00` por `R$ 20,98/mês`
- Linha 52: substituir `por ano, ou 12x de R$ 20,98` por `ou R$ 197,00 no plano anual`

Nenhum link de checkout, layout, cores ou outros componentes serão alterados.
