## Remover script da Utmify

Remover o bloco da Utmify do `index.html` (head):

```html
<!-- Utmify Script -->
<script
  src="https://cdn.utmify.com.br/scripts/utms/latest.js"
  data-utmify-prevent-xcod-sck
  data-utmify-prevent-subids
  async
  defer
></script>
```

Também atualizar a memória `mem://analytics/pixel-implementation-per-page` e o índice para refletir que a Utmify não está mais ativa no projeto.

Demais pixels (Meta, TikTok, Clarity, GTM) permanecem inalterados.