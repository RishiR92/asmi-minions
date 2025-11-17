import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const billSplitSequence = [
  {
    type: "voice",
    content: "Split my 9pm dinner bill"
  },
  {
    type: "chat",
    messages: [
      { role: "user", text: "Split my 9pm dinner bill" },
      { role: "assistant", text: "Got it! Let me work on that for you..." }
    ]
  },
  {
    type: "plan",
    title: "Bill Split Plan",
    steps: [
      "Scan inbox for dinner receipt",
      "Identify attendees from emails",
      "Calculate per-person amount",
      "Send Splitwise payment requests",
      "Verify payment confirmations"
    ]
  },
  {
    type: "execution",
    step: "Scanning inbox for receipt...",
    details: ["Found: Dinner receipt from Olive Garden", "Date: Today 9:00 PM", "Total: $240.00"]
  },
  {
    type: "execution",
    step: "Calculating split for 8 people...",
    details: ["Per person: $30.00", "Tax & tip included", "Splitwise ready"]
  },
  {
    type: "execution",
    step: "Sending payment requests...",
    details: ["Sarah - $30.00 ✓", "Mike - $30.00 ✓", "John - $30.00 ✓", "Emma - $30.00 ✓"]
  },
  {
    type: "confirmation",
    attendees: [
      { name: "Sarah M.", amount: "$30.00", status: "paid" },
      { name: "Mike R.", amount: "$30.00", status: "paid" },
      { name: "John D.", amount: "$30.00", status: "paid" },
      { name: "Emma S.", amount: "$30.00", status: "paid" },
      { name: "Alex K.", amount: "$30.00", status: "paid" },
      { name: "Lisa T.", amount: "$30.00", status: "paid" },
      { name: "Tom W.", amount: "$30.00", status: "paid" },
      { name: "Kate P.", amount: "$30.00", status: "paid" }
    ]
  }
];

const appScreens = [
  {
    name: "AI Automations",
    content: (
      <div className="p-4 space-y-3">
        <div className="text-xs font-semibold text-white/60 mb-3">Active Automations</div>
        {["Bill Reminders", "Expense Tracking", "Smart Email Sort", "Calendar Sync"].map((item, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-white font-medium">{item}</div>
            <div className="text-[10px] text-white/40 mt-1">Running automatically</div>
          </div>
        ))}
      </div>
    )
  },
  {
    name: "Today",
    content: (
      <div className="p-4 space-y-3">
        <div className="text-xs font-semibold text-white/60 mb-3">Today's Schedule</div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Team Standup</div>
          <div className="text-[10px] text-white/40 mt-1">10:00 AM • 30 min</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Client Call</div>
          <div className="text-[10px] text-white/40 mt-1">2:00 PM • 1 hour</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Q4 Report Due</div>
          <div className="text-[10px] text-red-400 mt-1">5:00 PM deadline</div>
        </div>
      </div>
    )
  },
  {
    name: "Work",
    content: (
      <div className="p-4 space-y-3">
        <div className="text-xs font-semibold text-white/60 mb-3">This Week</div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Board Review</div>
          <div className="text-[10px] text-white/40 mt-1">Tomorrow • 9:00 AM</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Product Launch</div>
          <div className="text-[10px] text-white/40 mt-1">Friday • 2:00 PM</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Budget Approval</div>
          <div className="text-[10px] text-white/40 mt-1">Due Tomorrow</div>
        </div>
      </div>
    )
  },
  {
    name: "Family",
    content: (
      <div className="p-4 space-y-3">
        <div className="text-xs font-semibold text-white/60 mb-3">Family Events</div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Soccer Practice</div>
          <div className="text-[10px] text-white/40 mt-1">Wed & Fri • 4:00 PM</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Movie Night</div>
          <div className="text-[10px] text-white/40 mt-1">Saturday • 7:00 PM</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white font-medium">Parent-Teacher Meet</div>
          <div className="text-[10px] text-white/40 mt-1">Next Tuesday</div>
        </div>
      </div>
    )
  },
  {
    name: "Expenses",
    content: (
      <div className="p-4 space-y-3">
        <div className="text-xs font-semibold text-white/60 mb-3">Recent Expenses</div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-white font-medium">Groceries</div>
              <div className="text-[10px] text-white/40 mt-1">Whole Foods</div>
            </div>
            <div className="text-xs text-white">$124.50</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-white font-medium">Dinner</div>
              <div className="text-[10px] text-white/40 mt-1">Olive Garden</div>
            </div>
            <div className="text-xs text-white">$240.00</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-white font-medium">Gas</div>
              <div className="text-[10px] text-white/40 mt-1">Shell Station</div>
            </div>
            <div className="text-xs text-white">$65.20</div>
          </div>
        </div>
      </div>
    )
  }
];

export default function Demo() {
  const [phase, setPhase] = useState<"billsplit" | "screens">("billsplit");
  const [billSplitStep, setBillSplitStep] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    if (phase === "billsplit") {
      if (billSplitStep < billSplitSequence.length - 1) {
        const timer = setTimeout(() => {
          setBillSplitStep(prev => prev + 1);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase("screens");
          setScreenIndex(0);
        }, 4000);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setInterval(() => {
        setScreenIndex(prev => (prev + 1) % appScreens.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [phase, billSplitStep]);

  const currentSequence = billSplitSequence[billSplitStep];

  return (
    <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center p-4">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* iPhone Mockup */}
      <div className="relative">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-white/10 blur-3xl scale-75" />
        
        {/* iPhone Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 w-[340px] h-[680px]">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
          
          {/* Screen */}
          <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
            <AnimatePresence mode="wait">
              {phase === "billsplit" ? (
                <motion.div
                  key={billSplitStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 p-4 overflow-y-auto"
                >
                  {currentSequence.type === "voice" && (
                    <div className="h-full flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6"
                      >
                        <div className="text-4xl">🎤</div>
                      </motion.div>
                      <div className="text-white/60 text-sm text-center px-8">
                        "{currentSequence.content}"
                      </div>
                    </div>
                  )}

                  {currentSequence.type === "chat" && (
                    <div className="h-full flex flex-col justify-end space-y-3">
                      {currentSequence.messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.5 }}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs ${
                            msg.role === "user" 
                              ? "bg-white/10 text-white" 
                              : "bg-white/5 text-white/80"
                          }`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentSequence.type === "plan" && (
                    <div className="space-y-4">
                      <div className="text-sm font-semibold text-white mb-4">{currentSequence.title}</div>
                      <div className="space-y-2">
                        {currentSequence.steps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex items-start gap-3 bg-white/5 rounded-lg p-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/60 flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className="text-xs text-white/80">{step}</div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button className="bg-white text-black hover:bg-white/90 text-xs px-6">
                          Confirm Plan
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentSequence.type === "execution" && (
                    <div className="h-full flex items-center justify-center">
                      <div className="w-full space-y-4">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center"
                          >
                            <div className="text-xl">⚡</div>
                          </motion.div>
                          <div className="text-sm text-white font-medium mb-2">{currentSequence.step}</div>
                        </div>
                        <div className="space-y-2 bg-white/5 rounded-xl p-4">
                          {currentSequence.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.3 }}
                              className="text-xs text-white/60"
                            >
                              {detail}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSequence.type === "confirmation" && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-5xl mb-2"
                        >
                          ✅
                        </motion.div>
                        <div className="text-sm font-semibold text-white">All Payments Confirmed</div>
                        <div className="text-xs text-white/40 mt-1">Sent via Splitwise</div>
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {currentSequence.attendees.map((person, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white font-medium">
                                {person.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="text-xs text-white">{person.name}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-white/80">{person.amount}</div>
                              <div className="text-green-400 text-xs">✓</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={screenIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0"
                >
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-white/10">
                      <div className="text-lg font-semibold text-white">{appScreens[screenIndex].name}</div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {appScreens[screenIndex].content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}