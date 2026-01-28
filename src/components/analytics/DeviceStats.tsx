import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DeviceStatsProps {
  viewsByDevice: Record<string, number>;
}

const DEVICE_COLORS: Record<string, string> = {
  desktop: "hsl(var(--primary))",
  mobile: "hsl(var(--accent))",
  tablet: "#10b981",
};

const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <Monitor className="h-5 w-5" />,
  mobile: <Smartphone className="h-5 w-5" />,
  tablet: <Tablet className="h-5 w-5" />,
};

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
};

const DeviceStats = ({ viewsByDevice }: DeviceStatsProps) => {
  const total = Object.values(viewsByDevice).reduce((sum, val) => sum + val, 0);
  
  const chartData = Object.entries(viewsByDevice)
    .filter(([_, count]) => count > 0)
    .map(([device, count]) => ({
      name: DEVICE_LABELS[device] || device,
      value: count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(1) : "0",
      color: DEVICE_COLORS[device] || "hsl(var(--muted))",
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Device Distribution Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Dispositivo</CardTitle>
          <CardDescription>Tipos de dispositivos dos visitantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["desktop", "mobile", "tablet"].map((device) => {
              const count = viewsByDevice[device] || 0;
              const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
              const widthPercent = total > 0 ? (count / total) * 100 : 0;
              
              return (
                <div key={device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ color: DEVICE_COLORS[device] }}>
                        {DEVICE_ICONS[device]}
                      </span>
                      <span className="font-medium">{DEVICE_LABELS[device]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{count} visitas</span>
                      <span className="font-bold">{percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${widthPercent}%`,
                        backgroundColor: DEVICE_COLORS[device]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Dispositivos</CardTitle>
          <CardDescription>Visualização proporcional</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value} visitas`, "Total"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado de dispositivo disponível
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceStats;
