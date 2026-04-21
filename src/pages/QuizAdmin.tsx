import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, LogOut, BarChart3 } from "lucide-react";
import QuizKPICards from "@/components/quiz-admin/QuizKPICards";
import QuizFunnel from "@/components/quiz-admin/QuizFunnel";
import QuizVisualFunnel from "@/components/quiz-admin/QuizVisualFunnel";
import QuizAnswersBreakdown from "@/components/quiz-admin/QuizAnswersBreakdown";
import QuizCheckoutStats from "@/components/quiz-admin/QuizCheckoutStats";

export type QuizEvent = {
  id: string;
  session_id: string;
  event_type: "quiz_started" | "question_answered" | "quiz_completed" | "checkout_clicked";
  question_index: number | null;
  question_id: string | null;
  answer_value: number | null;
  answer_label: string | null;
  plan_clicked: string | null;
  monthly_loss: number | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  created_at: string;
};

type Period = "today" | "7d" | "30d" | "all";

const periodToDate = (p: Period): Date | null => {
  const now = new Date();
  if (p === "today") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (p === "7d") return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  if (p === "30d") return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return null;
};

const PERIOD_LABELS: Record<Period, string> = {
  today: "Hoje",
  "7d": "7 dias",
  "30d": "30 dias",
  all: "Tudo",
};

const QuizAdmin = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<QuizEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("7d");

  // Reaproveita autenticação do /analytics
  useEffect(() => {
    const auth = sessionStorage.getItem("analytics_authenticated");
    if (auth !== "true") {
      navigate("/analytics-login");
    }
  }, [navigate]);

  const fetchEvents = async () => {
    setLoading(true);
    const since = periodToDate(period);
    let q = supabase
      .from("quiz_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10000);
    if (since) q = q.gte("created_at", since.toISOString());
    const { data, error } = await q;
    if (!error && data) setEvents(data as QuizEvent[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handleLogout = () => {
    sessionStorage.removeItem("analytics_authenticated");
    sessionStorage.removeItem("analytics_password");
    navigate("/analytics-login");
  };

  // KPIs
  const stats = useMemo(() => {
    const startedSessions = new Set(
      events.filter((e) => e.event_type === "quiz_started").map((e) => e.session_id),
    );
    const completedSessions = new Set(
      events.filter((e) => e.event_type === "quiz_completed").map((e) => e.session_id),
    );
    const checkoutClicks = events.filter((e) => e.event_type === "checkout_clicked");
    const checkoutSessions = new Set(checkoutClicks.map((e) => e.session_id));

    const losses = events
      .filter((e) => e.event_type === "quiz_completed" && e.monthly_loss != null)
      .map((e) => Number(e.monthly_loss));

    const avgLoss = losses.length
      ? losses.reduce((a, b) => a + b, 0) / losses.length
      : 0;
    const sortedLosses = [...losses].sort((a, b) => a - b);
    const medianLoss = sortedLosses.length
      ? sortedLosses[Math.floor(sortedLosses.length / 2)]
      : 0;

    return {
      started: startedSessions.size,
      completed: completedSessions.size,
      completionRate: startedSessions.size
        ? (completedSessions.size / startedSessions.size) * 100
        : 0,
      checkoutClicks: checkoutClicks.length,
      checkoutSessions: checkoutSessions.size,
      checkoutRate: completedSessions.size
        ? (checkoutSessions.size / completedSessions.size) * 100
        : 0,
      avgLoss,
      medianLoss,
      minLoss: losses.length ? Math.min(...losses) : 0,
      maxLoss: losses.length ? Math.max(...losses) : 0,
    };
  }, [events]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Quiz Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Métricas completas do funil do /quiz
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchEvents} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Period filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                period === p
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              Nenhum evento registrado nesse período ainda.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <QuizKPICards stats={stats} />
            <QuizVisualFunnel
              events={events}
              since={periodToDate(period)?.toISOString() ?? null}
            />
            <QuizFunnel events={events} />
            <QuizCheckoutStats events={events} stats={stats} />
            <QuizAnswersBreakdown events={events} />

            {/* Últimas sessões */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Últimas sessões</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSessionsTable events={events} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const RecentSessionsTable = ({ events }: { events: QuizEvent[] }) => {
  const sessions = useMemo(() => {
    const map = new Map<string, QuizEvent[]>();
    events.forEach((e) => {
      if (!map.has(e.session_id)) map.set(e.session_id, []);
      map.get(e.session_id)!.push(e);
    });

    return Array.from(map.entries())
      .map(([sessionId, evs]) => {
        const sorted = [...evs].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        const lastQuestion = Math.max(
          -1,
          ...evs
            .filter((e) => e.event_type === "question_answered" && e.question_index != null)
            .map((e) => e.question_index!),
        );
        const completed = evs.some((e) => e.event_type === "quiz_completed");
        const checkoutEv = evs.find((e) => e.event_type === "checkout_clicked");
        const completedEv = evs.find((e) => e.event_type === "quiz_completed");

        let stage = "Iniciou";
        if (checkoutEv) stage = `Checkout (${checkoutEv.plan_clicked})`;
        else if (completed) stage = "Concluiu";
        else if (lastQuestion >= 0) stage = `Pergunta ${lastQuestion + 1}`;

        return {
          sessionId,
          stage,
          loss: completedEv?.monthly_loss ?? null,
          plan: checkoutEv?.plan_clicked ?? null,
          source: sorted[0]?.utm_source ?? "direct",
          device: sorted[0]?.device_type ?? "—",
          time: sorted[sorted.length - 1].created_at,
        };
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 30);
  }, [events]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2 pr-3">Sessão</th>
            <th className="py-2 pr-3">Etapa</th>
            <th className="py-2 pr-3">Prejuízo</th>
            <th className="py-2 pr-3">Source</th>
            <th className="py-2 pr-3">Device</th>
            <th className="py-2 pr-3">Quando</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.sessionId} className="border-b border-border/40 last:border-0">
              <td className="py-2 pr-3 font-mono text-xs text-muted-foreground">
                {s.sessionId.slice(0, 12)}…
              </td>
              <td className="py-2 pr-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    s.stage.startsWith("Checkout")
                      ? "bg-accent/20 text-accent-foreground"
                      : s.stage === "Concluiu"
                        ? "bg-primary/15 text-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s.stage}
                </span>
              </td>
              <td className="py-2 pr-3 font-semibold">
                {s.loss != null ? `R$ ${Math.round(Number(s.loss)).toLocaleString("pt-BR")}` : "—"}
              </td>
              <td className="py-2 pr-3 text-muted-foreground">{s.source}</td>
              <td className="py-2 pr-3 text-muted-foreground">{s.device}</td>
              <td className="py-2 pr-3 text-xs text-muted-foreground">
                {new Date(s.time).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizAdmin;
