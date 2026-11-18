"use client";
import { useState } from "react";
import { Badge, Button, Card, Input, MonthPicker, Pagination, PillTabs, Select, Separator, Table, TBody, TD, TH, THead, TR } from "@/components/ui";
import { PeriodFilter, type Periodo } from "@/components/period-filter";
import { PageHeader } from "@/components/page-header";

const TOKENS = ["background", "foreground", "card", "muted", "muted-foreground", "border", "primary", "primary-foreground", "accent", "success"];

function Bloco({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </Card>
  );
}

export default function Page() {
  const [tab, setTab] = useState<"a" | "b">("a");
  const [sel, setSel] = useState("Todos os status");
  const [page, setPage] = useState(1);
  const [periodo, setPeriodo] = useState<Periodo>({ tipo: "preset", valor: "Últimos 30 dias" });
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "dark bg-background text-foreground" : ""}>
      <PageHeader title="Design System" description="Componentes base (Lucky DS · ShadCN) usados no Relatório de comissões." actions={<Button variant="outline" onClick={() => setDark((d) => !d)}>{dark ? "Tema claro" : "Tema escuro"}</Button>} />
      <div className="space-y-5 px-6 py-6">
        <Bloco title="Tokens de cor" desc="Variáveis CSS em app/globals.css (claro e .dark).">
          {TOKENS.map((t) => (
            <div key={t} className="w-36 text-xs">
              <div className="h-12 rounded-lg border border-border" style={{ background: `var(--${t})` }} />
              <p className="mt-1 font-mono">--{t}</p>
            </div>
          ))}
        </Bloco>
        <Bloco title="Button" desc="Variantes: default (ação principal, 1 por página), outline (secundária), ghost, link. Tamanhos: default, sm, icon (48px).">
          <Button>Enviar nota fiscal</Button><Button variant="outline">Baixar relatório</Button><Button variant="ghost">Voltar</Button><Button variant="link">Dúvidas sobre suas comissões?</Button><Button size="sm">Aplicar</Button><Button disabled>Desabilitado</Button>
        </Bloco>
        <Bloco title="Badge de status" desc="Aguardando NF (amarelo) · Em análise (azul) · Recusada (vermelho claro) · Pago (verde) · neutro (cinza).">
          <Badge>Aguardando NF</Badge><Badge>Em análise</Badge><Badge>Recusada</Badge><Badge>Pago</Badge><Badge tone="gray">Estornado</Badge>
        </Bloco>
        <Bloco title="Input e Select" desc="Altura 48px; botões de ícone usam size=icon (48px) para alinhar com campos.">
          <Input icon placeholder="Buscar" className="w-80" /><Select value={sel} onChange={setSel} options={["Todos os status", "Aguardando NF", "Em análise", "Recusada", "Pago"]} />
        </Bloco>
        <Bloco title="Filtro de período + Month Picker" desc="Presets (30 dias, 3 e 6 meses) e Período específico → seleção de mês/ano. Meses futuros desabilitados. Documentado no Lucky DS › Date Picker.">
          <PeriodFilter value={periodo} onChange={setPeriodo} />
          <MonthPicker initial={{ mes: 9, ano: 2026 }} onApply={() => {}} onCancel={() => {}} />
        </Bloco>
        <Bloco title="Pill Tabs" desc="Abas em pills separadas por 8px; ativa em primary.">
          <PillTabs value={tab} onChange={setTab} items={[{ value: "a", label: "Por período" }, { value: "b", label: "Cotas em risco" }]} />
        </Bloco>
        <Bloco title="Table + Pagination" desc="Linhas interativas (interactive) navegam ao clicar ou Enter. Paginação mostra intervalo e total.">
          <div className="w-full">
            <Table>
              <THead><tr className="border-b border-border"><TH>Módulo</TH><TH>Operação</TH><TH align="right">Valor</TH><TH>Status</TH></tr></THead>
              <TBody>
                <TR interactive><TD>Recibo Consórcio</TD><TD>Recibo gerado</TD><TD align="right">R$ 195.765,57</TD><TD><Badge>Aguardando NF</Badge></TD></TR>
                <TR interactive><TD>Notas Fiscais</TD><TD>NF enviada</TD><TD align="right">R$ 192.829,09</TD><TD><Badge>Em análise</Badge></TD></TR>
              </TBody>
            </Table>
            <Pagination page={page} total={6} count={46} size={8} label="operações" onChange={setPage} />
          </div>
        </Bloco>
        <Bloco title="Separator" desc="Horizontal e vertical."><div className="w-64"><Separator /></div><Separator vertical /></Bloco>
      </div>
    </div>
  );
}
