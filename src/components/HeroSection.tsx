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
  const [videoFading, setVideoFading] = useState(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const timeLeft = video.duration - video.currentTime;
    // Start fading 1 second before the end
    if (timeLeft <= 1 && timeLeft > 0 && !videoFading) {
      setVideoFading(true);
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-b from-background-gradient-start via-background to-background-gradient-end">
      {/* Video Background - portrait optimized, autoplay muted loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={() => setVideoEnded(true)}
        onTimeUpdate={handleTimeUpdate}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          videoFading ? 'opacity-25' : 'opacity-100'
        }`}
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <source src={minionVideo} type="video/mp4" />
      </video>
      
      {/* Luminous overlay - dimensional fade */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/40 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 1 : (videoFading ? 0.95 : 0.3) }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
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

        {/* Bottom greeting - Dimensional fade with glow */}
        <AnimatePresence>
        {videoEnded && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col justify-end pb-8 breathe"
            >
              <h1 className="text-4xl sm:text-5xl font-heading font-semibold text-foreground mb-3 tracking-tight leading-tight" 
                  style={{ textShadow: '0 4px 16px rgba(139, 110, 255, 0.25), 0 2px 8px rgba(83, 211, 194, 0.15)' }}>
                {getGreeting()}
              </h1>
              <p className="text-lg font-accent text-muted-foreground tracking-wide" 
                 style={{ textShadow: '0 2px 8px rgba(255, 255, 255, 0.9)' }}>
                {getDate()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
