import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function paginate<T>(rows: T[], page: number, size: number) {
  const total = Math.max(1, Math.ceil(rows.length / size));
  const p = Math.min(Math.max(1, page), total);
  return { rows: rows.slice((p - 1) * size, p * size), page: p, total };
}
