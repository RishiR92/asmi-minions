import { Zap, Mail, Calendar, CreditCard, Clock, Bell, User } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { TimelineItem } from "@/components/TimelineItem";
import { HeroSection } from "@/components/HeroSection";
import { SwipeableContent } from "@/components/SwipeableContent";


const quickAccessItems = [
  {
    icon: Zap,
    title: "AI Mins",
    stat: "5 active",
    href: "/automations",
  },
  {
    icon: CreditCard,
    title: "Subscriptions",
    stat: "$127/month",
    href: "/payments",
  },
  {
    icon: Bell,
    title: "Upcoming Payments",
    stat: "4 bills due",
    href: "/bills",
  },
  {
    icon: Mail,
    title: "Mail Hub",
    stat: "3 unread",
    href: "/mail",
  },
  {
    icon: Calendar,
    title: "Calendar",
    stat: "2 events today",
    href: "/calendar",
  },
  {
    icon: User,
    title: "Profile",
    stat: "View settings",
    href: "/profile",
  },
];

const upcomingEvents = [
  {
    icon: Calendar,
    title: "Team Sync meeting",
    time: "Today at 3:00 PM",
  },
  {
    icon: Clock,
    title: "Mom's birthday dinner",
    time: "Tomorrow at 7:00 PM",
  },
  {
    icon: CreditCard,
    title: "Invoice payment deadline",
    time: "Thursday at 5:00 PM",
  },
  {
    icon: Calendar,
    title: "Dentist appointment",
    time: "Friday at 2:30 PM",
  },
];

const Home = () => {
  return (
    <div className="h-screen fixed inset-0 overflow-hidden bg-background">
      {/* Upper Hero Section - Fixed calm design with breathing animation */}
      <HeroSection />

      {/* Lower Swipeable Content - Smooth scroll with momentum */}
      <SwipeableContent>
        <div className="space-y-8 py-6 animate-fade-up">
          {/* Quick Access - Horizontal Scroll with frictionless gestures */}
          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 px-6 tracking-tight">
              Quick Access
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-6">
              {quickAccessItems.map((item) => (
                <div key={item.title} className="snap-start">
                  <ServiceCard {...item} />
                </div>
              ))}
            </div>
          </section>

          {/* What's Coming Up - generous padding, large tap zones */}
          <section className="px-6 pb-safe">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 tracking-tight">
              What's Coming Up
            </h2>
            <div className="liquid-glass rounded-3xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 living-capsule">
              {upcomingEvents.map((event, index) => (
                <TimelineItem
                  key={index}
                  {...event}
                  isLast={index === upcomingEvents.length - 1}
                />
              ))}
            </div>
          </section>
        </div>
      </SwipeableContent>
    </div>
  );
};

export default Home;
