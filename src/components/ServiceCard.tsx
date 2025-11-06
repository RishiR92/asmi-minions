import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  stat: string;
  href: string;
}

export const ServiceCard = ({ icon: Icon, title, stat, href }: ServiceCardProps) => {
  return (
    <Link to={href}>
      <div className="liquid-glass rounded-2xl p-6 tap-glow tap-subtle cursor-pointer min-w-[280px] h-[160px] flex flex-col justify-between hover:shadow-hover transition-all duration-300 group">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
        
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-1.5 tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-sm font-accent text-muted-foreground tracking-wide">
            {stat}
          </p>
        </div>
      </div>
    </Link>
  );
};
