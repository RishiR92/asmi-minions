import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const SceneHero = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gradient-primary relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 space-y-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-icon shadow-glow mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-12 h-12 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          className="text-6xl font-heading font-bold text-white tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          AI Mins
        </motion.h1>

        <motion.p
          className="text-2xl font-accent text-white/90 tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Your intelligent personal assistant
        </motion.p>

        <motion.div
          className="h-1 w-32 mx-auto bg-white/40 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </motion.div>
    </div>
  );
};
