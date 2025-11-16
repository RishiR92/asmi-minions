import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

interface ExecutionStepProps {
  step: string;
  status: "pending" | "executing" | "completed";
  isCurrentStep?: boolean;
}

export const ExecutionStep = ({ step, status, isCurrentStep = false }: ExecutionStepProps) => {
  // Only show the currently executing step
  if (status !== "executing" || !isCurrentStep) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl animate-pulse" />
        
        {/* Main card */}
        <motion.div 
          className="relative voice-glass rounded-2xl p-5 sm:p-6 border-2 border-primary/30"
          animate={{ 
            boxShadow: [
              "0 0 20px hsl(var(--primary) / 0.3)",
              "0 0 40px hsl(var(--primary) / 0.5)",
              "0 0 20px hsl(var(--primary) / 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Animated icon */}
            <motion.div 
              className="relative flex-shrink-0"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
              </motion.div>
            </motion.div>

            <div className="flex-1 space-y-3 min-w-0">
              <div className="space-y-2">
                <motion.p 
                  className="text-sm sm:text-base font-semibold text-foreground leading-relaxed"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step}
                </motion.p>
                
                {/* Animated progress bar */}
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>

              {/* Data particles effect */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/40"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
