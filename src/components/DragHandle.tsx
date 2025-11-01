import { motion } from "framer-motion";

export const DragHandle = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none pb-safe">
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        {/* Visual hint text - appears briefly */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4,
            repeat: 3,
            repeatDelay: 10,
          }}
          className="text-xs text-muted-foreground font-medium"
        >
          Swipe up to navigate
        </motion.p>
        
        {/* Larger, clearer handle */}
        <div className="w-10 h-1.5 rounded-full bg-foreground/40" />
      </motion.div>
    </div>
  );
};
