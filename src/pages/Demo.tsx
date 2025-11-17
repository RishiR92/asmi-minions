import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Calendar, Users, Wallet, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConversationMessage } from "@/components/voice/ConversationMessage";
import { ActionPlanCard } from "@/components/voice/ActionPlanCard";
import { ExecutionStep } from "@/components/voice/ExecutionStep";
import { ConfirmationCard } from "@/components/voice/ConfirmationCard";
import { Switch } from "@/components/ui/switch";

const Demo = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"billsplit" | "screens">("billsplit");
  const [billSplitStep, setBillSplitStep] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);

  // Bill split workflow states
  const billSplitStates = [
    { type: "voice", duration: 2000 },
    { type: "chat", duration: 3000 },
    { type: "plan", duration: 4000 },
    { type: "execution-1", duration: 2500 },
    { type: "execution-2", duration: 2500 },
    { type: "execution-3", duration: 2500 },
    { type: "execution-4", duration: 2500 },
    { type: "confirmation", duration: 5000 },
  ];

  // App screens to showcase
  const appScreens = [
    { name: "Automations", component: <AutomationsScreen /> },
    { name: "Today", component: <TodayScreen /> },
    { name: "Work", component: <WorkScreen /> },
    { name: "Family", component: <FamilyScreen /> },
    { name: "Expenses", component: <ExpensesScreen /> },
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
            <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden">
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
                    key={`screen-${screenIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="w-full h-full overflow-y-auto"
                  >
                    {appScreens[screenIndex].component}
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
    <div className="p-6 space-y-4 min-h-full bg-gradient-to-b from-purple-950/20 to-black">
      {/* Header */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold">Asmi</h2>
      </div>

      {/* Voice Input State */}
      {currentState === "voice" && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center h-[600px] space-y-6"
        >
          {/* Microphone Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 0 20px rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-24 h-24 rounded-full bg-primary flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white" />
          </motion.div>
          <p className="text-foreground/60 text-sm">Listening...</p>
        </motion.div>
      )}

      {/* Chat State */}
      {(currentState === "chat" || currentState?.startsWith("plan") || currentState?.startsWith("execution") || currentState === "confirmation") && (
        <div className="space-y-4">
          <ConversationMessage role="user" content="Split my 9pm dinner bill" />
          
          {currentState !== "chat" && (
            <ConversationMessage
              role="assistant"
              content="I'll help you split the dinner bill. Let me check your calendar and emails to find the details."
            />
          )}
        </div>
      )}

      {/* Plan State */}
      {(currentState === "plan" || currentState?.startsWith("execution") || currentState === "confirmation") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ActionPlanCard
            plan="Split dinner bill from Osteria Mozza among attendees"
            steps={[
              "Scan inbox for dinner reservation confirmation",
              "Extract attendee list and total amount",
              "Calculate equal split for 8 people",
              "Send Splitwise requests to all attendees",
              "Verify payment confirmations"
            ]}
            status={currentState === "plan" ? "pending" : "executing"}
          />
        </motion.div>
      )}

      {/* Execution Steps */}
      {currentState === "execution-1" && (
        <ExecutionStep
          step="Scanning inbox for dinner reservation"
          status="executing"
          isCurrentStep={true}
        />
      )}
      {currentState === "execution-2" && (
        <ExecutionStep
          step="Computing split for 8 people"
          status="executing"
          isCurrentStep={true}
        />
      )}
      {currentState === "execution-3" && (
        <ExecutionStep
          step="Sending Splitwise requests"
          status="executing"
          isCurrentStep={true}
        />
      )}
      {currentState === "execution-4" && (
        <ExecutionStep
          step="Verifying payments"
          status="executing"
          isCurrentStep={true}
        />
      )}

      {/* Confirmation State */}
      {currentState === "confirmation" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ConfirmationCard
            confirmationType="billsplit"
            data={{
              title: "Dinner at Osteria Mozza",
              location: "Osteria Mozza",
              datetime: "Tonight, 9:00 PM",
              totalAmount: "$487.50",
              perPerson: "$60.94",
              attendees: 8,
              attendeeList: [
                { name: "John Doe", amount: "$60.94", status: "paid" },
                { name: "Sarah Chen", amount: "$60.94", status: "paid" },
                { name: "Mike Johnson", amount: "$60.94", status: "pending" },
                { name: "Emily Davis", amount: "$60.94", status: "paid" },
                { name: "Alex Kumar", amount: "$60.94", status: "pending" },
                { name: "Lisa Wang", amount: "$60.94", status: "paid" },
                { name: "David Park", amount: "$60.94", status: "paid" },
                { name: "Maria Garcia", amount: "$60.94", status: "pending" },
              ],
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

// Automations Screen
const AutomationsScreen = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-full">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">AI Automations</h1>
      </div>

      <div className="space-y-3">
        {[
          { title: "Smart Bill Splitting", desc: "Auto-split bills from emails", enabled: true },
          { title: "Meeting Summaries", desc: "AI notes from all meetings", enabled: true },
          { title: "Expense Tracking", desc: "Auto-categorize transactions", enabled: false },
          { title: "Email Priority", desc: "Filter urgent messages", enabled: true },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
              <Switch checked={item.enabled} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Today Screen
const TodayScreen = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-full">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Today</h1>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">URGENT DEADLINES</h3>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <p className="font-semibold">Q4 Budget Review</p>
            <p className="text-sm text-foreground/60">Due in 3 hours</p>
          </motion.div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">MEETINGS</h3>
          <div className="space-y-2">
            {[
              { title: "Team Standup", time: "10:00 AM" },
              { title: "Client Review", time: "2:00 PM" },
            ].map((meeting, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="font-semibold">{meeting.title}</p>
                <p className="text-sm text-foreground/60">{meeting.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Work Screen
const WorkScreen = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-full">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Work</h1>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">KEY MEETINGS</h3>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className="font-semibold">Product Strategy Review</p>
            <p className="text-sm text-foreground/60">Tomorrow, 3:00 PM</p>
            <p className="text-xs text-foreground/40 mt-1">With: Sarah, Mike, Emily</p>
          </motion.div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">PRIORITY TASKS</h3>
          <div className="space-y-2">
            {[
              { task: "Review Q4 proposals", due: "Today" },
              { task: "Update project timeline", due: "Tomorrow" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="font-semibold">{item.task}</p>
                <p className="text-sm text-foreground/60">{item.due}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Family Screen
const FamilyScreen = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-full">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Family</h1>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">KIDS' SCHEDULE</h3>
          <div className="space-y-2">
            {[
              { kid: "Emma", activity: "Soccer Practice", time: "4:00 PM" },
              { kid: "Noah", activity: "Piano Lesson", time: "5:30 PM" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="font-semibold">{item.kid} - {item.activity}</p>
                <p className="text-sm text-foreground/60">{item.time}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">SCHOOL EVENTS</h3>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className="font-semibold">Parent-Teacher Conference</p>
            <p className="text-sm text-foreground/60">Friday, 6:00 PM</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Expenses Screen
const ExpensesScreen = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-full">
      <div className="flex items-center gap-3">
        <Wallet className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Expenses</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-2xl bg-primary/20 border border-primary/20"
      >
        <p className="text-sm text-foreground/60">Monthly Total</p>
        <p className="text-4xl font-bold mt-2">$4,287</p>
      </motion.div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">UPCOMING BILLS</h3>
          <div className="space-y-2">
            {[
              { name: "Internet", amount: "$89", due: "Jan 15" },
              { name: "Electricity", amount: "$156", due: "Jan 18" },
            ].map((bill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{bill.name}</p>
                  <p className="text-sm text-foreground/60">Due {bill.due}</p>
                </div>
                <p className="text-lg font-bold">{bill.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/60 mb-2">SUBSCRIPTIONS</h3>
          <div className="space-y-2">
            {[
              { name: "Netflix", amount: "$15.99" },
              { name: "Spotify", amount: "$10.99" },
            ].map((sub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <p className="font-semibold">{sub.name}</p>
                <p className="text-foreground/60">{sub.amount}/mo</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
