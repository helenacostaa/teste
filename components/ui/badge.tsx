import { FigmaIcon } from "@/components/FigmaIcon";
import { cn } from "@/lib/cn";
import type { Estado } from "@/lib/data";

// Lucky Badge — Crítico (Default/primary) e Atenção (yellow/100 + yellow/700). Cor só aqui: ícone + texto.
export function EstadoBadge({ estado, className }: { estado: Exclude<Estado, "OK">; className?: string }) {
  const critico = estado === "Crítico";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-transparent px-2 py-1 text-xs font-semibold leading-none whitespace-nowrap",
        critico ? "bg-primary text-primary-foreground" : "bg-[#fef9c3] text-[#a16207]",
        className
      )}
    >
      <FigmaIcon name={critico ? "imgIconOctagonAlert" : "imgIconTriangleAlert"} size={12} />
      {estado}
    </span>
  );
}
