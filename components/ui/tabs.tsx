"use client";
import { cn } from "@/lib/utils";

/** Tabs em formato de pills separadas (8px), padrão definido no Relatório de comissões. */
export function PillTabs<T extends string>({ value, items, onChange }: { value: T; items: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          aria-selected={value === it.value}
          onClick={() => onChange(it.value)}
          className={cn("h-9 rounded-lg px-4 text-sm transition-colors", value === it.value ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-muted")}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
