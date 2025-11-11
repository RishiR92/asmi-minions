import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";
import { SceneHero } from "./showcase/SceneHero";
import { SceneHome } from "./showcase/SceneHome";
import { SceneAutomations } from "./showcase/SceneAutomations";
import { SceneMail } from "./showcase/SceneMail";
import { SceneCalendar } from "./showcase/SceneCalendar";
import { ScenePayments } from "./showcase/ScenePayments";
import { SceneBills } from "./showcase/SceneBills";
import { SceneProfile } from "./showcase/SceneProfile";
import { SceneFinal } from "./showcase/SceneFinal";

interface Scene {
  id: string;
  component: React.ComponentType;
  duration: number; // in seconds
  title: string;
}

const scenes: Scene[] = [
  { id: "hero", component: SceneHero, duration: 3, title: "Welcome" },
  { id: "home", component: SceneHome, duration: 4, title: "Dashboard" },
  { id: "automations", component: SceneAutomations, duration: 5, title: "AI Automations" },
  { id: "mail", component: SceneMail, duration: 4, title: "Mail Hub" },
  { id: "calendar", component: SceneCalendar, duration: 4, title: "Smart Calendar" },
  { id: "payments", component: ScenePayments, duration: 4, title: "Subscriptions" },
  { id: "bills", component: SceneBills, duration: 4, title: "Bill Management" },
  { id: "profile", component: SceneProfile, duration: 3, title: "Connected Profile" },
  { id: "final", component: SceneFinal, duration: 4, title: "Get Started" },
];

export const VideoShowcase = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentScene = scenes[currentSceneIndex];
  const SceneComponent = currentScene.component;

  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const duration = currentScene.duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        // Move to next scene or loop
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
        setProgress(0);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [currentSceneIndex, isPlaying, currentScene.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
    setProgress(0);
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      {/* Main showcase container - mobile aspect ratio */}
      <div className="relative w-full h-full max-w-[1080px] max-h-[1920px] bg-background shadow-2xl overflow-hidden">
        {/* Scene content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <SceneComponent />
          </motion.div>
        </AnimatePresence>

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm z-50">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {scenes.map((scene, index) => (
                <div
                  key={scene.id}
                  className="flex-1 h-1 bg-muted rounded-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentSceneIndex(index);
                    setProgress(0);
                  }}
                >
                  <motion.div
                    className="h-full bg-primary"
                    style={{
                      width: index === currentSceneIndex ? `${progress}%` : index < currentSceneIndex ? "100%" : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs font-label text-muted-foreground text-center">
              {currentScene.title} ({currentSceneIndex + 1}/{scenes.length})
            </p>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center gap-3">
            <motion.button
              onClick={handleRestart}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center tap-glow tap-subtle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5 text-foreground" />
            </motion.button>

            <motion.button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center tap-glow tap-subtle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack className="w-5 h-5 text-foreground" />
            </motion.button>

            <motion.button
              onClick={handlePlayPause}
              className="w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" fill="white" />
              ) : (
                <Play className="w-6 h-6 text-white" fill="white" />
              )}
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center tap-glow tap-subtle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward className="w-5 h-5 text-foreground" />
            </motion.button>

            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-full liquid-glass text-xs font-label text-foreground tap-subtle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? "Auto" : "Manual"}
            </motion.button>
          </div>
        </div>

        {/* Recording hint */}
        <motion.div
          className="absolute top-6 right-6 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 z-50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-label text-red-500">Ready to Record</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
