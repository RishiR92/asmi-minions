import { motion } from "framer-motion";
import { DollarSign, Zap, Droplet, Wifi, Cloud, Smartphone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Expenses = () => {
  const totalMonthly = 285.48;
  const subscriptionsTotal = 142.99;
  const billsTotal = 142.49;

  const upcomingBills = [
    { id: 1, title: "Electric", amount: 127.50, dueDate: "Due today", icon: Zap, status: "urgent" },
    { id: 2, title: "Water", amount: 45.00, dueDate: "Due in 2 days", icon: Droplet, status: "soon" },
    { id: 3, title: "Internet", amount: 89.99, dueDate: "Due in 5 days", icon: Wifi, status: "normal" },
  ];

  const activeSubscriptions = [
    { id: 1, name: "FlowHub Pro", amount: 12.99, renewDate: "Renews Jan 15", icon: Smartphone },
    { id: 2, name: "Cloud Storage", amount: 9.99, renewDate: "Renews Jan 20", icon: Cloud },
    { id: 3, name: "AI Assistant", amount: 19.99, renewDate: "Renews Jan 18", icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-3 p-5">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Expenses</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        {/* Monthly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Monthly Overview</h2>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-foreground">${totalMonthly.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Monthly Expenses</p>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 p-3 rounded-xl bg-background/40">
              <p className="text-xs text-muted-foreground mb-1">Subscriptions</p>
              <p className="text-base font-semibold text-foreground">${subscriptionsTotal.toFixed(2)}</p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-background/40">
              <p className="text-xs text-muted-foreground mb-1">Bills</p>
              <p className="text-base font-semibold text-foreground">${billsTotal.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Bills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <h2 className="text-base font-semibold text-foreground">Bills to Pay</h2>
          <div className="space-y-2">
            {upcomingBills.map((bill) => {
              const Icon = bill.icon;
              const statusColors = {
                urgent: "bg-red-500/10 text-red-500",
                soon: "bg-yellow-500/10 text-yellow-500",
                normal: "bg-primary/10 text-primary",
              };
              
              return (
                <div key={bill.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusColors[bill.status as keyof typeof statusColors]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{bill.title}</p>
                      <p className="text-xs text-muted-foreground">{bill.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">${bill.amount.toFixed(2)}</p>
                    <Button size="sm" className="rounded-full h-8 px-4 text-xs">
                      Pay
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Active Subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <h2 className="text-base font-semibold text-foreground">Subscriptions</h2>
          <div className="space-y-2">
            {activeSubscriptions.map((sub) => {
              const Icon = sub.icon;
              return (
                <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">{sub.renewDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">${sub.amount}/mo</p>
                    <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                      Manage
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Expenses;
