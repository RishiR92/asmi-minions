import { Zap, Mail, Calendar, CreditCard, Clock } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { TimelineItem } from "@/components/TimelineItem";
import { WeatherWidget } from "@/components/WeatherWidget";
import { DragHandle } from "@/components/DragHandle";
import { motion } from "framer-motion";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const quickAccessItems = [
  {
    icon: Zap,
    title: "Automations",
    stat: "3 active flows",
    href: "/automations",
  },
  {
    icon: Mail,
    title: "Mail Hub",
    stat: "12 unread",
    href: "/mail",
  },
  {
    icon: Calendar,
    title: "Calendar",
    stat: "2 events today",
    href: "/calendar",
  },
  {
    icon: CreditCard,
    title: "Payments",
    stat: "$2,340 this month",
    href: "/payments",
  },
];

const todayActivities = [
  {
    icon: Zap,
    title: "Email automation completed successfully",
    time: "2 min ago",
  },
  {
    icon: Mail,
    title: "3 emails filtered to Priority inbox",
    time: "15 min ago",
  },
  {
    icon: Calendar,
    title: "Team Sync meeting at 3 PM",
    time: "1 hour ago",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen pb-24 relative bg-gradient-subtle">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-5 py-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              {getGreeting()}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{getDate()}</p>
          </motion.div>
          <WeatherWidget />
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 py-6 space-y-6">
        {/* Quick Access - Horizontal Scroll */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Quick Access
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
            {quickAccessItems.map((item) => (
              <div key={item.title} className="snap-start">
                <ServiceCard {...item} />
              </div>
            ))}
          </div>
        </section>

        {/* Today's Activity - Timeline */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Today's Activity
          </h2>
          <div className="glass rounded-3xl p-4">
            {todayActivities.map((activity, index) => (
              <TimelineItem
                key={index}
                {...activity}
                isLast={index === todayActivities.length - 1}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Drag Handle for Gesture Nav */}
      <DragHandle />
    </div>
  );
};

export default Home;
