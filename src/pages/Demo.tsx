import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ExecutionStep } from "@/components/voice/ExecutionStep";
import { ConfirmationCard } from "@/components/voice/ConfirmationCard";
import Automations from "@/pages/Automations";
import Today from "@/pages/Today";
import Work from "@/pages/Work";
import Family from "@/pages/Family";
import Expenses from "@/pages/Expenses";

const Demo = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"billsplit" | "screens">("billsplit");
  const [billSplitStep, setBillSplitStep] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);

  // Bill split workflow states
  const billSplitStates = [
    { type: "voice", duration: 2500 },
    { type: "chat", duration: 3500 },
    { type: "plan", duration: 4500 },
    { type: "execution-1", duration: 4000 },
    { type: "execution-2", duration: 4000 },
    { type: "execution-3", duration: 4000 },
    { type: "execution-4", duration: 4000 },
    { type: "confirmation", duration: 6000 },
  ];

  // App screens to showcase
  const appScreens = [
    { name: "Automations", component: <Automations /> },
    { name: "Today", component: <Today /> },
    { name: "Work", component: <Work /> },
    { name: "Family", component: <Family /> },
    { name: "Expenses", component: <Expenses /> },
  ];

  // Progress through bill split workflow
  useEffect(() => {
    if (phase === "billsplit") {
      if (billSplitStep < billSplitStates.length - 1) {
        const timer = setTimeout(() => {
          setBillSplitStep(billSplitStep + 1);
        }, billSplitStates[billSplitStep].duration);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase("screens");
        }, billSplitStates[billSplitStep].duration);
        return () => clearTimeout(timer);
      }
    }
  }, [billSplitStep, phase]);

  // Cycle through app screens
  useEffect(() => {
    if (phase === "screens") {
      const timer = setInterval(() => {
        setScreenIndex((prev) => (prev + 1) % appScreens.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [phase, appScreens.length]);

  const currentState = billSplitStates[billSplitStep]?.type;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* iPhone Mockup */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative">
          {/* iPhone Frame */}
          <div className="relative w-[375px] h-[812px] bg-gray-900 rounded-[60px] p-3 shadow-2xl">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
            
            {/* iPhone Glow */}
            <div className="absolute inset-0 rounded-[60px] shadow-[0_0_60px_rgba(255,255,255,0.1)]" />

            {/* Screen Content */}
            <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden pt-4">
              <AnimatePresence mode="wait">
                {phase === "billsplit" && (
                  <motion.div
                    key="billsplit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full overflow-y-auto"
                  >
                    <BillSplitDemo currentState={currentState} />
                  </motion.div>
                )}

                {phase === "screens" && (
                  <motion.div
                    key={appScreens[screenIndex].name}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full overflow-y-auto"
                  >
                    <div className="pointer-events-none">
                      {appScreens[screenIndex].component}
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
const BillSplitDemo = ({ currentState }: { currentState: string }) => {
  return (
    <div className="p-6 space-y-4 min-h-full bg-black">
      {/* Voice Input State */}
      {currentState === "voice" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary" />
          </motion.div>
          <p className="text-foreground/60 text-sm">Listening...</p>
          <p className="text-lg text-center">"Split my 9pm dinner bill"</p>
        </motion.div>
      )}

      {/* Chat State */}
      {currentState === "chat" && (
        <div className="space-y-4">
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
        </div>
      )}

      {/* Plan State */}
      {currentState === "plan" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
          <ActionPlanCard
            plan="I'll handle the bill split for your dinner. Here's what I'll do:"
            steps={[
              "Scan your inbox for 9pm restaurant receipts",
              "Calculate the split: $584 ÷ 8 people = $73 each",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations",
              "Send you a summary of who's paid",
            ]}
            status="pending"
          />
        </>
      )}

      {/* Execution States */}
      {currentState === "execution-1" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
          <ActionPlanCard
            plan="I'll handle the bill split for your dinner. Here's what I'll do:"
            steps={[
              "Scan your inbox for 9pm restaurant receipts",
              "Calculate the split: $584 ÷ 8 people = $73 each",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations",
              "Send you a summary of who's paid",
            ]}
            status="executing"
          />
          <ExecutionStep
            step="Scanning inbox for 9pm restaurant receipts"
            status="executing"
            isCurrentStep={true}
          />
        </>
      )}

      {currentState === "execution-2" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
          <ActionPlanCard
            plan="I'll handle the bill split for your dinner. Here's what I'll do:"
            steps={[
              "Scan your inbox for 9pm restaurant receipts",
              "Calculate the split: $584 ÷ 8 people = $73 each",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations",
              "Send you a summary of who's paid",
            ]}
            status="executing"
          />
          <ExecutionStep
            step="Computing split: $584 ÷ 8 people"
            status="executing"
            isCurrentStep={true}
          />
        </>
      )}

      {currentState === "execution-3" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
          <ActionPlanCard
            plan="I'll handle the bill split for your dinner. Here's what I'll do:"
            steps={[
              "Scan your inbox for 9pm restaurant receipts",
              "Calculate the split: $584 ÷ 8 people = $73 each",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations",
              "Send you a summary of who's paid",
            ]}
            status="executing"
          />
          <ExecutionStep
            step="Sending Splitwise requests to attendees"
            status="executing"
            isCurrentStep={true}
          />
        </>
      )}

      {currentState === "execution-4" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="I found your dinner receipt for $584. I'll split it equally among 8 people and send Splitwise requests."
          />
          <ActionPlanCard
            plan="I'll handle the bill split for your dinner. Here's what I'll do:"
            steps={[
              "Scan your inbox for 9pm restaurant receipts",
              "Calculate the split: $584 ÷ 8 people = $73 each",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations",
              "Send you a summary of who's paid",
            ]}
            status="executing"
          />
          <ExecutionStep
            step="Verifying payment confirmations"
            status="executing"
            isCurrentStep={true}
          />
        </>
      )}

      {/* Confirmation State */}
      {currentState === "confirmation" && (
        <>
          <ConversationMessage
            role="user"
            content="Split my 9pm dinner bill"
          />
          <ConversationMessage
            role="assistant"
            content="Done! I've split your $584 dinner bill among 8 people. Here's the breakdown:"
          />
          <ConfirmationCard
            confirmationType="billsplit"
            data={{
              totalAmount: "$584",
              perPerson: "$73",
              attendeeList: [
                { name: "Sarah Chen", amount: "$73", status: "paid" },
                { name: "Mike Torres", amount: "$73", status: "paid" },
                { name: "Emily Watson", amount: "$73", status: "pending" },
                { name: "David Kim", amount: "$73", status: "paid" },
                { name: "Lisa Anderson", amount: "$73", status: "paid" },
                { name: "James Wilson", amount: "$73", status: "pending" },
                { name: "Maria Garcia", amount: "$73", status: "paid" },
                { name: "You", amount: "$73", status: "paid" },
              ],
            }}
          />
        </>
      )}
    </div>
  );
};

export default Demo;
