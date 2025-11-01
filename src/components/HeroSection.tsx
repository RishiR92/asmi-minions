import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import minionVideo from "@/assets/minion-hero.mp4";

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
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <source src={minionVideo} type="video/mp4" />
      </video>
      
      {/* Gradient overlay - stronger when video ends */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-500 ${
          videoEnded 
            ? "from-background/50 via-background/30 to-background/90" 
            : "from-background/20 via-background/10 to-background/60"
        }`}
        style={{ transform: "translateZ(0)" }}
      />
      
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

        {/* Bottom greeting - Only visible after video ends */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col justify-end pb-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight drop-shadow-lg">
                {getGreeting()}
              </h1>
              <p className="text-lg text-muted-foreground drop-shadow-md">{getDate()}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
