import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

  // Determine what to show based on the step text
  const getStepDetails = () => {
    const lowerStep = step.toLowerCase();
    
    if (lowerStep.includes('email') || lowerStep.includes('attendees')) {
      return {
        subtext: "Scanning inbox for dinner thread...",
        details: ["Found: 8 attendees", "Priorities: Sarah (vegetarian), Mike (no shellfish)"]
      };
    } else if (lowerStep.includes('retrieve') || lowerStep.includes('bill')) {
      return {
        subtext: "Accessing receipt from Olive Garden...",
        details: ["Total: $240.00", "Items: Pasta, Salads, Drinks", "Tax: $18.50, Tip: $36.00"]
      };
    } else if (lowerStep.includes('calculate') || lowerStep.includes('split')) {
      return {
        subtext: "Computing fair split...",
        details: ["$240.00 ÷ 8 people", "Each person: $30.00", "Splitwise fee: $0.00"]
      };
    } else if (lowerStep.includes('splitwise') || lowerStep.includes('payment')) {
      return {
        subtext: "Sending payment requests...",
        details: ["John ✓", "Sarah ✓", "Mike ✓", "Emily ✓", "Alex ✓", "Lisa ✓", "David ✓", "Maria ✓"]
      };
    } else if (lowerStep.includes('confirm') || lowerStep.includes('paid')) {
      return {
        subtext: "Verifying payments...",
        details: ["8/8 payments received", "All transactions cleared", "Confirmation emails sent"]
      };
    }
    
    return {
      subtext: "Processing...",
      details: []
    };
  };

  const stepDetails = getStepDetails();

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
        <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl" />
        
        {/* Main card */}
        <motion.div 
          className="relative bg-slate-800/80 backdrop-blur border border-emerald-500/30 rounded-2xl p-5 shadow-xl shadow-emerald-500/10"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.1)",
              "0 0 40px rgba(16, 185, 129, 0.2)",
              "0 0 20px rgba(16, 185, 129, 0.1)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Animated spinner */}
            <motion.div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full" />
              <motion.div
                className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
            </motion.div>

            <div className="flex-1 space-y-3 min-w-0">
              <div className="space-y-2">
                <motion.p 
                  className="text-sm font-medium text-slate-100"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step}
                </motion.p>
                
                {/* Subtext showing what's happening */}
                <motion.p
                  className="text-xs text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {stepDetails.subtext}
                </motion.p>
                
                {/* Animated progress bar */}
                <div className="h-1.5 bg-slate-900/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>

              {/* Details that appear */}
              {stepDetails.details.length > 0 && (
                <div className="space-y-1.5">
                  {stepDetails.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/50 rounded-lg px-3 py-1.5"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Data particles effect */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400/40"
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
