import { motion } from "framer-motion";

export const DragHandle = () => {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-8 h-1 rounded-full bg-muted-foreground/30"
      />
    </div>
  );
};
