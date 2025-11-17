import { motion } from "framer-motion";
import { Film, CreditCard, Calendar, CheckCircle2, Clock, MapPin, Ticket, Hash, Users, DollarSign, Receipt } from "lucide-react";

interface ConfirmationCardProps {
  confirmationType: "billsplit" | "movie" | "payment" | "calendar" | "generic";
  data: {
    title?: string;
    subtitle?: string;
    amount?: string;
    totalAmount?: string;
    perPerson?: string;
    attendees?: number;
    attendeeList?: Array<{ name: string; amount: string; status: string }>;
    location?: string;
    datetime?: string;
    seats?: string;
    confirmationNumber?: string;
    confirmationId?: string;
    method?: string;
    transactionId?: string;
    duration?: string;
    description?: string;
    splitMethod?: string;
    status?: string;
  };
}

export const ConfirmationCard = ({ confirmationType, data }: ConfirmationCardProps) => {
  if (confirmationType === "billsplit") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="voice-glass rounded-3xl p-5 space-y-4"
      >
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Receipt className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Bill Split Complete!</h3>
              <p className="text-xs text-muted-foreground">Everyone has paid</p>
            </div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-secondary" />
        </div>

        {/* Dinner details */}
        <div className="space-y-3 pt-2">
          <div>
            <p className="text-2xl font-bold text-foreground">{data.title || "Dinner"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>Location</span>
              </div>
              <p className="text-sm font-medium text-foreground">{data.location || "Restaurant"}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Time</span>
              </div>
              <p className="text-sm font-medium text-foreground">{data.datetime || "9:00 PM"}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>Attendees</span>
            </div>
            <p className="text-sm font-medium text-foreground">{data.attendees || 8} people</p>
          </div>
        </div>

        {/* Split details */}
        <div className="pt-3 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Bill</span>
            <span className="text-lg font-semibold text-foreground">{data.totalAmount || "$240.00"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Per Person</span>
            <span className="text-2xl font-bold text-primary">{data.perPerson || "$30.00"}</span>
          </div>
        </div>

        {/* Attendee List */}
        {data.attendeeList && (
          <div className="pt-3 border-t border-border/50 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Payment Status</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
              {data.attendeeList.map((attendee, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {attendee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{attendee.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">{attendee.amount}</span>
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data.splitMethod && (
          <div className="bg-secondary/10 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Payment via {data.splitMethod}</span>
            </div>
            <span className="text-sm font-medium text-secondary">{data.status || "Complete"}</span>
          </div>
        )}

        {data.confirmationId && (
          <div className="bg-muted/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Transaction ID</span>
            </div>
            <span className="text-sm font-mono font-medium text-foreground">{data.confirmationId}</span>
          </div>
        )}
      </motion.div>
    );
  }

  if (confirmationType === "movie") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="voice-glass rounded-3xl p-5 space-y-4"
      >
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Film className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Booking Confirmed!</h3>
              <p className="text-xs text-muted-foreground">Sent to your email</p>
            </div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-secondary" />
        </div>

        {/* Movie details */}
        <div className="space-y-3 pt-2">
          <div>
            <p className="text-2xl font-bold text-foreground">{data.title || "Movie Title"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>Theater</span>
              </div>
              <p className="text-sm font-medium text-foreground">{data.location || "AMC Downtown"}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Showtime</span>
              </div>
              <p className="text-sm font-medium text-foreground">{data.datetime || "Friday, 7:30 PM"}</p>
            </div>
          </div>

          {data.seats && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Ticket className="w-3.5 h-3.5" />
                <span>Seats</span>
              </div>
              <p className="text-sm font-medium text-foreground">{data.seats}</p>
            </div>
          )}
        </div>

        {/* Total amount */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary">{data.amount || "$28.00"}</span>
        </div>

        {data.confirmationNumber && (
          <div className="bg-muted/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Confirmation</span>
            </div>
            <span className="text-sm font-mono font-medium text-foreground">{data.confirmationNumber}</span>
          </div>
        )}
      </motion.div>
    );
  }

  if (confirmationType === "payment") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="voice-glass rounded-3xl p-5 space-y-4"
      >
        {/* Success header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10">
            <CheckCircle2 className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="font-semibold text-xl text-foreground">Payment Complete!</h3>
        </div>

        {/* Amount - Large and centered */}
        <div className="text-center py-2">
          <p className="text-4xl font-bold text-primary">{data.amount || "$127.50"}</p>
        </div>

        {/* Payment details */}
        <div className="space-y-3">
          {data.method && (
            <div className="flex items-center justify-between py-2 border-b border-border/30">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">{data.method}</span>
              </div>
            </div>
          )}

          {data.transactionId && (
            <div className="flex items-center justify-between py-2 border-b border-border/30">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="text-sm font-mono font-medium text-foreground">{data.transactionId}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Date & Time</span>
            <span className="text-sm font-medium text-foreground">{data.datetime || new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 text-center">
          <p className="text-xs text-muted-foreground">Receipt sent to your email</p>
        </div>
      </motion.div>
    );
  }

  if (confirmationType === "calendar") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="voice-glass rounded-3xl p-5 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
            <Calendar className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">Event Added!</h3>
            <p className="text-xs text-muted-foreground">Saved to your calendar</p>
          </div>
        </div>

        {/* Event details */}
        <div className="space-y-3 pt-2">
          <div>
            <p className="text-xl font-bold text-foreground">{data.title || "Event Title"}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{data.datetime || "Tomorrow, 2:00 PM"}</p>
                {data.duration && (
                  <p className="text-xs text-muted-foreground mt-0.5">{data.duration}</p>
                )}
              </div>
            </div>

            {data.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <p className="text-sm font-medium text-foreground">{data.location}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reminder info */}
        <div className="bg-muted/30 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Reminder set for 15 minutes before</p>
        </div>
      </motion.div>
    );
  }

  // Generic confirmation
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="voice-glass rounded-3xl p-5 space-y-3"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-secondary" />
        <h3 className="font-semibold text-lg text-foreground">Complete!</h3>
      </div>
      <p className="text-sm text-foreground">{data.description || "Your request has been completed successfully."}</p>
    </motion.div>
  );
};
