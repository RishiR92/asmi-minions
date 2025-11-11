import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, TrendingUp, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subscriptions = [
  {
    name: "FlowHub Pro",
    amount: "$12.99",
    period: "monthly",
    nextBilling: "Jan 15, 2025",
    status: "active",
    features: ["Unlimited automations", "Priority support", "Advanced analytics"],
  },
  {
    name: "Cloud Storage Plus",
    amount: "$9.99",
    period: "monthly",
    nextBilling: "Jan 20, 2025",
    status: "active",
    features: ["500 GB storage", "File sharing", "Auto backup"],
  },
  {
    name: "AI Assistant",
    amount: "$19.99",
    period: "monthly",
    nextBilling: "Jan 18, 2025",
    status: "active",
    features: ["GPT-4 access", "Custom workflows", "API access"],
  },
];


const transactions = [
  { date: "Dec 20", description: "AI Assistant - Monthly", amount: "$19.99", status: "completed" },
  { date: "Dec 15", description: "FlowHub Pro - Monthly", amount: "$12.99", status: "completed" },
  { date: "Dec 10", description: "Cloud Storage Plus", amount: "$9.99", status: "completed" },
  { date: "Nov 20", description: "AI Assistant - Monthly", amount: "$19.99", status: "completed" },
  { date: "Nov 15", description: "FlowHub Pro - Monthly", amount: "$12.99", status: "completed" },
  { date: "Nov 10", description: "Cloud Storage Plus", amount: "$9.99", status: "completed" },
];

const Payments = () => {
  const navigate = useNavigate();
  const totalMonthly = subscriptions.reduce(
    (sum, sub) => sum + parseFloat(sub.amount.replace('$', '')),
    0
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 z-40 pt-safe">
        <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Subscriptions</h1>
                <p className="text-sm text-muted-foreground">{subscriptions.length} active plans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-6 space-y-6">
        {/* Total Spending */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-5 sm:p-6 hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Spending</p>
              <p className="text-3xl font-bold text-primary">
                ${totalMonthly.toFixed(2)}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-primary-foreground" />
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
            <div
              key={index}
              className="glass rounded-2xl p-5 sm:p-6 space-y-4 hover:scale-[1.01] transition-all duration-200"
              style={{ transform: "translateZ(0)" }}
            >
                <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-semibold text-foreground">
                        {sub.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {sub.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize mb-3">
                      {sub.amount}/{sub.period}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-1.5">
                      {sub.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next billing: <span className="text-foreground font-medium">{sub.nextBilling}</span></span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs h-8"
                  onClick={() => navigate("/subscription-detail", { state: { subscription: sub } })}
                >
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment History */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-border/30">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
                style={{ transform: "translateZ(0)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">${tx.amount}</p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full rounded-2xl h-11"
          >
            View All Payments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payments;