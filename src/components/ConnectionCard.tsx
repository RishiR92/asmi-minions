import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ConnectionCardProps {
  icon: LucideIcon;
  service: string;
  accountInfo: string;
  isConnected: boolean;
  lastSync?: string;
}

export const ConnectionCard = ({
  icon: Icon,
  service,
  accountInfo,
  isConnected,
  lastSync,
}: ConnectionCardProps) => {
  return (
    <div className="glass rounded-2xl p-5 sm:p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 flex-1 min-w-0">
          <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-semibold text-foreground text-base sm:text-sm">{service}</h4>
              {isConnected && (
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                  Connected
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{accountInfo}</p>
            {lastSync && (
              <p className="text-xs text-muted-foreground mt-1">Last sync: {lastSync}</p>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/10 min-h-[44px] px-4 flex-shrink-0"
        >
          Manage
        </Button>
      </div>
    </div>
  );
};
