import { motion } from "framer-motion";
import { Mail, Calendar, CreditCard, Settings, Zap, Clock } from "lucide-react";

export const SceneHome = () => {
  const services = [
    { icon: Mail, title: "Mail Hub", stat: "243 unread", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, title: "AI Mins", stat: "12 active", color: "from-purple-500 to-pink-500" },
    { icon: Calendar, title: "Calendar", stat: "2 events today", color: "from-orange-500 to-red-500" },
    { icon: CreditCard, title: "Payments", stat: "$127.43/mo", color: "from-green-500 to-emerald-500" },
  ];

  const events = [
    { icon: Mail, title: "Email digest sent", time: "2 mins ago" },
    { icon: Calendar, title: "Meeting with team", time: "in 15 mins" },
    { icon: CreditCard, title: "Payment processed", time: "1 hour ago" },
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
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Welcome back</h2>
        <p className="text-muted-foreground font-accent">Your dashboard at a glance</p>
      </motion.div>

      {/* Quick Access Services */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Access</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="liquid-glass rounded-3xl p-6 min-w-[280px] h-[160px] flex flex-col justify-between cursor-pointer tap-subtle living-capsule"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-soft`}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
              >
                <service.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </motion.div>
              <div>
                <h4 className="text-lg font-heading font-medium text-foreground mb-1">{service.title}</h4>
                <p className="text-sm font-accent text-muted-foreground">{service.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What's Coming Up Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">What's Coming Up</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className="flex gap-4 items-start"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.15 }}
            >
              <motion.div
                className="w-12 h-12 rounded-3xl gradient-icon flex items-center justify-center flex-shrink-0 shadow-soft"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
              >
                <event.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </motion.div>
              <div className="flex-1 pt-2">
                <p className="text-base font-heading font-medium text-foreground mb-1">{event.title}</p>
                <p className="text-sm font-label text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
