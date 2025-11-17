import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const demoScreens = [
  {
    title: "Voice Assistant - Asmi",
    description: "Talk naturally to Asmi. She understands context and helps you manage your life effortlessly.",
    screen: "home",
    highlight: "Just say 'Split my 9pm dinner bill' and watch the magic happen"
  },
  {
    title: "Smart Bill Splitting",
    description: "Asmi checks your emails, finds dinner details, calculates splits, and sends payment requests automatically.",
    screen: "billsplit",
    highlight: "8 people, automatic calculations, instant Splitwise integration"
  },
  {
    title: "AI Automations",
    description: "Your personal AI that learns your patterns and handles recurring tasks automatically.",
    screen: "automations",
    highlight: "Expense tracking, bill reminders, calendar syncing - all on autopilot"
  },
  {
    title: "Today's Overview",
    description: "See everything that matters today in one beautiful view.",
    screen: "today",
    highlight: "Calendar, tasks, weather, and priorities - all at a glance"
  },
  {
    title: "Smart Expense Tracking",
    description: "Track expenses with AI categorization and insights.",
    screen: "expenses",
    highlight: "Visual analytics, budget alerts, spending patterns"
  },
  {
    title: "Unified Communication",
    description: "All your important messages in one intelligent hub.",
    screen: "mail",
    highlight: "AI-prioritized inbox, smart filters, quick actions"
  }
];

export default function Demo() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [iPhoneDemo, setIPhoneDemo] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % demoScreens.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIPhoneDemo((prev) => (prev + 1) % 4);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Meet Asmi
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Your AI-powered life assistant that actually understands you
            </p>
          </motion.div>

          {/* iPhone Demo + Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-3xl" />
                
                {/* iPhone Frame */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 w-[300px] h-[600px]">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
                  
                  {/* Screen */}
                  <div className="relative w-full h-full bg-gradient-to-b from-gray-950 to-black rounded-[2.5rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      {iPhoneDemo === 0 && (
                        <motion.div
                          key="demo1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-6"
                        >
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              🎤
                            </motion.div>
                          </div>
                          <p className="text-white text-sm text-center">
                            "Split my 9pm dinner bill"
                          </p>
                        </motion.div>
                      )}
                      {iPhoneDemo === 1 && (
                        <motion.div
                          key="demo2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 p-4 overflow-hidden"
                        >
                          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-4 backdrop-blur-sm border border-purple-500/30">
                            <div className="text-xs text-purple-300 mb-2">Scanning inbox...</div>
                            <motion.div
                              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5 }}
                            />
                            <div className="space-y-2 text-[10px] text-gray-300">
                              <div>✓ Found dinner receipt</div>
                              <div>✓ Detected 8 attendees</div>
                              <div>✓ Total: $240.00</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {iPhoneDemo === 2 && (
                        <motion.div
                          key="demo3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 p-4 overflow-y-auto"
                        >
                          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-4 backdrop-blur-sm border border-blue-500/30">
                            <div className="text-xs font-semibold text-blue-300 mb-3">Bill Split Plan</div>
                            <div className="space-y-2 text-[10px]">
                              {["Sarah", "Mike", "John", "Emma", "Alex", "Lisa", "Tom", "Kate"].map((name, i) => (
                                <motion.div
                                  key={name}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex justify-between items-center bg-black/30 rounded-lg p-2"
                                >
                                  <span className="text-gray-300">{name}</span>
                                  <span className="text-green-400 font-semibold">$30.00</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {iPhoneDemo === 3 && (
                        <motion.div
                          key="demo4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                            className="text-6xl mb-4"
                          >
                            ✅
                          </motion.div>
                          <p className="text-green-400 font-semibold text-sm">All payments confirmed!</p>
                          <p className="text-gray-400 text-xs mt-2">Sent via Splitwise</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                    <span className="text-sm text-purple-300">Feature {currentScreen + 1} of {demoScreens.length}</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {demoScreens[currentScreen].title}
                  </h2>
                  
                  <p className="text-xl text-gray-400">
                    {demoScreens[currentScreen].description}
                  </p>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
                    <p className="text-sm text-purple-200">
                      💡 {demoScreens[currentScreen].highlight}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots */}
              <div className="flex gap-2">
                {demoScreens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentScreen(index);
                      setIsPlaying(false);
                    }}
                    className="group"
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentScreen
                          ? "w-12 bg-gradient-to-r from-purple-500 to-pink-500"
                          : "w-2 bg-gray-600 group-hover:bg-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Key Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-24 grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: "🧠", title: "Context-Aware AI", desc: "Understands your habits, preferences, and patterns" },
              { icon: "⚡", title: "Lightning Fast", desc: "Real-time processing and instant action execution" },
              { icon: "🔐", title: "Secure & Private", desc: "Your data stays private with end-to-end encryption" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/50"
              >
                Try Asmi Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}