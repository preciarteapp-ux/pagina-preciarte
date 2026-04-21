import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuizEvent } from "@/pages/QuizAdmin";

const QUESTION_LABELS = [
  "Q1 — Como define preço",
  "Q2 — Pedidos/mês",
  "Q3 — Ticket médio",
  "Q4 — Cobra pelo tempo",
  "Q5 — Custos fixos",
  "Q6 — Desconto",
  "Q7 — Lucro real",
  "Q8 — Orçamento",
];

const QuizFunnel = ({ events }: { events: QuizEvent[] }) => {
  const funnel = useMemo(() => {
    // Mapa session -> maior question_index respondido
    const maxQuestionBySession = new Map<string, number>();
    const startedSessions = new Set<string>();
    const completedSessions = new Set<string>();
    const checkoutSessions = new Set<string>();

    events.forEach((e) => {
      if (e.event_type === "quiz_started") startedSessions.add(e.session_id);
      if (e.event_type === "question_answered" && e.question_index != null) {
        const cur = maxQuestionBySession.get(e.session_id) ?? -1;
        if (e.question_index > cur) {
          maxQuestionBySession.set(e.session_id, e.question_index);
        }
      }
      if (e.event_type === "quiz_completed") completedSessions.add(e.session_id);
      if (e.event_type === "checkout_clicked") checkoutSessions.add(e.session_id);
    });

    const totalStarted = startedSessions.size || 1;

    const steps: { label: string; count: number; pctOfStart: number; pctOfPrev: number }[] = [];
    steps.push({
      label: "Iniciaram",
      count: startedSessions.size,
      pctOfStart: 100,
      pctOfPrev: 100,
    });

    QUESTION_LABELS.forEach((label, idx) => {
      // count de sessões que responderam pelo menos até essa pergunta (index >= idx)
      let count = 0;
      maxQuestionBySession.forEach((maxQ) => {
        if (maxQ >= idx) count++;
      });
      const prev = steps[steps.length - 1].count || 1;
      steps.push({
        label,
        count,
        pctOfStart: (count / totalStarted) * 100,
        pctOfPrev: (count / prev) * 100,
      });
    });

    const prevCompleted = steps[steps.length - 1].count || 1;
    steps.push({
      label: "Resultado visto",
      count: completedSessions.size,
      pctOfStart: (completedSessions.size / totalStarted) * 100,
      pctOfPrev: (completedSessions.size / prevCompleted) * 100,
    });

    const prevCheckout = completedSessions.size || 1;
    steps.push({
      label: "Clicou no checkout",
      count: checkoutSessions.size,
      pctOfStart: (checkoutSessions.size / totalStarted) * 100,
      pctOfPrev: (checkoutSessions.size / prevCheckout) * 100,
    });

    // Identifica maior drop-off (menor pctOfPrev > 0)
    let worstIdx = -1;
    let worstPct = 100;
    steps.forEach((s, i) => {
      if (i > 0 && s.pctOfPrev < worstPct && steps[i - 1].count > 0) {
        worstPct = s.pctOfPrev;
        worstIdx = i;
      }
    });

    return { steps, worstIdx };
  }, [events]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Funil do quiz</CardTitle>
        <p className="text-xs text-muted-foreground">
          Onde as pessoas estão parando — barra mostra % vs. quem iniciou
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {funnel.steps.map((s, i) => {
            const isWorst = i === funnel.worstIdx;
            const drop = i > 0 ? 100 - s.pctOfPrev : 0;
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-44 flex-shrink-0 text-xs font-medium text-muted-foreground">
                  {s.label}
                </div>
                <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-secondary/60">
                  <div
                    className={`h-full rounded-md transition-all ${
                      isWorst
                        ? "bg-gradient-to-r from-destructive to-destructive/70"
                        : "bg-gradient-to-r from-primary to-accent"
                    }`}
                    style={{ width: `${Math.max(2, s.pctOfStart)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-semibold">
                    <span className="text-foreground">{s.count}</span>
                    <span className="ml-2 text-muted-foreground">
                      ({s.pctOfStart.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-20 flex-shrink-0 text-right text-xs">
                  {i > 0 && (
                    <span
                      className={drop > 30 ? "font-bold text-destructive" : "text-muted-foreground"}
                    >
                      {drop > 0 ? `-${drop.toFixed(1)}%` : "—"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {funnel.worstIdx > 0 && (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-foreground">
            <strong className="text-destructive">Maior drop-off:</strong>{" "}
            {funnel.steps[funnel.worstIdx].label} — perdeu{" "}
            <strong>{(100 - funnel.steps[funnel.worstIdx].pctOfPrev).toFixed(1)}%</strong> em
            relação à etapa anterior.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizFunnel;
