import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Click {
  x: number;
  y: number;
  page_path: string;
  viewport_width: number;
  viewport_height: number;
}

interface MouseMovement {
  x: number;
  y: number;
  page_path: string;
}

interface HeatmapOverlayProps {
  clicks: Click[];
  mouseMovements: MouseMovement[];
  pagePath: string;
}

const HeatmapOverlay = ({ clicks, mouseMovements, pagePath }: HeatmapOverlayProps) => {
  const [selectedPage, setSelectedPage] = useState<string>(pagePath === "all" ? "/" : pagePath);
  const [heatmapType, setHeatmapType] = useState<"clicks" | "movement">("clicks");

  // Filter data by selected page
  const filteredClicks = useMemo(
    () => clicks.filter((c) => selectedPage === "all" || c.page_path === selectedPage),
    [clicks, selectedPage]
  );

  const filteredMovements = useMemo(
    () => mouseMovements.filter((m) => selectedPage === "all" || m.page_path === selectedPage),
    [mouseMovements, selectedPage]
  );

  // Create heatmap grid - increased resolution for smoother visualization
  const gridSize = 40; // 40x40 grid for smoother heatmap
  const heatmapGrid = useMemo(() => {
    const grid: number[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );

    const dataPoints = heatmapType === "clicks" ? filteredClicks : filteredMovements;

    // Normalize to grid
    dataPoints.forEach((point) => {
      // Use viewport dimensions if available, otherwise use common screen size
      let viewportWidth = 1920;
      let viewportHeight = 1080;
      
      if ("viewport_width" in point && typeof point.viewport_width === "number") {
        viewportWidth = point.viewport_width;
      }
      if ("viewport_height" in point && typeof point.viewport_height === "number") {
        viewportHeight = point.viewport_height;
      }

      const gridX = Math.floor((point.x / viewportWidth) * gridSize);
      const gridY = Math.floor((point.y / viewportHeight) * gridSize);

      if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
        grid[gridY][gridX]++;
      }
    });

    return grid;
  }, [filteredClicks, filteredMovements, heatmapType]);

  // Find max value for color scaling
  const maxValue = useMemo(() => {
    let max = 0;
    heatmapGrid.forEach((row) => {
      row.forEach((val) => {
        if (val > max) max = val;
      });
    });
    return max || 1;
  }, [heatmapGrid]);

  // Get color for cell with smoother gradient
  const getCellColor = (value: number) => {
    if (value === 0) return "transparent";
    const intensity = value / maxValue;
    
    // Smooth gradient from blue -> green -> yellow -> orange -> red
    if (intensity < 0.2) {
      return `rgba(59, 130, 246, ${0.2 + intensity * 1.5})`; // Blue
    } else if (intensity < 0.4) {
      return `rgba(34, 197, 94, ${0.3 + intensity * 1.2})`; // Green
    } else if (intensity < 0.6) {
      return `rgba(234, 179, 8, ${0.4 + intensity})`; // Yellow
    } else if (intensity < 0.8) {
      return `rgba(249, 115, 22, ${0.5 + intensity * 0.5})`; // Orange
    } else {
      return `rgba(239, 68, 68, ${0.7 + intensity * 0.3})`; // Red
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Mapa de Calor</CardTitle>
            <CardDescription>
              Visualize onde os usuários mais interagem
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="/">Home (/)</SelectItem>
                <SelectItem value="/lp1">LP1 (/lp1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={heatmapType} onValueChange={(v) => setHeatmapType(v as "clicks" | "movement")}>
          <TabsList className="mb-4">
            <TabsTrigger value="clicks">
              Cliques ({filteredClicks.length})
            </TabsTrigger>
            <TabsTrigger value="movement">
              Movimentos ({filteredMovements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={heatmapType}>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              {/* Heatmap Grid */}
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
              >
              {heatmapGrid.map((row, rowIndex) =>
                  row.map((value, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="transition-colors duration-300"
                      style={{
                        backgroundColor: getCellColor(value),
                        filter: value > 0 ? "blur(3px)" : "none",
                      }}
                      title={`${value} ${heatmapType === "clicks" ? "cliques" : "movimentos"}`}
                    />
                  ))
                )}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                <div className="flex items-center gap-2 mb-2 font-medium">Intensidade</div>
                <div className="flex gap-1">
                  <div className="w-6 h-4 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 0.5)" }} />
                  <div className="w-6 h-4 rounded" style={{ backgroundColor: "rgba(34, 197, 94, 0.6)" }} />
                  <div className="w-6 h-4 rounded" style={{ backgroundColor: "rgba(249, 115, 22, 0.7)" }} />
                  <div className="w-6 h-4 rounded" style={{ backgroundColor: "rgba(239, 68, 68, 0.9)" }} />
                </div>
                <div className="flex justify-between mt-1 text-muted-foreground">
                  <span>Baixa</span>
                  <span>Alta</span>
                </div>
              </div>

              {/* Page label */}
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
                Página: {selectedPage}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-muted-foreground">Total de Pontos</div>
                <div className="text-xl font-bold">
                  {heatmapType === "clicks" ? filteredClicks.length : filteredMovements.length}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-muted-foreground">Área Mais Ativa</div>
                <div className="text-xl font-bold">
                  {(() => {
                    let maxRow = 0,
                      maxCol = 0,
                      maxVal = 0;
                    heatmapGrid.forEach((row, ri) => {
                      row.forEach((val, ci) => {
                        if (val > maxVal) {
                          maxVal = val;
                          maxRow = ri;
                          maxCol = ci;
                        }
                      });
                    });
                    return maxVal > 0 ? `(${maxCol + 1}, ${maxRow + 1})` : "-";
                  })()}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-muted-foreground">Máx. por Célula</div>
                <div className="text-xl font-bold">{maxValue}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-muted-foreground">Células Ativas</div>
                <div className="text-xl font-bold">
                  {heatmapGrid.flat().filter((v) => v > 0).length} / {gridSize * gridSize}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HeatmapOverlay;
