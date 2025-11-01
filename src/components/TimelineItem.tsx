import { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  isLast?: boolean;
}

export const TimelineItem = ({ icon: Icon, title, time, isLast = false }: TimelineItemProps) => {
  return (
    <div className="flex gap-3 sm:gap-3 relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[21px] sm:left-[19px] top-[44px] sm:top-[40px] w-[1px] h-[calc(100%+12px)] bg-border" />
      )}
      
      {/* Icon */}
      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative z-10">
        <Icon className="w-6 h-6 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-2 pb-4 sm:pb-4">
        <p className="text-base sm:text-sm font-medium text-foreground leading-relaxed">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
};
