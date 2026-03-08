

## Mover "Melhor Oferta" do Mensal para o Anual

Alteracao simples no arquivo `src/components/PricingLP1.tsx`:

- **Plano Mensal**: mudar `popular: true` para `popular: false`
- **Plano Anual**: mudar `popular: false` para `popular: true`

Isso move o badge "Melhor Oferta" e o destaque visual (borda, sombra, escala) para o plano Anual.

