## Context

A `HomeScreen` (`src/app/index.tsx`) é o template "Welcome to Expo" (tela hero com AnimatedIcon/HintRow/WebBadge). A base de design "Candy" já foi estabelecida pela change archive `setup-design-foundation`: tokens em `src/constants/theme.ts` (cores, tipografia DM Sans, spacing, radius, sombras tingidas) e constantes de domínio `src/constants/options.ts` (BudgetOptions/OccasionOptions) e `src/constants/placeholders.ts` (Placeholders). Moti já está instalado. Ver proposal.md — Why para motivação.

## Goals / Non-Goals

**Goals:**
- Reescrever a HomeScreen como um formulário de entrada estático reutilizando os tokens Candy e as constantes de domínio existentes.
- Implementar placeholder variável, chips de seleção única opcionais e botão "Gerar sugestões" com estado local, sem IA.
- Criar componentes reutilizáveis (Chip, botão primário) no padrão do projeto, para uso futuro na NewsLetter/outras telas.

**Non-Goals:**
- Chamar a API Gemini ou montar prompts (fase futura).
- Implementar ResultsScreen, navegação ou estado de resultados/regeneração.
- Alterar as specs/capabilities `design-system` e `constants` já criadas.

## Decisions

### 1. Reescrever `src/app/index.tsx` em vez de adicionar tela nova
A Home deve ser a rota inicial (`/`) do expo-router. **Decisão:** substituir integralmente o conteúdo do template da HomeScreen, mantendo `SafeAreaView`/scroll e o padrão de layout existente, sem criar tela paralela.
- *Alternativa considerada:* criar nova rota e redirecionar — rejeitada; a Home é a entrada do fluxo (entrada → IA → resultados) e o template precisa sumir.

### 2. Estado local com `useState`
Manter `text`, `budget` e `occasion` em `useState` na HomeScreen. **Decisão:** estado local simples, sem contexto/estado global, pois não há dados compartilhados entre telas nesta fase.
- *Alternativa considerada:* contexto ou store (zustand/context) — rejeitada por adicionar complexidade desnecessária para o escopo "sem IA".

### 3. Placeholder variável via `useMemo`/inicialização aleatória
Selecionar um `Placeholders[Math.floor(Math.random()*len)]` na inicialização do estado. **Decisão:** o placeholder é escolhido uma única vez por montagem da HomeScreen (a cada abertura), conforme RF02.
- *Alternativa considerada:* regenerar a cada remontagem — o comportamento proposto já atende "a cada abertura" (desmonta/remonta na navegação).

### 4. Chips de seleção única reutilizáveis
Criar `src/components/` (ex.: `Chip.tsx` e/ou `ChipGroup.tsx`) usando tokens Candy (pill, sombra tingida, cor de seleção/accent). **Decisão:** componente Chip com estado "selected" controlado pelo pai; a HomeScreen renderiza dois grupos (orçamento e ocasião), desselecionando ao re-tocar.
- *Alternativa considerada:* lógica inline na HomeScreen — componente isolado favorece reuso e consistência com o design system.

### 5. Botão primário reutilizável
Criar um botão primário padrão (ex.: `PrimaryButton.tsx`) em formato pill, com sombra tingida do Primary e microinteração bouncy (Moti scale) leve no pressionar. **Decisão:** botão componente reutilizável, com prop `disabled` controlando estilo/habilitado.
- *Alternativa considerada:* `Pressable` inline com estilos locais — componente mantém consistência visual.

### 6. Sem chamada de rede
O handler do botão "Gerar sugestões" fica preparado mas o pressionar é um no-op nesta fase (spec: não dispara requisição nem apresenta resultados). **Decisão:** deixar o handler vazio/documentado para a próxima change acoplar o serviço Gemini.

## Risks / Trade-offs

- [Remoção dos componentes do template (AnimatedIcon, HintRow, WebBadge) pode deixar imports órfãos] → remover apenas o que a Home não usa; rodar `tsc --noEmit` e `eslint` para detectar não utilizados.
- [Placeholder aleatório pode repetir o mesmo valor em aberturas consecutivas] → aceitável; a spec exige variação possível, não variação garantida.
- [Botão desabilitado deve manter estilo consistente (não sumir)] → aplicar token de variante desabilitado (opacidade/neutro) mantendo o pill.
