"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({ page, total, count, size, label, onChange }: { page: number; total: number; count: number; size: number; label: string; onChange: (p: number) => void }) {
  const from = count === 0 ? 0 : (page - 1) * size + 1;
  const to = Math.min(page * size, count);
  const pages = Array.from(new Set([1, 2, 3, page - 1, page, page + 1, total].filter((p) => p >= 1 && p <= total))).sort((a, b) => a - b);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p className="text-sm text-muted-foreground">Mostrando {from}–{to} de {count.toLocaleString("pt-BR")} {label}</p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>Anterior</Button>
        {pages.map((p, i) => (
          <span key={p} className="flex items-center">
            {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-sm text-muted-foreground">…</span>}
            <button onClick={() => onChange(p)} className={cn("size-8 rounded-full text-sm", p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>{p}</button>
          </span>
        ))}
        <Button variant="outline" size="sm" disabled={page >= total} onClick={() => onChange(page + 1)}>Próxima</Button>
      </div>
    </div>
  );
}
