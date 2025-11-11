import { motion } from "framer-motion";
import { DollarSign, Wifi, Zap, Home, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SceneBills = () => {
  const bills = [
    {
      icon: Wifi,
      name: "Internet Service",
      amount: 79.99,
      dueDate: "Jan 10",
      status: "overdue",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      name: "Electric Bill",
      amount: 145.23,
      dueDate: "Jan 15",
      status: "due-soon",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Home,
      name: "Rent",
      amount: 1500.0,
      dueDate: "Jan 25",
      status: "upcoming",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "overdue":
        return { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Overdue" };
      case "due-soon":
        return { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", label: "Due Soon" };
      default:
        return { icon: CheckCircle2, color: "text-muted-foreground", bg: "bg-muted", label: "Upcoming" };
    }
  };

  return (
    <div className="h-full w-full bg-background overflow-hidden p-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Bills & Payments</h2>
        <p className="text-muted-foreground font-accent">Never miss a due date</p>
      </motion.div>

      {/* Bills List */}
      <div className="space-y-4">
        {bills.map((bill, index) => {
          const statusConfig = getStatusConfig(bill.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={bill.name}
              className="liquid-glass rounded-3xl p-6 tap-subtle living-capsule relative overflow-hidden"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            >
              {/* Animated status glow */}
              {bill.status === "overdue" && (
                <motion.div
                  className="absolute inset-0 bg-red-500/5"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${bill.color} flex items-center justify-center shadow-soft`}
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: bill.status === "overdue" ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      delay: 0.4 + index * 0.15, 
                      duration: 0.8,
                      ...(bill.status === "overdue" && { repeat: Infinity, repeatDelay: 1 })
                    }}
                  >
                    <bill.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                      {bill.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
                      >
                        <Badge className={`${statusConfig.bg} ${statusConfig.color} border-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </motion.div>
                      <span className="text-sm text-muted-foreground font-label">
                        Due: {bill.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <motion.div
                    className="text-2xl font-heading font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                  >
                    ${bill.amount}
                  </motion.div>
                  {bill.status === "overdue" && (
                    <motion.button
                      className="mt-2 px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-heading font-medium shadow-soft hover:shadow-glow transition-shadow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.15, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Pay Now
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment completion animation for first bill */}
      <motion.div
        className="absolute bottom-8 right-8 liquid-glass rounded-2xl p-4 shadow-glow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="font-heading font-medium text-foreground text-sm">Payment sent!</p>
            <p className="text-xs text-muted-foreground font-label">Internet Service • $79.99</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
