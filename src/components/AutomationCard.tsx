import { LucideIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

interface AutomationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  onToggle: () => void;
  onClick: () => void;
  delay?: number;
}

export const AutomationCard = ({
  icon: Icon,
  title,
  description,
  enabled,
  lastRun,
  nextRun,
  onToggle,
  onClick,
  delay = 0,
}: AutomationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="glass rounded-2xl p-5 sm:p-6 cursor-pointer group hover:scale-[1.01] transition-all duration-300 active:scale-[0.99] min-h-[44px]"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          enabled ? "gradient-primary shadow-glow" : "bg-muted"
        }`}>
          <Icon className={`w-6 h-6 ${enabled ? "text-white" : "text-muted-foreground"}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-foreground">
              {title}
            </h3>
            <Switch
              checked={enabled}
              onCheckedChange={(checked) => {
                onToggle();
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            {lastRun && (
              <span className="text-muted-foreground">
                Last: <span className="text-foreground font-medium">{lastRun}</span>
              </span>
            )}
            {nextRun && (
              <span className="text-muted-foreground">
                Next: <span className="text-primary font-medium">{nextRun}</span>
              </span>
            )}
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </motion.div>
  );
};