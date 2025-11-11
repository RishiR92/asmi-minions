import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceInterfaceProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

export const VoiceInterface = ({ onTranscript, isProcessing = false }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(interimTranscript || finalTranscript);
      
      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (isProcessing) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Microphone Button - Mobile optimized */}
      <motion.button
        onClick={toggleListening}
        disabled={isProcessing}
        className="relative group"
        whileTap={{ scale: 0.95 }}
      >
        {/* Ripple effect when listening */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/40"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main button - responsive sizing */}
        <motion.div
          animate={{
            scale: isListening ? [1, 1.05, 1] : 1,
            boxShadow: isListening 
              ? [
                  "0 0 20px hsla(220, 40%, 35%, 0.2)",
                  "0 0 30px hsla(220, 40%, 35%, 0.4)",
                  "0 0 20px hsla(220, 40%, 35%, 0.2)"
                ]
              : "0 2px 8px 2px rgba(60, 54, 48, 0.08)"
          }}
          transition={{
            duration: 2,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut"
          }}
          className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-colors ${
            isListening
              ? "bg-primary"
              : "bg-card hover:bg-primary/10"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isListening ? (
            <Mic className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white" />
          ) : (
            <MicOff className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary" />
          )}
        </motion.div>
      </motion.button>

      {/* Sound wave visualization - responsive */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 h-10 sm:h-12"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 sm:w-1.5 rounded-full bg-primary"
                animate={{
                  height: isListening
                    ? [
                        "20%",
                        `${Math.random() * 80 + 20}%`,
                        "20%",
                      ]
                    : "20%",
                  opacity: isListening ? [0.6, 1, 0.6] : 0.6,
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center px-6 py-3 sm:px-8 sm:py-4 voice-glass rounded-2xl max-w-md"
          >
            <p className="text-foreground/80 text-sm sm:text-base">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
