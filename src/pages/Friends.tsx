import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FriendCard } from "@/components/FriendCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const allFriends = [
  { id: 1, name: "Sarah Chen", avatar: "", status: "online", lastActive: "Active now" },
  { id: 2, name: "Mike Johnson", avatar: "", status: "online", lastActive: "2m ago" },
  { id: 3, name: "Emma Davis", avatar: "", status: "offline", lastActive: "1h ago" },
  { id: 4, name: "Alex Rivera", avatar: "", status: "offline", lastActive: "3h ago" },
  { id: 5, name: "Jordan Lee", avatar: "", status: "online", lastActive: "Active now" },
  { id: 6, name: "Taylor Swift", avatar: "", status: "offline", lastActive: "1d ago" },
];

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = allFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Friends</h1>
            <Button
              size="icon"
              className="rounded-full gradient-primary hover:opacity-90 border-0"
            >
              <UserPlus className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-border/50 focus-visible:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        <div className="space-y-3">
          {filteredFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              name={friend.name}
              avatar={friend.avatar}
              status={friend.status}
              lastActive={friend.lastActive}
              onPoke={() => handlePoke(friend.name)}
            />
          ))}
          
          {filteredFriends.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No friends found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
