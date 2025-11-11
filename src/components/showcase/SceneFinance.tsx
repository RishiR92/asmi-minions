import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Wallet, TrendingUp, Zap, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export const SceneFinance = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `$${latest.toFixed(2)}`);

  useEffect(() => {
    const controls = animate(count, 127.43, { duration: 1.5, delay: 0.3 });
    return controls.stop;
  }, [count]);

  const items = [
    {
      icon: Zap,
      title: "FlowHub Pro",
      amount: "$49.99",
      type: "subscription",
      status: "active",
      date: "Renews Jan 15",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Internet Bill",
      amount: "$79.99",
      type: "bill",
      status: "due",
      date: "Due Jan 10",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Wallet,
      title: "Cloud Storage",
      amount: "$39.99",
      type: "subscription",
      status: "active",
      date: "Renews Jan 18",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="h-full w-full bg-background overflow-hidden p-6">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="w-10 h-10 rounded-2xl gradient-icon flex items-center justify-center shadow-soft"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wallet className="w-6 h-6 text-white" strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Finance Hub</h2>
        </div>
        <p className="text-muted-foreground font-accent text-sm">All payments in one place</p>
      </motion.div>

      {/* Total Summary Card */}
      <motion.div
        className="liquid-glass rounded-3xl p-6 mb-6 gradient-primary relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-white/80" />
            <span className="text-white/80 font-label text-xs">Monthly Total</span>
          </div>
          <motion.div
            className="text-4xl font-heading font-bold text-white mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            {rounded}
          </motion.div>
          <p className="text-white/60 font-accent text-xs">Subscriptions & Bills</p>
        </div>
      </motion.div>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isDue = item.status === "due";

          return (
            <motion.div
              key={item.title}
              className="liquid-glass rounded-3xl p-4 tap-subtle living-capsule relative overflow-hidden"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            >
              {/* Due warning glow */}
              {isDue && (
                <motion.div
                  className="absolute inset-0 bg-orange-500/5"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="flex items-center gap-3 relative z-10">
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-soft flex-shrink-0`}
                  animate={{
                    scale: isDue ? [1, 1.05, 1] : 1,
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    delay: 0.6 + index * 0.15,
                    duration: 0.8,
                    ...(isDue && { repeat: Infinity, repeatDelay: 1 }),
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-heading font-semibold text-foreground mb-0.5 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    {isDue ? (
                      <motion.span
                        className="flex items-center gap-1 text-orange-500 font-label"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {item.date}
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground font-label">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <motion.div
                  className="text-right flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                >
                  <div className="text-lg font-heading font-bold text-foreground">
                    {item.amount}
                  </div>
                  <div className="text-xs text-muted-foreground font-label capitalize">
                    {item.type}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Success indicator */}
      <motion.div
        className="absolute bottom-6 left-6 right-6 liquid-glass rounded-2xl p-3 shadow-soft"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-xs font-label text-foreground">All tracked & organized</span>
        </div>
      </motion.div>
    </div>
  );
};
