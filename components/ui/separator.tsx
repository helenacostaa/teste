import { cn } from "@/lib/utils";
export function Separator({ vertical = false, className }: { vertical?: boolean; className?: string }) {
  return <div role="separator" className={cn("bg-border", vertical ? "h-6 w-px" : "h-px w-full", className)} />;
}
