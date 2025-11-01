import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  title?: string;
}

export const HorizontalScroll = ({ children, title }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-3">
      {title && (
        <h3 className="text-lg font-semibold text-foreground px-1">
          {title}
        </h3>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide px-5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          scrollPaddingLeft: "20px",
          scrollPaddingRight: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};