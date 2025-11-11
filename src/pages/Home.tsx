import { useState } from "react";
import { CreditCard, Bell, Activity } from "lucide-react";
import { VoiceInterface } from "@/components/voice/VoiceInterface";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { QuickActionChip } from "@/components/voice/QuickActionChip";
import { BackgroundAmbient } from "@/components/voice/BackgroundAmbient";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ActionPlan {
  plan: string;
  steps: string[];
  status: "pending" | "executing" | "completed";
}

const quickActions = [
  {
    icon: CreditCard,
    label: "Subscriptions",
    stat: "$127/mo",
    href: "/payments",
  },
  {
    icon: Bell,
    label: "Bills",
    stat: "4 due",
    href: "/bills",
  },
  {
    icon: Activity,
    label: "Activity",
    stat: "View all",
    href: "/automations",
  },
];

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTranscript = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate AI processing with action plan generation
    setTimeout(() => {
      // Generate action plan based on user input
      let plan = "";
      let steps: string[] = [];

      if (text.toLowerCase().includes("movie") || text.toLowerCase().includes("tickets")) {
        plan = "I'll find the best-rated movies playing this Friday evening and book 2 tickets at your preferred theater.";
        steps = [
          "Search for highly-rated movies (IMDB 7+)",
          "Find showtimes for Friday 7-9PM",
          "Check availability at AMC Downtown",
          "Book 2 tickets and send confirmation",
        ];
      } else if (text.toLowerCase().includes("dinner") || text.toLowerCase().includes("restaurant")) {
        plan = "I'll make a reservation at a top-rated Japanese restaurant for this Sunday at 7PM.";
        steps = [
          "Search for Japanese restaurants (4.5+ rating)",
          "Check availability for Sunday 7PM",
          "Make reservation for 2 people",
          "Add to your calendar",
        ];
      } else if (text.toLowerCase().includes("bill") || text.toLowerCase().includes("pay")) {
        plan = "I'll review your upcoming bills and set up automatic payments for recurring charges.";
        steps = [
          "Identify upcoming bill due dates",
          "Verify account balances",
          "Schedule automatic payments",
          "Set up payment confirmations",
        ];
      } else {
        plan = "I'll help you with that. Let me create a plan to get this done.";
        steps = [
          "Analyze your request",
          "Find the best approach",
          "Execute the automation",
          "Confirm completion",
        ];
      }

      setActionPlan({ plan, steps, status: "pending" });
      setIsProcessing(false);
    }, 2000);
  };

  const handleConfirm = () => {
    if (!actionPlan) return;

    setActionPlan({ ...actionPlan, status: "executing" });

    // Simulate execution
    setTimeout(() => {
      setActionPlan({ ...actionPlan, status: "completed" });
      
      // Add assistant response
      const assistantMessage: Message = {
        role: "assistant",
        content: "Done! I've completed the task successfully. You'll receive a confirmation shortly.",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Clear action plan after 2 seconds
      setTimeout(() => {
        setActionPlan(null);
      }, 2000);
    }, 3000);
  };

  const handleModify = () => {
    // For now, just clear the plan - in real app would allow editing
    setActionPlan(null);
  };

  return (
    <div className="h-screen fixed inset-0 overflow-hidden">
      {/* Ambient animated background */}
      <BackgroundAmbient />

      {/* Main content */}
      <div className="relative h-full flex flex-col">
        {/* Hero Section - Voice Interface */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-safe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-2xl"
          >
            {/* Asmi Avatar */}
            <AsmiAvatar isThinking={isProcessing} isListening={false} />

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-heading font-semibold text-foreground">
                Hi there, I'm Asmi
              </h1>
              <p className="text-muted-foreground">
                What can I help you with today?
              </p>
            </motion.div>

            {/* Voice Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <VoiceInterface onTranscript={handleTranscript} isProcessing={isProcessing} />
            </motion.div>

            {/* Action Plan Card */}
            <AnimatePresence>
              {actionPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <ActionPlanCard
                    plan={actionPlan.plan}
                    steps={actionPlan.steps}
                    status={actionPlan.status}
                    onConfirm={handleConfirm}
                    onModify={handleModify}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation History */}
            <div className="w-full space-y-4 max-h-[200px] overflow-y-auto scrollbar-hide">
              <AnimatePresence>
                {messages.slice(-3).map((message, index) => (
                  <ConversationMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pb-safe px-6 py-6"
        >
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {quickActions.map((action) => (
              <div key={action.label} className="snap-start">
                <QuickActionChip {...action} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
