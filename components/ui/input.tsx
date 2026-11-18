import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Input({ className, icon = false, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: boolean }) {
  return (
    <label className={cn("flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm focus-within:ring-2 focus-within:ring-primary/20", className)}>
      {icon && <Search className="size-4 text-muted-foreground" aria-hidden />}
      <input className="w-full bg-transparent outline-none placeholder:text-muted-foreground" {...props} />
    </label>
  );
}
