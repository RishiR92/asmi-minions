import { Settings, Mail, Calendar, CreditCard, Zap, Clock, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ConnectionCard } from "@/components/ConnectionCard";

const Profile = () => {
  return (
    <div className="min-h-screen pt-safe pb-safe pb-24">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 pt-safe z-40">
        <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-5 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-2xl font-semibold text-foreground">Profile</h1>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-muted min-h-[44px] min-w-[44px]"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-5 py-5 sm:py-6 space-y-6">
        {/* Profile Card */}
        <div className="glass rounded-3xl p-6 sm:p-5 text-center hover:scale-[1.01] transition-all duration-300">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 sm:w-20 sm:h-20 ring-2 ring-primary/20">
              <AvatarImage src="" alt="You" />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl sm:text-xl font-semibold">
                YN
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-1">Your Name</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">@yourname</p>
          
          <Button 
            variant="outline" 
            className="mt-6 w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/10 hover:text-primary min-h-[44px]"
          >
            Edit Profile
          </Button>
        </div>

        {/* Connected Services */}
        <section>
          <h3 className="text-xl sm:text-lg font-semibold text-foreground mb-3">
            Connected Services
          </h3>
          <div className="space-y-3">
            <ConnectionCard
              icon={Mail}
              service="Email Account"
              accountInfo="john@gmail.com"
              isConnected={true}
              lastSync="2 min ago"
            />
            <ConnectionCard
              icon={Calendar}
              service="Calendar"
              accountInfo="Google Calendar"
              isConnected={true}
              lastSync="Just now"
            />
            <ConnectionCard
              icon={CreditCard}
              service="Payment Account"
              accountInfo="Stripe"
              isConnected={true}
            />
          </div>
        </section>

        {/* Permissions & Access */}
        <section>
          <h3 className="text-xl sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            Permissions & Access
          </h3>
          <div className="glass rounded-2xl p-5 sm:p-4 space-y-4 hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Email Automation</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Allow automated email sorting</p>
              </div>
              <Switch defaultChecked className="scale-110 sm:scale-100" />
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Calendar Sync</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Sync events automatically</p>
              </div>
              <Switch defaultChecked className="scale-110 sm:scale-100" />
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Payment Processing</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Enable payment automations</p>
              </div>
              <Switch className="scale-110 sm:scale-100" />
            </div>
          </div>
        </section>

        {/* Activity Summary */}
        <section>
          <h3 className="text-xl sm:text-lg font-semibold text-foreground mb-3">
            Activity Summary
          </h3>
          <div className="glass rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-lg font-semibold text-foreground">47</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Automations</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-lg font-semibold text-foreground">2.3h</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Time Saved</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-lg font-semibold text-foreground">234</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Emails</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Settings */}
        <section>
          <h3 className="text-xl sm:text-lg font-semibold text-foreground mb-3">
            App Settings
          </h3>
          <div className="glass rounded-2xl p-4 space-y-2 hover:scale-[1.01] transition-all duration-300">
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary min-h-[44px]"
            >
              Theme Preferences
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary min-h-[44px]"
            >
              Language & Region
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary min-h-[44px]"
            >
              Security & Privacy
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary min-h-[44px]"
            >
              Data Export
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
