import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, Calendar, CreditCard, Receipt, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    id: "intro",
    title: "AI Mins",
    subtitle: "Your intelligent personal assistant",
    icon: Sparkles,
    gradient: "from-primary via-purple-500 to-pink-500",
    description: "Automate your digital life with AI",
  },
  {
    id: "automations",
    title: "Smart Automations",
    subtitle: "Set it and forget it",
    icon: Zap,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    description: "Intelligent workflows that adapt to you",
    stats: ["12 Active", "2.5hrs Saved", "98% Success"],
  },
  {
    id: "mail",
    title: "Mail Hub",
    subtitle: "Inbox zero, simplified",
    icon: Mail,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    description: "AI-powered email management",
    stats: ["243 Unread", "18 Important", "5 Drafts"],
  },
  {
    id: "calendar",
    title: "Smart Calendar",
    subtitle: "Never miss a moment",
    icon: Calendar,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    description: "Intelligent scheduling & reminders",
    stats: ["8 Events Today", "12hrs Scheduled", "3 Upcoming"],
  },
  {
    id: "subscriptions",
    title: "Subscription Tracker",
    subtitle: "Know where your money goes",
    icon: CreditCard,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    description: "Track all your recurring payments",
    stats: ["$127.43/mo", "8 Active", "$1,529/year"],
  },
  {
    id: "bills",
    title: "Bill Management",
    subtitle: "Never pay late again",
    icon: Receipt,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    description: "Smart bill tracking & reminders",
    stats: ["3 Due Soon", "$284.50", "2 Overdue"],
  },
  {
    id: "profile",
    title: "Connected Life",
    subtitle: "Everything in one place",
    icon: User,
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    description: "Unified profile & connections",
    stats: ["5 Services", "Last sync: 2m ago", "All active"],
  },
];

const FeatureShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {features.map((_, index) => (
          <motion.div
            key={index}
            className="h-1 rounded-full bg-white/20"
            style={{ width: index === currentIndex ? 48 : 24 }}
            animate={{
              width: index === currentIndex ? 48 : 24,
              backgroundColor:
                index === currentIndex
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          className="w-full max-w-6xl mx-auto px-8 relative z-10"
        >
          <div className="text-center space-y-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div
                className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${currentFeature.gradient} flex items-center justify-center shadow-2xl`}
              >
                <Icon className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-7xl font-bold text-foreground tracking-tight">
                {currentFeature.title}
              </h1>
              <p className="text-3xl text-muted-foreground font-light">
                {currentFeature.subtitle}
              </p>
              <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
                {currentFeature.description}
              </p>
            </motion.div>

            {/* Stats */}
            {currentFeature.stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 justify-center flex-wrap"
              >
                {currentFeature.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-lg px-6 py-3 bg-background/50 backdrop-blur-xl border-border/50"
                    >
                      {stat}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Call to action (only on intro) */}
            {currentFeature.id === "intro" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="gradient-primary text-xl px-12 py-6 rounded-3xl shadow-glow"
                >
                  Get Started
                </Button>
              </motion.div>
            )}
          </div>

          {/* Feature visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 relative"
          >
            <div
              className={`w-full max-w-4xl mx-auto h-80 rounded-3xl bg-gradient-to-br ${currentFeature.gradient} opacity-20 blur-2xl`}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Control hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-sm"
      >
        Auto-playing showcase • Screen record ready
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;
