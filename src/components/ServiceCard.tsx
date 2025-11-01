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
      <div className="glass rounded-3xl p-5 sm:p-6 tap-subtle cursor-pointer min-w-[260px] sm:min-w-[280px] h-[140px] sm:h-[160px] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]">
        <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
        </div>
        
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {stat}
          </p>
        </div>
      </div>
    </Link>
  );
};
