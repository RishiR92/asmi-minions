import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin, Bell } from "lucide-react";

export const SceneCalendar = () => {
  const events = [
    {
      time: "9:00 AM",
      title: "Team Standup",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      duration: "30 min",
    },
    {
      time: "11:00 AM",
      title: "Client Presentation",
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
      duration: "1 hour",
    },
    {
      time: "2:00 PM",
      title: "Product Review",
      icon: Calendar,
      color: "from-orange-500 to-red-500",
      duration: "45 min",
    },
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Today's Schedule</h2>
            <p className="text-muted-foreground font-accent">Thursday, Jan 11, 2025</p>
          </div>
          <motion.div
            className="liquid-glass rounded-2xl px-4 py-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold text-foreground">{events.length} events</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { label: "Events", value: events.length, icon: Calendar },
          { label: "Hours", value: "2.25", icon: Clock },
          { label: "Free", value: "5.75h", icon: Clock },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="liquid-glass rounded-2xl p-4 tap-subtle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <motion.div
              className="text-2xl font-heading font-bold text-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-muted-foreground font-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Events Timeline */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            className="liquid-glass rounded-3xl p-6 tap-subtle living-capsule relative overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-soft flex-shrink-0`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
              >
                <event.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-label text-primary">{event.time}</span>
                  <span className="text-sm text-muted-foreground font-label">• {event.duration}</span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {event.title}
                </h3>
              </div>

              {/* Time block visualization */}
              <motion.div
                className="w-20 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 1.4 + index * 0.15, duration: 0.8 }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification */}
      <motion.div
        className="absolute bottom-8 right-8 liquid-glass rounded-2xl p-4 shadow-glow"
        initial={{ y: 100, scale: 0, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.5, repeat: 3, delay: 2.2 }}
          >
            <Bell className="w-6 h-6 text-primary" />
          </motion.div>
          <div>
            <p className="font-heading font-medium text-foreground text-sm">Meeting in 15 minutes</p>
            <p className="text-xs text-muted-foreground font-label">Team Standup</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
