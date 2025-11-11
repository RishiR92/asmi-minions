import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export const SceneFinal = () => {
  const features = [
    "Smart Automations",
    "Email Intelligence",
    "Calendar Sync",
    "Payment Tracking",
    "Bill Management",
    "Unified Profile",
  ];

  return (
    <div className="h-full w-full gradient-primary relative overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ 
                duration: 2,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Logo */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-icon shadow-glow mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Sparkles className="w-12 h-12 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-6xl font-heading font-bold text-white mb-4 tracking-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Automate Your Life with AI
        </motion.h1>

        <motion.p
          className="text-2xl text-white/90 font-accent mb-12 tracking-wide"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Everything you need, beautifully organized
        </motion.p>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-label text-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="group px-8 py-4 bg-white text-primary rounded-full font-heading font-bold text-lg shadow-glow inline-flex items-center gap-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.button>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-white/60 font-label text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Join thousands automating their digital life
        </motion.p>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
