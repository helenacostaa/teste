"use client";
import { X } from "lucide-react";

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <X className="size-4" />
        </button>
        <h2 className="mb-2 text-xl font-medium">{title}</h2>
        {children}
      </div>
    </div>
  );
}
