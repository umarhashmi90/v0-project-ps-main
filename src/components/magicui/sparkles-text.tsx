"use client";

import React from "react";
import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesTextProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
}

const defaultSparkles = 20;

const Sparkle = ({
  size,
  color,
  ...rest
}: {
  size: number;
  color: string;
} & MotionProps) => {
  return (
    <motion.div
      className="absolute z-50 rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
      }}
      {...rest}
    />
  );
};

export function SparklesText({
  children,
  className,
  sparklesCount = defaultSparkles,
  ...rest
}: SparklesTextProps) {
  const sparkles = Array.from({ length: sparklesCount });
  const colors = ["#A855F7", "#3B82F6", "#F97316", "#14B8A6"];

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div {...rest}>
        {sparkles.map((_, i) => {
          const size = Math.random() * 2 + 1;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const duration = Math.random() * 2 + 1;
          const delay = Math.random() * 0.5;

          return (
            <Sparkle
              key={i}
              size={size}
              color={color}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
              }}
            />
          );
        })}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
