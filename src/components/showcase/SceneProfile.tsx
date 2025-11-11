import { motion } from "framer-motion";
import { Mail, Calendar, CreditCard, Settings, Shield, CheckCircle2 } from "lucide-react";

export const SceneProfile = () => {
  const services = [
    { icon: Mail, label: "Email", color: "from-blue-500 to-cyan-500" },
    { icon: Calendar, label: "Calendar", color: "from-purple-500 to-pink-500" },
    { icon: CreditCard, label: "Payments", color: "from-green-500 to-emerald-500" },
    { icon: Shield, label: "Security", color: "from-orange-500 to-red-500" },
    { icon: Settings, label: "Settings", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <div className="h-full w-full bg-background overflow-hidden p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">All Connected</h2>
          <p className="text-muted-foreground font-accent">Your digital life, unified</p>
        </motion.div>

        {/* Services Circle */}
        <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
          {/* Center hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full gradient-primary shadow-glow flex items-center justify-center z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          {/* Connection lines */}
          {services.map((service, index) => {
            const angle = (index * 360) / services.length - 90;
            const radius = 45; // percentage
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.div
                key={service.label}
                className="absolute w-px h-24 bg-gradient-to-b from-primary/40 to-transparent origin-bottom"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle + 90}deg)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              />
            );
          })}

          {/* Service icons */}
          {services.map((service, index) => {
            const angle = (index * 360) / services.length - 90;
            const radius = 45;
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.div
                key={service.label}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.5 + index * 0.1, 
                  type: "spring", 
                  stiffness: 200 
                }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-glow cursor-pointer`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    y: { 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <service.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </motion.div>
                <motion.p
                  className="text-center text-sm font-label text-foreground mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {service.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>

        {/* Sync status */}
        <motion.div
          className="liquid-glass rounded-2xl p-4 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm font-label text-foreground">Last sync: 2 minutes ago</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
