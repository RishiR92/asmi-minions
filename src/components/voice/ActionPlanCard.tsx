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
      className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
          {status === "executing" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-5 h-5 text-emerald-400" />
            </motion.div>
          ) : status === "completed" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-slate-100 font-semibold mb-1">
            {status === "executing" ? "Working on it..." : status === "completed" ? "Done!" : "Action Plan"}
          </h3>
          <p className="text-slate-300 text-sm">{plan}</p>
        </div>
      </div>
      
      {/* Steps */}
      {steps.length > 0 && (
        <div className="space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-slate-300">{step}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {status === "pending" && (onConfirm || onModify) && (
        <div className="flex gap-3 pt-4 mt-4 border-t border-slate-700">
          {onConfirm && (
            <Button
              onClick={onConfirm}
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Confirm
            </Button>
          )}
          {onModify && (
            <Button onClick={onModify} variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
              Modify
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};
