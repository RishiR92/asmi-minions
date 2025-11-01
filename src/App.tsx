import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Automations from "./pages/Automations";
import MailHub from "./pages/MailHub";
import EmailList from "./pages/EmailList";
import CalendarView from "./pages/CalendarView";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { GestureNav } from "./components/GestureNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/mail" element={<MailHub />} />
            <Route path="/mail/:filter" element={<EmailList />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <GestureNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
