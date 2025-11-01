import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Zap, CreditCard, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Zap, label: "Automations", path: "/automations" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const GestureNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwipeStart = (event: React.TouchEvent | React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('.gesture-nav-trigger')) {
      setIsOpen(true);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Swipe trigger area - larger on mobile */}
      <div
        className="gesture-nav-trigger fixed bottom-0 left-0 right-0 h-20 sm:h-16 z-40 cursor-pointer pb-safe"
        onTouchStart={handleSwipeStart}
        onClick={() => setIsOpen(true)}
      />

      {/* Navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Page selector cards */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="fixed inset-x-0 bottom-0 z-50 pb-8 pb-safe"
            >
              <div className="max-w-full sm:max-w-lg mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-4">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigate(item.path)}
                        className={`glass rounded-3xl p-6 sm:p-5 cursor-pointer flex flex-col items-center gap-2.5 transition-all duration-300 min-h-[120px] sm:min-h-[110px] ${
                          isActive 
                            ? 'ring-2 ring-primary shadow-md' 
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          isActive ? 'bg-primary/20' : 'bg-primary/10'
                        }`}>
                          <item.icon 
                            className={`w-6 h-6 sm:w-5 sm:h-5 transition-colors duration-300 ${
                              isActive ? 'text-primary' : 'text-muted-foreground'
                            }`} 
                            strokeWidth={1.5}
                          />
                        </div>
                        <span className={`text-sm sm:text-xs font-medium transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-foreground'
                        }`}>
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Swipe down hint */}
                <div className="flex justify-center mt-6">
                  <div className="w-12 h-1.5 rounded-full bg-foreground/40" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
