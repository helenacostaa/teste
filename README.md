# Relatório de comissões – Front (proposta meio termo) + Design System

Protótipo navegável das telas do Figma (seção **04 · Proposta meio termo** / handoff **READY TO DEV**).
**Todos os dados são fictícios** – nada se conecta ao NewCon ou a bases reais (LGPD).

## Como rodar

Pré‑requisito: Node.js 18.18+ (recomendado 20 ou 22).

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Telas e rotas

| Rota | Tela |
|---|---|
| `/` | Painel – Relatório de comissões (cards + Histórico de operações) |
| `/recibos/consorcio` | Recibo de Comissões de Consórcio |
| `/recibos/seguro` | Recibo de Comissões de Seguro (página nova – a validar) |
| `/notas-fiscais` | Notas Fiscais |
| `/carteira` | Carteira de Comissões |
| `/configs` | Simulação da rota atual de Dados bancários |
| `/design-system` | Documentação viva dos componentes e tokens |

## O que dá para testar

- **Painel**: cards clicáveis; Histórico com filtro de período (Últimos 30 dias / 3 meses / 6 meses / **Período específico → Month Picker**), módulo e status; paginação; **cada linha é clicável** e abre a página do módulo já filtrada pela Referência (`?ref=Out/2026`).
- **Recibos**: botões atuais (Dados bancários → `/configs`, Baixar relatório → CSV, Enviar nota fiscal → modal “Anexar nova / Reenviar existente”); seções Comissões / Descontos / Complemento expansíveis (uma por vez); busca, filtros de matrícula e status, paginação.
- **Notas Fiscais**: busca, filtro por mês (Month Picker) e por status, paginação.
- **Carteira**: abas Por período / Cotas em risco, Baixar Excel (CSV), busca e paginação.

## Observações

- Fonte: usa **Axiforma** se estiver instalada na máquina; caso contrário, Inter/sistema.
- Cores aproximadas dos tokens do Lucky DS (`app/globals.css`).
- “Hoje” do protótipo fixado em 18/11/2026 (`components/period-filter.tsx`).
- Isto é um protótipo de validação de fluxo/interação, não o código de produção.

## Estrutura

```
app/                    rotas (Next.js App Router)
components/ui/          Design System (Lucky DS · ShadCN-like)
  button, badge, card, dialog, input, select, separator,
  table, tabs (PillTabs), pagination, month-picker, index.ts
components/             blocos de tela (app-shell, page-header, painel, recibo, notas, carteira, period-filter, actions)
lib/mock.ts             dados fictícios
lib/utils.ts            cn(), paginate()
app/globals.css         tokens de cor (claro e .dark)
```

## Próximos passos para produção

- Substituir `lib/mock.ts` por chamadas à API (BFF NestJS) – sem acesso direto a bases de produção.
- Trocar os componentes de `components/ui` pelos pacotes oficiais do Lucky DS quando publicados.
- Validar nomes de status e colunas do Recibo Seguro com a área de Comissões.
