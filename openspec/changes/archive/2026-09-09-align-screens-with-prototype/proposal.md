## Why

O protótipo de referência (`.docs/PROTOTYPE.md`) define a linguagem visual "Candy" das duas telas (ícones, cards de seção, chips com borda, botão com ícone, estados de loading/erro completos), mas as telas implementadas divergem em vários pontos: não há ícones (nenhuma lib instalada), chips sem borda, textarea sem card, cabeçalhos/subtítulos diferentes, estados de loading/erro minimalistas e sem o botão "Tentar novamente" explícito que a spec já exige. O objetivo é adequar as telas à linguagem visual do protótipo, mantendo as decisões RN deliberadas (rodapé fixo, snap do carrossel, stagger Moti, pill expansível do indicador).

## What Changes

- **Fundação de ícones**: instala `@expo/vector-icons` e cria wrapper cross-platform mapeando os símbolos do protótipo (Material Symbols) para MaterialCommunityIcons (`gift`, `cash-multiple`, `calendar`, `creation`, `heart`, `gift-outline`, `package-variant`, `refresh`).
- **HomeScreen**: título *"Para quem é o presente?"* e subtítulo na tipografia `body-lg`; textarea em card branco com sombra tingida e borda de foco; seções Orçamento/Ocasião em cards com ícone no header; chips com padding 20×10 e não-selecionado com borda; botão com ícone e dimensões maiores; estado de loading completo (círculo pulsante + ícone + 3 dots) e estado de erro com botão "Tentar novamente" explícito.
- **ResultsScreen**: cabeçalho *"Ideias Perfeitas"* + subtítulo na cor secondary; cards mantêm badge numerado (sem botão favoritar); gap interno 16; indicador mantém o pill expansível Moti.
- **Design system**: novos tokens de cor de erro (`error`/`error-container`), tipografia `body-lg` (18/28 500), espaçamento de seção (40) e convenção de ícones.
- **Docs**: corrige referências de `docs/` → `.docs/` em `AGENTS.md` e `README.md`.

## Capabilities

### New Capabilities
- `icons`: camada de ícones Candy cross-platform — wrapper, mapa de glifos do protótipo e convenção de uso nas telas.

### Modified Capabilities
- `design-system`: novos tokens (cores de erro, `body-lg`, espaçamento de seção) e convenção de componentes compartilhados (ícones).
- `home-screen`: alinhamento visual à linguagem do protótipo — copy, seções em cards com ícone, chips com borda, botão com ícone, estados de loading e erro completos com "Tentar novamente".
- `results-screen`: alinhamento visual — cabeçalho com subtítulo, estilização dos cards (badge numerado, gap interno), manutenção do indicador pill expansível.

## Impact

- **Dependências**: adiciona `@expo/vector-icons` (cross-platform web/android/ios).
- **Código**: `src/components/` (novo wrapper de ícone; ajustes em `chip.tsx`, `primary-button.tsx`, `gift-card.tsx`, `gift-carousel.tsx`), `src/app/index.tsx`, `src/app/results.tsx`, `src/constants/` (novos tokens).
- **Docs**: `AGENTS.md` e `README.md` apontam para `.docs/`.
- **Não-escopo**: imagens geradas por IA nos cards; botão favoritar persistente; opção "Outra" nos chips (OVERVIEW manda manter 4); fidelidade pixel-a-pixel ao HTML.