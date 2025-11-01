import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CircularIconButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const CircularIconButton = ({ icon: Icon, label, href }: CircularIconButtonProps) => {
  return (
    <Link to={href} className="flex flex-col items-center gap-2 group">
      <motion.div
        whileTap={{ scale: 0.92 }}
        className="w-20 h-20 rounded-full glass flex items-center justify-center transition-all duration-300 group-hover:scale-105"
      >
        <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
      </motion.div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </Link>
  );
};
