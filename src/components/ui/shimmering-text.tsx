"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

export interface ShimmeringTextProps {
  text: string;
  className?: string;
  duration?: number;
  repeatDelay?: number;
}

export const ShimmeringText = ({
  text,
  className,
  duration = 2,
  repeatDelay = 0,
}: ShimmeringTextProps) => {
  const styles: CSSProperties = {
    "--shimmer-duration": `${duration}s`,
    "--shimmer-delay": `${repeatDelay}s`,
  } as CSSProperties;

  return (
    <p
      style={styles}
      className={cn(
        "shimmer-text relative animate-shimmer bg-clip-text text-transparent",
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent",
        className
      )}
    >
      {text}
    </p>
  );
};
