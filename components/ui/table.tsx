import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...p }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <div className="overflow-x-auto"><table className={cn("w-full text-sm", className)} {...p} /></div>;
}
export const THead = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...p} />;
export const TBody = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />;
export function TR({ className, interactive, ...p }: React.HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }) {
  return <tr className={cn("border-b border-border", interactive && "cursor-pointer hover:bg-muted/70 focus:bg-muted/70 focus:outline-none", className)} tabIndex={interactive ? 0 : undefined} {...p} />;
}
export function TH({ className, align, ...p }: React.ThHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" }) {
  return <th className={cn("px-2 py-2.5 font-normal text-muted-foreground", align === "right" ? "text-right" : "text-left", className)} {...p} />;
}
export function TD({ className, align, ...p }: React.TdHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" }) {
  return <td className={cn("px-2 py-3.5", align === "right" && "text-right", className)} {...p} />;
}
export function TEmpty({ cols, children = "Não encontramos o dado que você está buscando, tente outra vez." }: { cols: number; children?: React.ReactNode }) {
  return <tr><td colSpan={cols} className="py-12 text-center text-sm text-muted-foreground">{children}</td></tr>;
}
