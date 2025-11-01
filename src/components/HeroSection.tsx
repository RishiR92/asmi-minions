import { User } from "lucide-react";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.png";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, Rishi";
  if (hour < 18) return "Good afternoon, Rishi";
  return "Good evening, Rishi";
};

const getDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const HeroSection = () => {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Hero Background with Minions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <img
          src={heroBackground}
          alt="AI Minions background"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </motion.div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 pt-safe">
        {/* Top section with profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-end items-start"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Bottom greeting - positioned to avoid minions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-end pb-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight drop-shadow-lg">
            {getGreeting()}
          </h1>
          <p className="text-lg text-muted-foreground drop-shadow-md">{getDate()}</p>
        </motion.div>

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
