import { motion } from "framer-motion";
import { Mail, Star, Send, FileText, Loader2 } from "lucide-react";

export const SceneMail = () => {
  const mailCategories = [
    { icon: Mail, label: "Inbox", count: 243, color: "from-blue-500 to-cyan-500" },
    { icon: Star, label: "Important", count: 18, color: "from-yellow-500 to-orange-500" },
    { icon: Send, label: "Sent", count: 89, color: "from-green-500 to-emerald-500" },
    { icon: FileText, label: "Drafts", count: 5, color: "from-purple-500 to-pink-500" },
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
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Mail Hub</h2>
        <p className="text-muted-foreground font-accent">AI-powered email management</p>
      </motion.div>

      {/* Mail Categories */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {mailCategories.map((category, index) => (
          <motion.div
            key={category.label}
            className="liquid-glass rounded-3xl p-6 tap-subtle living-capsule relative overflow-hidden cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.2 + index * 0.1, 
              type: "spring",
              stiffness: 200 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-glow mb-4`}
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
            >
              <category.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </motion.div>

            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              {category.label}
            </h3>

            <motion.div
              className="text-3xl font-heading font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {/* Animate count decreasing for Inbox to show AI organizing */}
              {category.label === "Inbox" ? (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  key={category.count}
                >
                  {category.count}
                </motion.span>
              ) : (
                category.count
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* AI Processing Indicator */}
      <motion.div
        className="liquid-glass rounded-2xl p-6 tap-subtle"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-6 h-6 text-primary" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-heading font-semibold text-foreground mb-1">
              AI organizing your inbox
            </h4>
            <motion.div
              className="h-2 bg-secondary/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
              />
            </motion.div>
            <motion.p
              className="text-xs text-muted-foreground font-label mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Sorted 225 emails • 18 marked important
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Success indicator */}
      <motion.div
        className="absolute top-8 right-8 liquid-glass rounded-full px-4 py-2 shadow-glow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm font-label text-foreground">All synced</span>
        </div>
      </motion.div>
    </div>
  );
};
