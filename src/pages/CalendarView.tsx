import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendarView = () => {
  const today = new Date();
  const events = [
    { time: "09:00", title: "Team Standup", color: "gradient-primary" },
    { time: "11:30", title: "Client Presentation", color: "gradient-secondary" },
    { time: "14:00", title: "Design Review", color: "gradient-accent" },
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gradient-secondary flex items-center justify-center shadow-glow">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
                  <p className="text-sm text-muted-foreground">
                    {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                className="rounded-2xl gradient-primary shadow-glow w-12 h-12"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Events", value: "3" },
            { label: "Hours", value: "4.5" },
            { label: "Free", value: "2h" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Today's Schedule */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass rounded-2xl p-5 hover-lift tap-scale cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${event.color} flex items-center justify-center shadow-medium`}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {event.time}
                  </p>
                  <h4 className="text-base font-semibold text-foreground">
                    {event.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connect Calendar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl p-8 text-center space-y-4"
        >
          <div className="w-20 h-20 rounded-full gradient-secondary mx-auto flex items-center justify-center shadow-glow">
            <CalendarIcon className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Sync Your Calendar
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect Google Calendar to see all your events and automate scheduling
            </p>
          </div>
          <Button className="rounded-2xl gradient-secondary shadow-glow">
            Connect Calendar
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarView;