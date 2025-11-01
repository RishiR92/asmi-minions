import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Zap, Mail, Calendar, Clock, Bell, 
  TrendingUp, FileText, Heart, Plus, Check,
  Globe, Plane, Users, DollarSign, Briefcase,
  Baby, Home, Package, Dumbbell
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
    category: "internet",
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
    id: 7,
    icon: Package,
    title: "Package Tracker",
    description: "Track all my package deliveries and notify me",
    enabled: false,
    category: "internet",
  },
  {
    id: 8,
    icon: DollarSign,
    title: "Bill Reminders",
    description: "Remind me 3 days before bills are due",
    enabled: true,
    lastRun: "Today",
    nextRun: "Thursday",
    category: "internet",
  },
];

const galleryCategories = [
  {
    title: "Email Automations",
    items: [
      { icon: Mail, title: "Important Email Digest", description: "Daily summary of important emails" },
      { icon: Users, title: "Hiring Update Emails", description: "Daily hiring updates at 7PM" },
      { icon: FileText, title: "Newsletter Summaries", description: "Weekly newsletter digests" },
      { icon: Bell, title: "Email Reminders", description: "Smart email follow-up reminders" },
      { icon: TrendingUp, title: "Priority Email Sorting", description: "Auto-categorize important emails" },
    ],
  },
  {
    title: "Calendar Automations",
    items: [
      { icon: Calendar, title: "Meeting Prep", description: "Prep notes 15mins before meetings" },
      { icon: Dumbbell, title: "Gym Reminders", description: "Remind 1 day before gym" },
      { icon: Clock, title: "Focus Time Blocker", description: "Block calendar for deep work" },
      { icon: Baby, title: "School Schedule Manager", description: "Manage kid's school calendar" },
      { icon: Heart, title: "Weekend Activity Planner", description: "Plan weekend activities" },
    ],
  },
  {
    title: "Internet Automations",
    items: [
      { icon: Plane, title: "Flight Price Alerts", description: "Track flight prices and alert" },
      { icon: Package, title: "Package Tracking", description: "Track all deliveries" },
      { icon: DollarSign, title: "Bill Payment Reminders", description: "Remind before bills due" },
      { icon: TrendingUp, title: "Stock Price Alerts", description: "Monitor stocks and alert" },
      { icon: Globe, title: "Website Change Monitor", description: "Track website updates" },
    ],
  },
  {
    title: "Smart Automations",
    items: [
      { icon: Baby, title: "Complete School Manager", description: "Calendar + email for school" },
      { icon: Plane, title: "Trip Organizer", description: "Organize all trip details" },
      { icon: Home, title: "Home Project Manager", description: "Track home projects" },
      { icon: Briefcase, title: "Work Dashboard", description: "Daily work summary and prep" },
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
    { id: "email", label: "Emails" },
    { id: "calendar", label: "Calendar" },
    { id: "internet", label: "Internet" },
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
              <h1 className="text-3xl sm:text-2xl font-bold text-foreground">Automations</h1>
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
        {filteredAutomations.map((automation, index) => (
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
            delay={index * 0.05}
          />
        ))}
      </div>

      {/* Automation Gallery Bottom Sheet */}
      <BottomSheet
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        title="Automation Gallery"
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
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="glass rounded-2xl p-4 min-w-[220px] snap-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex-shrink-0"
                      onClick={() => handleAddAutomation(item.title)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-medium">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isAdded 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </motion.button>
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
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