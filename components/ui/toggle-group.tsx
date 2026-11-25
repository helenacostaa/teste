"use client";
import * as TG from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/cn";

export function ToggleGroup({ className, ...p }: React.ComponentProps<typeof TG.Root>) {
  return <TG.Root className={cn("flex items-center gap-1", className)} {...p} />;
}
export function ToggleGroupItem({ className, ...p }: TG.ToggleGroupItemProps) {
  return (
    <TG.Item
      className={cn(
        "flex h-8 cursor-pointer items-center justify-center rounded-md px-1-5 py-2-5 hover:bg-muted data-[state=on]:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...p}
    />
  );
}
