import { useState, useRef } from "react";
import { Bot, Calendar as CalendarIcon, Briefcase, Users, DollarSign, Settings, Mic } from "lucide-react";
import { VoiceInterface } from "@/components/voice/VoiceInterface";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { QuickActionChip } from "@/components/voice/QuickActionChip";
import { BackgroundAmbient } from "@/components/voice/BackgroundAmbient";
import { ExecutionStep } from "@/components/voice/ExecutionStep";
import { ConfirmationCard } from "@/components/voice/ConfirmationCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
    icon: Bot,
    label: "AI Mins",
    href: "/automations",
  },
  {
    icon: CalendarIcon,
    label: "Today",
    href: "/today",
  },
  {
    icon: Briefcase,
    label: "Work",
    href: "/work",
  },
  {
    icon: Users,
    label: "Family",
    href: "/family",
  },
  {
    icon: DollarSign,
    label: "Expenses",
    href: "/expenses",
  },
  {
    icon: Settings,
    label: "Admin",
    href: "/profile",
  },
  {
    icon: Mic,
    label: "Voice",
    href: "#voice",
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

const generateConfirmation = (plan: string) => {
  const lowerPlan = plan.toLowerCase();
  
  if (lowerPlan.includes('split') || lowerPlan.includes('dinner') || lowerPlan.includes('bill')) {
    return {
      type: "billsplit" as const,
      data: {
        title: "Dinner at Olive Garden",
        totalAmount: "$240.00",
        perPerson: "$30.00",
        attendees: 8,
        datetime: "Yesterday, 9:00 PM",
        location: "Olive Garden - Downtown",
        splitMethod: "Splitwise",
        status: "All paid ✓",
        confirmationId: "SW-" + Math.random().toString(36).substr(2, 6).toUpperCase()
      }
    };
  } else if (lowerPlan.includes('schedule') || lowerPlan.includes('calendar')) {
    return {
      type: "calendar" as const,
      data: {
        title: "Team Meeting",
        datetime: "Tomorrow, 2:00 PM",
        duration: "1 hour",
        location: "Conference Room B"
      }
    };
  } else {
    return {
      type: "generic" as const,
      data: {
        description: `All set! ${getRandomResponse('success')}\n\nYour request has been completed successfully.`
      }
    };
  }
};

const Home = () => {
  const [conversationMode, setConversationMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStepType[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<{ type: "billsplit" | "movie" | "payment" | "calendar" | "generic"; data: any } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [showVoiceFallback, setShowVoiceFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<"iframe" | "denied" | "unsupported" | null>(null);
  const [fallbackText, setFallbackText] = useState("");

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

      if (text.toLowerCase().includes("split") || text.toLowerCase().includes("dinner") || text.toLowerCase().includes("bill")) {
        plan = "I'll check your email for the 9pm dinner details, split the $240 bill among 8 attendees ($30 each), and send payment requests via Splitwise.";
        steps = [
          "Check email for dinner attendees and priorities",
          "Retrieve dinner bill details ($240 total)",
          "Calculate per-person split ($30 each)",
          "Send Splitwise payment requests to 8 people",
          "Confirm all payments received",
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
    
    const steps = actionPlan.steps.map(step => ({
      text: step,
      status: "pending" as const
    }));
    setExecutionSteps(steps);

    // Execute steps sequentially
    steps.forEach((_, index) => {
      setTimeout(() => {
        // Mark current step as executing, then completed
        setExecutionSteps(prev => 
          prev.map((step, i) => 
            i === index 
              ? { ...step, status: "executing" as const } 
              : i < index 
                ? { ...step, status: "completed" as const }
                : step
          )
        );
        
        setTimeout(() => {
          setExecutionSteps(prev => 
            prev.map((step, i) => 
              i === index ? { ...step, status: "completed" as const } : step
            )
          );
          
          // After last step, show final confirmation
          if (index === steps.length - 1) {
            setTimeout(() => {
              setActionPlan(prev => prev ? { ...prev, status: "completed" } : null);
              setShowResult(true);
              
              // Generate detailed confirmation based on the request
              const confirmationDetails = generateConfirmation(actionPlan.plan);
              setFinalResult(confirmationDetails);
            }, 500);
          }
        }, 800);
      }, index * 2000);
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
    setFinalResult(null);
    setIsProcessing(false);
    setIsListening(false);
    setCurrentTranscript("");
  };

  const handleFallbackSubmit = () => {
    if (!fallbackText.trim()) return;
    handleTranscript(fallbackText);
    setShowVoiceFallback(false);
    setFallbackText("");
    setFallbackReason(null);
  };

  return (
    <div className="h-screen fixed inset-0 overflow-hidden w-full">
      <BackgroundAmbient />

      {/* Voice Fallback Dialog */}
      <Dialog open={showVoiceFallback} onOpenChange={setShowVoiceFallback}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {fallbackReason === "iframe" && "Microphone blocked in preview"}
              {fallbackReason === "denied" && "Microphone permission needed"}
              {fallbackReason === "unsupported" && "Voice input not supported"}
            </DialogTitle>
            <DialogDescription>
              {fallbackReason === "iframe" && "iOS blocks mic in embedded previews. Type your request below or open the app in a new tab."}
              {fallbackReason === "denied" && "Enable mic access in Safari Settings, or type your request below."}
              {fallbackReason === "unsupported" && "Your browser doesn't support voice input. Type your request below."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Type your request…"
              value={fallbackText}
              onChange={(e) => setFallbackText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFallbackSubmit()}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              {fallbackReason === "iframe" && (
                <Button
                  variant="outline"
                  onClick={() => window.open(window.location.href, "_blank")}
                >
                  Open in new tab
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowVoiceFallback(false)}>
                Cancel
              </Button>
              <Button onClick={handleFallbackSubmit}>
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative h-full flex flex-col">
        {!conversationMode ? (
          /* Initial Voice State */
          <>
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
              <motion.div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl">
                
                {/* Large Animated Avatar */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 sm:w-32 sm:h-32"
                >
                  <AsmiAvatar isThinking={isProcessing} isListening={isListening} />
                </motion.div>

                {/* Warm Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-2"
                >
                  <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground">
                    Hey there, I'm Asmi
                  </h1>
                  
                  <AnimatePresence mode="wait">
                    {isListening ? (
                      <motion.p
                        key="transcript"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm sm:text-base text-primary/90 min-h-[24px] px-4"
                      >
                        {currentTranscript || (
                          <span className="flex items-center justify-center gap-2">
                            <span>Listening</span>
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ...
                            </motion.span>
                          </span>
                        )}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="help"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm sm:text-base text-muted-foreground"
                      >
                        Tell me what you'd like me to help with today
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

              </motion.div>
            </div>
          
            {/* Bottom Fixed Navigation Bar - Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/40 pb-safe z-10"
            >
              <div className="flex justify-start items-center gap-3 px-4 py-3 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={action.label === "Voice" && isListening ? "bg-primary/10 rounded-2xl" : ""}
                  >
                    {action.label === "Voice" ? (
                      <div className="relative">
                        <QuickActionChip icon={action.icon} label={action.label} />
                        <VoiceInterface
                          overlayMode={true}
                          onTranscript={handleTranscript}
                          isProcessing={isProcessing}
                          onListeningChange={setIsListening}
                          onTranscriptChange={setCurrentTranscript}
                          onUnsupported={() => {
                            setFallbackReason("unsupported");
                            setShowVoiceFallback(true);
                          }}
                          onPermissionError={(reason) => {
                            setFallbackReason(reason);
                            setShowVoiceFallback(true);
                          }}
                        />
                      </div>
                    ) : (
                      <QuickActionChip {...action} />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          /* Chat Mode */
          <div className="w-full h-full flex flex-col px-4 sm:px-6 max-w-3xl mx-auto">
            
            {/* Header with small Asmi */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 py-3 pt-safe border-b border-border"
            >
              <div className="w-10 h-10">
                <AsmiAvatar isThinking={isProcessing} />
              </div>
              <div>
                <h2 className="text-base font-heading font-semibold">Asmi</h2>
                <p className="text-xs text-muted-foreground">Your personal assistant</p>
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

                {/* Execution Steps - Only show current executing step */}
                {executionSteps.map((step, index) => (
                  <ExecutionStep
                    key={index}
                    step={step.text}
                    status={step.status}
                    isCurrentStep={step.status === "executing"}
                  />
                ))}

                {/* Final Confirmation - renders AFTER all steps */}
                {finalResult && (
                  <ConfirmationCard 
                    confirmationType={finalResult.type} 
                    data={finalResult.data} 
                  />
                )}
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
