import Link from "next/link";

const telas = [
  { href: "/supervisor/v1", titulo: "Versão 1 · Proposta completa (omnichannel)", desc: "A · Supervisor — Chamados › Filas, menu com Canais e Views, ícone de canal nos cards." },
  { href: "/supervisor/v2", titulo: "Versão 2 · Só chat (por hora)", desc: "A · Supervisor — menu “Chamados” simples, sem canais/views e sem ícone de canal." },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-10">
      <div className="flex flex-col gap-1-5">
        <h1 className="text-2xl font-semibold leading-none">Central de chamados — visão Supervisor</h1>
        <p className="text-sm text-muted-foreground">Protótipo navegável a partir do Figma “Central de chamados – Fila” (rascunhos, nov/2026). Dados fictícios.</p>
      </div>
      {telas.map((t) => (
        <Link key={t.href} href={t.href} className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4 shadow-xs transition hover:bg-muted hover:shadow-md">
          <span className="text-base font-semibold">{t.titulo}</span>
          <span className="text-sm text-muted-foreground">{t.desc}</span>
        </Link>
      ))}
    </main>
  );
}
