import { User } from "lucide-react";
import { WeatherWidget } from "@/components/WeatherWidget";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-calm.jpg";

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

export const HeroSection = () => {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Calm serene background"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
      
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 pt-safe">
        {/* Top section with profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-start"
        >
          <div className="flex-1">
            <WeatherWidget />
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Center greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
            {getGreeting()}
          </h1>
          <p className="text-lg text-muted-foreground">{getDate()}</p>
        </motion.div>

        {/* Bottom spacer for swipeable content indicator */}
        <div className="h-8" />
      </div>
    </div>
  );
};
