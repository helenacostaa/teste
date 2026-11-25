"use client";
import { FigmaIcon } from "@/components/FigmaIcon";
import { cn } from "@/lib/cn";
import type { KpiId } from "@/lib/data";

export type Canal = "Todos" | "Chat" | "WhatsApp" | "Telefone";

type Props = {
  versao: 1 | 2;
  canal: Canal;
  onCanal: (c: Canal) => void;
  kpi: KpiId | null;
  onView: (k: KpiId | "favoritas") => void;
  favoritasAtivo: boolean;
  totalFavoritas: number;
};

function Item({ icon, label, active, muted, chevron }: { icon: string; label: string; active?: boolean; muted?: boolean; chevron?: boolean }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-md p-2 text-sm",
        active ? "bg-[#fef2f2] font-medium leading-none text-[#dc2626]" : "leading-5 text-sidebar-foreground hover:bg-muted",
        muted && "opacity-50"
      )}
    >
      <FigmaIcon name={icon} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {chevron && <FigmaIcon name="imgIconChevronRight2" />}
    </a>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <p className="w-full pb-1 pl-2 pt-4 text-xs leading-4 text-muted-foreground">{children}</p>;
}

function Sub({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "w-full rounded-md px-6 py-1-5 text-left text-sm leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        active ? "bg-secondary text-primary" : "text-foreground hover:bg-muted"
      )}
    >
      <span className="block truncate whitespace-nowrap pl-5">{label}</span>
    </button>
  );
}

export function Sidebar({ versao, canal, onCanal, kpi, onView, favoritasAtivo, totalFavoritas }: Props) {
  const canais: [Canal, number][] = [["Todos", 193], ["Chat", 151], ["WhatsApp", 32], ["Telefone", 10]];
  const views: [KpiId | "favoritas", string][] = [
    ["semAlocacao", "Sem alocação (64)"],
    ["slaVencido", "SLA vencido (18)"],
    ["emRisco", "Em risco < 2h (27)"],
    ["favoritas", `Filas favoritas (${totalFavoritas})`],
  ];
  return (
    <nav aria-label="Menu principal" className="sticky top-0 flex h-screen w-64 shrink-0 flex-col items-start gap-1 overflow-y-auto border-r border-sidebar-border bg-sidebar px-3 py-5">
      <div className="w-[72px]">
        <FigmaIcon name="imgGrupo565" size={72} height={66} />
        <span className="sr-only">Ademicon</span>
      </div>
      <Group>ATENDIMENTO</Group>
      <Item icon="imgIconGauge" label="Central do agente" />
      <Item icon="imgIconMessageSquare" label="Inbox" />
      <Item icon="imgIconContact" label="Contatos" />
      {versao === 1 ? (
        <>
          <Item icon="imgIconClipboardList" label={`Chamados · ${canal === "Todos" ? "Todos os canais" : canal}`} active chevron />
          <div className="flex w-full flex-col gap-0-5 pl-5">
            <p className="pb-0-5 pl-2-5 pt-1-5 text-xs leading-4 text-muted-foreground">Canais</p>
            {canais.map(([c, n]) => (
              <Sub key={c} label={`${c} (${n})`} active={canal === c} onClick={() => onCanal(c)} />
            ))}
            <p className="pb-0-5 pl-2-5 pt-1-5 text-xs leading-4 text-muted-foreground">Views</p>
            {views.map(([id, label]) => (
              <Sub key={id} label={label} active={id === "favoritas" ? favoritasAtivo : kpi === id} onClick={() => onView(id)} />
            ))}
          </div>
        </>
      ) : (
        <Item icon="imgIconClipboardList" label="Chamados" active />
      )}
      <Item icon="imgIconPhone" label="Chamadas" muted />
      <Group>GESTÃO</Group>
      <Item icon="imgIconFolderTree" label="Departamentos" />
      <Item icon="imgIconUsers" label="Agentes" />
      <Item icon="imgIconMegaphone" label="Contato Ativo" />
      <Item icon="imgIconLineChart" label="Relatórios" />
      <Item icon="imgIconArchive" label="Repositório" />
      <Group>CONFIGURAÇÕES</Group>
      <Item icon="imgIconNetwork" label="Contas Twilio" />
      <Item icon="imgIconFingerprint" label="Identificação" />
      <Item icon="imgIconFolderTree" label="Diretório Newcon" />
      <Item icon="imgIconMessageSquareText" label="Templates WhatsApp" />
    </nav>
  );
}
