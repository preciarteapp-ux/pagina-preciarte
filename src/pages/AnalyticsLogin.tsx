import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, BarChart3, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ANALYTICS_PASSWORD = "Dhsc9205@";

const AnalyticsLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ANALYTICS_PASSWORD) {
      sessionStorage.setItem("analytics_authenticated", "true");
      sessionStorage.setItem("analytics_password", password);
      toast({
        title: "✅ Acesso Autorizado",
        description: "Redirecionando para o dashboard...",
      });
      navigate("/analytics");
    } else {
      toast({
        title: "❌ Senha Incorreta",
        description: "A senha digitada está incorreta.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-[var(--shadow-glow)]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BarChart3 className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Dashboard Analytics</CardTitle>
          <CardDescription>
            Digite a senha para acessar o painel de analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              variant="hero"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Acessar Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsLogin;
