import { useState } from "react";
import { VoiceInterface } from "@/components/voice/VoiceInterface";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
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

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

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
            setActionPlan(null);
            setExecutionSteps([]);
            setShowResult(false);
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
            <AsmiAvatar isThinking={isProcessing || isExecuting} isListening={false} />

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-heading font-semibold text-foreground">
                Hey there, I'm Asmi
              </h1>
              <p className="text-muted-foreground asmi-message">
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
              {actionPlan && !isExecuting && !showResult && (
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

            {/* Execution Progress */}
            <AnimatePresence>
              {isExecuting && executionSteps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full glass-sheet rounded-2xl p-5"
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
                  className="w-full"
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation History - Positioned below avatar */}
            {messages.length > 0 && (
              <div className="w-full space-y-3 mt-8">
                <AnimatePresence mode="popLayout">
                  {messages.slice(-4).map((message, index) => (
                    <ConversationMessage
                      key={`msg-${messages.length - 4 + index}`}
                      role={message.role}
                      content={message.content}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
