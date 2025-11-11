import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  title: string;
  subtitle?: string;
  details: string[];
  image?: string;
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
}

export const ResultCard = ({ title, subtitle, details, image, actions }: ResultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-sheet rounded-2xl p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {image && (
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        {details.map((detail, index) => (
          <p key={index} className="text-sm text-foreground">
            {detail}
          </p>
        ))}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex gap-2 pt-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="flex items-center gap-2"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
