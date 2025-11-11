import { useState } from "react";
import { CreditCard, Bell, Activity } from "lucide-react";
import { VoiceInterface } from "@/components/voice/VoiceInterface";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { QuickActionChip } from "@/components/voice/QuickActionChip";
import { BackgroundAmbient } from "@/components/voice/BackgroundAmbient";
import { ExecutionProgress } from "@/components/voice/ExecutionProgress";
import { ResultCard } from "@/components/voice/ResultCard";
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

interface ExecutionStep {
  id: number;
  label: string;
  status: "pending" | "in-progress" | "completed";
  result?: string;
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
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [conversationMode, setConversationMode] = useState(false); // Track if we're in conversation mode

  const handleModify = () => {
    setActionPlan(null);
    const assistantMessage: Message = {
      role: "assistant",
      content: "Sure! What would you like me to change?",
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleTranscript = async (text: string) => {
    if (!text.trim()) return;

    const lowerText = text.toLowerCase();

    // Enter conversation mode
    setConversationMode(true);

    // Add user message
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate AI processing with action plan generation
    setTimeout(() => {
      let plan = "";
      let steps: string[] = [];

      if (lowerText.includes("movie") || lowerText.includes("tickets")) {
        plan = "Sounds great! I'll find the top-rated movies showing Friday evening and grab 2 tickets at your favorite theater. Should I go ahead with that?";
        steps = [
          "Search for highly-rated movies (IMDB 7+)",
          "Find showtimes for Friday 7-9PM",
          "Check availability at AMC Downtown",
          "Book 2 tickets and send confirmation",
        ];
      } else if (lowerText.includes("dinner") || lowerText.includes("restaurant")) {
        plan = "Perfect! I'll book a table at a top-rated Japanese restaurant for this Sunday at 7PM. Sound good?";
        steps = [
          "Search for Japanese restaurants (4.5+ rating)",
          "Check availability for Sunday 7PM",
          "Make reservation for 2 people",
          "Add to your calendar",
        ];
      } else if (lowerText.includes("bill") || lowerText.includes("pay")) {
        plan = "Got it! I'll review your upcoming bills and set up automatic payments. Want me to proceed?";
        steps = [
          "Identify upcoming bill due dates",
          "Verify account balances",
          "Schedule automatic payments",
          "Set up payment confirmations",
        ];
      } else {
        plan = "I'll help you with that! Let me create a plan to get this done. Should I go ahead?";
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
    setIsExecuting(true);
    setShowResult(false);

    // Add "Awesome, working on it" message
    const workingMessage: Message = {
      role: "assistant",
      content: "Awesome, working on it now! This'll just take a moment...",
    };
    setMessages((prev) => [...prev, workingMessage]);

    // Initialize execution steps
    const steps: ExecutionStep[] = actionPlan.steps.map((step, index) => ({
      id: index,
      label: step,
      status: "pending",
    }));
    setExecutionSteps(steps);

    // Execute steps sequentially
    let currentStep = 0;
    const executeNextStep = () => {
      if (currentStep >= steps.length) {
        // All steps completed
        setTimeout(() => {
          setIsExecuting(false);
          setShowResult(true);
          setActionPlan({ ...actionPlan, status: "completed" });

          // Add completion message
          const completionMessage: Message = {
            role: "assistant",
            content: "All set! You're booked for Dune 3 at AMC Downtown, Friday 7:30 PM. I sent the confirmation to your email. Enjoy the movie! 🎬",
          };
          setMessages((prev) => [...prev, completionMessage]);

          // Clear everything after showing result
          setTimeout(() => {
            setShowResult(false);
            // Keep messages and action plan for user to review
          }, 5000);
        }, 1000);
        return;
      }

      // Mark current step as in-progress
      setExecutionSteps((prev) =>
        prev.map((s, i) =>
          i === currentStep ? { ...s, status: "in-progress" } : s
        )
      );

      // Complete current step after delay
      setTimeout(() => {
        const results = [
          "Found 3 movies (Dune 3, Oppenheimer 2, Avatar 4)",
          "Found 5 available showtimes",
          "Tickets booked successfully",
          "Confirmation sent to your inbox",
        ];

        setExecutionSteps((prev) =>
          prev.map((s, i) =>
            i === currentStep
              ? { ...s, status: "completed", result: results[currentStep] || "Done" }
              : s
          )
        );

        currentStep++;
        executeNextStep();
      }, 1500);
    };

    executeNextStep();
  };

  const resetConversation = () => {
    setMessages([]);
    setActionPlan(null);
    setExecutionSteps([]);
    setShowResult(false);
    setIsExecuting(false);
    setConversationMode(false);
  };

  return (
    <div className="h-screen fixed inset-0 overflow-hidden">
      {/* Ambient animated background */}
      <BackgroundAmbient />

      {/* Main content */}
      <div className="relative h-full flex flex-col">
        {/* Hero Section - Voice Interface or Chat */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-safe pb-24">
          <AnimatePresence mode="wait">
            {!conversationMode ? (
              /* Initial Voice State */
              <motion.div
                key="voice-mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-8 w-full max-w-2xl"
              >
                {/* Large Animated Asmi Avatar */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AsmiAvatar isThinking={isProcessing} isListening={false} />
                </motion.div>

                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2"
                >
                  <h1 className="text-4xl font-heading font-semibold text-foreground">
                    Hey there, I'm Asmi
                  </h1>
                  <p className="text-lg text-muted-foreground asmi-message">
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
              </motion.div>
            ) : (
              /* Conversation Mode */
              <motion.div
                key="chat-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-3xl h-full flex flex-col"
              >
                {/* Small Avatar at Top */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="scale-50">
                    <AsmiAvatar isThinking={isProcessing || isExecuting} isListening={false} />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Asmi</h2>
                    <p className="text-sm text-muted-foreground">Your AI assistant</p>
                  </div>
                </div>

                {/* Scrollable Chat Container */}
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pb-4">
                  {/* Conversation Messages */}
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                      <ConversationMessage
                        key={`msg-${index}`}
                        role={message.role}
                        content={message.content}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Action Plan Card */}
                  <AnimatePresence>
                    {actionPlan && !isExecuting && !showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
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

                  {/* Execution Progress */}
                  <AnimatePresence>
                    {isExecuting && executionSteps.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="voice-glass rounded-2xl p-5"
                      >
                        <ExecutionProgress steps={executionSteps} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Result Card */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <ResultCard
                          title="Dune 3"
                          subtitle="AMC Downtown"
                          details={[
                            "📅 Friday, 7:30 PM",
                            "🎟️ 2 tickets - Seats G12, G13",
                            "✅ Confirmation sent to your email",
                          ]}
                        />
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          onClick={resetConversation}
                          className="mt-4 w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                        >
                          Start New Conversation
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Actions - Bottom - Only show when not in conversation */}
        <AnimatePresence>
          {!conversationMode && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.7 }}
              className="fixed bottom-0 left-0 right-0 pb-safe px-6 py-6 bg-gradient-to-t from-background via-background to-transparent"
            >
              <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {quickActions.map((action) => (
                  <div key={action.label} className="snap-start">
                    <QuickActionChip {...action} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
