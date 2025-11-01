import { Zap, Mail, Calendar, CreditCard } from "lucide-react";
import { CircularIconButton } from "@/components/CircularIconButton";
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
  { icon: Zap, label: "Automations", href: "/automations" },
  { icon: Mail, label: "Mail Hub", href: "/mail" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
];

const Home = () => {
  return (
    <div className="min-h-screen pt-safe pb-safe pb-24 relative">
      {/* Hero Section */}
      <div className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          {/* Abstract shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/8 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full sm:max-w-lg mx-auto px-6 -mt-16 space-y-10">
        {/* Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 text-center"
        >
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {getGreeting()}
          </h1>
          <p className="text-sm text-muted-foreground">{getDate()}</p>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-8 py-6"
        >
          {quickAccessItems.map((item) => (
            <CircularIconButton key={item.label} {...item} />
          ))}
        </motion.div>
      </div>

      {/* Drag Handle for Gesture Nav */}
      <DragHandle />
    </div>
  );
};

export default Home;
