import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface OnlineSession {
  city: string | null;
  country: string | null;
  page: string;
}

interface OnlineCounterProps {
  count: number;
  sessions: OnlineSession[];
}

const OnlineCounter = ({ count, sessions }: OnlineCounterProps) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Online Agora</CardTitle>
        <div className="relative">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-green-600">{count}</div>
          <span className="text-sm text-muted-foreground">
            {count === 1 ? "pessoa" : "pessoas"} online
          </span>
        </div>
        
        {sessions.length > 0 && (
          <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
            <p className="text-xs text-muted-foreground font-medium">Visitantes:</p>
            {sessions.slice(0, 5).map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1"
              >
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {session.city || "Desconhecido"}, {session.country || "??"}
                </span>
                <span className="text-muted-foreground">{session.page}</span>
              </div>
            ))}
            {sessions.length > 5 && (
              <p className="text-xs text-muted-foreground text-center">
                +{sessions.length - 5} mais
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnlineCounter;
