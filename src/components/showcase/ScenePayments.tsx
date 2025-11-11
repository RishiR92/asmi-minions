import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, Cloud, Zap, Database } from "lucide-react";
import { useEffect } from "react";

export const ScenePayments = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `$${latest.toFixed(2)}`);

  useEffect(() => {
    const controls = animate(count, 127.43, { duration: 2, delay: 0.5 });
    return controls.stop;
  }, [count]);

  const subscriptions = [
    {
      name: "FlowHub Pro",
      amount: 49.99,
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      nextBilling: "Jan 15",
    },
    {
      name: "Cloud Storage",
      amount: 39.99,
      icon: Cloud,
      color: "from-blue-500 to-cyan-500",
      nextBilling: "Jan 18",
    },
    {
      name: "AI Assistant",
      amount: 37.45,
      icon: Database,
      color: "from-orange-500 to-red-500",
      nextBilling: "Jan 20",
    },
  ];

  return (
    <div className="h-full w-full bg-background overflow-hidden p-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Subscriptions</h2>
        <p className="text-muted-foreground font-accent">Track all your payments</p>
      </motion.div>

      {/* Monthly Total */}
      <motion.div
        className="liquid-glass rounded-3xl p-8 mb-8 tap-subtle living-capsule gradient-primary relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-label text-sm">Monthly Total</span>
          </div>
          <motion.div
            className="text-5xl font-heading font-bold text-white mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {rounded}
          </motion.div>
          <p className="text-white/60 font-accent text-sm">per month</p>
        </div>
      </motion.div>

      {/* Subscription Cards */}
      <div className="space-y-4">
        {subscriptions.map((sub, index) => (
          <motion.div
            key={sub.name}
            className="liquid-glass rounded-3xl p-6 tap-subtle living-capsule"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${sub.color} flex items-center justify-center shadow-soft`}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ delay: 0.8 + index * 0.15, duration: 0.8 }}
                >
                  <sub.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </motion.div>

                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    {sub.name}
                  </h3>
                  <motion.p
                    className="text-sm text-muted-foreground font-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.15 }}
                  >
                    Next billing: {sub.nextBilling}
                  </motion.p>
                </div>
              </div>

              <motion.div
                className="text-right"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.15, type: "spring" }}
              >
                <div className="text-2xl font-heading font-bold text-foreground">
                  ${sub.amount}
                </div>
                <div className="text-xs text-muted-foreground font-label">/month</div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 liquid-glass rounded-full px-6 py-3 shadow-glow"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm font-label text-foreground">All payments tracked</span>
        </div>
      </motion.div>
    </div>
  );
};
