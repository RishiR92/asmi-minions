import { motion } from "framer-motion";
import { Mail, Calendar, FileText, Zap, CheckCircle2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const SceneAutomations = () => {
  const automations = [
    {
      icon: Mail,
      title: "Smart Email Sorting",
      description: "Automatically organize your inbox",
      lastRun: "2 minutes ago",
      nextRun: "in 1 hour",
    },
    {
      icon: Calendar,
      title: "Calendar Sync",
      description: "Keep all calendars in sync",
      lastRun: "15 minutes ago",
      nextRun: "in 30 minutes",
    },
    {
      icon: FileText,
      title: "Bill Reminders",
      description: "Never miss a payment",
      lastRun: "1 hour ago",
      nextRun: "tomorrow at 9 AM",
    },
  ];

  return (
    <div className="h-full w-full bg-background overflow-hidden p-8">
      {/* Header with glow effect */}
      <motion.div
        className="mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-8 h-8 text-primary" strokeWidth={2.5} />
          <h2 className="text-3xl font-heading font-bold text-foreground">AI Automations</h2>
        </motion.div>
        <p className="text-muted-foreground font-accent">Set it and forget it</p>
      </motion.div>

      {/* Automation Cards */}
      <div className="space-y-4">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.title}
            className="liquid-glass rounded-3xl p-6 tap-subtle living-capsule relative overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 0.8 + index * 0.2, duration: 1.5 }}
            />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-4 flex-1">
                <motion.div
                  className="w-14 h-14 rounded-3xl gradient-icon flex items-center justify-center flex-shrink-0 shadow-soft"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.8 }}
                >
                  <automation.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    {automation.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-accent mb-3">
                    {automation.description}
                  </p>

                  <div className="flex gap-4 text-xs">
                    <motion.span
                      className="text-muted-foreground font-label"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.15 }}
                    >
                      Last run: {automation.lastRun}
                    </motion.span>
                    <motion.span
                      className="text-primary font-label"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.15 }}
                    >
                      Next: {automation.nextRun}
                    </motion.span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 200 }}
              >
                <Switch checked className="data-[state=checked]:bg-primary" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Toast Animation */}
      <motion.div
        className="absolute bottom-8 right-8 liquid-glass rounded-2xl p-4 shadow-glow flex items-center gap-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <div>
          <p className="font-heading font-medium text-foreground text-sm">Email digest sent</p>
          <p className="text-xs text-muted-foreground font-label">18 emails organized</p>
        </div>
      </motion.div>
    </div>
  );
};
