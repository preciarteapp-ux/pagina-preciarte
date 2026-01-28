import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowDown } from "lucide-react";

interface ScrollFunnelProps {
  scrollFunnel: Record<number, number>;
  scrollDepthByPage: Record<string, number>;
}

const ScrollFunnel = ({ scrollFunnel, scrollDepthByPage }: ScrollFunnelProps) => {
  // Prepare funnel data
  const funnelData = [
    { milestone: "Topo", percent: 100, depth: 0 },
    { milestone: "25%", percent: scrollFunnel[25] || 0, depth: 25 },
    { milestone: "50%", percent: scrollFunnel[50] || 0, depth: 50 },
    { milestone: "75%", percent: scrollFunnel[75] || 0, depth: 75 },
    { milestone: "100%", percent: scrollFunnel[100] || 0, depth: 100 },
  ];

  // Calculate drop-off between milestones
  const getDropOff = (index: number) => {
    if (index === 0) return 0;
    return funnelData[index - 1].percent - funnelData[index].percent;
  };

  // Prepare scroll by page data
  const scrollByPageData = Object.entries(scrollDepthByPage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, depth]) => ({
      name: path === "/" ? "Home" : path,
      depth,
    }));

  // Color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 70) return "hsl(var(--primary))";
    if (percent >= 40) return "hsl(142, 76%, 36%)"; // emerald
    if (percent >= 20) return "hsl(45, 93%, 47%)"; // amber
    return "hsl(0, 84%, 60%)"; // red
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Visual Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Scroll</CardTitle>
          <CardDescription>
            Porcentagem de visitantes que chegaram a cada profundidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {funnelData.map((item, index) => (
              <div key={item.milestone}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.milestone}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.percent}%</span>
                    {index > 0 && getDropOff(index) > 0 && (
                      <span className="text-xs text-red-500">
                        -{ getDropOff(index)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: getColor(item.percent),
                      }}
                    >
                      {item.percent > 20 && (
                        <span className="text-xs text-white font-medium">
                          {item.percent}% dos visitantes
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-2">Interpretação:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(var(--primary))" }} />
                <span>≥70% - Excelente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span>40-69% - Bom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span>20-39% - Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500" />
                <span>&lt;20% - Baixo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scroll Depth by Page */}
      <Card>
        <CardHeader>
          <CardTitle>Scroll Médio por Página</CardTitle>
          <CardDescription>
            Profundidade média de rolagem em cada página
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {scrollByPageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scrollByPageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} unit="%" className="text-xs" />
                <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value}%`, "Scroll Médio"]}
                />
                <Bar dataKey="depth" radius={[0, 4, 4, 0]}>
                  {scrollByPageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.depth)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado de scroll disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Insights de Scroll</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top milestone reached */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Chegaram ao Fim (100%)
              </div>
              <div className="text-2xl font-bold text-primary">
                {scrollFunnel[100] || 0}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {(scrollFunnel[100] || 0) >= 20 
                  ? "Bom! O conteúdo está engajando." 
                  : "Considere melhorar o conteúdo abaixo da dobra."}
              </div>
            </div>

            {/* Biggest drop-off */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Maior Queda
              </div>
              <div className="text-2xl font-bold text-red-500">
                {Math.max(
                  getDropOff(1),
                  getDropOff(2),
                  getDropOff(3),
                  getDropOff(4)
                )}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Identifique o ponto de abandono
              </div>
            </div>

            {/* Half page milestone */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Chegaram a 50%
              </div>
              <div className="text-2xl font-bold text-emerald-500">
                {scrollFunnel[50] || 0}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Metade da página visualizada
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScrollFunnel;
