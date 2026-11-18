"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Calculator, CalendarFold, CircleDollarSign, Contact, FileText, Filter, FolderOpen, Home,
  LayoutDashboard, LogOut, MessageSquare, PanelLeftClose, Search, ShieldCheck, ShoppingCart, Bookmark, Play, Link2, Users, ChevronDown, Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

const groups: { label?: string; items: { label: string; icon: React.ElementType; href?: string }[] }[] = [
  { items: [
    { label: "Tela Inicial", icon: Home }, { label: "Dashboard", icon: LayoutDashboard }, { label: "Pipeline", icon: Filter },
    { label: "Contatos", icon: Contact }, { label: "Agenda", icon: CalendarFold }, { label: "Relatório de comissões", icon: FileText, href: "/" },
  ] },
  { label: "Ações", items: [
    { label: "Vender consórcio", icon: CircleDollarSign }, { label: "Multiplas Cotas", icon: ShoppingCart }, { label: "ContemPlay", icon: Play },
    { label: "Reserva de Cotas", icon: Bookmark }, { label: "Seguros", icon: ShieldCheck }, { label: "Checkout", icon: Link2 },
    { label: "Chamadas de Comissão", icon: MessageSquare }, { label: "Candidatos", icon: Users }, { label: "Comercial", icon: FolderOpen },
  ] },
  { label: "Simuladores", items: [{ label: "Consórcio", icon: Calculator }] },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const inRelatorio = path === "/" || path.startsWith("/recibos") || path.startsWith("/notas-fiscais") || path.startsWith("/carteira");
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-muted/60 lg:flex">
        <div className="flex h-20 items-center gap-3 px-5">
          <PanelLeftClose className="size-5 text-muted-foreground" />
          <span className="text-3xl font-bold tracking-tight text-zinc-400">AVAPRO</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <div className="size-9 rounded-lg bg-gradient-to-br from-pink-400 to-violet-500" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Usuária Exemplo</p>
            <p className="text-xs text-muted-foreground">Diretoria Comercial</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {groups.map((g, gi) => (
            <div key={gi} className="mt-4">
              {g.label && <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">{g.label}</p>}
              {g.items.map((it) => {
                const active = it.href === "/" && inRelatorio;
                const Cmp = it.href ? Link : "span";
                return (
                  <Cmp key={it.label} href={it.href ?? "#"} className={cn("flex items-center gap-3 rounded-md px-2 py-2.5 text-sm", active ? "bg-accent text-primary" : "text-foreground/90 hover:bg-muted", !it.href && "cursor-default opacity-80")}>
                    <it.icon className="size-4" /> {it.label}
                  </Cmp>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="space-y-3 border-t border-border px-5 py-4 text-sm">
          <Link href="/design-system" className="flex items-center gap-3 text-muted-foreground hover:text-foreground"><Palette className="size-4" /> Design System</Link>
          <span className="flex items-center gap-3"><LogOut className="size-4" /> Sair</span>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
          <button className="flex h-12 w-56 items-center justify-between rounded-lg border border-border bg-card px-3 text-left">
            <span><span className="block text-[11px] text-muted-foreground">Loja</span><span className="text-sm">Unidade Exemplo - PR</span></span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-64 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground md:flex"><Search className="size-4" /> Pesquisar na plataforma</div>
            <span className="relative"><Bell className="size-5" /><span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-white">2</span></span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
