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
        {/* Main card */}
        <motion.div 
          className="relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Green checkmark */}
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <p className="text-sm font-medium text-slate-900">
                {step}
              </p>
              
              <p className="text-xs text-slate-600">
                {stepDetails.subtext}
              </p>
              
              {/* Details list */}
              {stepDetails.details.length > 0 && (
                <div className="space-y-1 text-xs pt-1">
                  {stepDetails.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
