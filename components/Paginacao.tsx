"use client";
import { FigmaIcon } from "@/components/FigmaIcon";
import { cn } from "@/lib/cn";

function paginas(atual: number, total: number): (number | "…")[] {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);
  if (atual <= 3) return [1, 2, 3, "…", total];
  if (atual >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", atual, "…", total];
}

// Lucky Pagination (Previous / Link / Ellipsis / Next).
export function Paginacao({ pagina, total, onChange }: { pagina: number; total: number; onChange: (p: number) => void }) {
  const base = "flex h-9 items-center justify-center rounded-md text-sm font-medium leading-5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";
  return (
    <nav aria-label="Paginação" className="flex items-center">
      <button type="button" disabled={pagina <= 1} onClick={() => onChange(pagina - 1)} className={cn(base, "gap-1 py-2 pl-2-5 pr-4 hover:bg-muted disabled:pointer-events-none disabled:opacity-50")}>
        <FigmaIcon name="imgIconChevronLeft" /> Previous
      </button>
      {paginas(pagina, total).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="flex size-9 items-center p-2-5" aria-hidden>
            <FigmaIcon name="imgIconEllipsis" />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === pagina ? "page" : undefined}
            onClick={() => onChange(p)}
            className={cn(base, "size-9", p === pagina ? "border border-input bg-card shadow-xs" : "hover:bg-muted")}
          >
            {p}
          </button>
        )
      )}
      <button type="button" disabled={pagina >= total} onClick={() => onChange(pagina + 1)} className={cn(base, "gap-1 py-2 pl-4 pr-2-5 hover:bg-muted disabled:pointer-events-none disabled:opacity-50")}>
        Next <FigmaIcon name="imgIconChevronRight" />
      </button>
    </nav>
  );
}
