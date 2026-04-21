import { Card, CardContent } from "@/components/ui/card";
import { Play, CheckCircle2, MousePointerClick, TrendingUp } from "lucide-react";

interface Stats {
  started: number;
  completed: number;
  completionRate: number;
  checkoutClicks: number;
  checkoutSessions: number;
  checkoutRate: number;
}

const QuizKPICards = ({ stats }: { stats: Stats }) => {
  const cards = [
    {
      label: "Iniciaram o quiz",
      value: stats.started.toLocaleString("pt-BR"),
      icon: Play,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Concluíram",
      value: stats.completed.toLocaleString("pt-BR"),
      sub: `${stats.completionRate.toFixed(1)}% de conclusão`,
      icon: CheckCircle2,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Cliques em checkout",
      value: stats.checkoutClicks.toLocaleString("pt-BR"),
      sub: `${stats.checkoutSessions} sessões únicas`,
      icon: MousePointerClick,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Conv. resultado → checkout",
      value: `${stats.checkoutRate.toFixed(1)}%`,
      sub: "% de quem viu o resultado",
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="p-4">
            <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.bg}`}>
              <c.icon className={`h-4 w-4 ${c.color}`} />
            </div>
            <div className="text-xs font-medium text-muted-foreground">{c.label}</div>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">{c.value}</div>
            {c.sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{c.sub}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuizKPICards;
