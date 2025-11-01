import { Cloud, CloudRain, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const WeatherWidget = () => {
  // Mock data - will be replaced with real API later
  const weather = {
    temp: 24,
    condition: "Partly Cloudy",
    icon: Cloud,
  };

  const Icon = weather.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{weather.temp}°</p>
        <p className="text-xs text-muted-foreground">{weather.condition}</p>
      </div>
    </motion.div>
  );
};