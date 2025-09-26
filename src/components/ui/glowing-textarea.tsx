"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";

export interface GlowingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const GlowingTextarea = React.forwardRef<HTMLTextAreaElement, GlowingTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("glowing-card-pseudo relative", className)}>
        <Textarea
          className="relative z-10 w-full"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
GlowingTextarea.displayName = "GlowingTextarea";

export { GlowingTextarea };
