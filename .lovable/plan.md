

# Plano: Mapa de Regioes e Visitantes Online em Tempo Real

## Visao Geral

Adicionar duas funcionalidades ao dashboard de analytics:
1. **Mapa de Regioes** - Mostra de onde vem os visitantes (pais, estado, cidade)
2. **Visitantes Online** - Contador em tempo real de pessoas navegando no site

---

## Arquitetura da Solucao

```text
+------------------+     +------------------+     +------------------+
|   Visitante      |     |   API de         |     |   Supabase       |
|   acessa site    | --> |   Geolocalizacao | --> |   (salva dados)  |
+------------------+     |   (ip-api.com)   |     +------------------+
                         +------------------+              |
                                                           v
                                               +-------------------+
                                               |   Dashboard       |
                                               |   - Mapa Regioes  |
                                               |   - Online Count  |
                                               +-------------------+
```

---

## Parte 1: Mapa de Regioes

### Alteracao no Banco de Dados

Adicionar novas colunas na tabela `page_views`:

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| country | text | Pais do visitante |
| country_code | text | Codigo do pais (BR, US, etc) |
| region | text | Estado/Regiao |
| city | text | Cidade |

### Alteracao no Hook useAnalytics

- Chamar API gratuita de geolocalizacao (ip-api.com - 45 req/min gratis)
- Obter pais, regiao e cidade automaticamente
- Salvar junto com o page_view

### Novo Componente: GeographyChart

- Grafico de barras mostrando visitantes por pais
- Grafico de pizza com distribuicao por regiao
- Tabela detalhada com cidade, regiao, pais e quantidade

---

## Parte 2: Visitantes Online em Tempo Real

### Conceito

Um visitante e considerado "online" se teve atividade nos ultimos 5 minutos.

### Nova Tabela: active_sessions

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | uuid | ID unico |
| session_id | text | ID da sessao |
| page_path | text | Pagina atual |
| last_seen | timestamp | Ultima atividade |
| country | text | Pais |
| city | text | Cidade |

### Alteracao no Hook useAnalytics

- Enviar "heartbeat" a cada 30 segundos enquanto usuario esta na pagina
- Atualiza o campo `last_seen` na tabela

### Novo Componente: OnlineVisitors

- Card com numero de visitantes online (atualizacao a cada 30s)
- Lista mostrando de onde estao (cidade/pais)
- Indicador visual pulsante mostrando atividade

---

## Alteracoes na Edge Function

Adicionar ao retorno da edge function `analytics-data`:

```text
- viewsByCountry: { "Brasil": 150, "Portugal": 25, ... }
- viewsByRegion: { "Sao Paulo": 80, "Rio": 40, ... }
- viewsByCity: { "Sao Paulo": 50, "Campinas": 15, ... }
- onlineNow: 12 (sessoes ativas nos ultimos 5 min)
- onlineDetails: [{ city: "Sao Paulo", country: "BR", page: "/" }, ...]
```

---

## Interface do Dashboard

### Novo Card: Visitantes Online

Posicao: Ao lado dos cards de metricas existentes

- Numero grande com icone pulsante verde
- Texto: "pessoas online agora"
- Atualiza automaticamente a cada 30 segundos

### Nova Aba: Geografia

Adicionar nova aba ao dashboard com:

1. **Mapa visual simplificado** (grafico de barras horizontal dos paises)
2. **Top 10 Paises** com bandeiras emoji
3. **Top 10 Cidades** 
4. **Distribuicao por Regiao** (grafico pizza)

---

## Arquivos a Modificar

1. `src/hooks/useAnalytics.ts` - Adicionar geolocalizacao e heartbeat
2. `supabase/functions/analytics-data/index.ts` - Retornar dados geograficos e online
3. `src/pages/Analytics.tsx` - Nova aba Geografia e card Online
4. **Novo**: `src/components/analytics/OnlineCounter.tsx`
5. **Novo**: `src/components/analytics/GeographyStats.tsx`

---

## Migracao do Banco de Dados

```sql
-- Adicionar colunas de geolocalizacao em page_views
ALTER TABLE page_views ADD COLUMN country text;
ALTER TABLE page_views ADD COLUMN country_code text;
ALTER TABLE page_views ADD COLUMN region text;
ALTER TABLE page_views ADD COLUMN city text;

-- Criar tabela de sessoes ativas
CREATE TABLE active_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  page_path text NOT NULL,
  last_seen timestamptz NOT NULL DEFAULT now(),
  country text,
  country_code text,
  city text
);

-- Habilitar RLS e criar policy
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous upsert" ON active_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- Index para performance
CREATE INDEX idx_active_sessions_last_seen ON active_sessions(last_seen);
```

---

## Fluxo de Funcionamento

### Ao Carregar a Pagina

1. Hook `useAnalytics` chama API ip-api.com
2. Obtem pais, regiao, cidade do visitante
3. Salva page_view com dados de localizacao
4. Cria/atualiza registro em active_sessions

### Enquanto Usuario Navega

1. A cada 30 segundos, envia heartbeat
2. Atualiza `last_seen` na tabela active_sessions

### No Dashboard

1. Card "Online Agora" mostra count de sessoes com last_seen < 5 min
2. Aba Geografia mostra graficos de distribuicao por pais/regiao/cidade

---

## Secao Tecnica

### API de Geolocalizacao

Usar ip-api.com (gratuita, 45 requests/minuto):

```javascript
const response = await fetch('http://ip-api.com/json/?fields=country,countryCode,regionName,city');
const geo = await response.json();
```

### Calculo de Visitantes Online

```sql
SELECT COUNT(DISTINCT session_id) 
FROM active_sessions 
WHERE last_seen > now() - interval '5 minutes';
```

### Atualizacao em Tempo Real

O dashboard usara polling a cada 30 segundos para atualizar o contador de visitantes online.

