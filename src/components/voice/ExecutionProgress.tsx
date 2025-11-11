import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

interface ExecutionStep {
  id: number;
  label: string;
  status: "pending" | "in-progress" | "completed";
  result?: string;
}

interface ExecutionProgressProps {
  steps: ExecutionStep[];
}

export const ExecutionProgress = ({ steps }: ExecutionProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-3"
        >
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {step.status === "completed" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </motion.div>
            )}
            {step.status === "in-progress" && (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            )}
            {step.status === "pending" && (
              <div className="w-5 h-5 rounded-full bg-muted" />
            )}
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${
                step.status === "completed"
                  ? "text-foreground"
                  : step.status === "in-progress"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </p>
            {step.result && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-muted-foreground mt-1"
              >
                {step.result}
              </motion.p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
