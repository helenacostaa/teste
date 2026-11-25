"use client";
import * as DM from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

// ShadCN DropdownMenu (base do Lucky) — só as partes usadas aqui.
export const DropdownMenu = DM.Root;
export const DropdownMenuTrigger = DM.Trigger;
export function DropdownMenuContent({ className, ...p }: DM.DropdownMenuContentProps) {
  return (
    <DM.Portal>
      <DM.Content
        sideOffset={4}
        align="end"
        className={cn("z-50 min-w-[10rem] overflow-hidden rounded-md border border-border bg-card p-1 text-foreground shadow-md", className)}
        {...p}
      />
    </DM.Portal>
  );
}
export const DropdownMenuRadioGroup = DM.RadioGroup;
export function DropdownMenuRadioItem({ className, children, ...p }: DM.DropdownMenuRadioItemProps) {
  return (
    <DM.RadioItem
      className={cn("relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-muted", className)}
      {...p}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DM.ItemIndicator><Check className="size-4" /></DM.ItemIndicator>
      </span>
      {children}
    </DM.RadioItem>
  );
}
