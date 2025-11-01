import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, title, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            style={{ WebkitBackdropFilter: 'blur(20px)' }}
          />

          {/* Bottom Sheet with enhanced glass */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 glass-sheet rounded-t-[32px] z-50 max-h-[85vh] overflow-hidden shadow-2xl"
            style={{ transform: "translateZ(0)" }}
          >
            {/* Handle - Non-draggable visual indicator */}
            <div className="flex justify-center py-4 px-4">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 sm:px-6 pb-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-all active:scale-95 min-h-[44px] min-w-[44px]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

          {/* Content */}
          <div className="overflow-y-auto overflow-x-visible py-5 max-h-[calc(85vh-100px)]">
            {children}
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};