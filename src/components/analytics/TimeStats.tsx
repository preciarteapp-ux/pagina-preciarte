import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TimeStatsProps {
  avgTimeOnPage: number;
  avgTimeByPage: Record<string, number>;
}

const formatTime = (seconds: number): string => {
  if (!seconds || seconds <= 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};

const TimeStats = ({ avgTimeOnPage, avgTimeByPage }: TimeStatsProps) => {
  const chartData = Object.entries(avgTimeByPage)
    .filter(([_, time]) => time > 0)
    .map(([page, time]) => ({
      name: page === "/" ? "Home" : page,
      segundos: Math.round(time),
      formatted: formatTime(time),
    }))
    .sort((a, b) => b.segundos - a.segundos);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Average Time Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Tempo Médio na Página
          </CardTitle>
          <CardDescription>Média de tempo que visitantes ficam no site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-5xl font-bold text-primary mb-2">
              {formatTime(avgTimeOnPage)}
            </div>
            <p className="text-muted-foreground">por visita</p>
          </div>
          
          {chartData.length > 0 && (
            <div className="space-y-3 mt-4 border-t pt-4">
              <p className="text-sm font-medium text-muted-foreground">Por Página:</p>
              {chartData.map(({ name, segundos, formatted }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ 
                          width: `${avgTimeOnPage > 0 ? Math.min((segundos / avgTimeOnPage) * 50, 100) : 0}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-16 text-right">{formatted}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time by Page Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tempo por Página</CardTitle>
          <CardDescription>Comparativo de engajamento entre páginas</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" width={80} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [formatTime(value), "Tempo médio"]}
                />
                <Bar 
                  dataKey="segundos" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                  name="Tempo (s)"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado de tempo disponível
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeStats;
