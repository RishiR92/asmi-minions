import { motion } from "framer-motion";
import { Mail, Sparkles, Check, ArrowRight, Filter, Tag, Archive } from "lucide-react";

export const SceneAutomationWork = () => {
  const steps = [
    {
      icon: Mail,
      title: "Email Arrives",
      description: "New email detected",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "AI Analyzes",
      description: "Content & sender scanned",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Filter,
      title: "Smart Sort",
      description: "Priority determined",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Tag,
      title: "Auto-Label",
      description: "Categories applied",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Archive,
      title: "Organized",
      description: "Filed automatically",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="h-full w-full bg-background overflow-hidden p-6 flex flex-col justify-center">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-icon shadow-glow mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Mail className="w-8 h-8 text-white" strokeWidth={2.5} />
        </motion.div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          How Smart Email Sorting Works
        </h2>
        <p className="text-muted-foreground font-accent text-sm">
          AI automation in action
        </p>
      </motion.div>

      {/* Flow Steps */}
      <div className="space-y-4 max-w-md mx-auto w-full">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
          >
            {/* Connector line */}
            {index < steps.length - 1 && (
              <motion.div
                className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-primary to-secondary"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.5 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
              />
            )}

            <div className="flex items-center gap-4">
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-soft flex-shrink-0 relative z-10`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.2, type: "spring", stiffness: 200 }}
              >
                <step.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Content */}
              <motion.div
                className="flex-1 liquid-glass rounded-2xl p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-heading font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.2, type: "spring" }}
                  >
                    <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground font-accent">
                  {step.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results Summary */}
      <motion.div
        className="mt-8 liquid-glass rounded-3xl p-6 gradient-primary relative overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-lg font-heading font-bold text-white">All Done!</h3>
          </div>
          <p className="text-white/80 font-accent text-sm mb-3">
            Email organized in under 2 seconds
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-label">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-white">243</div>
              <div className="text-white/60">Emails</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40" />
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-white">18</div>
              <div className="text-white/60">Important</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
