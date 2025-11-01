import { motion } from "framer-motion";
import { CreditCard, TrendingUp, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const subscriptions = [
  {
    name: "FlowHub Pro",
    amount: "$12.99",
    period: "monthly",
    nextBilling: "Jan 15, 2025",
    color: "gradient-primary",
  },
  {
    name: "Cloud Storage",
    amount: "$9.99",
    period: "monthly",
    nextBilling: "Jan 20, 2025",
    color: "gradient-secondary",
  },
];

const transactions = [
  { date: "Dec 15", description: "FlowHub Pro - Monthly", amount: "-$12.99" },
  { date: "Dec 10", description: "Cloud Storage", amount: "-$9.99" },
  { date: "Nov 15", description: "FlowHub Pro - Monthly", amount: "-$12.99" },
];

const Payments = () => {
  const totalMonthly = subscriptions.reduce(
    (sum, sub) => sum + parseFloat(sub.amount.replace('$', '')),
    0
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-glow">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Payments</h1>
                <p className="text-sm text-muted-foreground">Manage subscriptions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Total Spending */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Spending</p>
              <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                ${totalMonthly.toFixed(2)}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Active Subscriptions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Active Subscriptions</h3>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {subscriptions.map((sub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-5 hover-lift tap-scale cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${sub.color} flex items-center justify-center shadow-medium`}>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">
                      {sub.name}
                    </h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {sub.period}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-foreground">{sub.amount}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Next billing: <span className="text-foreground font-medium">{sub.nextBilling}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <div className="glass rounded-2xl overflow-hidden">
            {transactions.map((tx, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-4 flex items-center justify-between ${
                  index !== transactions.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tx.date}</p>
                </div>
                <p className="text-sm font-semibold text-destructive">{tx.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-5 hover-lift tap-scale cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-medium">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">•••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl">
                Edit
              </Button>
            </div>
          </motion.div>
          <Button
            variant="outline"
            className="w-full rounded-2xl h-12"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payments;