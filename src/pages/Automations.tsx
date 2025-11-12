import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Calendar,
  Zap,
  Globe,
  ChevronRight,
  Plus,
  Package,
  CreditCard,
  Music,
  Stethoscope,
  ShoppingBag,
  Building2,
  Utensils,
  Car,
  Droplet,
  ShoppingCart,
  Tv,
  GraduationCap,
  Truck,
  FileText,
  Heart,
  Check,
  Plane,
  Users,
  DollarSign,
  Briefcase,
  Baby,
  Home,
  Dumbbell,
  Clock,
  TrendingUp,
  Bell,
  Receipt,
  Layout,
  TrendingDown,
  Film,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AutomationCard } from "@/components/AutomationCard";
import { BottomSheet } from "@/components/BottomSheet";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { Button } from "@/components/ui/button";

const automations = [
  {
    id: 1,
    icon: Film,
    title: "Movie Night Automation",
    description: "Find best movies & book 2 tickets every 2nd Friday at 7PM",
    enabled: true,
    lastRun: "Last Friday",
    nextRun: "Next Friday 7PM",
    category: "web",
  },
  {
    id: 2,
    icon: Utensils,
    title: "Sunday Dinner Reservations",
    description: "Book dinner every Sunday 7PM - rotating Japanese/Korean/Indian",
    enabled: true,
    lastRun: "Last Sunday",
    nextRun: "This Sunday 7PM",
    category: "web",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Auto-Pay Bills",
    description: "Automatically pay recurring bills before due date",
    enabled: true,
    lastRun: "Yesterday",
    nextRun: "Next bill: Dec 15",
    category: "email",
  },
  {
    id: 4,
    icon: Plane,
    title: "Flight Price & Auto-Book",
    description: "Track Paris flights, auto-book when below $600",
    enabled: true,
    lastRun: "1 hour ago",
    nextRun: "In 3 hours",
    category: "web",
  },
  {
    id: 5,
    icon: Package,
    title: "Package Tracking",
    description: "Consolidate all delivery updates in one place",
    enabled: true,
    lastRun: "30 mins ago",
    nextRun: "Continuous",
    category: "email",
  },
  {
    id: 6,
    icon: Bell,
    title: "Meeting Prep Notes",
    description: "Compile notes and context 15 minutes before meetings",
    enabled: false,
    category: "calendar",
  },
];

const galleryCategories = [
  {
    title: "Action Mins",
    items: [
      { icon: Film, title: "Movie Night Automation", description: "Find best-rated movies and book tickets every 2nd Friday" },
      { icon: Utensils, title: "Restaurant Reservations", description: "Book dinner every Sunday with rotating cuisines" },
      { icon: Music, title: "Concert Ticket Finder", description: "Alert and auto-book when favorite artists announce shows" },
      { icon: Plane, title: "Flight Price & Booker", description: "Track flights and auto-book when price drops below threshold" },
      { icon: Stethoscope, title: "Doctor Appointment Booker", description: "Check availability and book appointments automatically" },
      { icon: ShoppingCart, title: "Grocery Auto-Order", description: "Reorder weekly groceries from your last order" },
      { icon: Car, title: "Car Service Scheduler", description: "Book maintenance when due date approaches" },
      { icon: Dumbbell, title: "Gym Session Scheduler", description: "Auto-book 3 gym sessions per week at preferred times" },
      { icon: TrendingDown, title: "Price Drop Auto-Buy", description: "Auto-purchase when products drop below target price" },
    ],
  },
  {
    title: "Smart Scheduling",
    items: [
      { icon: Calendar, title: "Focus Time Blocker", description: "Automatically block calendar for deep work sessions" },
      { icon: Bell, title: "Meeting Prep Notes", description: "Compile notes and context 15 minutes before meetings" },
      { icon: Users, title: "1-on-1 Meeting Scheduler", description: "Schedule regular check-ins with your team" },
      { icon: Calendar, title: "Weekend Activity Planner", description: "Suggest and plan weekend activities based on weather" },
      { icon: Calendar, title: "Date Night Planner", description: "Plan and book date nights automatically" },
      { icon: Utensils, title: "Meal Prep Reminders", description: "Schedule meal planning and grocery shopping" },
    ],
  },
  {
    title: "Financial",
    items: [
      { icon: CreditCard, title: "Auto-Pay Bills", description: "Automatically pay recurring bills before due date" },
      { icon: DollarSign, title: "Subscription Optimizer", description: "Find cheaper alternatives to current subscriptions" },
      { icon: Building2, title: "Bank Alert Consolidation", description: "Summarize all bank notifications in one digest" },
      { icon: ShoppingBag, title: "Amazon Order Summaries", description: "Weekly summary of all Amazon purchases" },
      { icon: DollarSign, title: "Invoice Tracker", description: "Track and organize all invoices automatically" },
      { icon: FileText, title: "Expense Report Automation", description: "Auto-generate expense reports from receipts" },
      { icon: Receipt, title: "Tax Document Collector", description: "Organize all tax-related documents automatically" },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { icon: Package, title: "Package Tracking", description: "Consolidate all delivery tracking in one place" },
      { icon: TrendingUp, title: "Stock Price Alerts", description: "Get notified of significant stock price movements" },
      { icon: FileText, title: "News Aggregator", description: "Curated news digest based on your interests" },
      { icon: Briefcase, title: "Job Posting Alerts", description: "Get notified of relevant job postings" },
      { icon: ShoppingCart, title: "Grocery Deals", description: "Track deals on your frequently purchased items" },
      { icon: Home, title: "Real Estate Scanner", description: "Monitor new listings matching your criteria" },
    ],
  },
];

const Automations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [automationStates, setAutomationStates] = useState(
    automations.reduce((acc, auto) => ({ ...acc, [auto.id]: auto.enabled }), {})
  );
  const [addedAutomations, setAddedAutomations] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const tabs = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "email", label: "Emails" },
    { id: "calendar", label: "Calendar" },
  ];

  const filteredAutomations = activeTab === "all" 
    ? automations 
    : automations.filter(a => a.category === activeTab);

  const handleAddAutomation = (title: string) => {
    const automationKey = title.toLowerCase().replace(/\s+/g, '-');
    if (addedAutomations.has(automationKey)) {
      setAddedAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationKey);
        return newSet;
      });
      toast({
        title: "Automation removed",
        description: `${title} has been removed.`,
      });
    } else {
      setAddedAutomations(prev => new Set(prev).add(automationKey));
      toast({
        title: "Automation added",
        description: `${title} has been added successfully!`,
      });
    }
  };

  return (
    <div className="min-h-screen pt-safe pb-safe pb-20">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 pt-safe z-40">
        <div className="max-w-full sm:max-w-lg mx-auto px-6 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">AI Mins</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {automations.filter(a => automationStates[a.id]).length} active
              </p>
            </div>
            <Button
              onClick={() => setIsGalleryOpen(true)}
              size="icon"
              className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft min-h-[44px] min-w-[44px]"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 sm:px-4 sm:py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all min-h-[44px] sm:min-h-0 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Automations List */}
      <div className="max-w-full sm:max-w-lg mx-auto px-6 py-5 sm:py-6 space-y-3">
        {filteredAutomations.map((automation) => (
          <AutomationCard
            key={automation.id}
            icon={automation.icon}
            title={automation.title}
            description={automation.description}
            enabled={automationStates[automation.id]}
            lastRun={automation.lastRun}
            nextRun={automation.nextRun}
            onToggle={() => {
              setAutomationStates(prev => ({
                ...prev,
                [automation.id]: !prev[automation.id]
              }));
            }}
            onClick={() => navigate("/automation-detail", { state: { automation } })}
          />
        ))}
      </div>

      {/* Automation Gallery Bottom Sheet */}
      <BottomSheet
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        title="AI Mins in Demand"
      >
        <div className="space-y-8">
          {galleryCategories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <HorizontalScroll>
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const automationKey = item.title.toLowerCase().replace(/\s+/g, '-');
                  const isAdded = addedAutomations.has(automationKey);
                  return (
                    <div
                      key={itemIndex}
                      className="liquid-glass rounded-3xl p-5 min-w-[280px] max-w-[280px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex-shrink-0 border border-white/10"
                      style={{ 
                        transform: "translateZ(0)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)"
                      }}
                      onClick={() => handleAddAutomation(item.title)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <button
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isAdded 
                              ? 'bg-primary text-primary-foreground shadow-md' 
                              : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                          }`}
                        >
                          {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-2 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </HorizontalScroll>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default Automations;
