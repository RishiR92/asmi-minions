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
      <div className="glass rounded-3xl p-6 tap-subtle cursor-pointer min-w-[280px] h-[160px] flex flex-col justify-between shadow-soft hover:shadow-md transition-shadow duration-300">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
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
