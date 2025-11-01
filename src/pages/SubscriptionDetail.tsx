import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Calendar, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubscriptionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subscription = location.state?.subscription || {
    name: "FlowHub Pro",
    amount: "$12.99",
    period: "monthly",
    nextBilling: "Jan 15, 2025",
    status: "active",
    features: ["Unlimited automations", "Priority support", "Advanced analytics"],
  };

  const billingHistory = [
    { date: "Dec 15, 2024", amount: subscription.amount, status: "paid" },
    { date: "Nov 15, 2024", amount: subscription.amount, status: "paid" },
    { date: "Oct 15, 2024", amount: subscription.amount, status: "paid" },
    { date: "Sep 15, 2024", amount: subscription.amount, status: "paid" },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 z-40 pt-safe">
        <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{subscription.name}</h1>
                <Badge variant="secondary" className="text-xs mt-1">
                  {subscription.status}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-6 space-y-6">
        {/* Subscription Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
              <p className="text-3xl font-bold text-foreground">
                {subscription.amount}
                <span className="text-base font-normal text-muted-foreground">/{subscription.period}</span>
              </p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Next billing date</p>
            <p className="text-lg font-semibold text-foreground">{subscription.nextBilling}</p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-foreground mb-2">Plan includes:</p>
            <ul className="space-y-2">
              {subscription.features.map((feature: string, idx: number) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <Button className="w-full rounded-2xl h-12" variant="outline">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button className="w-full rounded-2xl h-12" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Change Plan
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full rounded-2xl h-12" variant="destructive">
                <AlertCircle className="w-4 h-4 mr-2" />
                Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your {subscription.name} subscription? 
                  You'll lose access to all premium features at the end of your current billing period.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Cancel Subscription
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-border/30">
            {billingHistory.map((invoice, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{invoice.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{invoice.amount}</p>
                  <Button variant="ghost" size="sm" className="text-xs h-7 mt-1">
                    View Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
