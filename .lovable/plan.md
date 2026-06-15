# Adicionar UTMify Pixel e UTMs em todas as páginas

Como é SPA (React + Vite), basta inserir os 2 scripts uma vez no `index.html` dentro do `<head>` — eles passam a carregar em todas as rotas/páginas automaticamente.

## Mudança

**`index.html`** — no `<head>`, logo após o Microsoft Clarity e antes do fechamento, adicionar:

1. **UTMify Pixel** (`pixelId = 6a305052ddfaa08cbeb75ef0`) — script inline que injeta `cdn.utmify.com.br/scripts/pixel/pixel.js`.
2. **UTMify UTMs loader** — `cdn.utmify.com.br/scripts/utms/latest.js` com `data-utmify-prevent-xcod-sck` e `data-utmify-prevent-subids`, `async defer`.

Mantém-se: GTM (`GTM-M8DD3RTK`) e Microsoft Clarity (`ucbv9rkpfv`). Nada nas páginas individuais precisa mudar.
