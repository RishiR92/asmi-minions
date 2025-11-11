import { motion } from "framer-motion";
import { CheckCircle, Loader, Circle } from "lucide-react";

interface ExecutionStepProps {
  step: string;
  status: "pending" | "executing" | "completed";
}

export const ExecutionStep = ({ step, status }: ExecutionStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl voice-glass"
    >
      {status === "completed" ? (
        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
      ) : status === "executing" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-5 h-5 text-primary flex-shrink-0" />
        </motion.div>
      ) : (
        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      )}
      <span className={`text-xs leading-relaxed ${status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
        {step}
      </span>
    </motion.div>
  );
};
