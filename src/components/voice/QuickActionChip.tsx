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
    <Link to={href} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="voice-glass rounded-2xl sm:rounded-3xl px-6 py-4 sm:px-8 sm:py-5 flex items-center gap-4 shadow-soft hover:shadow-elevated transition-all duration-300"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm sm:text-base font-semibold text-foreground">{label}</span>
          <span className="text-sm sm:text-base text-muted-foreground">{stat}</span>
        </div>
      </motion.div>
    </Link>
  );
};
