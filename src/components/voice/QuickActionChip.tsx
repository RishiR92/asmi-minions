import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionChipProps {
  icon: LucideIcon;
  label: string;
  stat: string;
  href: string;
  size?: "sm" | "md";
}

export const QuickActionChip = ({ icon: Icon, label, stat, href, size = "md" }: QuickActionChipProps) => {
  const isSm = size === "sm";
  
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`voice-glass rounded-3xl flex items-center gap-4 shadow-soft hover:shadow-elevated transition-all duration-300 ${
          isSm ? "px-4 py-3 min-w-[220px]" : "px-6 py-4 w-full"
        }`}
      >
        <div className={`rounded-full bg-primary flex items-center justify-center flex-shrink-0 ${
          isSm ? "w-10 h-10" : "w-14 h-14"
        }`}>
          <Icon className={`text-primary-foreground ${isSm ? "w-5 h-5" : "w-7 h-7"}`} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className={`font-medium text-foreground ${isSm ? "text-sm" : "text-base"}`}>{label}</span>
          <span className={`text-muted-foreground ${isSm ? "text-xs" : "text-sm"}`}>{stat}</span>
        </div>
      </motion.div>
    </Link>
  );
};
