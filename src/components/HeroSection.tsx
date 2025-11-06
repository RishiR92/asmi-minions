import { User } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import minionVideo from "@/assets/minion-hero.mp4";

export const HeroSection = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopStartRef = useRef(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS inline autoplay requirements - strengthen for iOS Safari
    v.defaultMuted = true;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x5-playsinline", "true");

    const tryPlay = () => v.play().catch(() => {});
    
    const onLoadedMetadata = () => {
      loopStartRef.current = Math.max(0, v.duration - 2);
      v.currentTime = loopStartRef.current;
      setVideoEnded(true); // Show greeting immediately
      tryPlay();
    };

    const onTimeUpdate = () => {
      if (v.currentTime >= v.duration - 0.02) {
        v.currentTime = loopStartRef.current;
      }
    };

    const onCanPlay = () => tryPlay();
    const onCanPlayThrough = () => tryPlay();

    v.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("canplay", onCanPlay, { once: true });
    v.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
    
    // Visibility change to resume on tab focus
    const onVisibilityChange = () => {
      if (!document.hidden && v.paused) {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    tryPlay();

    // Fallback for some mobile browsers: start on first tap
    const onFirstTap = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstTap);
    };
    document.addEventListener("touchstart", onFirstTap, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("canplaythrough", onCanPlayThrough);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("touchstart", onFirstTap);
    };
  }, []);

  return (
    <div className="relative h-[35vh] min-h-[280px] overflow-hidden bg-gradient-to-b from-background-gradient-start via-background to-background-gradient-end">
      {/* Video Background - portrait optimized, autoplay muted loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        className="hero-video absolute inset-0 w-full h-full object-cover opacity-100"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={minionVideo} type="video/mp4" />
      </video>
      
      {/* Luminous overlay - static dimensional fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/40 to-background" />
      
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 pt-safe">
        {/* Top section with profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-end items-start"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};
