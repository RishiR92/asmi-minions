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
      className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        ) : (
          <div className="scale-[0.35] origin-top-left">
            <AsmiAvatar isThinking={isThinking} />
          </div>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? "ml-auto" : "mr-auto"
        }`}
      >
        <div
          className={`inline-block px-4 py-2.5 rounded-2xl ${
            isUser
              ? "bg-emerald-500/90 text-white rounded-tr-sm shadow-md shadow-emerald-500/10 border border-emerald-500/20"
              : "bg-slate-100 text-slate-900 rounded-tl-sm shadow-md shadow-slate-200/50 border border-slate-200"
          }`}
        >
          {isThinking ? (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-emerald-500"
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
            <p className="text-[15px] leading-relaxed">{content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
