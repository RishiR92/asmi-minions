import { User } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <div className="relative h-[35vh] min-h-[280px] overflow-hidden bg-gradient-to-b from-background-gradient-start via-background to-background-gradient-end">
      {/* Video Background - portrait optimized, autoplay muted loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        style={{ transform: "translateZ(0) scale(1.03)", backfaceVisibility: "hidden", objectPosition: "center top" }}
      >
        <source src={minionVideo} type="video/mp4" />
      </video>
      
      {/* Luminous overlay - keep subtle, no fade-out */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/30 to-background"
        style={{ transform: "translateZ(0)", opacity: 0.3 }}
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

        {/* Bottom greeting */}
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

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
