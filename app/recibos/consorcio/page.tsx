import { Recibo } from "@/components/recibo";
import { RECIBO_CONSORCIO } from "@/lib/mock";
export default async function Page({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return <Recibo data={RECIBO_CONSORCIO} refParam={ref} filename="recibo-comissoes-consorcio.csv" />;
}
