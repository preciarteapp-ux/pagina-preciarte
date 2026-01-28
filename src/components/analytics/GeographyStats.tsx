import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CHART_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1"];

// Country code to flag emoji
const getCountryFlag = (countryCode: string | null): string => {
  if (!countryCode) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

interface GeographyStatsProps {
  viewsByCountry: Record<string, number>;
  viewsByRegion: Record<string, number>;
  viewsByCity: Record<string, number>;
  countryCodes: Record<string, string>;
}

const GeographyStats = ({
  viewsByCountry,
  viewsByRegion,
  viewsByCity,
  countryCodes,
}: GeographyStatsProps) => {
  const countryData = Object.entries(viewsByCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, views]) => ({
      name: country,
      views,
      flag: getCountryFlag(countryCodes[country] || null),
    }));

  const regionData = Object.entries(viewsByRegion)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([region, value]) => ({
      name: region || "Desconhecido",
      value,
    }));

  const cityData = Object.entries(viewsByCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([city, views]) => ({
      name: city || "Desconhecido",
      views,
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Countries Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top 10 Países</CardTitle>
          <CardDescription>Visitantes por país de origem</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {countryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  className="text-xs"
                  tickFormatter={(value, index) => {
                    const item = countryData[index];
                    return item ? `${item.flag} ${value}` : value;
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value} visitas`, "Visitas"]}
                />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado geográfico disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Regions Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Região</CardTitle>
          <CardDescription>Estados/Regiões mais acessados</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {regionData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name.substring(0, 15)} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {regionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cities Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Cidades</CardTitle>
          <CardDescription>Cidades com mais visitantes</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {cityData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [`${value} visitas`, "Visitas"]}
                />
                <Bar dataKey="views" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum dado disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Table */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Detalhes por Localização</CardTitle>
          <CardDescription>Tabela completa com país, região e cidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">País</th>
                  <th className="text-right py-2 font-medium">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(viewsByCountry)
                  .sort((a, b) => b[1] - a[1])
                  .map(([country, views]) => (
                    <tr key={country} className="border-b border-border/50">
                      <td className="py-2">
                        {getCountryFlag(countryCodes[country] || null)} {country}
                      </td>
                      <td className="py-2 text-right font-medium">{views}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeographyStats;
