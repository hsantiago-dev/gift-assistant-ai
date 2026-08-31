## Context

O projeto está no template inicial do Expo SDK 57 (tela "Welcome to Expo"). O `src/constants/theme.ts` atual contém apenas tokens genéricos de light/dark do template, sem o design system "Candy" de `docs/DESIGN.md`. Moti **não está instalado** (ausente do `package.json`). A estrutura de `src/` já tem `app/`, `components/`, `constants/`, `hooks/` e `global.css`. Ver proposal.md para motivação e specs para requisitos.

## Goals / Non-Goals

**Goals:**
- Estabelecer tokens Candy (cores, tipografia, raio, espaçamento, sombras tingidas) em `src/constants/`.
- Instalar/configurar Moti como base de animações.
- Criar constantes de domínio (opções de chips + placeholders variáveis).
- Deixar `src/constants/theme.ts` consumível pelas próximas changes (Home/Results).

**Non-Goals:**
- Construir qualquer tela nova (Home/Results) — escopo das próximas changes.
- Implementar a tela "Welcome to Expo" redesenhada.
- Integrar Gemini/API ou qualquer lógica de negócio.
- Diagramar e estilizar os componentes de UI (Card, Chip etc.) — serão criados nas changes seguintes sobre esta base.

## Decisions

### 1. Reestruturar `src/constants/theme.ts` em módulos temáticos
Em vez de manter um único arquivo, dividir em módulos coesos (ex.: `colors.ts`, `typography.ts`, `spacing.ts`, `radius.ts`, `shadows.ts`, `index.ts` de agregação) — ou, se mais adequado à escala pequena do projeto, manter em um único `theme.ts` bem organizado com seções. **Decisão:** manter uma estrutura de módulos em `src/constants/` com subarquivos, movendo tokens por responsabilidade, mantendo um `index` de exportação. Isso reduz acoplamento e facilita consumo pelas telas.
- *Alternativa considerada:* um só arquivo monolítico — rejeitado por dificultar a navegação conforme o app cresce.

### 2. Fonte DM Sans via `expo-font`
DM Sans será carregada programaticamente com `expo-font` (já em `dependencies`), mapeando pesos bold/medium. **Decisão:** usar `expo-font` para registrar a fonte DM Sans no boot do app (no `_layout.tsx` via `useFonts`), garantindo disponibilidade nos pesos definidos.
- *Alternativa considerada:* fontes web via CSS no `global.css` para web apenas — mantém-se para web, mas o carregamento nativo via `expo-font` é obrigatório para iOS/Android.

### 3. Sombras tingidas em vez de cinza
Implementar helper/funções que derivam a sombra a partir da cor do elemento com 15–20% de opacidade, em vez de um único valor fixo.
- *Alternativa considerada:* sombras cinza padrão — rejeitada (viola RNF04/RNF06 e a regra do Candy).

### 4. Instalar Moti como dependência
Adicionar `moti` via `npx expo install moti`. Como o projeto usa `react-native-reanimated` 4.x, é necessário validar compatibilidade de versão durante a instalação.
- *Alternativa considerada:* usar apenas Animated/reanimated nativo — rejeitada porque o OVERVIEW exige Moti explicitamente (RNF06/7).

### 5. Constantes de domínio em `src/constants/`
Criar `src/constants/options.ts` (opções de orçamento e ocasião) e `src/constants/placeholders.ts` (frases variáveis). Valores seguem seções 6.1 e 6.2 do OVERVIEW.

## Risks / Trade-offs

- [Compatibilidade de versão entre Moti e Reanimated 4.x] → Confirmar versão suportada no ato da instalação (`npx expo install` resolve a versão compatível) e validar boot do app.
- [Carregamento de fonte pode atrasar o splash]/flash de fonte → usar o mecanismo de `useFonts` + `expo-splash-screen` já no template para segurar o render até a fonte carregar.
- [Reestruturação do `theme.ts` pode quebrar imports existentes] → o template referencia `theme.ts`; manter o mesmo módulo de exportação dos tokens de `Spacing`, `Colors`, `MaxContentWidth` para não quebrar `index.tsx`, `themed-view.tsx` e `app-tabs.tsx` — ou atualizar os imports na própria change.
- [Sombras tingidas têm custo de performance em listas/cards] → aplicar com moderação e priorizar elementos-chave; mitigável com `elevation`/`boxShadow` otimizados por plataforma.
