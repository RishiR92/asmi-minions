import { motion } from "framer-motion";
import { Mail, Search, Inbox, Star, Archive, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MailHub = () => {
  const filters = [
    { icon: Inbox, label: "Inbox", count: 12 },
    { icon: Star, label: "Important", count: 3 },
    { icon: Send, label: "Sent", count: 0 },
    { icon: Archive, label: "Archived", count: 45 },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mail Hub</h1>
                <p className="text-sm text-muted-foreground">Manage your emails</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                className="pl-12 rounded-2xl h-12 glass border-border/50"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          {filters.map((filter, index) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-4 hover-lift tap-scale text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                  {filter.count > 0 && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full gradient-primary text-white">
                      {filter.count}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">{filter.label}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Connect Account CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 text-center space-y-4"
        >
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center shadow-glow">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Connect Your Email
            </h3>
            <p className="text-sm text-muted-foreground">
              Link your Gmail account to start managing emails with automations
            </p>
          </div>
          <Button className="rounded-2xl gradient-primary shadow-glow">
            Connect Gmail
          </Button>
        </motion.div>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">What you can do</h3>
          {[
            "Auto-categorize and prioritize emails",
            "Set up smart filters and rules",
            "Schedule email sending",
            "Create automated responses",
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 glass rounded-xl p-4"
            >
              <div className="w-2 h-2 rounded-full gradient-primary" />
              <p className="text-sm text-foreground">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MailHub;