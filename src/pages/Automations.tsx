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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AutomationCard } from "@/components/AutomationCard";
import { BottomSheet } from "@/components/BottomSheet";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { Button } from "@/components/ui/button";

const automations = [
  {
    id: 1,
    icon: Mail,
    title: "Important Email Digest",
    description: "Summarize and draft replies to only important emails each day",
    enabled: true,
    lastRun: "Today, 8:00 AM",
    nextRun: "Tomorrow, 8:00 AM",
    category: "email",
  },
  {
    id: 2,
    icon: Users,
    title: "Daily Hiring Updates",
    description: "Send hiring updates (offers, acceptances, CTCs) at 7PM daily",
    enabled: true,
    lastRun: "Today, 7:00 PM",
    nextRun: "Tomorrow, 7:00 PM",
    category: "email",
  },
  {
    id: 3,
    icon: Dumbbell,
    title: "Remind for Gym",
    description: "Remind me 1 day before gym session",
    enabled: false,
    category: "calendar",
  },
  {
    id: 4,
    icon: Bell,
    title: "Meeting Notes",
    description: "Send meeting notes 15mins before every meeting",
    enabled: true,
    lastRun: "Today, 9:00 AM",
    nextRun: "Tomorrow, 9:00 AM",
    category: "calendar",
  },
  {
    id: 5,
    icon: Plane,
    title: "Paris Flight Tracker",
    description: "Alert me on Paris flight price drops",
    enabled: false,
    category: "web",
  },
  {
    id: 6,
    icon: Baby,
    title: "School Manager",
    description: "Manage my kid's school schedule and updates",
    enabled: true,
    lastRun: "Yesterday",
    nextRun: "Daily",
    category: "calendar",
  },
  {
    id: 8,
    icon: Package,
    title: "Package Tracker",
    description: "Track all my package deliveries and notify me",
    enabled: false,
    category: "email",
  },
  {
    id: 9,
    icon: Stethoscope,
    title: "Doctor Appointment Finder",
    description: "Check my dentist's availability in next 10 days",
    enabled: false,
    category: "web",
  },
];

const galleryCategories = [
  {
    title: "Web",
    items: [
      { icon: TrendingUp, title: "Stock Price Alerts", description: "Monitor stock prices and get notified of changes" },
      { icon: Globe, title: "Website Change Monitor", description: "Track changes on specific websites automatically" },
      { icon: Music, title: "Concert Alerts", description: "Get notified when your favorite artists announce shows" },
      { icon: Stethoscope, title: "Doctor Appointment Finder", description: "Find available appointment slots at your doctor's office" },
      { icon: Droplet, title: "Water Bill Tracker", description: "Monitor water usage and predict monthly bills" },
      { icon: ShoppingCart, title: "Grocery Deals", description: "Find best deals on your regular grocery items" },
      { icon: Tv, title: "Streaming Service Tracker", description: "Track shows across multiple streaming platforms" },
      { icon: Utensils, title: "Restaurant Wait Times", description: "Check real-time wait times at favorite restaurants" },
      { icon: TrendingUp, title: "Competitor Monitoring", description: "Track competitor pricing and product launches" },
      { icon: Briefcase, title: "Job Posting Alerts", description: "Alert for job postings at target companies" },
      { icon: Users, title: "Social Media Monitor", description: "Track mentions and posts across social platforms" },
      { icon: FileText, title: "News Aggregator", description: "Curate news from favorite sources daily" },
      { icon: TrendingUp, title: "Cryptocurrency Tracker", description: "Monitor crypto portfolio and price alerts" },
      { icon: Clock, title: "Weather & Traffic Combo", description: "Morning commute optimization with weather" },
      { icon: Layout, title: "GitHub Activity Tracker", description: "Monitor repos, PRs, and issues" },
      { icon: Briefcase, title: "LinkedIn Job Scanner", description: "Track job postings matching your skills" },
      { icon: Users, title: "Reddit Trend Tracker", description: "Monitor specific subreddits for trends" },
      { icon: Music, title: "YouTube Playlist Manager", description: "Track new videos from subscribed channels" },
      { icon: Globe, title: "Domain & SSL Monitor", description: "Track domain expiration and SSL certificate status" },
      { icon: TrendingDown, title: "API Health Monitor", description: "Monitor your favorite APIs uptime status" },
    ],
  },
  {
    title: "Email",
    items: [
      { icon: Package, title: "Package Tracking", description: "Consolidate all shipping updates in one daily digest" },
      { icon: CreditCard, title: "Bill Payment Reminders", description: "Never miss a payment deadline with smart alerts" },
      { icon: ShoppingBag, title: "Amazon Order Summaries", description: "Weekly digest of orders, deliveries, and returns" },
      { icon: Building2, title: "Bank Alert Consolidation", description: "Organize transaction alerts from multiple banks" },
      { icon: Utensils, title: "Recipe Email Collection", description: "Save and organize recipes sent to your inbox" },
      { icon: Receipt, title: "Tax Document Collector", description: "Auto-file tax-related documents throughout the year" },
      { icon: FileText, title: "Expense Report Automation", description: "Extract receipts from emails and draft expense reports" },
      { icon: DollarSign, title: "Invoice Tracker", description: "Track client invoices and payment status automatically" },
      { icon: Calendar, title: "Meeting Request Handler", description: "Auto-respond to meeting requests with your availability" },
      { icon: Users, title: "Weekly Team Update", description: "Compile team updates from emails into weekly summary" },
      { icon: Clock, title: "Contract Renewal Alerts", description: "Remind 30 days before vendor contracts expire" },
    ],
  },
  {
    title: "Calendar",
    items: [
      { icon: Calendar, title: "Focus Time Blocker", description: "Automatically block focus time in your calendar" },
      { icon: Calendar, title: "Weekend Activity Planner", description: "Suggest and schedule weekend activities based on weather" },
      { icon: Car, title: "Car Maintenance Scheduler", description: "Schedule oil changes, tire rotations based on mileage" },
      { icon: Calendar, title: "Date Night Planner", description: "Auto-schedule date nights with restaurant suggestions" },
      { icon: Utensils, title: "Meal Prep Reminders", description: "Plan and schedule weekly meal preparation sessions" },
      { icon: Users, title: "1-on-1 Meeting Scheduler", description: "Auto-schedule recurring 1-on-1s with team members" },
      { icon: TrendingUp, title: "Quarterly Planning Blocks", description: "Block time for OKR and quarterly planning sessions" },
    ],
  },
  {
    title: "Smart Minions",
    items: [
      { icon: Music, title: "Concert Ticket Finder", description: "Auto-search for tickets when concerts are announced" },
      { icon: TrendingDown, title: "Price Drop Alert", description: "Track products and get alerted when prices drop" },
      { icon: Home, title: "Real Estate Scanner", description: "Monitor listings matching your home search criteria" },
      { icon: Utensils, title: "Restaurant Reservations", description: "Auto-book tables at favorite restaurants weekly" },
      { icon: Car, title: "Car Maintenance Reminder", description: "Track mileage and schedule maintenance automatically" },
      { icon: Droplet, title: "Water Usage Tracker", description: "Monitor daily water usage and suggest savings" },
      { icon: ShoppingCart, title: "Grocery List Sync", description: "Sync grocery lists across family members automatically" },
      { icon: Tv, title: "Streaming Watchlist", description: "Track shows and movies across all platforms" },
      { icon: Truck, title: "Moving Day Coordinator", description: "Coordinate utilities, address changes for moving day" },
      { icon: Briefcase, title: "Client Meeting Prep", description: "Compile notes, emails, docs before client meetings" },
      { icon: Layout, title: "Project Dashboard", description: "Daily project status across tools (Trello, Asana, Jira)" },
      { icon: Users, title: "Hiring Pipeline Tracker", description: "Track candidates, interviews, and offers in one place" },
      { icon: TrendingUp, title: "Sales Pipeline Monitor", description: "Weekly summary of deals in your sales pipeline" },
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
        <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-3xl sm:text-2xl font-bold text-foreground">AI Mins</h1>
              <p className="text-sm text-muted-foreground">
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
      <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-3">
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
                        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
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