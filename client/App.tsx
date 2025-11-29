import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Workforce from "./pages/Workforce";
import Recruitment from "./pages/Recruitment";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import Turnover from "./pages/Turnover";
import Incidents from "./pages/Incidents";
import Departures from "./pages/Departures";
import Sector from "./pages/Sector";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/workforce" element={<Workforce />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/turnover" element={<Turnover />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/departures" element={<Departures />} />
            <Route path="/sector" element={<Sector />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
