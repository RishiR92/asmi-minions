import { ReactNode, useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

interface SwipeableContentProps {
  children: ReactNode;
}

const SNAP_POINTS = {
  COLLAPSED: 0.5, // 50% of screen
  HALF: 0.75, // 75% of screen
  FULL: 0.95, // 95% of screen
};

const DRAG_THRESHOLD = 50; // pixels
const VELOCITY_THRESHOLD = 200; // pixels per second

export const SwipeableContent = ({ children }: SwipeableContentProps) => {
  const [snapPoint, setSnapPoint] = useState(SNAP_POINTS.COLLAPSED);
  const y = useMotionValue(0);
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;
    
    // Determine direction and snap to appropriate point based on velocity or offset
    if (velocity > VELOCITY_THRESHOLD || offset > DRAG_THRESHOLD) {
      // Swipe down
      if (snapPoint === SNAP_POINTS.FULL) {
        setSnapPoint(SNAP_POINTS.HALF);
      } else if (snapPoint === SNAP_POINTS.HALF) {
        setSnapPoint(SNAP_POINTS.COLLAPSED);
      }
    } else if (velocity < -VELOCITY_THRESHOLD || offset < -DRAG_THRESHOLD) {
      // Swipe up
      if (snapPoint === SNAP_POINTS.COLLAPSED) {
        setSnapPoint(SNAP_POINTS.HALF);
      } else if (snapPoint === SNAP_POINTS.HALF) {
        setSnapPoint(SNAP_POINTS.FULL);
      }
    }
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.05}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
      onDragEnd={handleDragEnd}
      animate={{
        height: `${snapPoint * 100}vh`,
      }}
      transition={{
        type: "spring",
        damping: 35,
        stiffness: 400,
        mass: 0.8,
      }}
      style={{ y }}
      className="fixed inset-x-0 bottom-0 z-40 max-w-lg mx-auto will-change-transform"
    >
      <div className="h-full glass rounded-t-[2rem] shadow-strong flex flex-col overflow-hidden">
        {/* Drag Handle - Expanded touch area */}
        <div 
          className="flex items-center justify-center pt-5 pb-4 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/40 transition-all active:scale-110" />
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden px-5 pb-safe overscroll-contain"
          onTouchStart={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};
