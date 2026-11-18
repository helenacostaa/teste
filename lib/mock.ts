// Dados 100% fictícios para o protótipo (LGPD).
export type StatusTone = "yellow" | "blue" | "red" | "green" | "gray";

export const STATUS: Record<string, StatusTone> = {
  "Aguardando NF": "yellow",
  "Em análise": "blue",
  "Recusada": "red",
  "Pago": "green",
  "Comissão paga": "green",
  "Taxa compartilhada": "blue",
};

export type Operacao = {
  data: string; // ISO
  modulo: "Recibo Consórcio" | "Recibo Seguro" | "Notas Fiscais";
  operacao: string;
  referencia: string; // "Out/2026"
  valor: string;
  status: keyof typeof STATUS;
};

const base: Operacao[] = [
  { data: "2026-11-18", modulo: "Recibo Consórcio", operacao: "Recibo gerado", referencia: "Out/2026", valor: "R$ 195.765,57", status: "Aguardando NF" },
  { data: "2026-11-17", modulo: "Notas Fiscais", operacao: "NF enviada", referencia: "Out/2026", valor: "R$ 192.829,09", status: "Em análise" },
  { data: "2026-11-16", modulo: "Recibo Seguro", operacao: "Recibo gerado", referencia: "Out/2026", valor: "R$ 12.430,20", status: "Aguardando NF" },
  { data: "2026-11-13", modulo: "Notas Fiscais", operacao: "NF reenviada", referencia: "Set/2026", valor: "R$ 174.248,90", status: "Em análise" },
  { data: "2026-11-12", modulo: "Notas Fiscais", operacao: "NF recusada", referencia: "Set/2026", valor: "R$ 174.248,90", status: "Recusada" },
  { data: "2026-11-10", modulo: "Recibo Consórcio", operacao: "Pagamento", referencia: "Set/2026", valor: "R$ 181.130,10", status: "Pago" },
  { data: "2026-11-08", modulo: "Recibo Seguro", operacao: "Pagamento", referencia: "Set/2026", valor: "R$ 11.902,75", status: "Pago" },
  { data: "2026-10-10", modulo: "Notas Fiscais", operacao: "NF paga", referencia: "Ago/2026", valor: "R$ 181.130,10", status: "Pago" },
];

// gera histórico mais longo para paginação/filtros
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"];
export const OPERACOES: Operacao[] = [
  ...base,
  ...Array.from({ length: 38 }, (_, i): Operacao => {
    const m = 9 - (i % 9) - 1; // Set..Jan
    const mods = ["Recibo Consórcio", "Recibo Seguro", "Notas Fiscais"] as const;
    const modulo = mods[i % 3];
    return {
      data: `2026-${String(m + 2).padStart(2, "0")}-${String(10 + (i % 15)).padStart(2, "0")}`,
      modulo,
      operacao: modulo === "Notas Fiscais" ? "NF paga" : "Pagamento",
      referencia: `${meses[m]}/2026`,
      valor: `R$ ${(150000 + i * 1371).toLocaleString("pt-BR")},${String(10 + i).slice(-2)}`,
      status: "Pago",
    };
  }),
];

export type Comissao = { contrato: string; grupoCota: string; categoria: string; parcela: string; pct: string; valor: string; data: string; status: string; matricula: string };
export const COMISSOES_CONSORCIO: Comissao[] = Array.from({ length: 64 }, (_, i) => ({
  contrato: String(90100000 + i * 7919),
  grupoCota: `${String(600 + (i % 40) * 10).padStart(6, "0")}/${100 + i * 17}`,
  categoria: i % 4 === 0 ? "Autorizado 2,00%" : i % 3 === 0 ? "Licenciado 1,00%" : "Licenciado 0,50%",
  parcela: `${(i % 30) + 1}/${i % 2 ? 220 : 240}`,
  pct: `0,${String(10 + (i % 80)).padStart(4, "0")}%`,
  valor: `R$ ${(1 + (i * 3.17) % 130).toFixed(2).replace(".", ",")}`,
  data: "18/10/2026",
  status: i % 5 === 1 ? "Comissão paga" : "Taxa compartilhada",
  matricula: i % 7 === 0 ? "530235" : "003589",
}));
export const COMISSOES_SEGURO: Comissao[] = Array.from({ length: 22 }, (_, i) => ({
  contrato: `SG-0091${String(8200 + i * 13)}`,
  grupoCota: ["Seguradora A", "Seguradora B", "Seguradora C"][i % 3],
  categoria: ["Prestamista", "Vida", "Residencial", "Auto"][i % 4],
  parcela: `${(i % 12) + 1}/12`,
  pct: ["15,00%", "20,00%", "18,00%", "12,00%"][i % 4],
  valor: `R$ ${(50 + (i * 37.3) % 400).toFixed(2).replace(".", ",")}`,
  data: `${String(2 + (i % 26)).padStart(2, "0")}/10/2026`,
  status: i % 3 === 2 ? "Taxa compartilhada" : "Comissão paga",
  matricula: i % 2 ? "871204" : "871390",
}));

export type Nota = { protocolo: string; valor: string; data: string; status: string; origem: string };
export const NOTAS: Nota[] = [
  { protocolo: "PRT-24518", valor: "R$ 195.765,57", data: "17/11/2026", status: "Em análise", origem: "Consórcio" },
  { protocolo: "PRT-24233", valor: "R$ 174.248,90", data: "13/11/2026", status: "Em análise", origem: "Consórcio" },
  { protocolo: "PRT-24201", valor: "R$ 174.248,90", data: "12/11/2026", status: "Recusada", origem: "Consórcio" },
  ...Array.from({ length: 21 }, (_, i) => ({
    protocolo: `PRT-${24190 - i * 37}`,
    valor: `R$ ${(9000 + i * 7311).toLocaleString("pt-BR")},${String(10 + i).slice(-2)}`,
    data: `${String(4 + (i % 24)).padStart(2, "0")}/${String(10 - Math.floor(i / 4)).padStart(2, "0")}/2026`,
    status: "Pago",
    origem: i % 2 ? "Seguro" : "Consórcio",
  })),
];

export type ReciboData = {
  titulo: string; descricao: string;
  matriculas: { nome: string; valor: string }[];
  cnpj: string; irrf: string; liquido: string;
  totalComissoes: string; complemento: string; descontos: string; totalReceber: string;
  comissoes: Comissao[];
  colunas: [string, string, string];
  buscaPlaceholder: string;
};

export const RECIBO_CONSORCIO: ReciboData = {
  titulo: "Recibo de Comissões de Consórcio",
  descricao: "Comissões, complementos e descontos do período.",
  matriculas: [
    { nome: "003589 – ASSESSORIA EXEMPLO – UNIDADE CENTRO", valor: "R$ 195.654,17" },
    { nome: "530235 – ASSESSORIA EXEMPLO – UNIDADE CENTRO", valor: "R$ 111,40" },
  ],
  cnpj: "00000000000100", irrf: "R$ 2.936,48", liquido: "R$ 192.829,09",
  totalComissoes: "R$ 195.765,57", complemento: "R$ 0,00", descontos: "R$ 0,00", totalReceber: "R$ 195.765,57",
  comissoes: COMISSOES_CONSORCIO,
  colunas: ["Contrato", "Grupo/Cota", "Categoria"],
  buscaPlaceholder: "Buscar por contrato, grupo, cota ou vendedor",
};

export const RECIBO_SEGURO: ReciboData = {
  titulo: "Recibo de Comissões de Seguro",
  descricao: "Comissões, complementos e descontos de seguros do período.",
  matriculas: [
    { nome: "871390 – ASSESSORIA EXEMPLO – UNIDADE CENTRO", valor: "R$ 10.214,80" },
    { nome: "871204 – ASSESSORIA EXEMPLO – UNIDADE CENTRO", valor: "R$ 2.215,40" },
  ],
  cnpj: "00000000000100", irrf: "R$ 186,45", liquido: "R$ 12.243,75",
  totalComissoes: "R$ 12.430,20", complemento: "R$ 0,00", descontos: "R$ 0,00", totalReceber: "R$ 12.430,20",
  comissoes: COMISSOES_SEGURO,
  colunas: ["Apólice", "Seguradora", "Produto"],
  buscaPlaceholder: "Buscar por apólice, seguradora ou produto",
};
