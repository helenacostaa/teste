"use client";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, CircleDollarSign, Coins, File, Info, Receipt, Search, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/ui/pagination";
import { BaixarRelatorio, DadosBancarios, DuvidasLink, EnviarNotaFiscal } from "@/components/actions";
import type { ReciboData } from "@/lib/mock";
import { cn, paginate } from "@/lib/utils";

const MES_LONGO: Record<string, string> = { Jan: "Janeiro", Fev: "Fevereiro", Mar: "Março", Abr: "Abril", Mai: "Maio", Jun: "Junho", Jul: "Julho", Ago: "Agosto", Set: "Setembro", Out: "Outubro", Nov: "Novembro", Dez: "Dezembro" };
const PERIODOS = ["Outubro/2026", "Setembro/2026", "Agosto/2026", "Julho/2026", "Junho/2026"];
const PAGE = 10;

function refToLong(ref?: string) {
  if (!ref) return "Outubro/2026";
  const [m, a] = ref.split("/");
  return `${MES_LONGO[m] ?? m}/${a}`;
}

function Resumo({ icon: Icon, title, value, caption, highlight }: { icon: React.ElementType; title: string; value: string; caption: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-[14px] border p-6 shadow-sm", highlight ? "border-transparent bg-success text-success-foreground" : "border-border bg-card")}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-base">{title}</span>
        <Icon className="size-6" />
      </div>
      <p className="mt-1 text-[28px] leading-9">{value}</p>
      <p className="text-sm">{caption}</p>
    </div>
  );
}

function Secao({ icon: Icon, title, value, open, onToggle, children }: { icon: React.ElementType; title: string; value: string; open: boolean; onToggle: () => void; children?: React.ReactNode }) {
  return (
    <Card>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-3 px-6 py-5 text-left">
        <Icon className="size-5" />
        <span className="flex-1 text-base">{title}</span>
        <span className="font-semibold">{value}</span>
        {open ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </Card>
  );
}

function Vazio() {
  return <p className="py-10 text-center text-sm text-muted-foreground">Não encontramos o dado que você está buscando, tente outra vez.</p>;
}

export function Recibo({ data, refParam, filename }: { data: ReciboData; refParam?: string; filename: string }) {
  const [periodo, setPeriodo] = useState(refToLong(refParam));
  const [aberta, setAberta] = useState<"comissoes" | "descontos" | "complemento" | null>("comissoes");
  const [busca, setBusca] = useState("");
  const [matricula, setMatricula] = useState("Todas as matrículas");
  const [status, setStatus] = useState("Todos os status");
  const [page, setPage] = useState(1);

  const matriculas = Array.from(new Set(data.comissoes.map((c) => c.matricula)));
  const linhas = useMemo(() => {
    const q = busca.toLowerCase();
    return data.comissoes.filter((c) =>
      (!q || [c.contrato, c.grupoCota, c.categoria].some((v) => v.toLowerCase().includes(q))) &&
      (matricula === "Todas as matrículas" || c.matricula === matricula) &&
      (status === "Todos os status" || c.status === status)
    );
  }, [data.comissoes, busca, matricula, status]);
  const pg = paginate(linhas, page, PAGE);
  const toggle = (k: NonNullable<typeof aberta>) => setAberta((a) => (a === k ? null : k));

  return (
    <>
      <PageHeader
        back
        title={data.titulo}
        description={data.descricao}
        actions={<>
          <DadosBancarios />
          <BaixarRelatorio filename={filename} rows={data.comissoes.map((c) => ({ [data.colunas[0]]: c.contrato, [data.colunas[1]]: c.grupoCota, [data.colunas[2]]: c.categoria, Parcela: c.parcela, "% Comissão": c.pct, "Valor bruto": c.valor, "Data da venda": c.data, Status: c.status }))} />
          <EnviarNotaFiscal />
        </>}
      />
      <div className="space-y-6 px-6 py-6">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-sm text-blue-700"><Info className="size-4" /> Relatório referente a {periodo}</span>

        <div className="space-y-3 text-base">
          {data.matriculas.map((m) => (
            <p key={m.nome} className="flex flex-wrap gap-x-6"><b className="font-semibold">{m.nome}</b><span><b className="font-semibold">Valor: </b>{m.valor}</span></p>
          ))}
          <p className="flex flex-wrap gap-x-6">
            <span><b className="font-semibold">CNPJ: </b>{data.cnpj}</span>
            <span><b className="font-semibold">IRRF: </b>{data.irrf}</span>
            <span><b className="font-semibold">Valor líquido: </b>{data.liquido}</span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Resumo icon={Coins} title="Total de comissões" value={data.totalComissoes} caption="Mês vigente" />
          <Resumo icon={File} title="Complemento" value={data.complemento} caption="Mês vigente" />
          <Resumo icon={Receipt} title="Total de descontos" value={data.descontos} caption="Mês vigente" />
          <Resumo icon={CircleDollarSign} title="Total a receber" value={data.totalReceber} caption="Valor emissão da Nota Fiscal" highlight />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <Select className="w-[220px]" value={`Período: ${periodo}`} onChange={(v) => setPeriodo(v.replace("Período: ", ""))} options={PERIODOS.map((p) => `Período: ${p}`)} />
          </div>
          <DuvidasLink />
        </div>

        <Secao icon={CircleDollarSign} title="Comissões" value={data.totalComissoes} open={aberta === "comissoes"} onToggle={() => toggle("comissoes")}>
          <div className="mb-4 flex flex-wrap gap-2">
            <label className="flex h-12 min-w-[260px] flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
              <Search className="size-4 text-muted-foreground" />
              <input value={busca} onChange={(e) => { setBusca(e.target.value); setPage(1); }} placeholder={data.buscaPlaceholder} className="w-full bg-transparent outline-none" />
            </label>
            <Select value={matricula} onChange={(v) => { setMatricula(v); setPage(1); }} options={["Todas as matrículas", ...matriculas]} />
            <Select value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={["Todos os status", "Comissão paga", "Taxa compartilhada"]} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  {[...data.colunas, "Parcela", "% Comissão"].map((h) => <th key={h} className="px-2 py-2.5 font-normal">{h}</th>)}
                  <th className="px-2 py-2.5 text-right font-normal">Valor bruto</th>
                  <th className="px-2 py-2.5 font-normal">Data da venda</th>
                  <th className="px-2 py-2.5 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {pg.rows.map((c, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-2 py-3.5">{c.contrato}</td><td className="px-2">{c.grupoCota}</td><td className="px-2">{c.categoria}</td>
                    <td className="px-2">{c.parcela}</td><td className="px-2">{c.pct}</td><td className="px-2 text-right">{c.valor}</td>
                    <td className="px-2">{c.data}</td><td className="px-2"><Badge>{c.status}</Badge></td>
                  </tr>
                ))}
                {!pg.rows.length && <tr><td colSpan={8}><Vazio /></td></tr>}
              </tbody>
            </table>
          </div>
          <Pagination page={pg.page} total={pg.total} count={linhas.length} size={PAGE} label="lançamentos" onChange={setPage} />
        </Secao>
        <Secao icon={Receipt} title="Descontos" value={data.descontos} open={aberta === "descontos"} onToggle={() => toggle("descontos")}><Vazio /></Secao>
        <Secao icon={File} title="Complemento" value={data.complemento} open={aberta === "complemento"} onToggle={() => toggle("complemento")}><Vazio /></Secao>
      </div>
    </>
  );
}
