import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";

interface ActionPlanCardProps {
  plan: string;
  steps?: string[];
  status?: "pending" | "executing" | "completed";
  onConfirm?: () => void;
  onModify?: () => void;
}

export const ActionPlanCard = ({
  plan,
  steps,
  status = "pending",
  onConfirm,
  onModify,
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

      {/* Action buttons - only show when pending */}
      {status === "pending" && onConfirm && (
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Confirm
          </motion.button>
          {onModify && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onModify}
              className="flex-1 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/90 transition-colors"
            >
              Modify
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};
