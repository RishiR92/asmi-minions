import { useState } from "react";
import { Zap, TrendingUp } from "lucide-react";
import { FriendCard } from "@/components/FriendCard";
import { toast } from "sonner";

const recentFriends = [
  { id: 1, name: "Sarah Chen", avatar: "", status: "online", lastActive: "Active now" },
  { id: 2, name: "Mike Johnson", avatar: "", status: "online", lastActive: "2m ago" },
  { id: 3, name: "Emma Davis", avatar: "", status: "offline", lastActive: "1h ago" },
];

const Home = () => {
  const [pokeCount] = useState(42);

  const handlePoke = (name: string) => {
    toast.success(`Poked ${name}! 👋`, {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center animate-float">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">PokeHub</h1>
              <p className="text-sm text-muted-foreground">Stay connected</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Stats Card */}
        <div className="glass rounded-3xl p-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Today's Pokes</p>
              <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                {pokeCount}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">+12</span> from yesterday
            </p>
          </div>
        </div>

        {/* Quick Poke Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Quick Poke</h2>
            <span className="text-sm text-muted-foreground">
              {recentFriends.length} online
            </span>
          </div>

          <div className="space-y-3">
            {recentFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                name={friend.name}
                avatar={friend.avatar}
                status={friend.status}
                lastActive={friend.lastActive}
                onPoke={() => handlePoke(friend.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
