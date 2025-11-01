import { Cloud } from "lucide-react";
import { motion } from "framer-motion";

export const WeatherWidget = () => {
  // Mock data - will be replaced with real API later
  const weather = {
    temp: 24,
    icon: Cloud,
  };

  const Icon = weather.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="absolute top-6 right-6 flex items-center gap-2"
    >
      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
      <p className="text-sm font-medium text-foreground">{weather.temp}°</p>
    </motion.div>
  );
};