import Link from "next/link";
import { FILAS } from "@/lib/data";

export default async function FilaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fila = FILAS.find((f) => f.id === id);
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-10">
      <h1 className="text-2xl font-semibold leading-none">{fila?.nome ?? "Fila"} · visão Time</h1>
      <p className="text-sm text-muted-foreground">Aqui abriria o kanban da fila (tela B). Fora do escopo deste protótipo da visão Supervisor.</p>
      <Link href="/supervisor/v1" className="text-sm font-medium text-[#dc2626] hover:underline">← Voltar para as filas</Link>
    </main>
  );
}
