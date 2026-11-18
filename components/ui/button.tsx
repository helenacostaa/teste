import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "link";
type Size = "default" | "sm" | "icon";

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-border bg-card shadow-xs hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        variant === "link" && "text-primary hover:underline px-0",
        size === "default" && variant !== "link" && "h-9 px-4",
        size === "sm" && "h-8 px-3",
        size === "icon" && "h-12 w-12",
        className
      )}
      {...props}
    />
  );
}
