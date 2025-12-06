import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Diagnostic from "./pages/Diagnostic";
import ResultatsDiagnostic from "./pages/ResultatsDiagnostic";
import Comparateur from "./pages/Comparateur";
import CarteCliniques from "./pages/CarteCliniques";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import APropos from "./pages/APropos";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ChatConversation from "./pages/ChatConversation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Simulateurs from "./pages/Simulateurs";
import SimulateurRemboursement from "./pages/SimulateurRemboursement";
import SimulateurCoutPays from "./pages/SimulateurCoutPays";
import SimulateurChancesSucces from "./pages/SimulateurChancesSucces";
import SimulateurBudgetGlobal from "./pages/SimulateurBudgetGlobal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/resultats-diagnostic" element={<ResultatsDiagnostic />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/carte-cliniques" element={<CarteCliniques />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:conversationId" element={<ChatConversation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/simulateurs" element={<Simulateurs />} />
          <Route path="/simulateurs/remboursement" element={<SimulateurRemboursement />} />
          <Route path="/simulateurs/cout-pays" element={<SimulateurCoutPays />} />
          <Route path="/simulateurs/chances-succes" element={<SimulateurChancesSucces />} />
          <Route path="/simulateurs/budget-global" element={<SimulateurBudgetGlobal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
