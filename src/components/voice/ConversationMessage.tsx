import { motion } from "framer-motion";
import { AsmiAvatar } from "./AsmiAvatar";
import { User } from "lucide-react";

interface ConversationMessageProps {
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
}

export const ConversationMessage = ({
  role,
  content,
  isThinking = false,
}: ConversationMessageProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-voice-primary to-voice-accent flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="scale-[0.42] origin-top-left">
            <AsmiAvatar isThinking={isThinking} />
          </div>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`inline-block px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-voice-primary to-voice-accent text-white"
              : "voice-glass text-foreground"
          }`}
        >
          {isThinking ? (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-voice-primary"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className={isUser ? "text-white" : "asmi-message"}>{content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
