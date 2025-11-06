import { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  isLast?: boolean;
}

export const TimelineItem = ({ icon: Icon, title, time, isLast = false }: TimelineItemProps) => {
  return (
    <div className="flex gap-4 relative group">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[23px] top-[52px] w-[2px] h-[calc(100%+8px)] bg-gradient-to-b from-primary/30 to-secondary/20" />
      )}
      
      {/* Icon */}
      <div className="w-12 h-12 rounded-3xl gradient-icon flex items-center justify-center flex-shrink-0 relative z-10 shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-500">
        <Icon className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-2 pb-5">
        <p className="text-base font-heading font-medium text-foreground leading-relaxed mb-1 tracking-tight">{title}</p>
        <p className="text-sm font-label text-muted-foreground tracking-wide">{time}</p>
      </div>
    </div>
  );
};
