import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, Target, MousePointerClick } from "lucide-react";

interface EngagementStatsProps {
  bounceRate: string;
  bounceRateByPage: Record<string, number>;
  avgScrollDepth: number;
  engagementScore: number;
  avgInteractionCount: number;
}

const EngagementStats = ({
  bounceRate,
  bounceRateByPage,
  avgScrollDepth,
  engagementScore,
  avgInteractionCount,
}: EngagementStatsProps) => {
  const bounceRateNum = parseFloat(bounceRate);
  
  // Prepare bounce rate by page chart data
  const bounceByPageData = Object.entries(bounceRateByPage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, rate]) => ({
      name: path === "/" ? "Home" : path,
      rate,
    }));

  // Determine engagement level
  const getEngagementLevel = (score: number) => {
    if (score >= 70) return { label: "Alto", color: "text-emerald-500", bg: "bg-emerald-500" };
    if (score >= 40) return { label: "Médio", color: "text-amber-500", bg: "bg-amber-500" };
    return { label: "Baixo", color: "text-red-500", bg: "bg-red-500" };
  };

  const engagement = getEngagementLevel(engagementScore);

  // Bounce rate color
  const getBounceRateColor = (rate: number) => {
    if (rate <= 30) return "text-emerald-500";
    if (rate <= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getBounceRateColor(bounceRateNum)}`}>
              {bounceRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {bounceRateNum <= 30 ? "Excelente!" : bounceRateNum <= 50 ? "Bom" : "Precisa melhorar"}
            </p>
            <Progress 
              value={100 - bounceRateNum} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scroll Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {avgScrollDepth}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              da página visualizada
            </p>
            <Progress value={avgScrollDepth} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${engagement.color}`}>
              {engagement.label}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Score: {engagementScore}/100
            </p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${engagement.bg} transition-all duration-500`}
                style={{ width: `${engagementScore}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interações Médias</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {avgInteractionCount.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              cliques por visita
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bounce Rate by Page */}
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Rejeição por Página</CardTitle>
          <CardDescription>
            Comparação da taxa de rejeição entre páginas (menor é melhor)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {bounceByPageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bounceByPageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} unit="%" className="text-xs" />
                <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value}%`, "Taxa de Rejeição"]}
                />
                <Bar 
                  dataKey="rate" 
                  fill="hsl(var(--destructive))" 
                  radius={[0, 4, 4, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado de rejeição disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Engagement Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas para Melhorar o Engajamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {bounceRateNum > 50 && (
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="font-medium text-red-500 mb-1">Reduzir Taxa de Rejeição</div>
                <p className="text-muted-foreground">
                  Melhore o tempo de carregamento e adicione CTAs mais claros acima da dobra.
                </p>
              </div>
            )}
            {avgScrollDepth < 50 && (
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="font-medium text-amber-500 mb-1">Aumentar Scroll Depth</div>
                <p className="text-muted-foreground">
                  Adicione conteúdo visual interessante ao longo da página para manter o usuário engajado.
                </p>
              </div>
            )}
            {avgInteractionCount < 2 && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="font-medium text-blue-500 mb-1">Aumentar Interações</div>
                <p className="text-muted-foreground">
                  Adicione elementos interativos como botões, formulários ou acordeões.
                </p>
              </div>
            )}
            {engagementScore >= 70 && (
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="font-medium text-emerald-500 mb-1">Excelente Engajamento!</div>
                <p className="text-muted-foreground">
                  Seu site está performando muito bem. Continue otimizando!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementStats;
