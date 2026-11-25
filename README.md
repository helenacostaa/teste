# Central de chamados — visão Supervisor (protótipo)

Protótipo navegável das telas **A · Supervisor — Chamados › Filas** do Figma
"Central de chamados – Fila" (página 📝 Rascunhos & estudos), em Next.js + Tailwind
com os tokens do 🕹️ Lucky | Design System. Dados 100% fictícios (sem dados pessoais).

## Rodar
```bash
npm install
npm run dev
```
Abra http://localhost:3000 (requer Node 18.18+).

- `/supervisor/v1` — Versão 1 · omnichannel (menu com Canais e Views)
- `/supervisor/v2` — Versão 2 · só chat (menu "Chamados" simples)

## O que é interativo
- Cards de indicador = filtro (toggle, `aria-pressed`); 2º clique limpa.
- Busca por departamento; nº de chamado mostra o aviso de abertura direta.
- `DropdownMenu` Estado, botão Favoritas, estrela por fila, `Toggle Group` cards/lista.
- Chips "Filtrando: … ✕ · Limpar filtros", paginação (9 por página), clique na fila abre placeholder da visão Time.
- Views do menu (V1) aplicam os mesmos filtros dos indicadores.

## Observações
- Fonte: usa **Axiforma** se estiver instalada na máquina; senão, fonte do sistema.
- Números dos indicadores são os do Figma (estáticos); os filtros contam as filas do mock.
- Ícones/logo exportados do Figma em `public/figma`.
