import { motion } from "framer-motion";

interface AsmiAvatarProps {
  isThinking?: boolean;
  isListening?: boolean;
}

export const AsmiAvatar = ({ isThinking, isListening }: AsmiAvatarProps) => {
  return (
    <div className="relative w-32 h-32">
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

      {/* Floating particles - thinking state */}
      {isThinking && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 60],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 60],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Main avatar - solid navy circle with glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary shadow-glow"
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
                  "0 0 30px hsl(var(--voice-primary) / 0.3)",
                  "0 0 50px hsl(var(--voice-primary) / 0.5)",
                  "0 0 30px hsl(var(--voice-primary) / 0.3)",
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
        
        {/* Subtle pulse */}
        <motion.div
          className="absolute inset-8 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};
