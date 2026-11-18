import { cn } from "@/lib/utils";
import { STATUS, type StatusTone } from "@/lib/mock";

const tones: Record<StatusTone, string> = {
  yellow: "bg-yellow-100 text-yellow-800",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  gray: "bg-zinc-200 text-zinc-700",
};

export function Badge({ children, tone, className }: { children: React.ReactNode; tone?: StatusTone; className?: string }) {
  const t = tone ?? STATUS[String(children)] ?? "gray";
  return <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", tones[t], className)}>{children}</span>;
}
