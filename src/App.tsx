import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LP1 from "./pages/LP1";
import FAQ from "./pages/FAQ";
import LP2 from "./pages/LP2";
import LP3 from "./pages/LP3";
import Quiz from "./pages/Quiz";
import Tiktok from "./pages/Tiktok";
import LP4 from "./pages/LP4";
import LP5 from "./pages/LP5";
import LP6 from "./pages/LP6";
import LP7 from "./pages/LP7";
import Mae from "./pages/Mae";
import Trial from "./pages/Trial";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { persistUtmsFromUrl, persistAllParamsFromUrl } from "@/lib/checkout";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    persistUtmsFromUrl();
    persistAllParamsFromUrl();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lp1" element={<LP1 />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/lp2" element={<LP2 />} />
          <Route path="/lp3" element={<LP3 />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tiktok" element={<Tiktok />} />
          <Route path="/lp4" element={<LP4 />} />
          <Route path="/lp5" element={<LP5 />} />
          <Route path="/lp6" element={<LP6 />} />
          <Route path="/lp7" element={<LP7 />} />
          <Route path="/mae" element={<Mae />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/obrigado" element={<Obrigado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
