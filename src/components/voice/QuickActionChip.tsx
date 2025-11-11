import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionChipProps {
  icon: LucideIcon;
  label: string;
  stat: string;
  href: string;
}

export const QuickActionChip = ({ icon: Icon, label, stat, href }: QuickActionChipProps) => {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="voice-glass rounded-3xl px-6 py-4 flex items-center gap-4 w-full shadow-soft hover:shadow-elevated transition-all duration-300"
      >
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-base font-medium text-foreground">{label}</span>
          <span className="text-sm text-muted-foreground">{stat}</span>
        </div>
      </motion.div>
    </Link>
  );
};
