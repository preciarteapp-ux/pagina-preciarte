import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { QuizEvent } from "@/pages/QuizAdmin";

const QUESTIONS_META: { index: number; id: string; title: string; type: "options" | "ticket" }[] = [
  { index: 0, id: "precoPerdaPct", title: "Como define o preço", type: "options" },
  { index: 1, id: "pedidos", title: "Pedidos por mês", type: "options" },
  { index: 2, id: "ticket", title: "Ticket médio (R$)", type: "ticket" },
  { index: 3, id: "tempoPerdaPct", title: "Cobra pelo tempo", type: "options" },
  { index: 4, id: "fixoPerdaPct", title: "Custos fixos no preço", type: "options" },
  { index: 5, id: "descontoPerdaPct", title: "Reação a desconto", type: "options" },
  { index: 6, id: "controlePerdaPct", title: "Sabe o lucro real", type: "options" },
  { index: 7, id: "orcPerdaPct", title: "Como envia orçamento", type: "options" },
];

const TICKET_BUCKETS = [
  { label: "R$ 0 – 50", min: 0, max: 50 },
  { label: "R$ 50 – 100", min: 50, max: 100 },
  { label: "R$ 100 – 200", min: 100, max: 200 },
  { label: "R$ 200 – 500", min: 200, max: 500 },
  { label: "R$ 500+", min: 500, max: Infinity },
];

const QuizAnswersBreakdown = ({ events }: { events: QuizEvent[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const breakdown = useMemo(() => {
    return QUESTIONS_META.map((q) => {
      const answered = events.filter(
        (e) => e.event_type === "question_answered" && e.question_index === q.index,
      );
      const total = answered.length;

      if (q.type === "ticket") {
        const values = answered
          .map((e) => Number(e.answer_value))
          .filter((v) => !isNaN(v) && v > 0);
        const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        const buckets = TICKET_BUCKETS.map((b) => ({
          label: b.label,
          count: values.filter((v) => v >= b.min && v < b.max).length,
        }));
        return { ...q, total, avg, buckets, options: null };
      }

      // Options: agrupa por answer_label
      const counts = new Map<string, number>();
      answered.forEach((e) => {
        const key = e.answer_label || String(e.answer_value);
        counts.set(key, (counts.get(key) || 0) + 1);
      });
      const options = Array.from(counts.entries())
        .map(([label, count]) => ({ label, count, pct: total ? (count / total) * 100 : 0 }))
        .sort((a, b) => b.count - a.count);
      return { ...q, total, options, buckets: null, avg: 0 };
    });
  }, [events]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribuição das respostas</CardTitle>
        <p className="text-xs text-muted-foreground">
          Como o público está respondendo cada pergunta
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {breakdown.map((q, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={q.id} className="overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-secondary/40"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-primary" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-semibold">{q.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {q.total} resposta{q.total === 1 ? "" : "s"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border bg-secondary/20 px-4 py-3">
                  {q.type === "ticket" && q.buckets ? (
                    <>
                      <div className="mb-3 text-xs text-muted-foreground">
                        Ticket médio:{" "}
                        <strong className="text-foreground">
                          R$ {Math.round(q.avg).toLocaleString("pt-BR")}
                        </strong>
                      </div>
                      <div className="space-y-1.5">
                        {q.buckets.map((b) => {
                          const pct = q.total ? (b.count / q.total) * 100 : 0;
                          return (
                            <BarRow key={b.label} label={b.label} count={b.count} pct={pct} />
                          );
                        })}
                      </div>
                    </>
                  ) : q.options && q.options.length > 0 ? (
                    <div className="space-y-1.5">
                      {q.options.map((o) => (
                        <BarRow key={o.label} label={o.label} count={o.count} pct={o.pct} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Sem respostas ainda.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const BarRow = ({ label, count, pct }: { label: string; count: number; pct: number }) => (
  <div className="flex items-center gap-3">
    <div className="w-44 flex-shrink-0 truncate text-xs text-muted-foreground" title={label}>
      {label}
    </div>
    <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-background">
      <div
        className="h-full rounded-md bg-gradient-to-r from-primary/80 to-accent/80 transition-all"
        style={{ width: `${Math.max(2, pct)}%` }}
      />
      <div className="absolute inset-0 flex items-center px-2 text-[11px] font-semibold text-foreground">
        {count} ({pct.toFixed(1)}%)
      </div>
    </div>
  </div>
);

export default QuizAnswersBreakdown;
