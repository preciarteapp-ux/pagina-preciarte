

# Plano: Ajustar Descontos na LP1

## Alteracoes Solicitadas

| Plano | Situacao Atual (com desconto) | Nova Configuracao |
|-------|-------------------------------|-------------------|
| Mensal | R$ 31,92 (20% OFF) | R$ 39,90 (SEM desconto) |
| Semestral | R$ 118,34 (50% OFF) | 34% OFF sobre R$ 147,90 |
| Anual | R$ 198,32 (60% OFF) | 50% OFF sobre R$ 247,90 |

## Calculos dos Novos Precos

### Semestral (34% OFF)
- Preco original: R$ 147,90
- Desconto: 34%
- Novo preco: R$ 147,90 x 0.66 = **R$ 97,61**

### Anual (50% OFF)
- Preco original: R$ 247,90
- Desconto: 50%
- Novo preco: R$ 247,90 x 0.50 = **R$ 123,95**

---

## Arquivo a Modificar

`src/components/PricingLP1.tsx`

### Plano Mensal (linhas 9-32)
```javascript
// Remover desconto - manter sempre R$ 39,90
{
  name: "Mensal",
  price: "R$ 39,90",  // Sempre o mesmo
  period: "/mês",
  originalPrice: undefined,  // Sem preco riscado
  description: "Acesso completo com flexibilidade mensal",
  // ... features
  discountBadge: null  // Sem badge de desconto
}
```

### Plano Semestral (linhas 33-57)
```javascript
{
  name: "Semestral",
  price: discountApplied ? "R$ 97,61" : "R$ 147,90",
  period: "/semestre",
  originalPrice: discountApplied ? "R$ 147,90" : "R$ 239,40",
  discount: discountApplied ? "34% OFF" : "38% OFF",
  description: discountApplied ? "Desconto especial aplicado!" : "Economize mais de R$ 90 no semestre",
  // ... features
  discountBadge: discountApplied ? "34% OFF" : null
}
```

### Plano Anual (linhas 58-82)
```javascript
{
  name: "Anual",
  price: discountApplied ? "R$ 123,95" : "R$ 247,90",
  period: "/ano",
  originalPrice: discountApplied ? "R$ 247,90" : "R$ 478,80",
  discount: discountApplied ? "50% OFF" : "48% OFF",
  description: discountApplied ? "Maior desconto disponível!" : "Economize mais de R$ 230 por ano",
  // ... features
  discountBadge: discountApplied ? "50% OFF" : null
}
```

---

## Resumo Visual das Mudancas

| Plano | Antes do Popup | Depois do Popup (Novo) |
|-------|----------------|------------------------|
| Mensal | R$ 39,90 | R$ 39,90 (sem mudanca) |
| Semestral | R$ 147,90 | R$ 97,61 (34% OFF) |
| Anual | R$ 247,90 | R$ 123,95 (50% OFF) |

---

## Observacao Importante

Os badges de desconto serao atualizados para mostrar:
- **Mensal**: Nenhum badge
- **Semestral**: Badge "34% OFF" 
- **Anual**: Badge "50% OFF"

