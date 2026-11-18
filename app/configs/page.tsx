import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="px-6 py-6">
      <Link href="/recibos/consorcio" className="mb-4 inline-flex items-center gap-2 text-sm"><ArrowLeft className="size-4" /> Voltar ao recibo</Link>
      <h1 className="text-[30px] font-semibold text-foreground/80">Configurações</h1>
      <p className="mt-1 text-sm text-muted-foreground">Simulação da rota atual <code>/configs#dados-pessoais</code> – a navegação do botão “Dados bancários” não muda.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-medium">Dados pessoais</h2>
          <p className="mt-4 text-sm text-muted-foreground">ASSESSORIA EXEMPLO LTDA · Matrícula 0000003589</p>
        </Card>
        <Card id="dados-bancarios" className="p-6">
          <h2 className="text-xl font-medium">Dados bancários</h2>
          <p className="mt-1 text-sm text-muted-foreground">Conta para recebimento das comissões do grupo Ademicon.</p>
          <p className="mt-4 text-sm">Conta atual: <b>Banco Exemplo • Ag. ••12 • Conta •••45-6</b></p>
        </Card>
      </div>
    </div>
  );
}
