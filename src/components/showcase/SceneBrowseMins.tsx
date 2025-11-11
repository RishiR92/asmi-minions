import { motion } from "framer-motion";
import { Mail, Calendar, FileText, Zap, ShoppingBag, Sparkles, TrendingUp, Clock } from "lucide-react";

export const SceneBrowseMins = () => {
  const categories = [
    { label: "All", count: 24 },
    { label: "Email", count: 8 },
    { label: "Calendar", count: 5 },
    { label: "Finance", count: 6 },
    { label: "Shopping", count: 5 },
  ];

  const mins = [
    {
      icon: Mail,
      title: "Smart Email Sorting",
      description: "Organize inbox by priority",
      users: "12.3k",
      color: "from-blue-500 to-cyan-500",
      badge: "Popular",
    },
    {
      icon: Calendar,
      title: "Meeting Scheduler",
      description: "Auto-schedule meetings",
      users: "8.5k",
      color: "from-purple-500 to-pink-500",
      badge: "Trending",
    },
    {
      icon: FileText,
      title: "Bill Reminder",
      description: "Never miss a payment",
      users: "15.2k",
      color: "from-orange-500 to-red-500",
      badge: "Top Rated",
    },
    {
      icon: ShoppingBag,
      title: "Price Tracker",
      description: "Track deals automatically",
      users: "6.8k",
      color: "from-green-500 to-emerald-500",
      badge: "New",
    },
    {
      icon: TrendingUp,
      title: "Expense Analyzer",
      description: "Smart spending insights",
      users: "9.1k",
      color: "from-yellow-500 to-orange-500",
      badge: "Featured",
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
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-2xl font-heading font-bold text-foreground">AI Mins Marketplace</h2>
        </div>
        <p className="text-muted-foreground font-accent text-sm">Browse and activate automations</p>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat, index) => (
          <motion.button
            key={cat.label}
            className={`px-4 py-2 rounded-full text-sm font-label whitespace-nowrap ${
              index === 0
                ? "bg-primary text-primary-foreground shadow-glow"
                : "liquid-glass text-foreground tap-subtle"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label} <span className="text-xs opacity-70">({cat.count})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Mins Grid */}
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
        {mins.map((min, index) => (
          <motion.div
            key={min.title}
            className="liquid-glass rounded-3xl p-4 tap-subtle living-capsule cursor-pointer relative overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ delay: 0.8 + index * 0.1, duration: 1.5 }}
            />

            <div className="flex items-center gap-4 relative z-10">
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${min.color} flex items-center justify-center shadow-soft flex-shrink-0`}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
              >
                <min.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-heading font-semibold text-foreground truncate">
                    {min.title}
                  </h3>
                  <motion.span
                    className="px-2 py-0.5 rounded-full text-xs font-label bg-primary/10 text-primary whitespace-nowrap"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                  >
                    {min.badge}
                  </motion.span>
                </div>
                <p className="text-sm text-muted-foreground font-accent mb-2 truncate">
                  {min.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-label">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {min.users} using
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Instant setup
                  </span>
                </div>
              </div>

              {/* Add button */}
              <motion.button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-heading font-medium shadow-soft hover:shadow-glow flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search hint */}
      <motion.div
        className="absolute bottom-6 left-6 right-6 liquid-glass rounded-2xl p-3 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-xs font-label text-muted-foreground">
          Tap any Min to see how it works
        </p>
      </motion.div>
    </div>
  );
};
