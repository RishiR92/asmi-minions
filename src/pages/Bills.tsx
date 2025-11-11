import { ChevronLeft, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";

const upcomingBills = [
  {
    name: "Electric Bill",
    amount: "$127.50",
    dueDate: "Due Today",
    status: "overdue",
    icon: "Zap",
    payUrl: "#",
  },
  {
    name: "Water Bill",
    amount: "$45.00",
    dueDate: "Due in 2 days",
    status: "due-soon",
    icon: "Droplet",
    payUrl: "#",
  },
  {
    name: "Internet Bill",
    amount: "$89.99",
    dueDate: "Due in 5 days",
    status: "upcoming",
    icon: "Wifi",
    payUrl: "#",
  },
  {
    name: "Car Insurance",
    amount: "$250.00",
    dueDate: "Due in 7 days",
    status: "upcoming",
    icon: "Car",
    payUrl: "#",
  },
];

const pastBills = [
  {
    date: "Nov 1, 2025",
    description: "Gas Bill Payment",
    amount: "$62.30",
    status: "paid",
  },
  {
    date: "Oct 28, 2025",
    description: "Phone Bill Payment",
    amount: "$55.00",
    status: "paid",
  },
  {
    date: "Oct 25, 2025",
    description: "Electricity Payment",
    amount: "$118.40",
    status: "paid",
  },
];

const Bills = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="gap-1 text-xs">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </Badge>
        );
      case "due-soon":
        return (
          <Badge variant="default" className="gap-1 text-xs">
            <Clock className="w-3 h-3" />
            Due Soon
          </Badge>
        );
      case "upcoming":
        return (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Clock className="w-3 h-3" />
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : <LucideIcons.Circle className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="flex items-center gap-3 p-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Upcoming Payments</h1>
            <p className="text-sm text-muted-foreground">
              {upcomingBills.length} bills to pay
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Upcoming Bills Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground px-1">Bills & Payments</h2>
          <div className="space-y-2">
            {upcomingBills.map((bill, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-4 space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Top row - icon, name, status */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="text-primary">
                      {getIconComponent(bill.icon)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-foreground mb-1">{bill.name}</h3>
                    <p className="text-sm text-muted-foreground">{bill.dueDate}</p>
                  </div>
                  {getStatusBadge(bill.status)}
                </div>
                
                {/* Bottom row - amount and button */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <p className="text-xl font-bold text-foreground">{bill.amount}</p>
                  <Button size="sm" className="rounded-full h-9 px-6">
                    Pay Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Bills Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            {pastBills.map((bill, index) => (
              <div
                key={index}
                className={`p-4 flex items-center justify-between ${
                  index !== pastBills.length - 1 ? "border-b border-border/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{bill.description}</p>
                    <p className="text-sm text-muted-foreground">{bill.date}</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">{bill.amount}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full rounded-full">
            View All Payments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bills;
