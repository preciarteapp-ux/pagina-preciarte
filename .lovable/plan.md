
# Plano: Dashboard de Analytics Completo com Login

## Visao Geral
Criar um sistema de analytics completo que rastreia todas as interacoes dos usuarios, com uma pagina protegida por senha para visualizar os dados.

---

## Requisitos Previos

**Conexao com Lovable Cloud/Supabase**
O projeto precisa estar conectado ao Lovable Cloud (Supabase) para armazenar os dados de analytics. Ao aprovar este plano, farei a conexao automaticamente.

---

## Arquitetura do Sistema

```text
+-------------------+     +------------------+     +-------------------+
|   Paginas do      |     |   Sistema de     |     |   Banco de Dados  |
|   Site (/, /lp1)  | --> |   Tracking       | --> |   Supabase        |
+-------------------+     +------------------+     +-------------------+
                                                           |
                                                           v
                                               +-------------------+
                                               |   Dashboard       |
                                               |   /analytics      |
                                               |   (com login)     |
                                               +-------------------+
```

---

## Estrutura do Banco de Dados

### Tabela: `page_views`
Armazena cada visita de pagina.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | uuid | Identificador unico |
| page_url | text | URL da pagina visitada |
| page_path | text | Caminho (/, /lp1) |
| referrer | text | De onde o usuario veio |
| user_agent | text | Navegador/dispositivo |
| session_id | text | ID unico da sessao |
| utm_source | text | Parametro UTM |
| utm_medium | text | Parametro UTM |
| utm_campaign | text | Parametro UTM |
| created_at | timestamp | Data/hora da visita |

### Tabela: `button_clicks`
Armazena cada clique em botao.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | uuid | Identificador unico |
| button_id | text | ID do botao |
| button_text | text | Texto do botao |
| button_type | text | Tipo (CTA, checkout, etc) |
| page_path | text | Pagina onde foi clicado |
| session_id | text | ID da sessao |
| click_x | integer | Posicao X do clique |
| click_y | integer | Posicao Y do clique |
| viewport_width | integer | Largura da tela |
| viewport_height | integer | Altura da tela |
| created_at | timestamp | Data/hora do clique |

### Tabela: `mouse_movements`
Armazena movimentos do mouse para heatmap.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | uuid | Identificador unico |
| page_path | text | Pagina |
| x_position | integer | Posicao X |
| y_position | integer | Posicao Y |
| session_id | text | ID da sessao |
| created_at | timestamp | Data/hora |

---

## Novos Arquivos

### 1. Sistema de Tracking

**`src/hooks/useAnalytics.ts`**
Hook que captura automaticamente:
- Visitas de pagina (pageviews)
- Cliques em qualquer botao
- Movimentos do mouse (amostrados)
- Parametros UTM
- Informacoes da sessao

### 2. Pagina de Login

**`src/pages/AnalyticsLogin.tsx`**
- Campo de senha
- Validacao com a senha "Dhsc9205@"
- Redireciona para o dashboard apos login
- Sessao armazenada no sessionStorage

### 3. Dashboard de Analytics

**`src/pages/Analytics.tsx`**
Dashboard completo com:

**Metricas Principais (Cards)**
- Total de visitas
- Visitas hoje
- Total de cliques
- Taxa de cliques (CTR)

**Graficos**
- Visitas por dia (ultimos 30 dias)
- Cliques por botao (ranking)
- Distribuicao por pagina (pizza)
- Horarios de maior acesso

**Tabelas**
- Botoes mais clicados (com quantidade)
- Ultimas visitas
- Origem do trafego (UTM)

**Mapa de Calor**
- Visualizacao de onde os usuarios mais clicam
- Separado por pagina (/ e /lp1)

**Filtros**
- Por periodo (hoje, 7 dias, 30 dias, personalizado)
- Por pagina (/, /lp1)

---

## Integracao nos Componentes Existentes

### Modificar `src/pages/Index.tsx`
- Adicionar hook `useAnalytics()` para tracking

### Modificar `src/pages/LP1.tsx`
- Adicionar hook `useAnalytics()` para tracking

### Modificar `src/components/Hero.tsx`
- Adicionar data-attributes nos botoes para tracking

### Modificar `src/components/Pricing.tsx` e `PricingLP1.tsx`
- Adicionar tracking nos botoes de checkout

### Modificar `src/components/CTA.tsx`
- Adicionar tracking no botao CTA

### Modificar `src/components/WhatsAppButton.tsx`
- Adicionar tracking no botao do WhatsApp

### Atualizar `src/App.tsx`
- Adicionar rotas /analytics-login e /analytics

---

## Fluxo do Usuario

```text
1. Usuario acessa /analytics-login
2. Digita a senha "Dhsc9205@"
3. Sistema valida e redireciona para /analytics
4. Dashboard carrega dados do Supabase
5. Usuario visualiza todas as metricas
```

---

## Seguranca

- Senha armazenada apenas no codigo (nao no banco)
- Sessao de login expira ao fechar navegador
- RLS no Supabase permite apenas INSERT para tracking
- SELECT apenas via funcao server-side

---

## Secao Tecnica

### Tecnologias Utilizadas
- **Recharts**: Para graficos (ja instalado)
- **Supabase**: Banco de dados e autenticacao
- **React Query**: Cache e sincronizacao de dados
- **Tailwind + shadcn/ui**: Interface do dashboard

### Otimizacoes
- Mouse movements sao amostrados (1 a cada 500ms) para nao sobrecarregar
- Batch insert para cliques e movimentos
- Indexes nas colunas page_path e created_at

### Politicas RLS
- `page_views`: INSERT permitido para todos (anon)
- `button_clicks`: INSERT permitido para todos (anon)
- `mouse_movements`: INSERT permitido para todos (anon)
- SELECT: Apenas via edge function autenticada
