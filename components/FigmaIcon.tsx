// Ícones exportados do Figma (Lucky DS / lucide) — SVGs originais em /public/figma.
/* eslint-disable @next/next/no-img-element */
export function FigmaIcon({ name, size = 16, height, className }: { name: string; size?: number; height?: number; className?: string }) {
  const h = height ?? size;
  return <img src={`/figma/${name}.svg`} width={size} height={h} alt="" aria-hidden className={className} style={{ width: size, height: h }} />;
}
