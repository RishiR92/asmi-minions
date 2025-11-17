import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AsmiAvatar } from "@/components/voice/AsmiAvatar";
import { BackgroundAmbient } from "@/components/voice/BackgroundAmbient";
import { QuickActionChip } from "@/components/voice/QuickActionChip";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ExecutionStep } from "@/components/voice/ExecutionStep";
import { ConfirmationCard } from "@/components/voice/ConfirmationCard";
import Home from "./Home";
import Automations from "@/pages/Automations";
import Today from "@/pages/Today";
import Work from "@/pages/Work";
import Family from "@/pages/Family";
import Expenses from "@/pages/Expenses";
import Profile from "@/pages/Profile";
import { Bot, Calendar as CalendarIcon, Briefcase, Users, DollarSign, Settings, Play } from "lucide-react";

type DemoPhase = 
  | "home-welcome"
  | "voice-listening" 
  | "voice-transcribing"
  | "transition-to-chat"
  | "chat-user"
  | "chat-asmi"
  | "action-plan"
  | "execution-1"
  | "execution-2"
  | "execution-3"
  | "execution-4"
  | "confirmation"
  | "screen-automations"
  | "screen-today"
  | "screen-work"
  | "screen-family"
  | "screen-expenses"
  | "screen-profile";

const Demo = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<DemoPhase>("home-welcome");
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  const familyScrollRef = useRef<HTMLDivElement>(null);
  const expensesScrollRef = useRef<HTMLDivElement>(null);
  const profileScrollRef = useRef<HTMLDivElement>(null);

  const fullTranscript = "Split bill for 9pm dinner";

  const quickActions = [
    { icon: Play, label: "Demo", href: "/demo" },
    { icon: Bot, label: "AI Mins", href: "/automations" },
    { icon: CalendarIcon, label: "Today", href: "/today" },
    { icon: Briefcase, label: "Work", href: "/work" },
    { icon: Users, label: "Family", href: "/family" },
    { icon: DollarSign, label: "Expenses", href: "/expenses" },
    { icon: Settings, label: "Admin", href: "/profile" },
    { icon: Mic, label: "Voice", href: "#voice" },
  ];

  // Demo flow with durations
  const demoFlow: { phase: DemoPhase; duration: number }[] = [
    { phase: "home-welcome", duration: 3000 },
    { phase: "voice-listening", duration: 2000 },
    { phase: "voice-transcribing", duration: 2500 },
    { phase: "transition-to-chat", duration: 500 },
    { phase: "chat-user", duration: 1500 },
    { phase: "chat-asmi", duration: 1500 },
    { phase: "action-plan", duration: 4000 },
    { phase: "execution-1", duration: 4000 },
    { phase: "execution-2", duration: 4000 },
    { phase: "execution-3", duration: 4000 },
    { phase: "execution-4", duration: 4000 },
    { phase: "confirmation", duration: 6000 },
    { phase: "screen-automations", duration: 8000 },
    { phase: "screen-today", duration: 6000 },
    { phase: "screen-work", duration: 6000 },
    { phase: "screen-family", duration: 8000 },
    { phase: "screen-expenses", duration: 6000 },
    { phase: "screen-profile", duration: 6000 },
  ];

  // Progress through demo phases
  useEffect(() => {
    const currentIndex = demoFlow.findIndex(item => item.phase === phase);
    if (currentIndex === -1 || currentIndex >= demoFlow.length - 1) return;

    const timer = setTimeout(() => {
      setPhase(demoFlow[currentIndex + 1].phase);
    }, demoFlow[currentIndex].duration);

    return () => clearTimeout(timer);
  }, [phase]);

  // Typing effect for transcription
  useEffect(() => {
    if (phase === "voice-transcribing") {
      setDisplayedTranscript("");
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullTranscript.length) {
          setDisplayedTranscript(fullTranscript.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Auto-open AI Mins BottomSheet during Automations screen
  useEffect(() => {
    if (phase === "screen-automations") {
      setShowBottomSheet(false);
      const timer = setTimeout(() => {
        setShowBottomSheet(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowBottomSheet(false);
    }
  }, [phase]);

  // Auto-scroll for Family page
  useEffect(() => {
    if (phase === "screen-family" && familyScrollRef.current) {
      const container = familyScrollRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight / 3, behavior: 'smooth' });
      }, 2000);
      
      setTimeout(() => {
        container.scrollTo({ top: (scrollHeight / 3) * 2, behavior: 'smooth' });
      }, 4000);
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }, 6000);
    }
  }, [phase]);

  // Auto-scroll for Expenses page
  useEffect(() => {
    if (phase === "screen-expenses" && expensesScrollRef.current) {
      const container = expensesScrollRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight / 2, behavior: 'smooth' });
      }, 2000);
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }, 4000);
    }
  }, [phase]);

  // Auto-scroll for Profile page
  useEffect(() => {
    if (phase === "screen-profile" && profileScrollRef.current) {
      const container = profileScrollRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight / 2, behavior: 'smooth' });
      }, 2000);
      
      setTimeout(() => {
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }, 4000);
    }
  }, [phase]);

  const isScreenPhase = phase.startsWith("screen-");
  const isBillSplitPhase = !isScreenPhase;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden relative">
      {/* Ambient glow effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[150px] rounded-full" />
      
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* iPhone Mockup */}
      <div className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="relative">
          {/* Multi-colored glow effects */}
          <div className="absolute -inset-4 rounded-[80px] blur-2xl opacity-60">
            <div className="absolute inset-0 bg-emerald-500/40 rounded-[80px] animate-pulse" />
          </div>
          <div className="absolute -inset-6 rounded-[80px] blur-3xl opacity-40" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-blue-500/30 rounded-[80px] animate-pulse" />
          </div>
          <div className="absolute -inset-8 rounded-[80px] blur-[100px] opacity-30" style={{ animationDelay: '2s' }}>
            <div className="absolute inset-0 bg-purple-500/25 rounded-[80px] animate-pulse" />
          </div>
          
          {/* iPhone Frame - Space Gray */}
          <div className="relative w-[375px] h-[812px] bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-[60px] p-3 shadow-2xl">
            {/* Side Buttons */}
            <div className="absolute left-[-3px] top-[120px] w-[3px] h-[32px] bg-slate-700 rounded-l-sm" />
            <div className="absolute left-[-3px] top-[180px] w-[3px] h-[60px] bg-slate-700 rounded-l-sm" />
            <div className="absolute left-[-3px] top-[250px] w-[3px] h-[60px] bg-slate-700 rounded-l-sm" />
            <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-slate-700 rounded-r-sm" />
            
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
            
            {/* iPhone Glow */}
            <div className="absolute inset-0 rounded-[60px] shadow-[0_0_60px_rgba(16,185,129,0.2)]" />

            {/* Screen Content */}
            <div className="relative w-full h-full bg-background rounded-[48px] overflow-hidden">
              <AnimatePresence mode="wait">
                {isBillSplitPhase && (
                  <motion.div
                    key="billsplit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full overflow-y-auto scrollbar-hide"
                  >
                    <BillSplitDemo 
                      phase={phase as any} 
                      displayedTranscript={displayedTranscript}
                      quickActions={quickActions}
                    />
                  </motion.div>
                )}

                {isScreenPhase && (
                  <motion.div
                    key="screens"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full overflow-hidden pointer-events-none">
                      {phase === "screen-automations" && (
                        <div className="h-full overflow-y-auto scrollbar-hide">
                          <div className="max-w-[375px] mx-auto">
                            <Automations />
                          </div>
                        </div>
                      )}
                      {phase === "screen-today" && (
                        <div className="h-full overflow-y-auto scrollbar-hide">
                          <div className="max-w-[375px] mx-auto">
                            <Today />
                          </div>
                        </div>
                      )}
                      {phase === "screen-work" && (
                        <div className="h-full overflow-y-auto scrollbar-hide">
                          <div className="max-w-[375px] mx-auto">
                            <Work />
                          </div>
                        </div>
                      )}
                      {phase === "screen-family" && (
                        <div ref={familyScrollRef} className="h-full overflow-y-auto scrollbar-hide scroll-smooth">
                          <div className="max-w-[375px] mx-auto">
                            <Family />
                          </div>
                        </div>
                      )}
                      {phase === "screen-expenses" && (
                        <div ref={expensesScrollRef} className="h-full overflow-y-auto scrollbar-hide scroll-smooth">
                          <div className="max-w-[375px] mx-auto">
                            <Expenses />
                          </div>
                        </div>
                      )}
                      {phase === "screen-profile" && (
                        <div ref={profileScrollRef} className="h-full overflow-y-auto scrollbar-hide scroll-smooth">
                          <div className="max-w-[375px] mx-auto">
                            <Profile />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bill Split Demo Component
const BillSplitDemo = ({ 
  phase, 
  displayedTranscript,
  quickActions 
}: { 
  phase: DemoPhase;
  displayedTranscript: string;
  quickActions: any[];
}) => {
  // Home Welcome Screen
  if (phase === "home-welcome") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full w-full pointer-events-none overflow-hidden"
      >
        <div className="max-w-[375px] mx-auto h-full">
          <Home embed />
        </div>
      </motion.div>
    );
  }

  // Voice Listening Screen
  if (phase === "voice-listening" || phase === "voice-transcribing") {
    return (
      <div className="relative min-h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
        <BackgroundAmbient />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6 z-10"
        >
          <AsmiAvatar isListening={true} />
          
          {/* Sound Wave Animation */}
          <div className="flex gap-1 items-center justify-center h-12">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-500 rounded-full"
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Status text */}
          <p className="text-center text-emerald-400 text-sm">
            {phase === "voice-listening" ? "Listening..." : "Processing..."}
          </p>

          {/* Transcribed Text */}
          {phase === "voice-transcribing" && displayedTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <p className="text-lg text-slate-100 font-medium text-center">
                "{displayedTranscript}"
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // Chat Interface
  if (phase === "transition-to-chat" || phase === "chat-user" || phase === "chat-asmi") {
    return (
      <div className="min-h-full bg-[#ECE5DD] p-4 pt-8 space-y-4">
        <AnimatePresence>
          {(phase === "chat-user" || phase === "chat-asmi") && (
            <ConversationMessage
              role="user"
              content="Split bill for 9pm dinner"
            />
          )}
          {phase === "chat-asmi" && (
            <ConversationMessage
              role="assistant"
              content="Got it! Let me work on that for you..."
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Action Plan
  if (phase === "action-plan") {
    return (
      <div className="min-h-full bg-[#ECE5DD] p-4 pt-8 space-y-4">
        <ConversationMessage
          role="user"
          content="Split bill for 9pm dinner"
        />
        <ConversationMessage
          role="assistant"
          content="Got it! Let me work on that for you..."
        />
        <ActionPlanCard
          plan="I'll split your dinner bill from yesterday evening"
          steps={[
            "Scan your inbox for dinner receipts",
            "Compute equal split among attendees",
            "Send Splitwise payment requests",
            "Verify payment statuses",
            "Send confirmation to all attendees"
          ]}
          status="pending"
        />
      </div>
    );
  }

  // Execution Steps
  if (phase.startsWith("execution-")) {
    const stepNumber = parseInt(phase.split("-")[1]);
    const steps = [
      { text: "Scanning your inbox for dinner receipts...", status: "executing" as const },
      { text: "Computing equal split among attendees...", status: "executing" as const },
      { text: "Sending Splitwise payment requests...", status: "executing" as const },
      { text: "Verifying payment statuses...", status: "executing" as const },
    ];

    return (
      <div className="min-h-full bg-[#ECE5DD] p-4 pt-8 space-y-4">
        <ConversationMessage
          role="user"
          content="Split bill for 9pm dinner"
        />
        <ActionPlanCard
          plan="I'll split your dinner bill from yesterday evening"
          steps={[
            "Scan your inbox for dinner receipts",
            "Compute equal split among attendees",
            "Send Splitwise payment requests",
            "Verify payment statuses",
            "Send confirmation to all attendees"
          ]}
          status="executing"
        />
        {steps[stepNumber - 1] && (
          <ExecutionStep
            step={steps[stepNumber - 1].text}
            status={steps[stepNumber - 1].status}
            isCurrentStep={true}
          />
        )}
      </div>
    );
  }

  // Confirmation
  if (phase === "confirmation") {
    return (
      <div className="min-h-full bg-[#ECE5DD] p-4 pt-8 space-y-4 overflow-y-auto scrollbar-hide">
        <ConversationMessage
          role="assistant"
          content="All done! Your bill has been split successfully."
        />
        <ConfirmationCard
          confirmationType="billsplit"
          data={{
            title: "Dinner at Olive Garden",
            totalAmount: "$150.00",
            perPerson: "$30.00",
            attendees: 5,
            datetime: "Yesterday, 9:00 PM",
            location: "Olive Garden - Downtown",
            splitMethod: "Splitwise",
            status: "All paid ✓",
            confirmationId: "SW-ABC123",
          }}
        />
      </div>
    );
  }

  return null;
};

export default Demo;
