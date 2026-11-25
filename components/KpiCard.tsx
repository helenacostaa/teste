"use client";
import { FigmaIcon } from "@/components/FigmaIcon";
import { EstadoBadge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { KPIS } from "@/lib/data";

type Kpi = (typeof KPIS)[number];

// Card de indicador do supervisor: o card inteiro é o filtro (toggle, aria-pressed). Sem link.
export function KpiCard({ kpi, pressed, onToggle }: { kpi: Kpi; pressed: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      aria-label={`${kpi.titulo}: ${kpi.valor} ${kpi.contexto}. ${kpi.nivel}. Filtrar departamentos`}
      className={cn(
        "flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-1-5 self-stretch rounded-lg bg-card p-4 text-left transition-colors",
        // 1 · Padrão: borda base/border + shadow/xs; hover: borda mais escura + fundo muted.
        // 2 · Selecionado: mesmo fundo (base/card), borda base/ring e sombra interna inset-shadow/sm + check.
        pressed ? "border border-ring shadow-inset-sm" : "border border-border shadow-xs hover:border-ring hover:bg-muted",
        // 3 · Foco via teclado: borda 2px base/ring (WCAG 2.4.7).
        "focus-visible:outline-none focus-visible:border-2 focus-visible:border-ring focus-visible:p-[15px]"
      )}
    >
      <span className="text-xs leading-4 text-muted-foreground" aria-hidden>{kpi.titulo}</span>
      <span className="flex items-center gap-2" aria-hidden>
        <span className="text-2xl font-semibold leading-none text-foreground">{kpi.valor}</span>
        <EstadoBadge estado={kpi.nivel} />
        {pressed && <FigmaIcon name="imgFiltrando" />}
      </span>
      <span className="text-xs leading-4 text-muted-foreground" aria-hidden>{kpi.contexto}</span>
    </button>
  );
}
