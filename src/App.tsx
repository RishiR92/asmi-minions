import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Automations from "./pages/Automations";
import AutomationDetail from "./pages/AutomationDetail";
import MailHub from "./pages/MailHub";
import EmailList from "./pages/EmailList";
import CalendarView from "./pages/CalendarView";
import Payments from "./pages/Payments";
import Bills from "./pages/Bills";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import Profile from "./pages/Profile";
import Today from "./pages/Today";
import Work from "./pages/Work";
import Family from "./pages/Family";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";

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
            <Route path="/demo" element={<Demo />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/automation-detail" element={<AutomationDetail />} />
            <Route path="/today" element={<Today />} />
            <Route path="/work" element={<Work />} />
            <Route path="/family" element={<Family />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/mail" element={<MailHub />} />
            <Route path="/mail/:filter" element={<EmailList />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/subscription-detail" element={<SubscriptionDetail />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
