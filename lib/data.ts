// Dados fictícios (mock) — sem dados pessoais. Números do topo seguem o protótipo do Figma.
export type Estado = "Crítico" | "Atenção" | "OK";

export type Fila = {
  id: string;
  nome: string;
  estado: Estado;
  semAlocacao: number;
  slaVencido: number;
  emRisco: number;
  abertos: number;
  agentesOnline: number;
  agentesTotal: number;
  favorita?: boolean;
};

const f = (nome: string, estado: Estado, semAlocacao: number, slaVencido: number, emRisco: number, abertos: number, on: number, tot: number, favorita = false): Fila => ({
  id: nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  nome, estado, semAlocacao, slaVencido, emRisco, abertos, agentesOnline: on, agentesTotal: tot, favorita,
});

export const FILAS: Fila[] = [
  f("SAC", "Crítico", 21, 5, 6, 24, 2, 17),
  f("NAC", "Crítico", 19, 4, 4, 20, 0, 1),
  f("Rede & Expansão", "Crítico", 2, 6, 3, 9, 1, 3),
  f("Qualidade", "Atenção", 9, 0, 3, 13, 1, 1),
  f("Tesouraria", "Atenção", 4, 0, 2, 6, 0, 2),
  f("Tecnologia", "Atenção", 1, 0, 1, 6, 1, 2),
  f("Crédito imóvel", "OK", 0, 0, 0, 0, 2, 2),
  f("Comissões - Rede", "OK", 0, 0, 0, 2, 2, 2),
  f("Ouvidoria", "OK", 0, 0, 0, 0, 1, 1),
  f("Assembleias", "OK", 0, 0, 0, 5, 3, 4),
  f("Backoffice Cotas", "OK", 0, 0, 0, 7, 2, 5),
  f("Cadastro", "OK", 0, 0, 0, 3, 2, 3),
  f("Cobrança", "OK", 0, 0, 0, 9, 4, 6, true),
  f("Compliance", "OK", 0, 0, 0, 1, 1, 1),
  f("Contabilidade", "OK", 0, 0, 0, 0, 0, 1),
  f("Contemplação", "OK", 0, 0, 0, 8, 3, 4, true),
  f("Contratos", "OK", 0, 0, 0, 4, 2, 2),
  f("Crédito automóvel", "OK", 0, 0, 0, 6, 2, 3),
  f("Crédito pesados", "OK", 0, 0, 0, 2, 1, 2),
  f("Crédito serviços", "OK", 0, 0, 0, 1, 1, 1),
  f("Departamento Pessoal", "OK", 0, 0, 0, 0, 0, 2),
  f("Facilities", "OK", 0, 0, 0, 1, 1, 1),
  f("Faturamento", "OK", 0, 0, 0, 3, 2, 2),
  f("Financeiro", "OK", 0, 0, 0, 5, 2, 4),
  f("Fiscal", "OK", 0, 0, 0, 0, 0, 1),
  f("Formalização", "OK", 0, 0, 0, 6, 3, 3),
  f("Jurídico", "OK", 0, 0, 0, 2, 1, 2),
  f("Lances", "OK", 0, 0, 0, 9, 3, 5, true),
  f("Marketing", "OK", 0, 0, 0, 0, 1, 2),
  f("Onboarding Representantes", "OK", 0, 0, 0, 4, 2, 2),
  f("Pagamentos", "OK", 0, 0, 0, 3, 2, 3),
  f("Parcerias", "OK", 0, 0, 0, 1, 0, 1),
  f("Pós-venda", "OK", 0, 0, 0, 7, 3, 4),
  f("Prevenção a Fraudes", "OK", 0, 0, 0, 2, 1, 2),
  f("Produtos", "OK", 0, 0, 0, 0, 0, 1),
  f("Recuperação de Crédito", "OK", 0, 0, 0, 5, 2, 3),
  f("Relacionamento PJ", "OK", 0, 0, 0, 3, 1, 2),
  f("Representantes", "OK", 0, 0, 0, 4, 2, 3),
  f("Retenção", "OK", 0, 0, 0, 2, 0, 2),
  f("RH", "OK", 0, 0, 0, 0, 1, 1),
  f("Seguros", "OK", 0, 0, 0, 2, 1, 1),
  f("Suporte ao Representante", "OK", 0, 0, 0, 3, 2, 2),
  f("Transferência de Cotas", "OK", 0, 0, 0, 4, 2, 3),
  f("Vendas Digitais", "OK", 0, 0, 0, 1, 0, 1),
];

export type KpiId = "semAlocacao" | "slaVencido" | "emRisco" | "semAgente";

export const KPIS: { id: KpiId; titulo: string; valor: number; contexto: string; nivel: Exclude<Estado, "OK"> }[] = [
  { id: "semAlocacao", titulo: "Sem alocação", valor: 64, contexto: "chamados em 12 filas", nivel: "Crítico" },
  { id: "slaVencido", titulo: "SLA vencido", valor: 18, contexto: "chamados em 5 filas", nivel: "Crítico" },
  { id: "emRisco", titulo: "Em risco (< 2h)", valor: 27, contexto: "chamados em 8 filas", nivel: "Atenção" },
  { id: "semAgente", titulo: "Filas sem agente online", valor: 9, contexto: "de 44 filas", nivel: "Atenção" },
];

export const kpiMatch: Record<KpiId, (q: Fila) => boolean> = {
  semAlocacao: (q) => q.semAlocacao > 0,
  slaVencido: (q) => q.slaVencido > 0,
  emRisco: (q) => q.emRisco > 0,
  semAgente: (q) => q.agentesOnline === 0,
};

const ordem: Record<Estado, number> = { "Crítico": 0, "Atenção": 1, OK: 2 };
// Criticidade: estado → volume sem alocação → SLA vencido → ordem original da lista.
export const porCriticidade = (a: Fila, b: Fila) =>
  ordem[a.estado] - ordem[b.estado] || b.semAlocacao - a.semAlocacao || b.slaVencido - a.slaVencido || idx(a) - idx(b);
const idx = (q: Fila) => FILAS.findIndex((x) => x.id === q.id);

const plural = (n: number, s: string, p: string) => `${n} ${n === 1 ? s : p}`;
export const agentesTxt = (q: Fila) => `${q.agentesOnline} de ${q.agentesTotal} ${q.agentesTotal === 1 ? "agente online" : "agentes online"}`;
export const problemaTxt = (q: Fila) => {
  const p = [q.semAlocacao && `${q.semAlocacao} sem alocação`, q.slaVencido && `${q.slaVencido} com SLA vencido`].filter(Boolean);
  return p.length ? p.join(" • ") : "Tudo no prazo";
};
export const abertosTxt = (q: Fila) => plural(q.abertos, "aberto", "abertos");
