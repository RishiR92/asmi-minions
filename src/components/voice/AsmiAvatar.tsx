import { motion } from "framer-motion";

interface AsmiAvatarProps {
  isThinking?: boolean;
  isListening?: boolean;
}

export const AsmiAvatar = ({ isThinking = false, isListening = false }: AsmiAvatarProps) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(220, 40, 35, 0.15)",
          filter: "blur(20px)",
        }}
        animate={
          isListening
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main avatar orb */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: "hsl(220, 40%, 35%)",
          boxShadow: "0 0 40px rgba(220, 40, 35, 0.4), 0 0 80px rgba(220, 40, 35, 0.2)",
        }}
        animate={
          isThinking
            ? {
                rotate: 360,
              }
            : isListening
            ? {
                scale: [1, 1.05, 1],
              }
            : {
                scale: [1, 1.02, 1],
              }
        }
        transition={
          isThinking
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing core */}
        <motion.div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            filter: "blur(10px)",
          }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};
