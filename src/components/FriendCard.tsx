import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PokeButton } from "./PokeButton";
import { cn } from "@/lib/utils";

interface FriendCardProps {
  name: string;
  avatar?: string;
  status?: string;
  lastActive?: string;
  onPoke?: () => void;
  className?: string;
}

export const FriendCard = ({
  name,
  avatar,
  status,
  lastActive,
  onPoke,
  className,
}: FriendCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "glass rounded-2xl p-4 hover-lift animate-scale-in",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-14 h-14 ring-2 ring-primary/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {status && (
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                status === "online" ? "bg-green-500" : "bg-muted"
              )}
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          {lastActive && (
            <p className="text-xs text-muted-foreground">{lastActive}</p>
          )}
        </div>
        
        <PokeButton size="sm" onClick={onPoke} />
      </div>
    </div>
  );
};
