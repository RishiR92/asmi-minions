import { motion } from "framer-motion";
import { ArrowLeft, Mail, Star, Trash2, Archive, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockEmails = {
  inbox: [
    {
      id: 1,
      sender: "Sarah Johnson",
      subject: "Q4 Planning Meeting",
      preview: "Hi team, let's schedule our quarterly planning session...",
      time: "10:30 AM",
      unread: true,
      important: false,
      initials: "SJ",
      color: "hsl(var(--primary))",
    },
    {
      id: 2,
      sender: "Product Team",
      subject: "New Feature Launch",
      preview: "Excited to announce our latest feature is now live...",
      time: "9:15 AM",
      unread: true,
      important: true,
      initials: "PT",
      color: "hsl(var(--chart-2))",
    },
    {
      id: 3,
      sender: "David Chen",
      subject: "Design Review Feedback",
      preview: "Great work on the mockups! Here are my thoughts...",
      time: "Yesterday",
      unread: false,
      important: false,
      initials: "DC",
      color: "hsl(var(--chart-3))",
    },
  ],
  important: [
    {
      id: 4,
      sender: "CEO Office",
      subject: "Company All-Hands",
      preview: "Join us this Friday for our quarterly all-hands meeting...",
      time: "2 days ago",
      unread: false,
      important: true,
      initials: "CO",
      color: "hsl(var(--chart-1))",
    },
  ],
  sent: [
    {
      id: 5,
      sender: "You",
      subject: "Re: Project Timeline",
      preview: "Thanks for the update. The timeline looks good...",
      time: "Yesterday",
      unread: false,
      important: false,
      initials: "ME",
      color: "hsl(var(--primary))",
    },
  ],
  drafts: [
    {
      id: 6,
      sender: "Draft",
      subject: "Meeting Notes - Strategy Session",
      preview: "Key takeaways from today's strategy discussion...",
      time: "1 hour ago",
      unread: false,
      important: false,
      initials: "DR",
      color: "hsl(var(--muted-foreground))",
    },
  ],
};

const EmailList = () => {
  const navigate = useNavigate();
  const { filter = "inbox" } = useParams();
  
  const emails = mockEmails[filter as keyof typeof mockEmails] || mockEmails.inbox;
  
  const getTitle = () => {
    switch (filter) {
      case "inbox": return "Inbox";
      case "important": return "Important";
      case "sent": return "Sent";
      case "drafts": return "Saved Drafts";
      default: return "Emails";
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-safe">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 z-40 pt-safe">
        <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/mail")}
              className="rounded-2xl min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
              <p className="text-sm text-muted-foreground">{emails.length} messages</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Email List */}
      <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-4 space-y-2">
        {emails.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No messages</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up in this folder
            </p>
          </motion.div>
        ) : (
          emails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <Avatar className="w-12 h-12 rounded-xl shrink-0">
                    <AvatarFallback 
                      className="rounded-xl font-semibold text-white"
                      style={{ backgroundColor: email.color }}
                    >
                      {email.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold truncate ${
                          email.unread ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {email.sender}
                        </h3>
                        {email.important && (
                          <Star className="w-4 h-4 text-primary fill-primary shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {email.time}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-1 truncate ${
                      email.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}>
                      {email.subject}
                    </p>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {email.preview}
                    </p>

                    {email.unread && (
                      <Badge className="mt-2 text-xs px-2 py-0.5">New</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Swipe Actions Hint (visual only) */}
              <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity">
                <Archive className="w-5 h-5 text-primary" />
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
