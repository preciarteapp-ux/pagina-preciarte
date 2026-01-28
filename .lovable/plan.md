
# Plano: Analytics Completo - Todas as Funcionalidades

## Visao Geral

Implementar todas as funcionalidades necessarias para um sistema de analytics profissional e completo:

1. **Taxa de Rejeicao (Bounce Rate)** - Visitantes que saem sem interagir
2. **Scroll Depth Tracking** - Profundidade de rolagem (25%, 50%, 75%, 100%)
3. **Correcao da API de Geolocalizacao** - Usar HTTPS em vez de HTTP
4. **Melhoria do Mapa de Calor** - Visualizacao mais profissional com gradientes suaves

---

## Arquitetura da Solucao

```text
+------------------+     +------------------+     +------------------+
|   Visitante      |     |   useAnalytics   |     |   Supabase       |
|   navega site    | --> |   Hook           | --> |   Database       |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        |  scroll_depth          |  bounce tracking       |
        |  (25%, 50%, etc)       |  geo via HTTPS         |
        +------------------------+------------------------+
                                                          v
                                              +-------------------+
                                              |   Dashboard       |
                                              |   - Bounce Rate   |
                                              |   - Scroll Depth  |
                                              |   - Heatmap Pro   |
                                              +-------------------+
```

---

## Parte 1: Taxa de Rejeicao (Bounce Rate)

### Conceito

Um "bounce" ocorre quando um visitante:
- Ve apenas 1 pagina
- Fica menos de 10 segundos
- Nao clica em nenhum botao

### Alteracao no Banco de Dados

Adicionar coluna na tabela `page_views`:

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| is_bounce | boolean | Se foi um bounce |
| interaction_count | integer | Quantidade de interacoes |

### Logica no Hook

1. Rastrear quantidade de cliques durante a sessao
2. No `beforeunload`, marcar como bounce se:
   - Tempo < 10 segundos E nenhuma interacao

### Dashboard

- Card com "Taxa de Rejeicao" em porcentagem
- Grafico comparando bounce rate por pagina
- Cor verde (baixo) a vermelho (alto)

---

## Parte 2: Scroll Depth Tracking

### Conceito

Rastrear ate onde o usuario rolou a pagina:
- 25% (topo)
- 50% (metade)
- 75% (quase fim)
- 100% (fim da pagina)

### Alteracao no Banco de Dados

Nova coluna em `page_views`:

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| max_scroll_depth | integer | Profundidade maxima (0-100) |

### Logica no Hook

1. Listener no evento `scroll`
2. Calcular `(scrollTop + viewportHeight) / pageHeight * 100`
3. Salvar apenas o valor maximo atingido
4. Atualizar no banco ao sair da pagina

### Dashboard

- Grafico de barras mostrando % de usuarios que chegaram a cada nivel
- Funil visual: 25% -> 50% -> 75% -> 100%
- Card com "Scroll Medio" em porcentagem

---

## Parte 3: Correcao da API de Geolocalizacao

### Problema Atual

A API `ip-api.com` esta sendo chamada via HTTP, causando warnings de mixed content em navegadores.

### Solucao

Usar servico HTTPS gratuito: `https://ipapi.co/json/` ou criar edge function que faz a chamada.

### Alteracao

```text
Antes:  http://ip-api.com/json/
Depois: https://ipapi.co/json/
```

---

## Parte 4: Melhoria do Mapa de Calor

### Problema Atual

O mapa de calor usa grid simples com celulas coloridas - funcional mas nao profissional.

### Melhorias

1. **Aumentar resolucao** - De 20x20 para 40x40 celulas
2. **Gradiente mais suave** - Transicoes de cor mais naturais
3. **Blur effect** - Efeito de desfoque para parecer mais com "calor"
4. **Canvas rendering** - Usar canvas para melhor performance

---

## Migracao do Banco de Dados

```sql
-- Adicionar colunas para bounce e scroll
ALTER TABLE page_views ADD COLUMN is_bounce boolean DEFAULT true;
ALTER TABLE page_views ADD COLUMN interaction_count integer DEFAULT 0;
ALTER TABLE page_views ADD COLUMN max_scroll_depth integer DEFAULT 0;
```

---

## Alteracoes nos Arquivos

### 1. src/hooks/useAnalytics.ts

Adicionar:
- `trackScroll()` - Listener de scroll com debounce
- `interactionCount` ref - Contador de interacoes
- Atualizar `fetchGeoData()` para usar HTTPS
- Logica de bounce no `beforeunload`

### 2. supabase/functions/analytics-data/index.ts

Adicionar ao retorno:
- `bounceRate` - Porcentagem de bounces
- `bounceRateByPage` - Bounce rate por pagina
- `avgScrollDepth` - Scroll medio
- `scrollDepthByPage` - Scroll por pagina
- `scrollFunnel` - Quantos chegaram a 25%, 50%, 75%, 100%

### 3. src/pages/Analytics.tsx

Adicionar:
- Card "Taxa de Rejeicao"
- Card "Scroll Medio"
- Nova aba "Engajamento" com graficos detalhados

### 4. src/components/analytics/HeatmapOverlay.tsx

Melhorar:
- Aumentar resolucao do grid
- Adicionar efeito de blur CSS
- Transicoes de cor mais suaves

### 5. Novos Componentes

- `src/components/analytics/EngagementStats.tsx` - Bounce rate e scroll depth
- `src/components/analytics/ScrollFunnel.tsx` - Funil de scroll

---

## Interface do Dashboard Atualizada

### Novos Cards (grid de metricas)

```text
+------------------+------------------+------------------+
|   Bounce Rate    |   Scroll Medio   |   Engajamento   |
|   32.5%          |   68%            |   Alto          |
|   (taxa rejeicao)|   (profundidade) |   (score)       |
+------------------+------------------+------------------+
```

### Nova Aba: Engajamento

- **Funil de Scroll**: Barra horizontal mostrando drop-off
  - 100% viram o topo
  - 85% chegaram a 25%
  - 62% chegaram a 50%
  - 38% chegaram a 75%
  - 22% chegaram ao final

- **Bounce Rate por Pagina**: Comparativo

---

## Secao Tecnica

### Tracking de Scroll

```javascript
const trackScroll = useCallback(() => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  
  const scrollPercent = Math.round(
    ((scrollTop + viewportHeight) / pageHeight) * 100
  );
  
  // Salvar apenas se maior que o anterior
  if (scrollPercent > maxScrollDepth.current) {
    maxScrollDepth.current = Math.min(scrollPercent, 100);
  }
}, []);
```

### Calculo de Bounce Rate

```javascript
// No beforeunload
const isBounce = 
  timeOnPage < 10 && 
  interactionCount.current === 0;
```

### API de Geolocalizacao HTTPS

```javascript
const fetchGeoData = async (): Promise<GeoData> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      country: data.country_name || null,
      countryCode: data.country_code || null,
      regionName: data.region || null,
      city: data.city || null,
    };
  } catch (error) {
    return { country: null, countryCode: null, regionName: null, city: null };
  }
};
```

### Mapa de Calor Melhorado

```css
.heatmap-cell {
  filter: blur(2px);
  transition: background-color 0.3s ease;
}
```

---

## Fluxo Completo de Tracking

1. Usuario acessa pagina
2. Hook detecta device, busca geo via HTTPS
3. Cria page_view com `is_bounce: true` (default)
4. Inicia listeners de scroll e cliques
5. A cada interacao, incrementa `interaction_count`
6. A cada scroll, atualiza `max_scroll_depth` (local)
7. Heartbeat atualiza dados periodicamente
8. Ao sair (beforeunload):
   - Atualiza `max_scroll_depth` no banco
   - Atualiza `interaction_count` no banco
   - Define `is_bounce` baseado nos criterios
   - Salva `time_on_page`

---

## Resumo das Alteracoes

| Arquivo | Alteracao |
|---------|-----------|
| Migracao SQL | 3 novas colunas em page_views |
| useAnalytics.ts | Scroll, bounce, HTTPS geo |
| analytics-data/index.ts | Novos calculos e retornos |
| Analytics.tsx | 2 novos cards, 1 nova aba |
| HeatmapOverlay.tsx | Melhoria visual |
| EngagementStats.tsx | Novo componente |
| ScrollFunnel.tsx | Novo componente |

---

## Exemplo Visual Final

```text
Dashboard Atualizado:
+--------+--------+--------+--------+--------+--------+
| Visitas| Hoje   | Cliques| Tempo  | Bounce | Scroll |
| 1,234  | 56     | 320    | 2m 15s | 32%    | 68%    |
+--------+--------+--------+--------+--------+--------+

Aba Engajamento:
[Funil de Scroll]
100% ██████████████████████████████ Topo
 85% █████████████████████████░░░░░ 25%
 62% ██████████████████░░░░░░░░░░░░ 50%
 38% ███████████░░░░░░░░░░░░░░░░░░░ 75%
 22% ██████░░░░░░░░░░░░░░░░░░░░░░░░ 100%
```
