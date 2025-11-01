import { Zap, Mail, Calendar, CreditCard, Clock, DollarSign } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { TimelineItem } from "@/components/TimelineItem";
import { HeroSection } from "@/components/HeroSection";
import { SwipeableContent } from "@/components/SwipeableContent";


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
    title: "Subscriptions",
    stat: "3 active plans",
    href: "/payments",
  },
  {
    icon: DollarSign,
    title: "Upcoming Payments",
    stat: "2 bills due soon",
    href: "/payments",
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
      {/* Upper Hero Section - Fixed calm design */}
      <HeroSection />

      {/* Lower Swipeable Content */}
      <SwipeableContent>
        <div className="space-y-6 py-4">
          {/* Quick Access - Horizontal Scroll */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Quick Access
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
              {quickAccessItems.map((item) => (
                <div key={item.title} className="snap-start">
                  <ServiceCard {...item} />
                </div>
              ))}
            </div>
          </section>

          {/* What's Coming Up */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What's Coming Up
            </h2>
            <div className="glass rounded-3xl p-5">
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
