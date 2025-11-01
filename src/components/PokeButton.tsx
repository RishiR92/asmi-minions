import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PokeButtonProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export const PokeButton = ({ size = "md", onClick, className }: PokeButtonProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border-0 p-0",
        sizeClasses[size],
        className
      )}
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      <Zap className={cn("fill-white", iconSizes[size])} />
    </Button>
  );
};
