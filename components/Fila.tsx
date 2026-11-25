"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import { EstadoBadge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { abertosTxt, agentesTxt, problemaTxt, type Fila } from "@/lib/data";

// Linha de problema do card: números em Medium, texto em Regular (como no Fila / Card atualizado).
function problemaRico(q: Fila) {
  const partes: [number, string][] = [];
  if (q.semAlocacao) partes.push([q.semAlocacao, " sem alocação"]);
  if (q.slaVencido) partes.push([q.slaVencido, " com SLA vencido"]);
  if (!partes.length) return <span className="font-medium">Tudo no prazo</span>;
  return partes.map(([n, t], i) => (
    <span key={t}>
      {i > 0 && " • "}
      <span className="font-medium">{n}</span>
      {t}
    </span>
  ));
}

const hover =
  "transition-[background-color,box-shadow,transform] duration-150 hover:bg-muted hover:shadow-md motion-safe:hover:-translate-y-px focus-within:ring-2 focus-within:ring-ring/40";

function Favoritar({ fila, onToggle, variant }: { fila: Fila; onToggle: () => void; variant: "card" | "lista" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!!fila.favorita}
      aria-label={fila.favorita ? `Remover ${fila.nome} das favoritas` : `Favoritar ${fila.nome}`}
      className={cn(
        "relative z-10 flex shrink-0 cursor-pointer items-center justify-center rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        variant === "lista" ? "size-9 hover:bg-card" : "size-4"
      )}
    >
      {fila.favorita ? (
        <Star className="size-4 fill-[#f59e0b] text-[#f59e0b]" strokeWidth={variant === "card" ? 2 : 1.33} aria-hidden />
      ) : (
        <FigmaIcon name={variant === "card" ? "imgFavoritar" : "imgIconStar"} />
      )}
    </button>
  );
}

// "Fila / Card" — composição local com tokens do Lucky (sem equivalente no DS).
export function FilaCard({ fila, mostrarCanal, onFavoritar }: { fila: Fila; mostrarCanal: boolean; onFavoritar: () => void }) {
  return (
    <div
      className={cn(
        "relative flex rounded-lg border bg-card shadow-xs",
        fila.estado === "Crítico" ? "border-destructive40" : fila.estado === "Atenção" ? "border-[#f59e0b]" : "border-border",
        hover
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <div className="flex w-full items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1-5">
            <Link href={`/fila/${fila.id}`} className="truncate text-base font-semibold leading-none text-foreground outline-none after:absolute after:inset-0 after:content-['']">
              {fila.nome}
              <span className="sr-only">. {fila.estado === "OK" ? "No prazo" : fila.estado}. Abrir fila</span>
            </Link>
            {mostrarCanal && <FigmaIcon name="imgCanalChat" />}
          </div>
          {fila.estado !== "OK" && <EstadoBadge estado={fila.estado} />}
          <Favoritar fila={fila} onToggle={onFavoritar} variant="card" />
        </div>
        <p className="w-full text-sm leading-5 text-foreground">{problemaRico(fila)}</p>
        <div className="flex w-full items-center gap-2">
          <p className="min-w-0 flex-1 text-xs leading-4 text-muted-foreground">
            {abertosTxt(fila)} • {agentesTxt(fila)}
          </p>
          <FigmaIcon name="imgAbrirFila" />
        </div>
      </div>
    </div>
  );
}

// "Fila / Item de lista" — composição local com tokens do Lucky.
export function FilaItemLista({ fila, onFavoritar }: { fila: Fila; onFavoritar: () => void }) {
  return (
    <div className={cn("relative flex h-16 w-full items-center gap-4 rounded-lg border border-border bg-card py-3 pl-4 pr-2 shadow-xs", hover)}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link href={`/fila/${fila.id}`} className="truncate text-sm font-medium leading-5 text-foreground outline-none after:absolute after:inset-0 after:content-['']">
          {fila.nome}
          <span className="sr-only">. Abrir fila</span>
        </Link>
        <p className="truncate text-xs leading-4 text-muted-foreground">
          {problemaTxt(fila)} • {agentesTxt(fila)} • {abertosTxt(fila)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Favoritar fila={fila} onToggle={onFavoritar} variant="lista" />
        <span className="flex size-9 items-center justify-center" aria-hidden>
          <FigmaIcon name="imgIconChevronRight1" />
        </span>
      </div>
    </div>
  );
}
