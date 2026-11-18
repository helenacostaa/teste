import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHeader({ title, description, back, actions }: { title: string; description?: string; back?: boolean; actions?: React.ReactNode }) {
  return (
    <div className="border-b border-border px-6 py-6">
      {back && (
        <Link href="/" className="mb-4 inline-flex h-9 items-center gap-2 rounded-full text-sm hover:opacity-80">
          <ArrowLeft className="size-4" /> Voltar
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-semibold leading-9 text-foreground/80">{title}</h1>
          {description && <p className="mt-2 text-base text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
