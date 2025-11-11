import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const BackgroundAmbient = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 6 : 15;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced ambient orbs - more visible */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.15] blur-3xl bg-primary"
        style={{
          top: "-15%",
          left: "-5%",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.12] blur-3xl bg-secondary"
        style={{
          bottom: "-15%",
          right: "-5%",
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, -15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.08] blur-3xl bg-accent"
        style={{
          top: "35%",
          right: "15%",
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, -12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fine grain texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
