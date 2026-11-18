"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

/** Mesmo comportamento da tela atual: modal com "Anexar nova" ou "Reenviar existente". */
export function EnviarNotaFiscal() {
  const [step, setStep] = useState<"closed" | "choice" | "upload" | "done">("closed");
  const [file, setFile] = useState<string>("");
  return (
    <>
      <Button onClick={() => setStep("choice")}>Enviar nota fiscal</Button>
      <Dialog open={step === "choice"} onClose={() => setStep("closed")} title="Enviar uma nova nota fiscal?">
        <p className="mb-6 text-sm text-muted-foreground">Essa função é para enviar uma nova nota fiscal referente às comissões a receber. Caso queira reenviar uma nota, entre na aba Notas fiscais.</p>
        <div className="flex flex-col items-center gap-3">
          <Button className="w-full" onClick={() => setStep("upload")}>Anexar nova nota fiscal</Button>
          <Link href="/notas-fiscais" className="text-sm text-primary hover:underline">Reenviar nota já existente</Link>
        </div>
      </Dialog>
      <Dialog open={step === "upload"} onClose={() => setStep("closed")} title="Anexar nota fiscal">
        <label className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground hover:bg-muted">
          <Upload className="size-5" />
          {file || "Clique para selecionar o arquivo (PDF ou XML)"}
          <input type="file" accept=".pdf,.xml" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
        </label>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStep("closed")}>Cancelar</Button>
          <Button disabled={!file} onClick={() => setStep("done")}>Enviar</Button>
        </div>
      </Dialog>
      <Dialog open={step === "done"} onClose={() => { setStep("closed"); setFile(""); }} title="Nota fiscal enviada">
        <p className="text-sm text-muted-foreground">Protótipo: nenhum arquivo foi enviado de verdade. Na aplicação, a nota entra com status <b>Em análise</b>.</p>
        <div className="mt-6 flex justify-end"><Button onClick={() => { setStep("closed"); setFile(""); }}>Ok</Button></div>
      </Dialog>
    </>
  );
}

export function BaixarRelatorio({ rows, filename, label = "Baixar relatório" }: { rows: Record<string, string>[]; filename: string; label?: string }) {
  const download = () => {
    if (!rows.length) return;
    const head = Object.keys(rows[0]);
    const csv = [head.join(";"), ...rows.map((r) => head.map((h) => `"${(r[h] ?? "").replace(/"/g, '""')}"`).join(";"))].join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
  };
  return <Button variant="outline" onClick={download}>{label}</Button>;
}

export function DadosBancarios() {
  return (
    <Link href="/configs#dados-bancarios">
      <Button variant="outline" tabIndex={-1}>Dados bancários</Button>
    </Link>
  );
}

export function DuvidasLink() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
        <MessageSquare className="size-4" /> Dúvidas sobre suas comissões?
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Dúvidas sobre suas comissões?">
        <p className="text-sm text-muted-foreground">Na aplicação, este link abre o fluxo atual de <b>Chamados de Comissão</b>. (Simulação do protótipo.)</p>
        <div className="mt-6 flex justify-end"><Button onClick={() => setOpen(false)}>Entendi</Button></div>
      </Dialog>
    </>
  );
}
