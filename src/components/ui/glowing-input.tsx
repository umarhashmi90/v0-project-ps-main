"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface GlowingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const GlowingInput = React.forwardRef<HTMLInputElement, GlowingInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn("glowing-card-pseudo relative", className)}>
        <Input
          type={type}
          className="relative z-10 w-full"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
GlowingInput.displayName = "GlowingInput";

export { GlowingInput };
