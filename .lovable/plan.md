

# Plano: Banner de Desconto Automatico no Topo

## O que muda

Substituir o popup/modal por um **banner fixo no topo** que aparece apos 3 segundos ja com o desconto aplicado automaticamente -- sem botao, sem interacao necessaria.

## Comportamento

1. Apos 3 segundos, o banner aparece no topo com a mensagem **"Cupom de desconto aplicado!"**
2. O desconto e aplicado automaticamente no momento em que o banner aparece (chama `onClaimDiscount` sozinho)
3. A pagina rola automaticamente ate a secao de precos
4. O banner fica visivel com um botao X para fechar se o usuario quiser

## Alteracoes tecnicas

### `src/components/DiscountPopup.tsx`
- Remover todo o Dialog/modal
- Criar banner fixo no topo (`fixed top-0 z-50 w-full`) com animacao slide-down
- No `useEffect`, apos 3 segundos: mostrar o banner E chamar `onClaimDiscount()` automaticamente
- Texto do banner: icone de check + "Cupom de desconto aplicado! Ate 50% OFF nos planos"
- Botao X para fechar o banner
- Sem nenhum botao de "resgatar"

### `src/pages/Index.tsx` e `src/pages/LP1.tsx`
- Adicionar padding-top no `<main>` quando o banner estiver visivel para evitar sobreposicao de conteudo

