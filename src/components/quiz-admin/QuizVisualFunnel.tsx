import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filter, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { QuizEvent } from "@/pages/QuizAdmin";

interface QuizVisualFunnelProps {
  events: QuizEvent[];
  /** ISO date — buscar page_views desde este momento (null = tudo) */
  since: string | null;
}

type Stage = {
  label: string;
  count: number;
  pctOfTop: number;
  color: string; // hex sólido para o trapézio
};

const QuizVisualFunnel = ({ events, since }: QuizVisualFunnelProps) => {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [loadingVisitors, setLoadingVisitors] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchVisitors = async () => {
      setLoadingVisitors(true);
      try {
        let q = supabase
          .from("page_views")
          .select("session_id")
          .eq("page_path", "/quiz")
          .limit(50000);
        if (since) q = q.gte("created_at", since);
        const { data, error } = await q;
        if (!cancelled) {
          if (!error && data) {
            const unique = new Set(data.map((d: any) => d.session_id));
            setVisitors(unique.size);
          } else {
            setVisitors(0);
          }
          setLoadingVisitors(false);
        }
      } catch {
        if (!cancelled) {
          setVisitors(0);
          setLoadingVisitors(false);
        }
      }
    };
    fetchVisitors();
    return () => {
      cancelled = true;
    };
  }, [since]);

  const stages: Stage[] = useMemo(() => {
    const startedSessions = new Set(
      events.filter((e) => e.event_type === "quiz_started").map((e) => e.session_id),
    );
    const answeredSessions = new Set(
      events.filter((e) => e.event_type === "question_answered").map((e) => e.session_id),
    );
    const checkoutSessions = new Set(
      events.filter((e) => e.event_type === "checkout_clicked").map((e) => e.session_id),
    );
    const completedSessions = new Set(
      events.filter((e) => e.event_type === "quiz_completed").map((e) => e.session_id),
    );

    // Visitantes = page_views únicos em /quiz; fallback para quiz_started
    const visitorsCount = visitors ?? startedSessions.size;
    const top = Math.max(visitorsCount, 1);

    return [
      { label: "Visitantes", count: visitorsCount, pctOfTop: 100, color: "#3FA9FF" },
      {
        label: "Respostas",
        count: answeredSessions.size,
        pctOfTop: (answeredSessions.size / top) * 100,
        color: "#E91E8C",
      },
      {
        label: "Leads",
        count: completedSessions.size,
        pctOfTop: (completedSessions.size / top) * 100,
        color: "#5B5BE5",
      },
      {
        label: "Conclusões",
        count: checkoutSessions.size,
        pctOfTop: (checkoutSessions.size / top) * 100,
        color: "#F59E0B",
      },
    ];
  }, [events, visitors]);

  const completionRate = stages[0].count
    ? (stages[stages.length - 1].count / stages[0].count) * 100
    : 0;
  const totalConclusoes = stages[stages.length - 1].count;

  // Largura (%) do topo de cada trapézio, com piso visual
  const widths = useMemo(() => {
    const top = stages[0].count || 1;
    return stages.map((s) => {
      const raw = (s.count / top) * 100;
      return Math.max(18, raw);
    });
  }, [stages]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          Etapas do funil
          <HelpCircle className="h-3.5 w-3.5 opacity-60" />
        </div>
      </CardHeader>
      <CardContent>
        {/* KPIs topo */}
        <div className="mb-6 flex flex-wrap gap-x-12 gap-y-3">
          <div>
            <div className="text-xs text-muted-foreground">Taxa de conclusão</div>
            <div className="font-display text-3xl font-bold text-foreground">
              {completionRate.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total de conclusões</div>
            <div className="font-display text-3xl font-bold text-foreground">
              {totalConclusoes.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>

        {loadingVisitors && visitors === null ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Carregando visitantes…
          </div>
        ) : (
          <div className="grid grid-cols-[110px_1fr_90px] gap-x-4 sm:gap-x-6">
            {stages.map((s, i) => {
              const wTop = widths[i];
              // bottom = topo da próxima etapa (ou estreitamento final na última)
              const wBotRaw = i < stages.length - 1 ? widths[i + 1] : wTop * 0.4;
              const wBot = Math.min(wBotRaw, wTop);
              const leftTop = (100 - wTop) / 2;
              const rightTop = 100 - leftTop;
              const leftBot = (100 - wBot) / 2;
              const rightBot = 100 - leftBot;

              return (
                <div key={s.label} className="contents">
                  {/* Label esquerda */}
                  <div className="flex items-center text-sm font-medium text-foreground">
                    {s.label}
                  </div>

                  {/* Trapézio */}
                  <div className="relative h-16 w-full">
                    <div
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        backgroundColor: s.color,
                        clipPath: `polygon(${leftTop}% 0%, ${rightTop}% 0%, ${rightBot}% 100%, ${leftBot}% 100%)`,
                      }}
                    />
                  </div>

                  {/* Stats direita */}
                  <div className="flex flex-col items-end justify-center text-right">
                    <div className="text-xs text-muted-foreground">
                      {s.pctOfTop.toFixed(1)}%
                    </div>
                    <div className="font-display text-lg font-bold text-foreground">
                      {s.count.toLocaleString("pt-BR")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizVisualFunnel;
