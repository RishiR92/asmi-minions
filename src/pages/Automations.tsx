import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Mail, Calendar, Clock, Bell, 
  TrendingUp, FileText, Heart, Plus, Check,
  Globe, Plane, Users, DollarSign, Briefcase,
  Baby, Home, Package
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
    description: "Summarize and draft replies to important emails daily",
    enabled: true,
    lastRun: "Today, 8:00 AM",
    nextRun: "Tomorrow, 8:00 AM",
    category: "email",
    type: "personal",
  },
  {
    id: 2,
    icon: Users,
    title: "Daily Hiring Updates",
    description: "Send hiring updates (offers, CTCs) at 7PM daily",
    enabled: true,
    lastRun: "Today, 7:00 PM",
    nextRun: "Tomorrow, 7:00 PM",
    category: "email",
    type: "work",
  },
  {
    id: 3,
    icon: Calendar,
    title: "Gym Session Planner",
    description: "Plan my gym sessions this week",
    enabled: false,
    category: "calendar",
    type: "personal",
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Meeting Prep Assistant",
    description: "Prep me for key meetings with context and agenda",
    enabled: true,
    lastRun: "Today, 9:00 AM",
    nextRun: "Tomorrow, 9:00 AM",
    category: "calendar",
    type: "work",
  },
  {
    id: 5,
    icon: Plane,
    title: "Paris Flight Tracker",
    description: "Alert me on Paris flight price drops",
    enabled: false,
    category: "internet",
    type: "personal",
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
    type: "personal",
  },
];

const galleryCategories = [
  {
    title: "Work Automations",
    items: [
      { icon: Users, title: "Daily Hiring Updates", description: "Send hiring updates at 7PM daily", type: "work" },
      { icon: Briefcase, title: "Meeting Prep Assistant", description: "Prep for key meetings automatically", type: "work" },
      { icon: FileText, title: "Invoice Processing", description: "Auto-forward invoices to accountant", type: "work" },
      { icon: Bell, title: "Team Standup Scheduler", description: "Schedule daily team standups", type: "work" },
      { icon: Clock, title: "Focus Time Blocker", description: "Block calendar for deep work", type: "work" },
      { icon: TrendingUp, title: "Competitor Monitoring", description: "Track competitor website changes", type: "work" },
    ],
  },
  {
    title: "Personal Automations",
    items: [
      { icon: Mail, title: "Important Email Digest", description: "Daily summary of important emails", type: "personal" },
      { icon: Calendar, title: "Gym Session Planner", description: "Plan gym sessions for the week", type: "personal" },
      { icon: Plane, title: "Flight Price Tracker", description: "Alert on flight price drops", type: "personal" },
      { icon: FileText, title: "Newsletter Summary", description: "Summarize newsletters weekly", type: "personal" },
      { icon: Heart, title: "Weekend Planner", description: "Plan weekend activities", type: "personal" },
      { icon: Package, title: "Package Delivery Updates", description: "Track all package deliveries", type: "personal" },
    ],
  },
  {
    title: "Complex/Smart Automations",
    items: [
      { icon: Baby, title: "Manage My Kid's School", description: "Calendar + email automation for school", type: "personal" },
      { icon: Plane, title: "Paris Trip Organizer", description: "Organize everything for Paris trip", type: "personal" },
      { icon: Home, title: "Home Renovation Manager", description: "Track renovation tasks and budget", type: "personal" },
      { icon: DollarSign, title: "Personal Finance Hub", description: "Track expenses and investments", type: "personal" },
    ],
  },
];

const Automations = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [automationStates, setAutomationStates] = useState(
    automations.reduce((acc, auto) => ({ ...acc, [auto.id]: auto.enabled }), {})
  );
  const [addedAutomations, setAddedAutomations] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const tabs = [
    { id: "email", label: "Emails" },
    { id: "calendar", label: "Calendar" },
    { id: "internet", label: "Internet" },
  ];

  const filteredAutomations = automations.filter(a => a.category === activeTab);

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
            onClick={() => {}}
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
                      className="glass rounded-2xl p-4 sm:p-5 min-w-[240px] sm:min-w-[260px] snap-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                      onClick={() => handleAddAutomation(item.title)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-medium">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors min-h-[44px] min-w-[44px] ${
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
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      {item.type && (
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {item.type}
                        </span>
                      )}
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