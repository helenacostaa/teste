"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownUp, Banknote, ChevronRight, FilePieChart, FileText, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { PeriodFilter, dentroDoPeriodo, type Periodo } from "@/components/period-filter";
import { OPERACOES, STATUS } from "@/lib/mock";
import { paginate } from "@/lib/utils";

const CARDS = [
  { icon: Banknote, title: "Recibo de Comissões de Consórcio", desc: "Comissões, complementos e descontos do mês no consórcio.", cta: "Mostrar recibo", href: "/recibos/consorcio" },
  { icon: ShieldCheck, title: "Recibo de Comissões de Seguro", desc: "Comissões, complementos e descontos do mês em seguros.", cta: "Mostrar recibo", href: "/recibos/seguro" },
  { icon: FileText, title: "Notas Fiscais", desc: "Envie e acompanhe o status das suas notas fiscais.", cta: "Mostrar notas fiscais", href: "/notas-fiscais" },
  { icon: FilePieChart, title: "Carteira de Comissões", desc: "Previsão de comissões a receber e cotas em risco.", cta: "Mostrar carteira", href: "/carteira" },
];

const ROTA: Record<string, string> = { "Recibo Consórcio": "/recibos/consorcio", "Recibo Seguro": "/recibos/seguro", "Notas Fiscais": "/notas-fiscais" };
const PAGE = 8;

export function Painel() {
  const router = useRouter();
  const [periodo, setPeriodo] = useState<Periodo>({ tipo: "preset", valor: "Últimos 30 dias" });
  const [modulo, setModulo] = useState("Todos os módulos");
  const [status, setStatus] = useState("Todos os status");
  const [page, setPage] = useState(1);

  const filtradas = useMemo(
    () => OPERACOES.filter((o) => dentroDoPeriodo(o.data, periodo) && (modulo === "Todos os módulos" || o.modulo === modulo) && (status === "Todos os status" || o.status === status)),
    [periodo, modulo, status]
  );
  const pg = paginate(filtradas, page, PAGE);
  const reset = <T,>(fn: (v: T) => void) => (v: T) => { fn(v); setPage(1); };

  return (
    <>
      <div className="border-b border-border px-6 py-6">
        <h1 className="text-[30px] font-semibold leading-9 text-foreground/80">Relatório de comissões</h1>
        <p className="mt-2 text-base text-muted-foreground">Painel de Controle</p>
      </div>
      <div className="space-y-5 px-6 py-5">
        <div className="grid gap-4 md:grid-cols-2">
          {CARDS.map((c) => (
            <Card key={c.title} onClick={() => router.push(c.href)} className="cursor-pointer p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2">
                <c.icon className="size-6 text-primary" />
                <h2 className="text-xl font-semibold">{c.title}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <Button className="mt-4" onClick={(e) => { e.stopPropagation(); router.push(c.href); }}>{c.cta}</Button>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><ArrowDownUp className="size-6 text-primary" /> Histórico de operações</h2>
            <div className="flex flex-wrap gap-2">
              <PeriodFilter value={periodo} onChange={reset(setPeriodo)} />
              <Select value={modulo} onChange={reset(setModulo)} options={["Todos os módulos", "Recibo Consórcio", "Recibo Seguro", "Notas Fiscais"]} />
              <Select value={status} onChange={reset(setStatus)} options={["Todos os status", "Aguardando NF", "Em análise", "Recusada", "Pago"]} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  {["Módulo", "Operação", "Referência", "Valor", "Status", ""].map((h) => <th key={h} className="px-2 py-2.5 font-normal">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {pg.rows.map((o, i) => (
                  <tr
                    key={i}
                    tabIndex={0}
                    onClick={() => router.push(`${ROTA[o.modulo]}?ref=${encodeURIComponent(o.referencia)}`)}
                    onKeyDown={(e) => e.key === "Enter" && router.push(`${ROTA[o.modulo]}?ref=${encodeURIComponent(o.referencia)}`)}
                    className="cursor-pointer border-b border-border hover:bg-muted/70 focus:bg-muted/70 focus:outline-none"
                  >
                    <td className="px-2 py-4">{o.modulo}</td>
                    <td className="px-2 py-4">{o.operacao}</td>
                    <td className="px-2 py-4">{o.referencia}</td>
                    <td className="px-2 py-4">{o.valor}</td>
                    <td className="px-2 py-4"><Badge tone={STATUS[o.status]}>{o.status}</Badge></td>
                    <td className="px-2 py-4 text-right"><ChevronRight className="ml-auto size-4" /></td>
                  </tr>
                ))}
                {!pg.rows.length && (
                  <tr><td colSpan={6} className="py-12 text-center text-muted-foreground">Nenhuma operação encontrada para os filtros selecionados.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={pg.page} total={pg.total} count={filtradas.length} size={PAGE} label="operações" onChange={setPage} />
        </Card>
      </div>
    </>
  );
}
