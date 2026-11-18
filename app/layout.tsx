import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Relatório de comissões · Protótipo",
  description: "Protótipo navegável – proposta meio termo (dados fictícios)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
        <div className="fixed bottom-3 right-3 z-40 rounded-full bg-zinc-900/85 px-3 py-1 text-xs text-white">Protótipo · dados fictícios</div>
      </body>
    </html>
  );
}
