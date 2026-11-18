import { Recibo } from "@/components/recibo";
import { RECIBO_SEGURO } from "@/lib/mock";
export default async function Page({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return <Recibo data={RECIBO_SEGURO} refParam={ref} filename="recibo-comissoes-seguro.csv" />;
}
