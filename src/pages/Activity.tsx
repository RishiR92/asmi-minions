import { Zap, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: number;
  type: "sent" | "received";
  user: string;
  time: string;
  avatar?: string;
}

const activities: ActivityItem[] = [
  { id: 1, type: "received", user: "Sarah Chen", time: "2m ago" },
  { id: 2, type: "sent", user: "Mike Johnson", time: "5m ago" },
  { id: 3, type: "received", user: "Emma Davis", time: "10m ago" },
  { id: 4, type: "sent", user: "Alex Rivera", time: "15m ago" },
  { id: 5, type: "received", user: "Jordan Lee", time: "1h ago" },
  { id: 6, type: "sent", user: "Taylor Swift", time: "2h ago" },
];

const Activity = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 z-40 pt-safe">
        <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <h1 className="text-2xl font-bold text-foreground">Activity</h1>
          <p className="text-sm text-muted-foreground mt-1">Your poke history</p>
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-6">
        <div className="space-y-3">
          {activities.map((activity) => {
            const initials = activity.user
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={activity.id}
                className="glass rounded-2xl p-5 sm:p-4 animate-scale-in hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.type === "sent" ? (
                        <>
                          You poked <span className="text-primary">{activity.user}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-primary">{activity.user}</span> poked you
                        </>
                      )}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "sent"
                        ? "gradient-primary"
                        : "gradient-secondary"
                    }`}
                  >
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
