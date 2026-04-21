
## Refatoração total do `/quiz` — Versão "design de ponta" + interatividade premium

Vou substituir o quiz atual pela estrutura do HTML que você enviou (8 perguntas, lógica de % de perda por dor, diagnóstico personalizado por dor + solução PreciArte, frase de impacto dinâmica), aplicando a **identidade visual Bordeaux/Âmbar/Grafite** (mesma da LP3) e elevando o nível de interatividade — sem visual genérico de quiz.

### O que muda funcionalmente

**Perguntas (8 no total, vinda do HTML)**
1. Como define preço (4 opções → `precoPerdaPct`: 0.38 / 0.28 / 0.18 / 0.04)
2. Pedidos/mês (4 opções → `pedidos`: 7 / 20 / 45 / 80)
3. **Ticket médio** — input numérico R$ (com máscara + slider visual de apoio)
4. Cobra pelo tempo? (4 opções → `tempoPerdaPct`)
5. Custos fixos no preço? (3 opções → `fixoPerdaPct`)
6. Reação a desconto (3 opções → `descontoPerdaPct`)
7. Sabe o lucro real? (3 opções → `controlePerdaPct`)
8. Como envia orçamento (3 opções → `orcPerdaPct`)

**Cálculo (idêntico ao HTML)**
```
faturamento = pedidos * ticket
perda_total = faturamento * (pPreco + pTempo + pFixo + pDesconto + pControle + pOrc)
```

**Resultado** mostra:
- Bloco **Impacto** dark com `R$ X / mês` em destaque dourado, ano e contexto (pedidos, ticket, faturamento)
- **Diagnóstico dor-a-dor** ordenado pela maior perda — cada card abre com a dor + valor perdido + **solução PreciArte** específica
- **Frase de impacto** dinâmica (3 variantes baseadas em % de perda vs. faturamento)
- CTA Hotmart usando `buildCheckoutUrl` (mantém UTM + `sck`)

### O que muda visualmente (nível "design de ponta")

**Identidade aplicada** (mesma LP3, sem usar o off-white do HTML — manter o tema dark do projeto):
- Bordeaux `#8B1A4A` (primary), Âmbar `#E07B2A` (accent / destaques de número), Grafite `#1A1A1A` (superfícies escuras)
- Tipografia: **Sora** (headlines/números) + **DM Sans** (corpo) — adicionar via `<link>` no `index.html`
- Glow radial bordeaux nos blocos hero/impacto (já existe `--shadow-glow` no projeto)

**Interatividade premium (acima do HTML enviado)**
1. **Hero compacto sticky** com badge "Calculadora gratuita · 2 min" + 3 mini-stats (8 perguntas / 2min / 100% gratuito)
2. **Barra de progresso animada** com gradient bordeaux→âmbar e número de % com count-up suave
3. **Cards de opção**:
   - Hover com leve translateY + borda bordeaux + bg `wine-light`
   - Selecionado: scale 1.02 + glow + check animado entrando da esquerda
   - Haptic feedback (`navigator.vibrate(15)`)
   - **Auto-advance** após 350ms (mantém botão "Continuar" para conforto, mas avança sozinho)
4. **Pergunta 3 (ticket médio)**:
   - Input grande estilo "número de impacto" (Sora 28px)
   - **Slider tátil** abaixo (R$ 30 → R$ 500) sincronizado com o input — mexer no slider atualiza input e vice-versa (muito mais "vincia" no celular)
   - Sugestões rápidas em chips (R$ 50 / R$ 80 / R$ 120 / R$ 200)
5. **Transições entre perguntas**: fade + translateY com `framer-motion`-style usando classes Tailwind (`animate-fade-in` já existe, vou criar variant `animate-slide-up`)
6. **Resultado dramatizado**:
   - Count-up do número principal (1.8s ease-out cubic) — já temos no componente atual, manter
   - **Pulse** sutil no número grande após o count-up terminar
   - Cards de diagnóstico aparecem em **stagger** (100ms de delay entre cada) usando `animationDelay` inline
   - Cada card de dor tem **barra horizontal mostrando o peso da perda** (bar chart minimalista) — comparativo visual
   - Solução PreciArte dentro do mesmo card, separada por `border-t` e bg `secondary/40`
7. **CTA final** dark com glow bordeaux + botão âmbar grande com sombra colorida + mini-features com check verde
8. **Confetti sutil** no momento em que o resultado aparece (apenas se `total > 0` — usando uma função canvas simples, sem lib pesada) — ou alternativa mais sóbria: **flash âmbar** de 200ms no número
9. **Sticky bottom CTA** no resultado quando o usuário rola — "Quero parar de perder R$ X/mês →" sempre visível no mobile

### Arquivos a editar/criar

- **`src/lib/quizCalculator.ts`** — reescrever com a nova lógica (6 dimensões de perda em vez do `fatorErro` único, fórmula `fat * Σ(pcts)`, gerador de diagnósticos ordenados, gerador de frase de impacto com 3 variantes)
- **`src/pages/Quiz.tsx`** — reescrever com as 8 perguntas novas + estado expandido (segmento removido, ticket fica no step 3)
- **`src/components/quiz/QuizQuestion.tsx`** — refinar visual (tipografia Sora, ícones em emoji + sublabel "hint", bordas mais finas, micro-interações)
- **`src/components/quiz/QuizProgress.tsx`** — gradient + count-up do %
- **`src/components/quiz/QuizResult.tsx`** — reescrever com bloco Impacto dark + diagnóstico dor/solução + frase dinâmica + sticky bottom CTA + bar chart por dor
- **`src/components/quiz/QuizTicketInput.tsx`** *(novo)* — input + slider + chips para a pergunta 3
- **`src/components/quiz/QuizHero.tsx`** *(novo)* — header com badge e 3 mini-stats
- **`index.html`** — adicionar `<link>` Google Fonts Sora + DM Sans
- **`tailwind.config.ts`** — adicionar `fontFamily: { display: ['Sora', ...], body: ['DM Sans', ...] }` para usar via `font-display` e `font-body`
- **`mem://campaigns/quiz-diagnostic-funnel.md`** — atualizar com a nova estrutura (8 perguntas, 6 dores, fórmula nova)

### O que não muda
- Rota `/quiz` continua a mesma
- `buildCheckoutUrl` (UTM + sck Hotmart) continua sendo usado nos dois CTAs (anual e mensal)
- Eventos Meta Pixel `Lead` no resultado e `InitiateCheckout` nos botões — preservados
- Links Hotmart anual/mensal preservados

### Resultado esperado
Um quiz com **cara de produto** (não de template), com micro-interações que dão prazer de tocar no celular (slider, chips, auto-advance, vibração, count-up, stagger, sticky CTA), o cálculo mais sofisticado do HTML que você mandou (6 dores separadas), diagnóstico personalizado dor-por-dor com a solução PreciArte ao lado de cada perda, e visual alinhado à identidade Bordeaux/Âmbar/Grafite da marca.
