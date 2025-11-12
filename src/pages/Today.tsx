import { motion } from "framer-motion";
import { AlertCircle, Video, Heart, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Today = () => {
  const urgentDeadlines = [
    { id: 1, title: "Q4 Report", time: "Due 5:00 PM", urgent: true },
    { id: 2, title: "Client Proposal", time: "Due today", urgent: true },
  ];

  const meetings = [
    { id: 1, title: "Team Standup", time: "10:00 AM", duration: "30 min" },
    { id: 2, title: "Client Call", time: "2:00 PM", duration: "1 hour" },
  ];

  const appointments = [
    { id: 1, title: "Dr. Smith - Annual Checkup", time: "3:30 PM", location: "Medical Center" },
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
          <h1 className="text-2xl font-semibold text-foreground">Today</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        {/* Urgent Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Urgent Deadlines</h2>
          </div>
          <div className="space-y-2">
            {urgentDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Button size="sm" variant="ghost" className="rounded-full h-8 px-4 text-xs text-primary">
                  Notes
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Today's Meetings</h2>
          </div>
          <div className="space-y-2">
            {meetings.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.time} • {item.duration}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Health & Wellness</h2>
          </div>
          <div className="space-y-2">
            {appointments.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                  Directions
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Today;
