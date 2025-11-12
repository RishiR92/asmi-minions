import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionPlanCardProps {
  plan: string;
  steps?: string[];
  onConfirm?: () => void;
  onModify?: () => void;
  status?: "pending" | "executing" | "completed";
}

export const ActionPlanCard = ({
  plan,
  steps = [],
  onConfirm,
  onModify,
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
            <Clock className="w-5 h-5 text-voice-primary" />
          </motion.div>
        ) : status === "completed" ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-voice-primary/20" />
        )}
        <span className="text-xs font-medium text-muted-foreground">
          {status === "executing" ? "Working on it..." : status === "completed" ? "Done!" : "Action Plan"}
        </span>
      </div>

      {/* Plan description */}
      <div className="asmi-message text-foreground leading-relaxed">{plan}</div>

      {/* Steps if provided */}
      {steps.length > 0 && (
        <div className="space-y-2 pl-4 border-l-2 border-voice-primary/30">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-xs text-muted-foreground flex items-start gap-2"
            >
              <span className="text-voice-primary font-semibold">{index + 1}.</span>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {status === "pending" && (onConfirm || onModify) && (
        <div className="flex gap-3 pt-2">
          {onConfirm && (
            <Button
              onClick={onConfirm}
              className="flex-1 bg-primary text-white hover:bg-primary/90"
            >
              Confirm
            </Button>
          )}
          {onModify && (
            <Button onClick={onModify} variant="outline" className="flex-1">
              Modify
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};
