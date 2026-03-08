import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LP1 from "./pages/LP1";
import FAQ from "./pages/FAQ";
import AnalyticsLogin from "./pages/AnalyticsLogin";
import Analytics from "./pages/Analytics";
import LP2 from "./pages/LP2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lp1" element={<LP1 />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/analytics-login" element={<AnalyticsLogin />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/lp2" element={<LP2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
