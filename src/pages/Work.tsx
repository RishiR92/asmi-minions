import { motion } from "framer-motion";
import { Calendar, CheckSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Work = () => {
  const meetings = [
    { id: 1, title: "Board Review", date: "Tomorrow", time: "9:00 AM", attendees: 8 },
    { id: 2, title: "Product Launch", date: "Friday", time: "2:00 PM", attendees: 12 },
    { id: 3, title: "1-on-1 with Sarah", date: "Thursday", time: "10:30 AM", attendees: 2 },
  ];

  const tasks = [
    { id: 1, title: "Review marketing strategy", deadline: "Today, 5:00 PM" },
    { id: 2, title: "Approve budget proposal", deadline: "Tomorrow, 12:00 PM" },
    { id: 3, title: "Sign vendor contracts", deadline: "Wed, 3:00 PM" },
    { id: 4, title: "Update project roadmap", deadline: "Friday" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-2 p-3 sm:p-5">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Work</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 space-y-4 sm:space-y-6">
        {/* Important Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-3 sm:p-4 space-y-2 sm:space-y-3"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-foreground">This Week's Key Meetings</h2>
          </div>
          <div className="space-y-2">
            {meetings.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 rounded-xl bg-background/40">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {item.date} {item.time} • {item.attendees} attendees
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs">
                  View
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-glass rounded-2xl p-3 sm:p-4 space-y-2 sm:space-y-3"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-foreground">Priority Tasks</h2>
          </div>
          <div className="space-y-2">
            {tasks.map((item) => (
              <div key={item.id} className="p-2 sm:p-3 rounded-xl bg-background/40">
                <p className="text-xs sm:text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{item.deadline}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
