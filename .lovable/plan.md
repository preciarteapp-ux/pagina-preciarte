

# Plano: Atualizar Popup de Desconto

## Situacao Atual

O popup atualmente mostra:
- "Voce acaba de ganhar"
- **20% OFF**
- "em qualquer um dos nossos planos!"

## Nova Mensagem

Atualizar para refletir os novos descontos:
- **Ate 50% OFF** (destaque principal)
- Explicar que o desconto varia por plano (34% semestral, 50% anual)

---

## Alteracoes no Arquivo

**Arquivo:** `src/components/DiscountPopup.tsx`

### Mudancas na Linha 53-58

```text
ANTES:
<div className="...">20% OFF</div>
<p>em qualquer um dos nossos planos!</p>

DEPOIS:
<div className="...">ATÉ 50% OFF</div>
<p>34% no Semestral e 50% no Anual!</p>
```

---

## Preview da Nova Mensagem

O popup ficara assim:

```
🎁

✨ Parabéns! ✨

Você acaba de ganhar

[ ATÉ 50% OFF ]

34% no Semestral e 50% no Anual!

[Resgatar Meu Desconto]
```

