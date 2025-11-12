import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceInterfaceProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
  onListeningChange?: (isListening: boolean) => void;
}

export const VoiceInterface = ({ onTranscript, isProcessing = false, onListeningChange }: VoiceInterfaceProps) => {
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
      onListeningChange?.(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange]);

  const toggleListening = () => {
    if (isProcessing) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      onListeningChange?.(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript("");
      onListeningChange?.(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Microphone Button - Small and Subtle */}
      <motion.button
        onClick={toggleListening}
        disabled={isProcessing}
        className="relative group"
        data-voice-button
        whileTap={{ scale: 0.95 }}
      >
        {/* Ripple effect when listening */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-voice-primary/20"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main button - smaller size */}
        <motion.div
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? "bg-primary/80 shadow-md shadow-primary/30"
              : "bg-muted/40 border border-border/40"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          animate={isListening ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
        >
          <Mic className={`w-4 h-4 sm:w-5 sm:h-5 ${isListening ? 'text-white' : 'text-muted-foreground'}`} />
        </motion.div>
      </motion.button>

      {/* Sound wave visualization - smaller */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 h-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-primary rounded-full"
                animate={{
                  height: ["20%", "100%", "20%"],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{ height: "20%" }}
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
            className="relative z-20 text-center px-6 py-3 voice-glass rounded-2xl max-w-md"
          >
            <p className="text-foreground/80 text-sm">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
