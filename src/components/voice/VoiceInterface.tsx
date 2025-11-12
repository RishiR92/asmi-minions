import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceInterfaceProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
  onListeningChange?: (isListening: boolean) => void;
  onTranscriptChange?: (text: string) => void;
}

export const VoiceInterface = ({ onTranscript, isProcessing = false, onListeningChange, onTranscriptChange }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const persistentRefs = useRef<any[]>([]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported on this device");
      alert("Voice input is not supported on this browser. Please try Chrome on Android or Safari on iOS.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // iOS Safari workaround: prevent garbage collection
    persistentRefs.current.push(recognitionRef.current);
    (window as any).__speechRecognition = recognitionRef.current;
    
    recognitionRef.current.continuous = true; // Better for iOS reliability
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event: any) => {
      console.log("Speech recognition result received:", event);
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log("Transcript part:", transcript, "isFinal:", event.results[i].isFinal);
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscript = interimTranscript || finalTranscript;
      console.log("Current transcript:", currentTranscript);
      
      // Update transcript display
      setTranscript(currentTranscript);
      onTranscriptChange?.(currentTranscript);
      
      if (finalTranscript) {
        console.log("Final transcript:", finalTranscript.trim());
        // iOS fix: Small delay before submitting to ensure state is captured
        setTimeout(() => {
          onTranscript(finalTranscript.trim());
          recognitionRef.current?.stop();
        }, 100);
      }
    };
    
    recognitionRef.current.onstart = () => {
      console.log("Speech recognition started");
    };
    
    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
      onListeningChange?.(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error, event);
      if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please enable microphone permissions in your browser settings.");
      } else if (event.error === 'no-speech') {
        console.log("No speech detected");
      } else {
        alert(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
      onListeningChange?.(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange]);

  const toggleListening = async () => {
    if (isProcessing) return;

    if (isListening) {
      console.log("Stopping speech recognition");
      recognitionRef.current?.stop();
      setIsListening(false);
      onListeningChange?.(false);
    } else {
      console.log("Starting speech recognition");
      
      // iOS: Request microphone permission explicitly
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error("Microphone permission denied:", error);
        alert("Microphone access is required. Please enable it in your browser settings.");
        return;
      }

      try {
        recognitionRef.current?.start();
        setIsListening(true);
        onListeningChange?.(true);
        
        // Don't clear transcript immediately - wait for new input
        setTimeout(() => {
          if (transcript) {
            setTranscript("");
            onTranscriptChange?.("");
          }
        }, 100);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        
        // iOS retry logic
        if (error instanceof Error && error.message.includes('already started')) {
          recognitionRef.current?.stop();
          setTimeout(() => {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
              onListeningChange?.(true);
            } catch (retryError) {
              alert("Failed to start voice recognition. Please try again.");
            }
          }, 300);
        } else {
          alert("Failed to start voice recognition. Please try again.");
        }
      }
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
