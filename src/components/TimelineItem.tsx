import { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  isLast?: boolean;
}

export const TimelineItem = ({ icon: Icon, title, time, isLast = false }: TimelineItemProps) => {
  return (
    <div className="flex gap-4 relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[23px] top-[52px] w-[1px] h-[calc(100%+8px)] bg-border/50" />
      )}
      
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 relative z-10 shadow-soft">
        <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-2 pb-5">
        <p className="text-base font-heading font-medium text-foreground leading-relaxed mb-1">{title}</p>
        <p className="text-sm font-accent text-muted-foreground">{time}</p>
      </div>
    </div>
  );
};
