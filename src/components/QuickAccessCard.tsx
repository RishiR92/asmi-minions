import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient?: string;
  delay?: number;
}

export const QuickAccessCard = ({
  icon: Icon,
  title,
  description,
  href,
  gradient = "gradient-primary",
  delay = 0,
}: QuickAccessCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Link to={href}>
        <div className="glass rounded-3xl p-6 hover-lift tap-scale cursor-pointer group relative overflow-hidden">
          {/* Background gradient on hover */}
          <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          <div className="relative">
            <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center mb-4 shadow-glow`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-lg font-bold text-foreground mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};