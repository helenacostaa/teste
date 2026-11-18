"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Combobox simples no estilo do DS (gatilho 48px + menu). */
export function Select({
  value, options, onChange, className, placeholder,
}: { value: string; options: string[]; onChange: (v: string) => void; className?: string; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className={cn("relative w-[190px]", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn("flex h-12 w-full items-center justify-between rounded-lg border border-border bg-card px-3 text-sm", open && "ring-2 ring-primary/20")}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-full min-w-[200px] rounded-lg border border-border bg-card p-1 shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { onChange(o); setOpen(false); }}
              className={cn("flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted", o === value && "bg-muted")}
            >
              {o}
              {o === value && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
