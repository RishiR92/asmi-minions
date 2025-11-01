import { Settings, Crown, Zap, Users, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Zap, label: "Total Pokes", value: "342", color: "text-primary" },
  { icon: Users, label: "Friends", value: "24", color: "text-secondary" },
  { icon: TrendingUp, label: "Streak", value: "7 days", color: "text-primary" },
];

const Profile = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Profile Card */}
        <div className="glass rounded-3xl p-6 animate-scale-in text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 ring-4 ring-primary/20">
              <AvatarImage src="" alt="You" />
              <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                YO
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-secondary flex items-center justify-center ring-4 ring-background">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-1">Your Name</h2>
          <p className="text-sm text-muted-foreground">@yourname</p>
          
          <Button className="mt-6 gradient-primary hover:opacity-90 border-0 px-8">
            Edit Profile
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-4 text-center hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl gradient-primary mb-2`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievement */}
        <div className="glass rounded-2xl p-4 animate-scale-in">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            Recent Achievement
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Poke Master</p>
              <p className="text-xs text-muted-foreground">
                Sent 300+ pokes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
