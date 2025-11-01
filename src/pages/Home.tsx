import { motion } from "framer-motion";
import { Zap, Mail, Calendar, CreditCard, Activity } from "lucide-react";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { WeatherWidget } from "@/components/WeatherWidget";
import { StatCard } from "@/components/StatCard";

const Home = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const userName = "Rishi";

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Greeting */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {greeting()}, {userName} 👋
              </h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Weather Widget */}
            <WeatherWidget />
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-8">
        {/* Quick Access Grid */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-foreground mb-4"
          >
            Quick Access
          </motion.h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAccessCard
              icon={Zap}
              title="Automations"
              description="Manage tasks"
              href="/automations"
              gradient="gradient-primary"
              delay={0.1}
            />
            <QuickAccessCard
              icon={Mail}
              title="Mail Hub"
              description="Check emails"
              href="/mail"
              gradient="gradient-secondary"
              delay={0.15}
            />
            <QuickAccessCard
              icon={Calendar}
              title="Calendar"
              description="View schedule"
              href="/calendar"
              gradient="gradient-accent"
              delay={0.2}
            />
            <QuickAccessCard
              icon={CreditCard}
              title="Payments"
              description="Subscriptions"
              href="/payments"
              gradient="gradient-secondary"
              delay={0.25}
            />
          </div>
        </div>

        {/* Activity Stats */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-foreground mb-4"
          >
            Today's Activity
          </motion.h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={Zap}
              label="Automations"
              value="12"
              change="+3"
              gradient="gradient-primary"
              delay={0.35}
            />
            <StatCard
              icon={Mail}
              label="Emails"
              value="48"
              gradient="gradient-secondary"
              delay={0.4}
            />
            <StatCard
              icon={Activity}
              label="Tasks Done"
              value="7"
              change="+2"
              gradient="gradient-accent"
              delay={0.45}
            />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-bold text-foreground mb-4"
          >
            Recent Activity
          </motion.h2>
          <div className="space-y-3">
            {[
              { icon: Mail, text: "Daily email digest sent", time: "8:00 AM" },
              { icon: Calendar, text: "Team meeting reminder", time: "9:45 AM" },
              { icon: Zap, text: "Weekly report generated", time: "Yesterday" },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + index * 0.1 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-medium">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
