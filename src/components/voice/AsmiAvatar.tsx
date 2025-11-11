import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface AsmiAvatarProps {
  isThinking?: boolean;
  isListening?: boolean;
}

export const AsmiAvatar = ({ isThinking, isListening }: AsmiAvatarProps) => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 8 : 20;

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
      {/* Outer ripple rings - listening state */}
      {isListening && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              scale: [1, 1.7, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.4,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* Orbital rings - desktop only for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute rounded-full border-2 border-primary/10"
            style={{
              width: "140%",
              height: "140%",
              top: "-20%",
              left: "-20%",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute rounded-full border border-secondary/10"
            style={{
              width: "160%",
              height: "160%",
              top: "-30%",
              left: "-30%",
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}

      {/* Floating particles - thinking state */}
      {isThinking && (
        <>
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / particleCount) * (isMobile ? 50 : 70)],
                y: [0, Math.sin((i * Math.PI * 2) / particleCount) * (isMobile ? 50 : 70)],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * (2 / particleCount),
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Main avatar - solid navy circle with enhanced glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary"
        animate={
          isThinking
            ? {
                boxShadow: [
                  "0 0 20px hsl(var(--voice-primary) / 0.3)",
                  "0 0 40px hsl(var(--voice-primary) / 0.6)",
                  "0 0 20px hsl(var(--voice-primary) / 0.3)",
                ],
              }
            : {
                boxShadow: [
                  "0 0 30px hsl(var(--voice-primary) / 0.4)",
                  "0 0 50px hsl(var(--voice-primary) / 0.6)",
                  "0 0 30px hsl(var(--voice-primary) / 0.4)",
                ],
              }
        }
        transition={{
          duration: isThinking ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-white/10" />
        
        {/* Enhanced pulse */}
        <motion.div
          className="absolute inset-8 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};
