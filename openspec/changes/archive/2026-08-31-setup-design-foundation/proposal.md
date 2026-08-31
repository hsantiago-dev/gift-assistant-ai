## Why

O projeto está no estado inicial do template Expo (tela "Welcome to Expo") e não possui nenhuma base de design pronta para o sistema "Candy" definido em `docs/DESIGN.md`. Sem essa fundação, toda tela futura (Home, Results) precisaria reinventar tokens, cores e estilos, gerando inconsistência e retrabalho. Esta change cria o "chão" visual e estrutural sobre o qual todas as demais changes serão construídas.

## What Changes

- Introduzir os **tokens do sistema Candy** em `src/constants/`:
  - Paleta de cores (Primary `#e040a0`, Secondary `#7c52aa`, Tertiary `#0096cc`, Background `#fef7ff`) e variantes de status (erro, sucesso, etc. quando aplicável).
  - Tipografia **DM Sans** (bold para headings, medium para labels), com carregamento da fonte via `expo-font`.
  - Spacing, radius (pill/full para botões/badges, 16–20px para cards) e sombras **tingidas** com a cor do elemento (~15–20% de opacidade, nunca cinza puro).
- Substituir o `src/constants/theme.ts` do template Expo pelo tema Candy.
- Adicionar **Moti** como dependência (ainda não instalado) e a base de configuração para animações/fluxo inicial.
- Criar as **constantes de dados** do produto em `src/constants/`:
  - Opções de sincronia chips de Orçamento (`Até R$50`, `R$50–150`, `R$150–300`, `Sem limite`) e de Ocasião (`Aniversário`, `Natal`, `Namorados`, `Sem motivo especial`).
  - Frases de placeholder variáveis (RF02).
- Organizar a estrutura de pastas conforme `RNF02` (`components`, `screens`/`app`, `services`, `styles`, `constants`), garantindo a base normalizada para as próximas changes.

## Capabilities

### New Capabilities
- `design-system`: tokens e vocabulário visual do sistema "Candy" (cores, tipografia, raio, espaçamento, sombras) + convenções de estilos e a base de animações (Moti). Cobre os requisitos não funcionais RNF02, RNF04, RNF06 no que diz respeito à fundação.
- `constants`: constantes de domínio do produto (opções dos chips e placeholders variáveis) e constantes de tema consumíveis pelas telas.

### Modified Capabilities
<!-- Nenhuma spec prévia existe (openspec/specs/ está vazio). -->

## Impact

- **Código:** reescrita de `src/constants/theme.ts`; novos arquivos em `src/constants/` (tokens de cores, tipografia, sombras, chips, placeholders); organização de pastas.
- **Dependências:** adição de `moti` (+ `react-native-reanimated` já presente) para animações; `expo-font` para DM Sans.
- **Risco baixo:** mudança de estilo no template inicial; não altera lógica de telas nem a API Gemini (ainda não implementada).
- **Artefatos de referência:** `docs/DESIGN.md` (Candy) e seções 6.1/6.2 de `docs/OVERVIEW.md` (chips e placeholders).
