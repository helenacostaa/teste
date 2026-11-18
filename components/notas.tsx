"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Check, Filter, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/ui/pagination";
import { MonthPicker, MESES } from "@/components/period-filter";
import { BaixarRelatorio, DuvidasLink, EnviarNotaFiscal } from "@/components/actions";
import { NOTAS } from "@/lib/mock";
import { cn, paginate } from "@/lib/utils";

const PAGE = 8;

function useOutside(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && cb();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

export function Notas() {
  const [busca, setBusca] = useState("");
  const [mes, setMes] = useState<{ mes: number; ano: number } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [open, setOpen] = useState<"none" | "cal" | "filter">("none");
  const [page, setPage] = useState(1);
  const ref = useOutside(() => setOpen("none"));

  const linhas = useMemo(() => NOTAS.filter((n) => {
    const [, m, a] = n.data.split("/").map(Number);
    return (!busca || n.protocolo.toLowerCase().includes(busca.toLowerCase())) && (!mes || (m - 1 === mes.mes && a === mes.ano)) && (!status || n.status === status);
  }), [busca, mes, status]);
  const pg = paginate(linhas, page, PAGE);

  return (
    <>
      <PageHeader back title="Notas Fiscais" description="Envie suas notas fiscais e acompanhe a análise e o pagamento."
        actions={<><BaixarRelatorio filename="notas-fiscais.csv" rows={NOTAS.map((n) => ({ "Número protocolo": n.protocolo, Valor: n.valor, Data: n.data, Status: n.status, "Origem comissão": n.origem }))} /><EnviarNotaFiscal /></>} />
      <div className="px-6 py-6">
        <Card className="p-6">
          <div ref={ref} className="relative mb-4 flex flex-wrap items-center gap-2">
            <label className="flex h-12 w-[400px] max-w-full items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
              <Search className="size-4 text-muted-foreground" />
              <input value={busca} onChange={(e) => { setBusca(e.target.value); setPage(1); }} placeholder="Buscar" className="w-full bg-transparent outline-none" />
            </label>
            <Button variant="outline" size="icon" aria-label="Filtrar por mês" className={cn(mes && "border-primary text-primary")} onClick={() => setOpen(open === "cal" ? "none" : "cal")}><CalendarDays className="size-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Filtrar por status" className={cn(status && "border-primary text-primary")} onClick={() => setOpen(open === "filter" ? "none" : "filter")}><Filter className="size-4" /></Button>
            {(mes || status) && (
              <button className="text-xs text-muted-foreground underline" onClick={() => { setMes(null); setStatus(null); }}>
                Limpar filtros{mes ? ` · ${MESES[mes.mes]}/${mes.ano}` : ""}{status ? ` · ${status}` : ""}
              </button>
            )}
            <div className="ml-auto"><DuvidasLink /></div>
            {open === "cal" && (
              <div className="absolute left-[408px] top-14 z-30">
                <MonthPicker initial={mes ?? { mes: 9, ano: 2026 }} onCancel={() => setOpen("none")} onApply={(m, a) => { setMes({ mes: m, ano: a }); setPage(1); setOpen("none"); }} />
              </div>
            )}
            {open === "filter" && (
              <div className="absolute left-[464px] top-14 z-30 w-48 rounded-lg border border-border bg-card p-1 shadow-lg">
                {["Em análise", "Recusada", "Pago"].map((s) => (
                  <button key={s} onClick={() => { setStatus(s === status ? null : s); setPage(1); setOpen("none"); }} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted">
                    {s} {s === status && <Check className="size-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  {["Número protocolo", "Valor", "Data", "Status", "Origem comissão"].map((h) => <th key={h} className="px-2 py-2.5 font-normal">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {pg.rows.map((n) => (
                  <tr key={n.protocolo} className="border-b border-border">
                    <td className="px-2 py-4">{n.protocolo}</td><td className="px-2">{n.valor}</td><td className="px-2">{n.data}</td>
                    <td className="px-2"><Badge>{n.status}</Badge></td><td className="px-2">{n.origem}</td>
                  </tr>
                ))}
                {!pg.rows.length && <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">Não encontramos o dado que você está buscando, tente outra vez.</td></tr>}
              </tbody>
            </table>
          </div>
          <Pagination page={pg.page} total={pg.total} count={linhas.length} size={PAGE} label="notas fiscais" onChange={setPage} />
        </Card>
      </div>
    </>
  );
}
