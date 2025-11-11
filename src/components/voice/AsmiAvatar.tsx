import { motion } from "framer-motion";

interface AsmiAvatarProps {
  isThinking?: boolean;
  isListening?: boolean;
}

export const AsmiAvatar = ({ isThinking = false, isListening = false }: AsmiAvatarProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 110, 255, 0.2) 0%, transparent 70%)",
        }}
        animate={
          isListening
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main avatar orb */}
      <motion.div
        className="relative w-24 h-24 rounded-full overflow-hidden animate-pulse-glow"
        style={{
          background: "linear-gradient(135deg, hsl(254 100% 71%) 0%, hsl(280 90% 65%) 50%, hsl(173 57% 58%) 100%)",
        }}
        animate={
          isThinking
            ? {
                rotate: 360,
              }
            : isListening
            ? {
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={
          isThinking
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : { duration: 1.5, repeat: Infinity }
        }
      >
        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing core */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
          }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};
