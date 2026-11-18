"use client";
import { useMemo, useState } from "react";
import { ChevronDown, FilePieChart, Filter, Info, Plus, Search, TriangleAlert, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PillTabs } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/ui/pagination";
import { BaixarRelatorio } from "@/components/actions";
import { paginate } from "@/lib/utils";

const PAGE = 10;
const LANC = Array.from({ length: 124 }, (_, i) => ({
  categoria: i % 3 ? "Licenciado 1,00%" : "Autorizado 2,00%",
  grupo: String(7365800 + (i % 40)), cota: String(i * 3).padStart(5, "0"), vendedor: String(1254300 + (i % 9)),
  parcela: `${(i % 30) + 1}/220`, comissao: `R$ ${(200 + (i * 47.3) % 1300).toFixed(2).replace(".", ",")}`,
  vencimento: "14/11/2026", pagamento: i % 6 === 5 ? "—" : "16/11/2026", periodo: "Novembro 2026", motivo: i % 6 === 5 ? "Não pago" : "Pago",
}));
const RISCO = [
  { nivel: "Risco altíssimo", tone: "red" as const, cotas: 61, valor: "R$ 18.297,49", regra: "Com 3 ou mais parcelas vencidas" },
  { nivel: "Risco alto", tone: "yellow" as const, cotas: 277, valor: "R$ 81.344,71", regra: "Com 2 parcelas vencidas" },
  { nivel: "Risco médio", tone: "gray" as const, cotas: 194, valor: "R$ 85.990,63", regra: "Com 1 parcela vencida" },
];

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
      <div className="mt-6 flex justify-between text-sm"><span className="text-muted-foreground">Previsto até</span><b>Jan 2045</b></div>
    </Card>
  );
}

export function Carteira() {
  const [tab, setTab] = useState<"periodo" | "risco">("periodo");
  const [busca, setBusca] = useState("");
  const [mes, setMes] = useState("Nov");
  const [ano, setAno] = useState("2026");
  const [page, setPage] = useState(1);
  const linhas = useMemo(() => LANC.filter((l) => !busca || [l.grupo, l.cota, l.vendedor].some((v) => v.includes(busca))), [busca]);
  const pg = paginate(linhas, page, PAGE);

  return (
    <>
      <PageHeader back title="Carteira de Comissões" description="Previsão das comissões a receber e cotas com risco de cancelamento." />
      <div className="space-y-6 px-6 py-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold"><FilePieChart className="size-6 text-primary" /> Visão geral prevista a receber</h2>
          <p className="mt-1 text-sm text-muted-foreground">Esse é o demonstrativo das previsões de comissões que você tem a receber. Os valores podem alterar de acordo com suas vendas, cancelamentos e movimentações.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="outline"><User className="size-4" /> Minhas comissões <ChevronDown className="size-4" /></Button>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2 py-0.5 text-xs text-blue-700"><Info className="size-3.5" /> Informações atualizadas com informação de cotas até 17/11/2026 às 23:50</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi title="Total líquido previsto" value="R$ 2,84 Mi" /><Kpi title="Valor bruto previsto" value="R$ 2,84 Mi" />
            <Kpi title="Taxa compartilhada prevista" value="R$ 1,65 Mi" /><Kpi title="Descontos previstos" value="-R$ 80,70" />
          </div>
        </div>

        <Card className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><TriangleAlert className="size-6 text-primary" /> 532 cotas com risco de perder comissão R$ 185.632,83</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {RISCO.map((r) => (
              <Card key={r.nivel} className="p-5">
                <div className="flex justify-between text-sm text-muted-foreground"><span>{r.cotas} cotas</span><Badge tone={r.tone}>{r.nivel}</Badge></div>
                <p className="mt-1 font-semibold">{r.valor}</p><p className="text-sm text-muted-foreground">{r.regra}</p>
              </Card>
            ))}
          </div>
        </Card>

        <div className="h-px bg-border" />

        <div>
          <h2 className="text-xl font-semibold">Detalhamento recebimentos futuros</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <PillTabs value={tab} onChange={setTab} items={[{ value: "periodo", label: "Por período" }, { value: "risco", label: "Cotas em risco" }]} />
              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2 py-0.5 text-xs text-blue-700"><Info className="size-3.5" /> Data de corte prevista para este mês: 20/11/2026</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select className="w-24" value={mes} onChange={setMes} options={["Set", "Out", "Nov", "Dez"]} />
              <Select className="w-28" value={ano} onChange={setAno} options={["2026", "2027"]} />
              <Button variant="link" className="px-2"><Plus className="size-4" /> Período</Button>
              <span className="h-6 w-px bg-border" />
              <Button variant="link" className="px-2"><Filter className="size-4" /> Filtrar</Button>
              <BaixarRelatorio label="Baixar Excel" filename="carteira-comissoes.csv" rows={LANC.map((l) => ({ Categoria: l.categoria, Grupo: l.grupo, Cota: l.cota, Vendedor: l.vendedor, Parcela: l.parcela, Comissão: l.comissao, Vencimento: l.vencimento, Pagamento: l.pagamento, Período: l.periodo, Motivo: l.motivo }))} />
            </div>
          </div>

          {tab === "periodo" ? (
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6"><p className="font-semibold">Total previsto a receber</p><p className="mt-6 text-2xl font-semibold">R$ 186.534,46</p><p className="text-sm text-muted-foreground">Se todas as parcelas forem pagas</p></Card>
                <Card className="space-y-2 p-6 text-sm"><p className="mb-3 text-base font-semibold">Já estão pagas</p>{[["Pagas em dia", "R$ 0,00"], ["Pagas em atraso", "R$ 2.345,22"], ["Pagas antecipadas", "R$ 5.545,27"]].map(([a, b]) => <p key={a} className="flex justify-between"><span className="text-muted-foreground">{a}</span><b>{b}</b></p>)}</Card>
                <Card className="space-y-2 p-6 text-sm"><p className="mb-3 text-base font-semibold">Outros valores</p>{[["A vencer", "R$ 178.724,67"], ["Estão atrasadas", "R$ 0,00"], ["Descontos previstos", "-R$ 0,00"]].map(([a, b]) => <p key={a} className="flex justify-between"><span className="text-muted-foreground">{a}</span><b>{b}</b></p>)}</Card>
              </div>
              <Card className="p-5">
                <p className="mb-3 font-semibold">Valores que não entram</p>
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
                  {[["Pagas em outro período", "R$ 2.254,71"], ["Estornadas", "R$ 0,00"], ["Diluídas", "R$ 1,20"], ["Desistentes", "R$ 45.032,13"], ["Canceladas", "R$ 83.962,12"]].map(([a, b]) => <div key={a}><p className="text-muted-foreground">{a}</p><b>{b}</b></div>)}
                </div>
              </Card>
              <label className="flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
                <Search className="size-4 text-muted-foreground" />
                <input value={busca} onChange={(e) => { setBusca(e.target.value); setPage(1); }} placeholder="Buscar por grupo, cota, cliente..." className="w-full bg-transparent outline-none" />
              </label>
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border text-left text-muted-foreground">{["Categoria", "Grupo", "Cota", "Vendedor", "Parcela", "Comissão", "Vencimento", "Pagamento", "Período", "Motivo"].map((h) => <th key={h} className="px-2 py-2.5 font-normal">{h}</th>)}</tr></thead>
                    <tbody>
                      {pg.rows.map((l, i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="px-2 py-3.5">{l.categoria}</td><td className="px-2">{l.grupo}</td><td className="px-2">{l.cota}</td><td className="px-2">{l.vendedor}</td><td className="px-2">{l.parcela}</td>
                          <td className="px-2">{l.comissao}</td><td className="px-2">{l.vencimento}</td><td className="px-2">{l.pagamento}</td><td className="px-2">{l.periodo}</td>
                          <td className="px-2"><Badge tone={l.motivo === "Pago" ? "green" : "red"}>{l.motivo}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={pg.page} total={pg.total} count={linhas.length} size={PAGE} label="lançamentos" onChange={setPage} />
              </Card>
            </div>
          ) : (
            <Card className="mt-4 p-6">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-muted-foreground">{["Nível", "Cotas", "Valor em risco", "Regra"].map((h) => <th key={h} className="px-2 py-2.5 font-normal">{h}</th>)}</tr></thead>
                <tbody>{RISCO.map((r) => <tr key={r.nivel} className="border-b border-border"><td className="px-2 py-4"><Badge tone={r.tone}>{r.nivel}</Badge></td><td className="px-2">{r.cotas}</td><td className="px-2">{r.valor}</td><td className="px-2">{r.regra}</td></tr>)}</tbody>
              </table>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
