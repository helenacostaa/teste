"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { MonthPicker, MESES, MESES_LONGOS, HOJE } from "@/components/ui/month-picker";
export { MonthPicker, MESES, HOJE };
import { cn } from "@/lib/utils";

export const PRESETS = ["Últimos 30 dias", "Últimos 3 meses", "Últimos 6 meses"] as const;

export type Periodo = { tipo: "preset"; valor: (typeof PRESETS)[number] } | { tipo: "mes"; mes: number; ano: number };

export function periodoLabel(p: Periodo) {
  return p.tipo === "preset" ? p.valor : `${MESES_LONGOS[p.mes]}/${p.ano}`;
}

/** Retorna true se a data ISO está dentro do período. */
export function dentroDoPeriodo(iso: string, p: Periodo) {
  const d = new Date(iso + "T12:00:00");
  if (p.tipo === "mes") return d.getMonth() === p.mes && d.getFullYear() === p.ano;
  const dias = p.valor === "Últimos 30 dias" ? 30 : p.valor === "Últimos 3 meses" ? 92 : 183;
  return (HOJE.getTime() - d.getTime()) / 86400000 <= dias;
}

/** Filtro de período: presets + "Período específico…" (abre o Month Picker). */
export function PeriodFilter({ value, onChange }: { value: Periodo; onChange: (p: Periodo) => void }) {
  const [open, setOpen] = useState<"none" | "menu" | "picker">("none");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen("none");
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const init = value.tipo === "mes" ? { mes: value.mes, ano: value.ano } : { mes: 9, ano: 2026 };
  return (
    <div ref={ref} className="relative w-[200px]">
      <button
        type="button"
        onClick={() => setOpen((o) => (o === "none" ? "menu" : "none"))}
        className={cn("flex h-12 w-full items-center justify-between rounded-lg border border-border bg-card px-3 text-sm", open !== "none" && "ring-2 ring-primary/20")}
      >
        <span className="truncate">{open === "picker" ? "Período específico" : periodoLabel(value)}</span>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </button>
      {open === "menu" && (
        <div className="absolute z-30 mt-1 w-[220px] rounded-lg border border-border bg-card p-1 shadow-lg">
          {PRESETS.map((p) => {
            const sel = value.tipo === "preset" && value.valor === p;
            return (
              <button key={p} onClick={() => { onChange({ tipo: "preset", valor: p }); setOpen("none"); }} className={cn("flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted", sel && "bg-muted")}>
                {p} {sel && <Check className="size-4" />}
              </button>
            );
          })}
          <div className="my-1 h-px bg-border" />
          <button onClick={() => setOpen("picker")} className={cn("flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted", value.tipo === "mes" && "bg-muted")}>
            Período específico… {value.tipo === "mes" && <Check className="size-4" />}
          </button>
        </div>
      )}
      {open === "picker" && (
        <div className="absolute z-30 mt-1">
          <MonthPicker initial={init} onCancel={() => setOpen("none")} onApply={(mes, ano) => { onChange({ tipo: "mes", mes, ano }); setOpen("none"); }} />
        </div>
      )}
    </div>
  );
}
