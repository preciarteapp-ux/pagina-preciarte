import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  LogOut,
  RefreshCw,
  Calendar,
  Filter,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import HeatmapOverlay from "@/components/analytics/HeatmapOverlay";
import OnlineCounter from "@/components/analytics/OnlineCounter";
import GeographyStats from "@/components/analytics/GeographyStats";
import DeviceStats from "@/components/analytics/DeviceStats";
import TimeStats from "@/components/analytics/TimeStats";

const CHART_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface OnlineSession {
  city: string | null;
  country: string | null;
  page: string;
}

interface AnalyticsData {
  totalViews: number;
  uniqueSessions: number;
  visitsToday: number;
  totalClicks: number;
  ctr: string;
  clicksByButton: Record<string, { count: number; text: string; type: string }>;
  viewsByPage: Record<string, number>;
  viewsByDay: Record<string, number>;
  viewsByHour: Record<number, number>;
  utmSources: Record<string, number>;
  recentVisits: Array<{
    page_path: string;
    created_at: string;
    referrer: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
  }>;
  mouseMovements: Array<{ x: number; y: number; page_path: string }>;
  buttonClicks: Array<{
    x: number;
    y: number;
    page_path: string;
    viewport_width: number;
    viewport_height: number;
  }>;
  // Geography data
  viewsByCountry: Record<string, number>;
  viewsByRegion: Record<string, number>;
  viewsByCity: Record<string, number>;
  countryCodes: Record<string, string>;
  // Online data
  onlineNow: number;
  onlineDetails: OnlineSession[];
  // Time on page data
  avgTimeOnPage: number;
  avgTimeByPage: Record<string, number>;
  // Device data
  viewsByDevice: Record<string, number>;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30days");
  const [pagePath, setPagePath] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem("analytics_authenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/analytics-login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate, period, pagePath]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const password = sessionStorage.getItem("analytics_password");
      const response = await supabase.functions.invoke("analytics-data", {
        body: { password, period, page_path: pagePath },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("analytics_authenticated");
    sessionStorage.removeItem("analytics_password");
    navigate("/analytics-login");
  };

  if (!isAuthenticated) {
    return null;
  }

  // Prepare chart data
  const viewsByDayData = data
    ? Object.entries(data.viewsByDay)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, views]) => ({
          date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
          views,
        }))
    : [];

  const viewsByPageData = data
    ? Object.entries(data.viewsByPage).map(([path, views]) => ({
        name: path === "/" ? "Home" : path,
        value: views,
      }))
    : [];

  const clicksByButtonData = data
    ? Object.entries(data.clicksByButton)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 10)
        .map(([id, info]) => ({
          name: info.text?.substring(0, 20) || id.substring(0, 20),
          clicks: info.count,
          type: info.type,
        }))
    : [];

  const viewsByHourData = data
    ? Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}h`,
        views: data.viewsByHour[i] || 0,
      }))
    : [];

  const utmSourcesData = data
    ? Object.entries(data.utmSources)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([source, count]) => ({
          name: source,
          value: count,
        }))
    : [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Analytics</h1>
          <p className="text-muted-foreground">Acompanhe as métricas do seu site em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={pagePath} onValueChange={setPagePath}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="/">Home (/)</SelectItem>
              <SelectItem value="/lp1">LP1 (/lp1)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visitas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalViews || 0}</div>
            <p className="text-xs text-muted-foreground">
              {data?.uniqueSessions || 0} sessões únicas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Hoje</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.visitsToday || 0}</div>
            <p className="text-xs text-muted-foreground">pageviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalClicks || 0}</div>
            <p className="text-xs text-muted-foreground">em botões e links</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.avgTimeOnPage 
                ? data.avgTimeOnPage < 60 
                  ? `${Math.round(data.avgTimeOnPage)}s`
                  : `${Math.floor(data.avgTimeOnPage / 60)}m ${Math.round(data.avgTimeOnPage % 60)}s`
                : "0s"}
            </div>
            <p className="text-xs text-muted-foreground">por visita</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos</CardTitle>
            <div className="flex gap-1">
              <Monitor className="h-3 w-3 text-muted-foreground" />
              <Smartphone className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1">
                <Monitor className="h-3 w-3 text-primary" />
                {data?.viewsByDevice?.desktop || 0}
              </span>
              <span className="flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-accent" />
                {data?.viewsByDevice?.mobile || 0}
              </span>
              <span className="flex items-center gap-1">
                <Tablet className="h-3 w-3 text-emerald-500" />
                {data?.viewsByDevice?.tablet || 0}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">por tipo</p>
          </CardContent>
        </Card>
        <OnlineCounter 
          count={data?.onlineNow || 0} 
          sessions={data?.onlineDetails || []} 
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="buttons">Botões</TabsTrigger>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="geography">Geografia</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="time">Tempo</TabsTrigger>
          <TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Views by Day */}
            <Card>
              <CardHeader>
                <CardTitle>Visitas por Dia</CardTitle>
                <CardDescription>Evolução das visitas no período selecionado</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsByDayData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Views by Page */}
            <Card>
              <CardHeader>
                <CardTitle>Visitas por Página</CardTitle>
                <CardDescription>Distribuição de acessos entre páginas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={viewsByPageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {viewsByPageData.map((_, index) => (
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
              </CardContent>
            </Card>

            {/* Views by Hour */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Acessos por Hora</CardTitle>
                <CardDescription>Horários de maior atividade</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewsByHourData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Clicks by Button */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Botões Mais Clicados</CardTitle>
                <CardDescription>Ranking dos botões por quantidade de cliques</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clicksByButtonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" width={150} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="clicks" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Button clicks table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detalhes dos Botões</CardTitle>
                <CardDescription>Todos os botões rastreados com suas estatísticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Botão</th>
                        <th className="text-left py-2 font-medium">Tipo</th>
                        <th className="text-right py-2 font-medium">Cliques</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        Object.entries(data.clicksByButton)
                          .sort((a, b) => b[1].count - a[1].count)
                          .map(([id, info]) => (
                            <tr key={id} className="border-b border-border/50">
                              <td className="py-2">{info.text || id}</td>
                              <td className="py-2 text-muted-foreground">{info.type}</td>
                              <td className="py-2 text-right font-medium">{info.count}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* UTM Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego (UTM)</CardTitle>
                <CardDescription>De onde vêm seus visitantes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {utmSourcesData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={utmSourcesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {utmSourcesData.map((_, index) => (
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
                    Nenhum dado de UTM disponível
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Visits */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Visitas</CardTitle>
                <CardDescription>Visitantes mais recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {data?.recentVisits.map((visit, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50">
                      <div>
                        <div className="font-medium">{visit.page_path}</div>
                        <div className="text-xs text-muted-foreground">
                          {visit.utm_source && `utm: ${visit.utm_source}`}
                          {visit.referrer && ` • ref: ${visit.referrer.substring(0, 30)}...`}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(visit.created_at).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <GeographyStats
            viewsByCountry={data?.viewsByCountry || {}}
            viewsByRegion={data?.viewsByRegion || {}}
            viewsByCity={data?.viewsByCity || {}}
            countryCodes={data?.countryCodes || {}}
          />
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <DeviceStats viewsByDevice={data?.viewsByDevice || {}} />
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <TimeStats 
            avgTimeOnPage={data?.avgTimeOnPage || 0}
            avgTimeByPage={data?.avgTimeByPage || {}}
          />
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <HeatmapOverlay
            clicks={data?.buttonClicks || []}
            mouseMovements={data?.mouseMovements || []}
            pagePath={pagePath}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
