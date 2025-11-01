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
    <div className="min-h-screen pt-safe pb-safe pb-24 relative">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 pt-safe z-40">
        <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-5 py-5 sm:py-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-2xl font-semibold text-foreground mb-1">
              {getGreeting()}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{getDate()}</p>
          </motion.div>
          <WeatherWidget />
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-5 py-5 sm:py-6 space-y-6">
        {/* Quick Access - Horizontal Scroll */}
        <section className="relative">
          <h2 className="text-xl sm:text-lg font-semibold text-foreground mb-3">
            Quick Access
          </h2>
          <div className="relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
            
            {/* Scrollable content */}
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 scroll-smooth">
              {quickAccessItems.map((item) => (
                <div key={item.title} className="snap-start">
                  <ServiceCard {...item} />
                </div>
              ))}
            </div>
            
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
          </div>
        </section>

        {/* Today's Activity - Timeline */}
        <section>
          <h2 className="text-xl sm:text-lg font-semibold text-foreground mb-3">
            Today's Activity
          </h2>
          <div className="glass rounded-3xl p-5 sm:p-4">
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
