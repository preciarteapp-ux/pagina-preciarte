

## Quiz interativo `/quiz` — "Quanto você está deixando de lucrar por mês?"

Página nova focada em mobile, com perguntas estratégicas que despertam a dor de precificação errada e terminam em um **resultado personalizado em reais** (quanto a pessoa está perdendo por mês), levando direto para o checkout do PreciArte.

### Fluxo do quiz (7 perguntas curtas)

Cada tela mostra **1 pergunta por vez**, com barra de progresso no topo, animação de transição suave e cards grandes (touch-friendly).

1. **O que você produz?** (artesanato, confeitaria, costura, resina, velas, outros) — segmenta a linguagem do resultado.
2. **Quantas peças/encomendas você faz por mês?** (até 10 / 11–30 / 31–60 / 60+) — base do cálculo.
3. **Qual o ticket médio (preço médio) que você cobra hoje?** (até R$30 / R$31–80 / R$81–150 / R$150+)
4. **Como você define o preço hoje?** (chuto / copio concorrente / somo material e adiciono % / uso planilha) — principal gatilho de dor.
5. **Você sabe exatamente quanto lucra por peça?** (sim, exato / mais ou menos / não faço ideia)
6. **Já vendeu algo e depois percebeu que saiu no prejuízo?** (várias vezes / algumas / raramente / nunca)
7. **Quanto tempo gasta calculando preço e organizando finanças?** (mais de 5h/semana / 2–5h / menos de 2h / não organizo)

### Tela de resultado (a parte que converte)

Cálculo simples baseado nas respostas:
- Estimativa de **margem perdida por peça** (R$ proporcional ao ticket médio × fator de "erro de precificação" definido pelas perguntas 4, 5 e 6).
- Multiplica pelo volume mensal (pergunta 2).
- Mostra um número grande animado: **"Você está deixando de lucrar até R$ XXX por mês"** (contador subindo de 0 até o valor com `requestAnimationFrame`).

Abaixo:
- 3 "diagnósticos" em cards (ex.: *"Você precifica no chute — em média artesãos perdem 35% de margem assim"*, *"5h/semana = R$ X de tempo desperdiçado"*, *"Sem controle de custo, 7 em cada 10 peças saem no prejuízo"*).
- Bloco **"Como o PreciArte resolve isso"** com 4 bullets diretos ligando cada dor à solução (calculadora de preço, dashboard, gestão de materiais, IA).
- **CTA principal**: "Quero parar de perder R$ XXX/mês" → abre Hotmart anual com `buildCheckoutUrl` (UTMs + sck preservados).
- CTA secundário: "Ver plano mensal" → Hotmart mensal.
- Mini prova social: 2–3 depoimentos curtos + selo "7 dias de garantia".

### Design e interação (foco mobile)

- Layout **mobile-first**, full-screen por pergunta, conteúdo centralizado, max-width 480px.
- Paleta atual do site (rosa/magenta `--primary`, gradiente `--gradient-primary`, fundo claro).
- Botões de resposta como **cards grandes** com ícone (lucide-react), bordas arredondadas, hover/tap com leve scale e mudança de borda para `primary`.
- **Barra de progresso** fina no topo (componente `Progress` do shadcn) animada.
- Transição entre perguntas com fade + slide (CSS puro via classes `transition` do Tailwind).
- Botão "Voltar" discreto no canto superior esquerdo.
- Vibração curta (`navigator.vibrate(15)`) ao selecionar resposta no mobile (opcional, sem quebrar desktop).
- Avanço automático ~250ms após a escolha (sensação de fluidez), sem precisar clicar "Próximo".
- Tela final com confete sutil (animação CSS leve, sem libs) e número grande pulsando.

### Estrutura técnica

Arquivos novos:
- `src/pages/Quiz.tsx` — página com estado de `currentStep`, `answers`, `showResult`. Controla fluxo e calcula resultado.
- `src/components/quiz/QuizProgress.tsx` — barra de progresso + contador "3 de 7".
- `src/components/quiz/QuizQuestion.tsx` — renderiza pergunta + opções como cards.
- `src/components/quiz/QuizResult.tsx` — tela final com número animado, diagnósticos e CTAs.
- `src/lib/quizCalculator.ts` — função `calculateLoss(answers)` que retorna `{ monthlyLoss, diagnostics[] }`.

Arquivos editados:
- `src/App.tsx` — adicionar rota `<Route path="/quiz" element={<Quiz />} />` antes do catch-all.

Integrações reaproveitadas:
- `buildCheckoutUrl` de `src/lib/checkout.ts` para preservar UTMs + `sck` da Hotmart nos CTAs finais.
- Meta Pixel: disparar `fbq('track','Lead')` ao chegar no resultado e `fbq('track','InitiateCheckout')` ao clicar nos CTAs.
- `useAnalytics()` para tracking interno.
- `SEOHead` com title/description próprios do quiz.

### Detalhes do cálculo (transparente, mas impactante)

```text
ticketMedio (R$)  ← P3 (usa valor médio da faixa)
volume (un/mês)   ← P2
fatorErro (0..1)  ← P4 (chute=0.35, copia=0.25, soma=0.15, planilha=0.05)
                  + P5 (não faz ideia +0.15, mais ou menos +0.08)
                  + P6 (várias vezes +0.10, algumas +0.05)
perdaPorPeca = ticketMedio * fatorErro
perdaMensal  = perdaPorPeca * volume
```

Resultado mínimo garantido (mesmo no melhor cenário) ≈ R$ 80/mês para sempre soar relevante vs. o preço do PreciArte (R$ 12,44/mês no anual).

### Resultado esperado

Página `/quiz` enxuta, gostosa de mexer no celular, que termina mostrando um número alto e personalizado de prejuízo mensal — comparado com o preço baixo do plano anual — e direciona para o checkout Hotmart com UTMs/sck intactos.

