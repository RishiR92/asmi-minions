import { useState } from "react";
import { CreditCard, Bell, Activity } from "lucide-react";
import { VoiceInterface } from "@/components/voice/VoiceInterface";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { QuickActionChip } from "@/components/voice/QuickActionChip";
import { BackgroundAmbient } from "@/components/voice/BackgroundAmbient";
import { ExecutionStep } from "@/components/voice/ExecutionStep";
import { Button } from "@/components/ui/button";
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

interface ExecutionStepType {
  text: string;
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

const asmiResponses = {
  greeting: [
    "Hey there! What can I do for you today?",
    "Hi! I'm here to help - what's on your mind?",
    "Hello! Ready to make your day easier?"
  ],
  processing: [
    "Got it! Let me work on that for you...",
    "On it! Give me just a second...",
    "Perfect! I'll take care of that right away..."
  ],
  planPresentation: [
    "Here's what I'm thinking - does this look good?",
    "I've put together a plan for you. What do you think?",
    "This is how I'll handle it - sound good?"
  ],
  success: [
    "All done! That was easy 😊",
    "Complete! You're all set.",
    "Finished! Anything else I can help with?"
  ]
};

const getRandomResponse = (type: keyof typeof asmiResponses) => {
  const responses = asmiResponses[type];
  return responses[Math.floor(Math.random() * responses.length)];
};

const Home = () => {
  const [conversationMode, setConversationMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStepType[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleTranscript = async (text: string) => {
    if (!text.trim()) return;

    // Switch to conversation mode
    setConversationMode(true);

    // Add user message with warm Asmi response
    const userMessage: Message = { role: "user", content: text };
    const processingMessage: Message = { 
      role: "assistant", 
      content: getRandomResponse('processing') 
    };
    
    setMessages([userMessage, processingMessage]);
    setIsProcessing(true);

    // Simulate AI processing with action plan generation
    setTimeout(() => {
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

      // Add plan presentation message
      const planMessage: Message = {
        role: "assistant",
        content: getRandomResponse('planPresentation')
      };
      setMessages(prev => [...prev, planMessage]);
      setActionPlan({ plan, steps, status: "pending" });
      setIsProcessing(false);
    }, 2000);
  };

  const handleConfirm = () => {
    if (!actionPlan) return;

    setActionPlan({ ...actionPlan, status: "executing" });
    
    // Initialize execution steps
    const steps = actionPlan.steps.map(step => ({
      text: step,
      status: "pending" as const
    }));
    setExecutionSteps(steps);

    // Execute steps sequentially
    steps.forEach((_, index) => {
      setTimeout(() => {
        setExecutionSteps(prev => 
          prev.map((step, i) => 
            i === index ? { ...step, status: "completed" as const } : step
          )
        );
        
        // After last step
        if (index === steps.length - 1) {
          setTimeout(() => {
            setActionPlan(prev => prev ? { ...prev, status: "completed" } : null);
            setShowResult(true);
            
            const successMessage: Message = {
              role: "assistant",
              content: getRandomResponse('success')
            };
            setMessages(prev => [...prev, successMessage]);
          }, 500);
        }
      }, (index + 1) * 1500);
    });
  };

  const handleModify = () => {
    setActionPlan(null);
  };

  const resetConversation = () => {
    setConversationMode(false);
    setMessages([]);
    setActionPlan(null);
    setExecutionSteps([]);
    setShowResult(false);
    setIsProcessing(false);
  };

  return (
    <div className="h-screen fixed inset-0 overflow-hidden">
      <BackgroundAmbient />

      <div className="relative h-full flex flex-col">
        {!conversationMode ? (
          /* Initial Voice State */
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
            <motion.div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl">
              
              {/* Large Animated Avatar */}
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 sm:w-40 sm:h-40"
              >
                <AsmiAvatar isThinking={isProcessing} />
              </motion.div>

              {/* Warm Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-foreground">
                  Hey there, I'm Asmi
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Tell me what you'd like me to help with today
                </p>
              </motion.div>

              {/* Voice Interface */}
              <VoiceInterface onTranscript={handleTranscript} isProcessing={isProcessing} />
            </motion.div>

            {/* Quick Actions - Mobile optimized grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 pb-safe px-4 sm:px-6 py-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <QuickActionChip {...action} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Chat Mode */
          <div className="w-full h-full flex flex-col px-4 sm:px-6 max-w-3xl mx-auto">
            
            {/* Header with small Asmi */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 py-4 pt-safe border-b border-border"
            >
              <div className="w-12 h-12">
                <AsmiAvatar isThinking={isProcessing} />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold">Asmi</h2>
                <p className="text-sm text-muted-foreground">Your personal assistant</p>
              </div>
            </motion.div>

            {/* Scrollable Chat Messages */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <ConversationMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {/* Action Plan Card */}
                {actionPlan && (
                  <ActionPlanCard
                    plan={actionPlan.plan}
                    steps={actionPlan.steps}
                    status={actionPlan.status}
                    onConfirm={handleConfirm}
                    onModify={handleModify}
                  />
                )}

                {/* Execution Steps */}
                {executionSteps.map((step, index) => (
                  <ExecutionStep
                    key={index}
                    step={step.text}
                    status={step.status}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Reset Button */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 pb-safe"
              >
                <Button 
                  onClick={resetConversation}
                  variant="outline"
                  className="w-full"
                >
                  Start New Conversation
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
