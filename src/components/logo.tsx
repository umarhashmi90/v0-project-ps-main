import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center hover-shimmer-button p-2 rounded-lg", className)}>
      <span className="text-xl font-bold font-headline text-foreground">
        PUBGSTUFF
      </span>
    </Link>
  );
}
