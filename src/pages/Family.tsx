import { motion } from "framer-motion";
import { Users, GraduationCap, Home, PartyPopper, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Family = () => {
  const kidsSchedule = [
    { id: 1, child: "Emma", activity: "Soccer Practice", day: "Wed", time: "4:00 PM" },
    { id: 2, child: "Jake", activity: "Piano Lesson", day: "Thu", time: "3:30 PM" },
    { id: 3, child: "Emma", activity: "School Project Due", day: "Friday", time: "" },
  ];

  const schoolEvents = [
    { id: 1, title: "PTA Meeting", date: "Next Tuesday", time: "6:00 PM" },
    { id: 2, title: "Parent-Teacher Conference", date: "Dec 15", time: "3:00 PM" },
    { id: 3, title: "School Fundraiser", date: "This Saturday", time: "10:00 AM" },
  ];


  const projects = [
    { id: 1, title: "Renovate kids' room", status: "In progress" },
    { id: 2, title: "Plan summer vacation", status: "Planning" },
  ];

  const funEvents = [
    { id: 1, title: "Movie Night", date: "Friday", time: "7:00 PM", icon: "🎬" },
    { id: 2, title: "Mom's Birthday Dinner", date: "Dec 20", time: "6:30 PM", icon: "🎂" },
    { id: 3, title: "Family Game Night", date: "Next Sunday", time: "5:00 PM", icon: "🎮" },
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
          <h1 className="text-2xl font-semibold text-foreground">Family</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        {/* Kids Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Kids' Schedule</h2>
          </div>
          <div className="space-y-2">
            {kidsSchedule.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.child} - {item.activity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.day} {item.time}
                  </p>
                </div>
                {item.activity === "School Project Due" ? (
                  <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                    Remind Thu, 5PM
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                    Add to Cal
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* School & PTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">School & Activities</h2>
          </div>
          <div className="space-y-2">
            {schoolEvents.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} • {item.time}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                  RSVP
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Family Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-accent-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Family Projects</h2>
          </div>
          <div className="space-y-2">
            {projects.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                  Details
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fun Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="liquid-glass rounded-2xl p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <PartyPopper className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Upcoming Fun</h2>
          </div>
          <div className="space-y-2">
            {funEvents.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} • {item.time}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs">
                  Details
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Family;
