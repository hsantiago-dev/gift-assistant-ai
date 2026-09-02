## Why

A `HomeScreen` (`src/app/index.tsx`) ainda é o template "Welcome to Expo". O produto precisa de uma tela de entrada de texto livre + chips de filtro, mas ainda não há chamada à Gemini — construir a entrada primeiro, sem IA, permite validar o fluxo de entrada e o design system "Candy" antes de acoplar a API.

## What Changes

- Substituir o conteúdo do template em `src/app/index.tsx` pela **HomeScreen estática** (sem IA).
- Adicionar campo de texto livre, com **placeholder variável a cada abertura** (selecionado de `Placeholders` em `src/constants/placeholders.ts`).
- Adicionar **chips de seleção única** para **orçamento** e **ocasião** (a partir de `BudgetOptions`/`OccasionOptions` em `src/constants/options.ts`), opcionais e desselecionáveis.
- Adicionar o botão **"Gerar sugestões"** (pill, primário), habilitado de acordo com a validade da entrada (texto preenchido) e ainda sem ação de API.
- Aplicar o design system "Candy" (tokens de `src/constants/theme.ts` + animações Moti bouncy leves em microinterações).
- **Sem** chamada de API, sem estado de resultados nem navegação para a tela de resultados.

## Capabilities

### New Capabilities
- `home-screen`: tela de entrada estática do Gift Assistant AI — campo de texto livre com placeholder variável (RF02), chips de seleção única opcionais de orçamento e ocasião (RF03, RF04) e botão "Gerar sugestões", sem interação com a API. Define o comportamento de estado local (texto, chips, habilitação do botão) na fase "sem IA".

### Modified Capabilities
<!-- Nenhuma requirement de spec existente muda; `home-screen` é uma capability nova. -->

## Impact

- **Código:** reescrita de `src/app/index.tsx`; criação de componentes reutilizáveis em `src/components/` (ex.: `Chip`, `PrimaryButton`) conforme necessário; uso das constantes já existentes (`theme`, `options`, `placeholders`).
- **Dependências:** nenhuma nova; reutiliza `react-native`, `react-native-safe-area-context`, tokens Candy e Moti já instalados.
- **Risco baixo:** não mexe em lógica de resultados, API Gemini nem navegação; o template anterior é substituído na Home.
- **Artefatos de referência:** seções RF02/RF03/RF04 e 6.1/6.2 do `docs/OVERVIEW.md`; design system em `docs/DESIGN.md` e `docs/PROTOTYPE.md`.
