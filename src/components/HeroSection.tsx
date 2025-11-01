import { User } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-calm.jpg";
import minion1 from "@/assets/minions.png";
import minion2 from "@/assets/minions.png";
import minion3 from "@/assets/minions.png";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
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
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Calm serene background"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>
      
      {/* Minion Characters - 3 separate positioned in upper half */}
      <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none">
        <motion.img
          src={minion1}
          alt="AI Minion"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="absolute left-[10%] sm:left-[15%] top-[20%] w-24 sm:w-32 h-auto object-contain opacity-40 mix-blend-overlay"
          style={{ filter: "blur(0.5px)", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
        <motion.img
          src={minion2}
          alt="AI Minion"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-[15%] w-28 sm:w-36 h-auto object-contain opacity-45 mix-blend-overlay"
          style={{ filter: "blur(0.5px)", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
        <motion.img
          src={minion3}
          alt="AI Minion"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="absolute right-[10%] sm:right-[15%] top-[25%] w-20 sm:w-28 h-auto object-contain opacity-40 mix-blend-overlay"
          style={{ filter: "blur(0.5px)", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
      
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

        {/* Center greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
            {getGreeting()}
          </h1>
          <p className="text-lg text-muted-foreground">{getDate()}</p>
        </motion.div>

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
