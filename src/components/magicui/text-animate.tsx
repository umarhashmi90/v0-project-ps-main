"use client";

import type { HTMLMotionProps, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const variant = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 10,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
} satisfies Variants;

const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      ease: "anticipate",
      duration: 0.5,
    },
  },
} satisfies Variants;

interface AnimatedTextProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  by?: "word" | "character";
  variants?: Variants;
  className?: string;
}

export function TextAnimate({
  children,
  by = "word",
  variants = variant,
  className,
  ...rest
}: AnimatedTextProps) {
  const Children = React.Children.toArray(children);

  return (
    <AnimatePresence>
      {Children.map((child, i) => {
        if (typeof child !== "string") {
          return child;
        }

        const words = by === "word" ? child.split(" ") : [];
        const characters = by === "character" ? child.split("") : [];

        if (words.length > 0) {
          return (
            <motion.div
              key={child + i}
              className={cn("inline-block", className)}
              {...rest}
            >
              {words.map((word, j) => (
                <motion.span
                  key={j}
                  className="inline-block"
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  custom={j}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.div>
          );
        }

        if (characters.length > 0) {
          return (
            <motion.div
              key={child + i}
              className={cn("inline-block", className)}
              {...rest}
            >
              {characters.map((char, k) => (
                <motion.span
                  key={k}
                  className="inline-block"
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  custom={k}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          );
        }

        return <div key={i}>{child}</div>;
      })}
    </AnimatePresence>
  );
}
