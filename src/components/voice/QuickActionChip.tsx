import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionChipProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const QuickActionChip = ({ icon: Icon, label, href }: QuickActionChipProps) => {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 min-w-[70px]"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors hover:bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-medium text-foreground text-center leading-tight">{label}</span>
      </motion.div>
    </Link>
  );
};
