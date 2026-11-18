"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
export const MESES_LONGOS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
// "Hoje" fixo do protótipo
export const HOJE = new Date(2026, 10, 18);

/** Month Picker – seleção de mês e ano (componente documentado no Lucky DS › Date Picker). */
export function MonthPicker({ initial, onApply, onCancel }: { initial: { mes: number; ano: number }; onApply: (m: number, a: number) => void; onCancel: () => void }) {
  const [ano, setAno] = useState(initial.ano);
  const [sel, setSel] = useState(initial);
  const futuro = (m: number) => ano > HOJE.getFullYear() || (ano === HOJE.getFullYear() && m > HOJE.getMonth());
  return (
    <div className="w-[256px] rounded-[10px] border border-border bg-background p-3 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <button aria-label="Ano anterior" onClick={() => setAno((a) => a - 1)} className="grid size-8 place-items-center rounded-md border border-border hover:bg-muted"><ChevronLeft className="size-4" /></button>
        <span className="text-sm font-medium">{ano}</span>
        <button aria-label="Próximo ano" disabled={ano >= HOJE.getFullYear()} onClick={() => setAno((a) => a + 1)} className="grid size-8 place-items-center rounded-md border border-border hover:bg-muted disabled:opacity-40"><ChevronRight className="size-4" /></button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MESES.map((m, i) => {
          const selected = sel.mes === i && sel.ano === ano;
          const current = HOJE.getMonth() === i && HOJE.getFullYear() === ano;
          const disabled = futuro(i);
          return (
            <button
              key={m}
              disabled={disabled}
              onClick={() => setSel({ mes: i, ano })}
              className={cn(
                "h-10 rounded-lg text-sm transition-colors",
                selected ? "bg-primary text-primary-foreground" : current ? "bg-accent" : "hover:bg-accent/60",
                disabled && "cursor-not-allowed text-muted-foreground opacity-50 hover:bg-transparent"
              )}
            >
              {m}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <span className="flex-1 text-xs text-muted-foreground">{MESES[sel.mes]}/{sel.ano}</span>
        <Button variant="outline" size="sm" onClick={onCancel}>Cancelar</Button>
        <Button size="sm" onClick={() => onApply(sel.mes, sel.ano)}>Aplicar</Button>
      </div>
    </div>
  );
}

