import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuizEvent } from "@/pages/QuizAdmin";

interface Stats {
  avgLoss: number;
  medianLoss: number;
  minLoss: number;
  maxLoss: number;
}

const PLAN_META: Record<string, { label: string; color: string }> = {
  anual: { label: "Anual (CTA principal)", color: "from-accent to-[#FAC775]" },
  sticky_anual: { label: "Anual (sticky)", color: "from-primary to-accent" },
  mensal: { label: "Mensal (link discreto)", color: "from-muted-foreground/60 to-muted-foreground" },
};

const formatBRL = (n: number) => "R$ " + Math.round(n).toLocaleString("pt-BR");

const QuizCheckoutStats = ({ events, stats }: { events: QuizEvent[]; stats: Stats }) => {
  const planBreakdown = useMemo(() => {
    const clicks = events.filter((e) => e.event_type === "checkout_clicked");
    const total = clicks.length || 1;
    const counts = new Map<string, number>();
    clicks.forEach((e) => {
      const key = e.plan_clicked || "desconhecido";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([key, count]) => ({
        key,
        meta: PLAN_META[key] ?? { label: key, color: "from-muted-foreground to-muted-foreground" },
        count,
        pct: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, [events]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Cliques por plano */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cliques por plano</CardTitle>
          <p className="text-xs text-muted-foreground">
            Qual botão de checkout está convertendo mais
          </p>
        </CardHeader>
        <CardContent>
          {planBreakdown.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Nenhum clique em checkout ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {planBreakdown.map((p) => (
                <div key={p.key}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-semibold">{p.meta.label}</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{p.count}</strong> cliques (
                      {p.pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary/60">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${p.meta.color}`}
                      style={{ width: `${Math.max(2, p.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prejuízo calculado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prejuízo calculado</CardTitle>
          <p className="text-xs text-muted-foreground">
            Distribuição entre quem concluiu o quiz
          </p>
        </CardHeader>
        <CardContent>
          {stats.avgLoss === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Nenhuma conclusão registrada ainda.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Média" value={formatBRL(stats.avgLoss)} highlight />
              <Stat label="Mediana" value={formatBRL(stats.medianLoss)} />
              <Stat label="Mínimo" value={formatBRL(stats.minLoss)} />
              <Stat label="Máximo" value={formatBRL(stats.maxLoss)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Stat = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-lg border p-3 ${
      highlight ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"
    }`}
  >
    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
    <div
      className={`mt-1 font-display text-lg font-bold ${
        highlight ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);

export default QuizCheckoutStats;
