"use client";
import { useMemo, useState } from "react";
import { FigmaIcon } from "@/components/FigmaIcon";
import { FilaCard, FilaItemLista } from "@/components/Fila";
import { KpiCard } from "@/components/KpiCard";
import { Paginacao } from "@/components/Paginacao";
import { Sidebar, type Canal } from "@/components/Sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/cn";
import { FILAS, KPIS, kpiMatch, porCriticidade, type Estado, type KpiId } from "@/lib/data";

const POR_PAGINA = 9;
type FiltroEstado = "Todos" | Estado;
const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const pill =
  "flex h-8 cursor-pointer items-center justify-center gap-2 rounded-3xl border border-input bg-card px-3 py-2 text-sm font-medium leading-5 text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

export function SupervisorFilas({ versao }: { versao: 1 | 2 }) {
  const [filas, setFilas] = useState(FILAS);
  const [kpi, setKpi] = useState<KpiId | null>(null);
  const [estado, setEstado] = useState<FiltroEstado>("Todos");
  const [soFavoritas, setSoFavoritas] = useState(false);
  const [busca, setBusca] = useState("");
  const [modo, setModo] = useState<"lista" | "cards">(versao === 2 ? "lista" : "lista");
  const [pagina, setPagina] = useState(1);
  const [canal, setCanal] = useState<Canal>("Todos");

  const reset = () => setPagina(1);
  const toggleFav = (id: string) => setFilas((fs) => fs.map((f) => (f.id === id ? { ...f, favorita: !f.favorita } : f)));

  const buscaNumero = /^\s*#?\d+\s*$/.test(busca);
  const filtradas = useMemo(() => {
    const q = normalizar(busca.trim());
    return filas
      .filter((f) => (kpi ? kpiMatch[kpi](f) : true))
      .filter((f) => (estado === "Todos" ? true : f.estado === estado))
      .filter((f) => (soFavoritas ? f.favorita : true))
      .filter((f) => (q && !buscaNumero ? normalizar(f.nome).includes(q) : true))
      .sort(porCriticidade);
  }, [filas, kpi, estado, soFavoritas, busca, buscaNumero]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const pag = Math.min(pagina, totalPaginas);
  const daPagina = filtradas.slice((pag - 1) * POR_PAGINA, pag * POR_PAGINA);
  const atencaoTotal = filtradas.filter((f) => f.estado !== "OK").length;
  const prazoTotal = filtradas.length - atencaoTotal;
  const atencao = daPagina.filter((f) => f.estado !== "OK");
  const prazo = daPagina.filter((f) => f.estado === "OK");
  const totalFavoritas = filas.filter((f) => f.favorita).length;

  const chips: { label: string; limpar: () => void }[] = [];
  if (kpi) chips.push({ label: KPIS.find((k) => k.id === kpi)!.titulo, limpar: () => setKpi(null) });
  if (estado !== "Todos") chips.push({ label: `Estado: ${estado}`, limpar: () => setEstado("Todos") });
  if (soFavoritas) chips.push({ label: "Favoritas", limpar: () => setSoFavoritas(false) });
  if (busca.trim() && !buscaNumero) chips.push({ label: `Busca: “${busca.trim()}”`, limpar: () => setBusca("") });
  const limparTudo = () => { setKpi(null); setEstado("Todos"); setSoFavoritas(false); setBusca(""); reset(); };

  const inicio = filtradas.length ? (pag - 1) * POR_PAGINA + 1 : 0;
  const fim = Math.min(pag * POR_PAGINA, filtradas.length);
  const titulo = versao === 1 ? `Chamados · ${canal === "Todos" ? "Todos os canais" : canal}` : "Chamados";

  const renderCard = (f: (typeof filas)[number]) => <FilaCard key={f.id} fila={f} mostrarCanal={versao === 1} onFavoritar={() => toggleFav(f.id)} />;
  const GrupoTitulo = ({ children, first }: { children: React.ReactNode; first?: boolean }) => (
    <h3 className={cn("text-xs font-semibold uppercase leading-none tracking-[0.48px] text-muted-foreground", !first && "pt-4")}>{children}</h3>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        versao={versao}
        canal={canal}
        onCanal={setCanal}
        kpi={kpi}
        favoritasAtivo={soFavoritas}
        totalFavoritas={totalFavoritas}
        onView={(v) => {
          if (v === "favoritas") setSoFavoritas((s) => !s);
          else setKpi((k) => (k === v ? null : v));
          reset();
        }}
      />
      <main className="flex min-w-0 flex-1 flex-col items-start gap-6 p-8">
        {/* Header */}
        <header className="flex w-full flex-col gap-1-5">
          <h1 className="text-2xl font-semibold leading-none text-foreground">{titulo}</h1>
          <p className="text-sm leading-5 text-muted-foreground">
            Filas dos departamentos que você supervisiona · 44 filas · 193 chamados abertos · atualizado há 30 s
          </p>
        </header>

        {/* KPIs (clicáveis) */}
        <section aria-label="Indicadores de exceção" className="flex w-full items-start gap-4">
          {KPIS.map((k) => (
            <KpiCard key={k.id} kpi={k} pressed={kpi === k.id} onToggle={() => { setKpi((c) => (c === k.id ? null : k.id)); reset(); }} />
          ))}
        </section>

        {/* Busca global */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="busca" className="text-sm font-medium leading-none text-foreground">Buscar</label>
          <input
            id="busca"
            type="search"
            value={busca}
            onChange={(e) => { setBusca(e.target.value); reset(); }}
            placeholder="Departamento ou nº do chamado…"
            className="h-12 w-full rounded-md border border-input bg-card px-3 py-1 text-sm leading-5 text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-focus"
          />
          {buscaNumero && (
            <p className="text-xs leading-4 text-muted-foreground">
              Nº de chamado: pressione Enter para abrir o chamado #{busca.replace(/\D/g, "")} direto <span className="italic">(fora do escopo deste protótipo)</span>.
            </p>
          )}
        </div>

        {/* Todas as filas */}
        <section aria-labelledby="titulo-filas" className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center gap-2">
            <div className="flex min-w-0 flex-1 items-baseline gap-2 whitespace-nowrap">
              <h2 id="titulo-filas" className="text-base font-semibold leading-none text-foreground">Filas</h2>
              <p className="text-xs leading-4 text-muted-foreground">{filtradas.length} filas · ordenadas por criticidade</p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className={pill}>
                  Estado: {estado}
                  <FigmaIcon name="imgIconChevronDown" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup value={estado} onValueChange={(v) => { setEstado(v as FiltroEstado); reset(); }}>
                    {(["Todos", "Crítico", "Atenção", "OK"] as const).map((e) => (
                      <DropdownMenuRadioItem key={e} value={e}>{e === "OK" ? "No prazo" : e}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <button type="button" aria-pressed={soFavoritas} onClick={() => { setSoFavoritas((s) => !s); reset(); }} className={cn(pill, soFavoritas && "border-foreground")}>
                <FigmaIcon name="imgIconStar1" />
                Favoritas
              </button>
              <ToggleGroup type="single" value={modo} onValueChange={(v) => v && setModo(v as "lista" | "cards")} aria-label="Visualização">
                <ToggleGroupItem value="cards" aria-label="Ver em cards">
                  <FigmaIcon name={modo === "cards" ? "imgIconLayoutGrid-ativo" : "imgIconLayoutGrid"} />
                </ToggleGroupItem>
                <ToggleGroupItem value="lista" aria-label="Ver em lista">
                  <FigmaIcon name={modo === "lista" ? "imgIconList" : "imgIconList-inativo"} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs leading-4 text-muted-foreground">Filtrando:</span>
              {chips.map((c) => (
                <span key={c.label} className="inline-flex items-center gap-1 rounded-md border border-transparent bg-neutral200 px-2 py-1 text-xs font-semibold leading-none text-foreground">
                  {c.label}
                  <button type="button" onClick={() => { c.limpar(); reset(); }} aria-label={`Remover filtro ${c.label}`} className="flex size-3 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <FigmaIcon name="imgIconX" size={12} />
                  </button>
                </span>
              ))}
              <button type="button" onClick={limparTudo} className="flex h-8 cursor-pointer items-center rounded-3xl px-1 py-2 text-xs font-medium leading-4 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Limpar filtros</button>
            </div>
          )}

          <p className="sr-only" aria-live="polite">Mostrando {filtradas.length} de {filas.length} filas</p>

          <div className="flex w-full flex-col gap-2">
            {filtradas.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Nenhuma fila encontrada com esses filtros.{" "}
                <button type="button" onClick={limparTudo} className="font-medium text-foreground underline-offset-2 hover:underline">Limpar filtros</button>
              </div>
            )}
            {atencao.length > 0 && (
              <>
                <GrupoTitulo first>Precisam de atenção · {atencaoTotal}</GrupoTitulo>
                <div className="grid w-full grid-cols-3 gap-4">{atencao.map(renderCard)}</div>
              </>
            )}
            {prazo.length > 0 && (
              <>
                <GrupoTitulo first={atencao.length === 0}>No prazo · {prazoTotal}</GrupoTitulo>
                {modo === "cards" ? (
                  <div className="grid w-full grid-cols-3 gap-4">{prazo.map(renderCard)}</div>
                ) : (
                  prazo.map((f) => <FilaItemLista key={f.id} fila={f} onFavoritar={() => toggleFav(f.id)} />)
                )}
              </>
            )}
          </div>
        </section>

        {/* Paginação */}
        <div className="flex w-full items-center gap-2">
          <p className="min-w-0 flex-1 text-sm leading-5 text-muted-foreground">
            Mostrando {inicio}–{fim} de {filtradas.length} filas
          </p>
          <Paginacao pagina={pag} total={totalPaginas} onChange={setPagina} />
        </div>
      </main>
    </div>
  );
}
