import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";

interface ActionPlanCardProps {
  plan: string;
  steps?: string[];
  status?: "pending" | "executing" | "completed";
}

export const ActionPlanCard = ({
  plan,
  steps,
  status = "pending",
}: ActionPlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="voice-glass rounded-3xl p-6 space-y-4"
    >
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        {status === "executing" ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-5 h-5 text-primary" />
          </motion.div>
        ) : status === "completed" ? (
          <CheckCircle2 className="w-5 h-5 text-secondary" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-primary/20" />
        )}
        <span className="text-sm font-medium text-muted-foreground">
          {status === "executing" ? "Working on it..." : status === "completed" ? "Done!" : "Action Plan"}
        </span>
      </div>

      {/* Plan description */}
      <div className="asmi-message text-foreground">{plan}</div>

      {/* Steps if provided */}
      {steps && steps.length > 0 && (
        <div className="space-y-2 pl-4 border-l-2 border-primary/30">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-primary font-semibold">{index + 1}.</span>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
