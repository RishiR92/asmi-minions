import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  gradient?: string;
  delay?: number;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  gradient = "gradient-primary",
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-3xl p-5 hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center shadow-medium`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-sm font-semibold text-primary">
            {change}
          </span>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
        {value}
      </p>
    </motion.div>
  );
};