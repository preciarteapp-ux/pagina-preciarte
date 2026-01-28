
# Plano: Ajustar Fuso Horario para Brasilia (UTC-3)

## Visao Geral

Ajustar todo o sistema de analytics para usar o fuso horario de Brasilia (America/Sao_Paulo), garantindo que:
- Os graficos de "Acessos por Hora" mostrem horario de Brasilia
- A contagem de "Visitas Hoje" use meia-noite de Brasilia
- As datas e horarios nas tabelas sejam exibidos corretamente

---

## Alteracoes Necessarias

### 1. Edge Function (analytics-data/index.ts)

Ajustar os calculos de data/hora para usar offset de Brasilia (-3 horas):

**Calculo de "hoje" (linha 116-120):**
```text
Antes: Usa meia-noite UTC
Depois: Usa meia-noite de Brasilia (03:00 UTC)
```

**Calculo de "visitas por hora" (linha 147-151):**
```text
Antes: new Date(pv.created_at).getHours()
Depois: Converter para horario de Brasilia antes de extrair a hora
```

### 2. Dashboard (Analytics.tsx)

**Formatacao de datas nas tabelas:**
```text
Antes: Exibe hora UTC
Depois: Exibe hora de Brasilia com indicador "BRT"
```

**Grafico de horas:**
```text
Adicionar "(Horario de Brasilia)" no titulo do grafico
```

---

## Implementacao Tecnica

### Funcao de Conversao para Brasilia

No Edge Function:
```javascript
const toBrasiliaTime = (date: Date): Date => {
  // Brasilia = UTC-3
  const utcTime = date.getTime();
  const brasiliaOffset = -3 * 60 * 60 * 1000; // -3 horas em ms
  return new Date(utcTime + brasiliaOffset);
};

const getBrasiliaHour = (isoString: string): number => {
  const date = new Date(isoString);
  const brasiliaDate = toBrasiliaTime(date);
  return brasiliaDate.getUTCHours();
};
```

### Calculo de "Inicio do Dia" em Brasilia

```javascript
// Meia-noite em Brasilia = 03:00 UTC
const getBrasiliaToday = (): Date => {
  const now = new Date();
  const brasiliaDate = toBrasiliaTime(now);
  // Resetar para meia-noite de Brasilia
  brasiliaDate.setUTCHours(0, 0, 0, 0);
  // Converter de volta para UTC (adicionar 3 horas)
  return new Date(brasiliaDate.getTime() + 3 * 60 * 60 * 1000);
};
```

---

## Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `supabase/functions/analytics-data/index.ts` | Adicionar funcoes de conversao, ajustar calculos de hora e "hoje" |
| `src/pages/Analytics.tsx` | Formatar horarios com indicador de fuso, atualizar titulo do grafico |

---

## Impacto Visual

### Grafico "Acessos por Hora"

```text
Antes do titulo: "Acessos por Hora"
Depois do titulo: "Acessos por Hora (Horario de Brasilia)"
```

### Tabela de Visitas Recentes

```text
Antes:  01:21 (UTC)
Depois: 22:21 (exibindo horario de Brasilia)
```

### Card "Visitas Hoje"

```text
Agora conta corretamente a partir da meia-noite de Brasilia
```

---

## Consideracoes

1. **Horario de Verao**: Brasilia nao tem mais horario de verao desde 2019, entao UTC-3 e fixo

2. **Dados Existentes**: Os dados no banco continuam em UTC (padrao), apenas a exibicao muda

3. **Consistencia**: Todos os calculos de "hoje", "hora", "periodo" usarao Brasilia

---

## Resumo das Alteracoes

1. **Edge Function**: 
   - Criar funcoes `toBrasiliaTime()` e `getBrasiliaHour()`
   - Ajustar calculo de `visitsToday` para usar meia-noite de Brasilia
   - Ajustar `viewsByHour` para usar hora de Brasilia

2. **Dashboard**:
   - Atualizar titulo do grafico de horas
   - Formatar horarios nas visitas recentes para Brasilia
   - Adicionar indicador "(BRT)" onde apropriado
