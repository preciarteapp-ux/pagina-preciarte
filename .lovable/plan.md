

## Dashboard `/quiz/adm` — Métricas completas do quiz

Vou criar um sistema de tracking dedicado ao quiz (cada interação vira um evento no banco) e um dashboard protegido por senha mostrando funil, drop-off por pergunta, distribuição de respostas, taxa de conclusão, cliques em planos e prejuízo médio calculado.

### 1. Tracking — nova tabela `quiz_events`

Tabela única e flexível para todos os eventos do quiz:

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `session_id` | text | mesmo session_id do `useAnalytics` (liga ao funil já existente) |
| `event_type` | text | `quiz_started`, `question_answered`, `quiz_completed`, `checkout_clicked` |
| `question_index` | int | 0–7 (null para start/checkout) |
| `question_id` | text | ex: `precoPerdaPct`, `pedidos`, `ticket`, `tempoPerdaPct`… |
| `answer_value` | numeric | valor numérico da opção escolhida (ou ticket digitado) |
| `answer_label` | text | label da opção (legível no dashboard) |
| `plan_clicked` | text | `anual` / `mensal` / `sticky_anual` |
| `monthly_loss` | numeric | prejuízo calculado (preenchido em `quiz_completed` e `checkout_clicked`) |
| `utm_source/medium/campaign` | text | herdados do localStorage |
| `device_type` | text | mobile/desktop |
| `created_at` | timestamptz | now() |

**RLS**: INSERT liberado para `anon` (igual às outras tabelas analytics); SELECT liberado também (o dashboard é client-side e a senha está no front, mesmo padrão atual de `/analytics`).

### 2. Instrumentação no quiz

Novo helper `src/lib/quizTracking.ts` com `trackQuizEvent(payload)` que faz `supabase.from('quiz_events').insert(...)` + lê UTMs do localStorage.

Pontos de disparo:

- **`quiz_started`** — quando clica "Começar diagnóstico" no `Quiz.tsx`
- **`question_answered`** — em cada resposta (incluindo o ticket), com `question_index`, `question_id`, `answer_value`, `answer_label`
- **`quiz_completed`** — quando entra no step `result`, salva `monthly_loss`
- **`checkout_clicked`** — em `goAnnual` / `goMonthly` / sticky (com `plan_clicked` distinguindo os 3 botões)

### 3. Página `/quiz/adm`

Rota protegida pela mesma senha do `/analytics` (`Dhsc9205@`) usando o mesmo padrão (sessionStorage flag) — sem criar fluxo de auth novo.

Layout (mobile + desktop):

**Filtro de período** no topo: Hoje · 7 dias · 30 dias · Todo o período

**4 cards principais (KPIs)**
- Iniciaram o quiz (count de `quiz_started`)
- Concluíram o quiz (count de `quiz_completed`)
- **Taxa de conclusão** (% — destaque)
- Cliques em checkout (e CTR sobre concluídos)

**Funil visual de etapas** (barras horizontais decrescentes):
```
Início → Q1 → Q2 → Q3 (ticket) → Q4 → Q5 → Q6 → Q7 → Q8 → Resultado → Checkout
```
Mostra count + % vs. etapa anterior + % vs. início. Destaque vermelho na etapa com maior drop-off.

**Distribuição de respostas por pergunta** (cards expansíveis)
- Para cada pergunta: barras horizontais com cada opção, contagem absoluta e %
- Para o ticket (numérico): histograma em faixas (R$ 0-50 / 50-100 / 100-200 / 200-500 / 500+) + ticket médio

**Cliques em planos** (gráfico de pizza/barra)
- Anual (CTA principal) · Anual (sticky) · Mensal
- Total de cliques + distribuição

**Prejuízo médio calculado** (entre quem concluiu)
- Média, mediana, mín, máx do `monthly_loss`
- Histograma de faixas de prejuízo

**Tabela de últimas sessões** (20 mais recentes)
- session_id curto · etapa atingida · prejuízo · plano clicado · UTM source · horário

### 4. Arquivos

**Migração SQL** (criar tabela + RLS + índices em `session_id`, `created_at`, `event_type`)

**Novos arquivos**
- `src/lib/quizTracking.ts` — helper `trackQuizEvent`
- `src/pages/QuizAdmin.tsx` — dashboard
- `src/components/quiz-admin/QuizFunnel.tsx` — funil visual
- `src/components/quiz-admin/QuizAnswersBreakdown.tsx` — distribuição por pergunta
- `src/components/quiz-admin/QuizKPICards.tsx` — cards KPI
- `src/components/quiz-admin/QuizCheckoutStats.tsx` — cliques + prejuízo médio

**Editados**
- `src/App.tsx` — adicionar rota `/quiz/adm`
- `src/pages/Quiz.tsx` — chamar `trackQuizEvent` em start/respostas/conclusão
- `src/components/quiz/QuizResult.tsx` — chamar `trackQuizEvent` em conclusão e nos 3 botões de checkout
- `src/components/quiz/QuizQuestion.tsx` e `QuizTicketInput.tsx` — passar `answer_label` (já temos label) via callback opcional, OU manter callback atual e o `Quiz.tsx` resolve o label via array `QUESTIONS`

**Memória**
- `mem://analytics/quiz-admin-dashboard.md` — anotar tabela `quiz_events`, rota `/quiz/adm`, mesma senha do `/analytics`

### 5. Detalhes técnicos relevantes

- Acesso ao banco direto do client com `supabase` (mesma estratégia do `/analytics` atual) — sem edge function
- Reusar `recharts` (já no projeto) para gráficos
- Filtro de período aplicado em todas as queries via `created_at >= ?`
- Drop-off calculado contando `distinct session_id` que atingiram cada etapa (uma sessão pode responder a mesma pergunta 2x se voltar — usar MAX(question_index) por sessão para o funil)
- Inserts do tracking são fire-and-forget (não bloqueia UX) e silenciosamente falham se offline
- Mesmo padrão visual do `/analytics` atual (Bordeaux/cards) para consistência

### 6. O que NÃO muda

- Nenhuma alteração no fluxo, visual ou cálculo do quiz para o usuário final
- Meta Pixel (`Lead`, `InitiateCheckout`) e UTMs no Hotmart/OnProfit continuam intactos
- Senha do dashboard reutilizada do `/analytics` — não cria nova auth

