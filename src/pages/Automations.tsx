import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Mail, Calendar, Clock, Bell, 
  TrendingUp, FileText, Heart, Plus
} from "lucide-react";
import { AutomationCard } from "@/components/AutomationCard";
import { BottomSheet } from "@/components/BottomSheet";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { Button } from "@/components/ui/button";

const automations = [
  {
    id: 1,
    icon: Mail,
    title: "Daily Email Digest",
    description: "Get a summary of important emails every morning",
    enabled: true,
    lastRun: "Today, 8:00 AM",
    nextRun: "Tomorrow, 8:00 AM",
    category: "daily",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Weekly Calendar Summary",
    description: "Receive your week's schedule every Monday",
    enabled: true,
    lastRun: "Mon, 9:00 AM",
    nextRun: "Next Mon, 9:00 AM",
    category: "weekly",
  },
  {
    id: 3,
    icon: Bell,
    title: "Meeting Reminders",
    description: "Get notified 15 minutes before meetings",
    enabled: false,
    category: "calendar",
  },
  {
    id: 4,
    icon: FileText,
    title: "Invoice Forwarding",
    description: "Auto-forward invoices to your accountant",
    enabled: true,
    lastRun: "Yesterday",
    nextRun: "When received",
    category: "email",
  },
];

const galleryCategories = [
  {
    title: "Featured",
    items: [
      { icon: Zap, title: "Smart Inbox", description: "AI-powered email prioritization" },
      { icon: TrendingUp, title: "Productivity Insights", description: "Weekly performance analytics" },
      { icon: Heart, title: "Wellness Check", description: "Daily mood and health tracking" },
    ],
  },
  {
    title: "Daily Routine",
    items: [
      { icon: Mail, title: "Morning Briefing", description: "News and tasks for the day" },
      { icon: Clock, title: "Focus Time Block", description: "Auto-schedule deep work" },
      { icon: Bell, title: "End of Day Review", description: "Task completion summary" },
    ],
  },
  {
    title: "Weekly & Monthly",
    items: [
      { icon: Calendar, title: "Week Planning", description: "Sunday evening prep" },
      { icon: FileText, title: "Monthly Report", description: "Achievements and goals" },
      { icon: TrendingUp, title: "Expense Summary", description: "Financial overview" },
    ],
  },
];

const Automations = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [automationStates, setAutomationStates] = useState(
    automations.reduce((acc, auto) => ({ ...acc, [auto.id]: auto.enabled }), {})
  );

  const tabs = [
    { id: "all", label: "All" },
    { id: "email", label: "Emails" },
    { id: "calendar", label: "Calendar" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
  ];

  const filteredAutomations = activeTab === "all" 
    ? automations 
    : automations.filter(a => a.category === activeTab);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground">Automations</h1>
              <p className="text-sm text-muted-foreground">
                {automations.filter(a => automationStates[a.id]).length} active
              </p>
            </div>
            <Button
              onClick={() => setIsGalleryOpen(true)}
              className="rounded-2xl gradient-primary shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Browse
            </Button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "gradient-primary text-white shadow-glow"
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
      <div className="max-w-lg mx-auto px-6 py-6 space-y-3">
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
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="glass rounded-2xl p-5 min-w-[280px] snap-start hover-lift tap-scale cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-medium">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
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