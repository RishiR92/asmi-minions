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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="voice-glass rounded-full px-4 py-3 flex items-center gap-3 min-w-max shadow-soft hover:shadow-elevated transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-voice-primary to-voice-accent flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{stat}</span>
        </div>
      </motion.div>
    </Link>
  );
};
