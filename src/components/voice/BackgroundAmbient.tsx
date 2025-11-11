import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const BackgroundAmbient = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 8 : 15;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Solid color base */}
      <div
        className="absolute inset-0"
        style={{
          background: "hsl(0, 0%, 100%)",
        }}
      />

      {/* Floating orbs with solid colors and blur */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: "hsl(220, 40%, 35%)",
          filter: "blur(80px)",
          opacity: 0.15,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: "hsl(150, 25%, 45%)",
          filter: "blur(80px)",
          opacity: 0.12,
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "hsl(15, 55%, 60%)",
          filter: "blur(100px)",
          opacity: 0.08,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: i % 3 === 0 
              ? "hsl(220, 40%, 35%)" 
              : i % 3 === 1 
              ? "hsl(150, 25%, 45%)" 
              : "hsl(15, 55%, 60%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [-20, -80, -20],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
