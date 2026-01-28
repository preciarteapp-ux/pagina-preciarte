

# Plano: Tempo Medio na Pagina e Dispositivos

## Visao Geral

Adicionar duas novas metricas ao dashboard de analytics:
1. **Tempo Medio na Pagina** - Quanto tempo os visitantes ficam em cada pagina
2. **Dispositivo** - Separar visitantes por Mobile, Desktop e Tablet

---

## Arquitetura da Solucao

```text
+------------------+     +------------------+     +------------------+
|   Usuario        |     |   Hook           |     |   Banco de       |
|   acessa pagina  | --> |   useAnalytics   | --> |   Dados          |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        |  (ao sair da pagina)   |  - device_type         |
        +------------------------+  - time_on_page        |
                                                          v
                                              +-------------------+
                                              |   Dashboard       |
                                              |   - Avg Time      |
                                              |   - Device Stats  |
                                              +-------------------+
```

---

## Parte 1: Tempo Medio na Pagina

### Conceito

O tempo na pagina sera calculado como a diferenca entre o momento que o usuario entrou na pagina e o momento que ele saiu (ou fechou a aba).

### Alteracao no Banco de Dados

Adicionar nova coluna na tabela `page_views`:

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| time_on_page | integer | Tempo em segundos na pagina |

### Alteracao no Hook useAnalytics

1. Registrar o timestamp de entrada na pagina
2. Ao sair da pagina (beforeunload ou mudanca de rota), calcular a duracao
3. Atualizar o registro da page_view com o tempo calculado

### Dashboard

- Card com "Tempo Medio" no painel principal
- Grafico mostrando tempo medio por pagina
- Formato legivel: "2m 30s"

---

## Parte 2: Dispositivo

### Conceito

Usar o user_agent que ja e coletado para detectar o tipo de dispositivo.

### Alteracao no Banco de Dados

Adicionar nova coluna na tabela `page_views`:

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| device_type | text | mobile, desktop ou tablet |

### Logica de Deteccao

Analisar o user_agent no momento do tracking:
- **Mobile**: contem "Mobile", "Android" (sem tablet), "iPhone"
- **Tablet**: contem "iPad", "Tablet", "Android" + "Tab"
- **Desktop**: todos os outros casos

### Dashboard

- Card com icones mostrando % por dispositivo
- Grafico de pizza com distribuicao
- Tabela detalhada

---

## Migracao do Banco de Dados

```sql
-- Adicionar colunas para tempo e dispositivo
ALTER TABLE page_views ADD COLUMN time_on_page integer;
ALTER TABLE page_views ADD COLUMN device_type text;

-- Habilitar UPDATE para o hook poder atualizar time_on_page
CREATE POLICY "Allow anonymous update time_on_page" ON page_views
  FOR UPDATE USING (true) WITH CHECK (true);
```

---

## Alteracoes no Hook useAnalytics

### Novos Recursos

1. **Funcao `getDeviceType()`**: Analisa user_agent e retorna "mobile", "tablet" ou "desktop"

2. **Tracking de tempo**:
   - Salvar `page_view_id` quando criar o registro
   - No evento `beforeunload`, calcular tempo decorrido
   - Atualizar o registro com `time_on_page`

### Fluxo

```text
1. Usuario acessa pagina
2. Hook detecta device_type do user_agent
3. Salva page_view com device_type
4. Armazena timestamp de entrada e page_view_id
5. Usuario sai da pagina (beforeunload)
6. Calcula tempo = agora - entrada
7. Atualiza page_view com time_on_page
```

---

## Alteracoes na Edge Function

Adicionar ao retorno:

```text
- avgTimeOnPage: 145 (em segundos)
- avgTimeByPage: { "/": 120, "/lp1": 180 }
- viewsByDevice: { "desktop": 500, "mobile": 350, "tablet": 50 }
- devicePercentages: { "desktop": "55.6%", "mobile": "38.9%", "tablet": "5.5%" }
```

---

## Interface do Dashboard

### Novo Card: Tempo Medio

Posicao: Junto aos cards de metricas

- Icone de relogio
- Valor formatado: "2m 15s"
- Subtitulo: "tempo medio por visita"

### Novo Card: Dispositivos

Posicao: Junto aos cards de metricas

- 3 icones (Desktop, Mobile, Tablet) com porcentagens
- Cores diferenciadas para cada tipo

### Nova Aba: Dispositivos (ou adicionar na aba Visao Geral)

- Grafico de pizza com distribuicao por dispositivo
- Tabela com tempo medio por dispositivo
- Comparativo entre paginas por dispositivo

---

## Arquivos a Modificar

1. **Migracao SQL** - Adicionar colunas `time_on_page` e `device_type`
2. `src/hooks/useAnalytics.ts` - Adicionar deteccao de device e tracking de tempo
3. `supabase/functions/analytics-data/index.ts` - Calcular medias e agregacoes
4. `src/pages/Analytics.tsx` - Novos cards e graficos
5. **Novo**: `src/components/analytics/DeviceStats.tsx` - Componente de dispositivos
6. **Novo**: `src/components/analytics/TimeStats.tsx` - Componente de tempo

---

## Secao Tecnica

### Deteccao de Dispositivo

```javascript
const getDeviceType = (userAgent: string): string => {
  const ua = userAgent.toLowerCase();
  
  // Tablet detection first (before mobile, as tablets may contain "mobile")
  if (/ipad|tablet|playbook|silk/.test(ua)) {
    return "tablet";
  }
  
  // Mobile detection
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/.test(ua)) {
    // Android tablets often don't have "mobile" in UA
    if (/android/.test(ua) && !/mobile/.test(ua)) {
      return "tablet";
    }
    return "mobile";
  }
  
  return "desktop";
};
```

### Calculo de Tempo Medio

```sql
SELECT 
  page_path,
  AVG(time_on_page) as avg_time,
  COUNT(*) as total_views
FROM page_views
WHERE time_on_page IS NOT NULL AND time_on_page > 0
GROUP BY page_path;
```

### Formatacao de Tempo

```javascript
const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};
```

### Consideracoes

- O tempo so sera salvo se o usuario ficar mais de 3 segundos (evita bounces acidentais)
- Se o usuario abrir multiplas abas, cada aba tera seu proprio tracking
- O evento `beforeunload` pode nao disparar em alguns navegadores moveis, por isso o heartbeat tambem atualizara o tempo periodicamente

---

## Exemplo de Visualizacao Final

```text
+------------------+------------------+------------------+
|   Tempo Medio    |   Desktop 55%    |   Mobile 40%     |
|   2m 45s         |   [icon]         |   [icon]         |
|   por visita     |                  |   Tablet 5%      |
+------------------+------------------+------------------+
```

