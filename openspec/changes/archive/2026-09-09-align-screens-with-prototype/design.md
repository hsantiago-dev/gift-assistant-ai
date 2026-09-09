## Context

Ver proposal.md — Why. O app é Expo SDK 57 + RN 0.86 (web habilitado) com o design system "Candy" em `src/constants/`; as telas já seguem decisões RN deliberadas (rodapé fixo, snap do carrossel, stagger Moti, pill expansível) que devem ser preservadas. Fatos que moldam o design:

- Não há biblioteca de ícones instalada; o protótipo usa Material Symbols (web).
- O tema light atual (`src/constants/colors.ts`) não tem tokens de erro nem de superfície branca para cards.
- A escala de espaçamento atual (`half`…`six`) não tem o `section-gap` de 40px do protótipo.
- `AGENTS.md`/`README.md` referenciam `docs/` mas os arquivos vivem em `.docs/`.

## Goals / Non-Goals

**Goals:**
- Alinhar as telas à linguagem visual do protótipo (ícones, cards de seção, chips com borda, botão com ícone, estados completos), sem quebrar o comportamento já implementado.
- Manter as decisões RN: rodapé fixo, snap do carrossel, stagger Moti nos cards, pill expansível no indicador, badge numerado.

**Non-Goals:**
- Imagens geradas por IA nos cards (mudaria o contrato JSON da Gemini).
- Botão favoritar persistente (sem storage/estado real).
- Fidelidade pixel a pixel ao HTML (grid desktop `md:grid-cols-2`, nav cluster, max-w 1100px).
- Reescrita do tema dark (template) — apenas novos tokens ganham variantes dark.

## Decisions

**D1 — Biblioteca de ícones: `@expo/vector-icons` (MaterialCommunityIcons).**
Cross-platform (iOS/Android/web com fonte embarcada), API estável e suportada pelo Expo. Alternativas rejeitadas: `expo-symbols` (SF Symbols, iOS-only, exigiria fallback), fontes custom embutidas (custo alto). Instalar via `npx expo install @expo/vector-icons` para versão compatível com o SDK 57. Criar wrapper `src/components/ui/gift-icon.tsx` com um mapa nome→glifo (D glifos do spec `icons`) e cor a partir de `useTheme()`.

**D2 — Home: cards de superfície para entradas.**
O campo de texto e os grupos Orçamento/Ocasião passam a viver em cards de superfície clara com `tintedShadow`. O TextInput interno usa fill `backgroundElement`, radius `cardSmall` (16) e borda 2px transparent que vira Primary no foco (estado `focused` local). Cabeçalhos dos cards de chips = linha com ícone 18 (payments/calendar) + rótulo `label-md`. Em viewports web largos (> ~640px), os dois cards de chips podem ficar lado a lado via `useWindowDimensions` — opcional e sem impacto no mobile.

**D3 — Chips com borda.**
Não selecionado = fundo claro (branco `surface-container-lowest`) + borda 1.5px `outline-variant` (#dcc8e0); selecionado = Primary + texto branco + sombra tingida. Padding 20×10 (literal no componente; a escala não tem 20). Pulse spring existente permanece.

**D4 — Botão com ícone e dimensões maiores.**
`PrimaryButton` ganha prop opcional `icon`; o rótulo recebe ícone `creation` antes do texto, gap 8–12, paddingVertical ~18, paddingHorizontal ~32–40, fontSize 18–20. Mantém a animação spring e a sombra tingida Primary.

**D5 — Estados completos de loading e erro na Home (arquitetura atual).**
A geração acontece na Home (decisão arquivada). Loading vira um estado central (substitui o conteúdo e o rodapé): círculo 128 com fundo `primary-container` e pulse (loop Moti scale/opacity), ícone `gift-outline` ~48, título "Pensando em ideias para você...", descrição e 3 dots pulsantes com delay escalonado. Erro vira estado central com composição de círculos e ícone `package-variant`, título "Ops, não consegui gerar sugestões agora.", mensagem amigável e botão "Tentar novamente" (PrimaryButton com ícone `refresh`). "Voltar ao início" fica de fora na Home (sem tela anterior); a Results já tem "Voltar".

**D6 — ResultsScreen: cabeçalho e cards.**
Título "Ideias Perfeitas" (28/36 bold Primary) + subtítulo `body-lg` em Secondary. Card mantém fill claro de superfície, badge numerado (Secondary), nome e justificativa, com gap interno 16 (`Spacing.two` → `Spacing.three`). Pill expansível do indicador e stagger de entrada permanecem.

**D7 — Novos tokens.**
`colors.ts`: adiciona `error`/`error-container` e `surfaceCard` (`surface-container-lowest`) no theme light/dark. `typography.ts`: constante de estilo `body-lg` (18/28, `DMSans.medium`). `spacing.ts`: `sectionGap: 40`. `AGENTS.md`/`README.md`: corrigem `docs/` → `.docs/`.

## Risks / Trade-offs

- [Versão do `@expo/vector-icons` incompatível com SDK 57] → Mitigação: instalar com `npx expo install` (resolve a versão certa para o SDK).
- [Loop Moti (pulse) consumir CPU em loop contínuo] → Mitigação: loops curtos/repetição com `transition` easing suave e estados de baixo custo (opacity/scale); interromper no unmount.
- [Textos longos (subtítulos/justificativas) estourando o layout mobile] → Mitigação: manter `flexShrink` e envolver textos; testar nas projeções menores dos cards (280px).
- [Mudança de copy ("Para quem é o presente?"/"Ideias Perfeitas") vs textos já hardcoded] → Mitigação: centralizar copy em `src/constants/` para trocas futuras.
- [Dark mode com novos tokens] → Mitigação: cada token novo ganha equivalente dark (ex.: `surfaceCard` dark `#241c2a`; `error-container` dark escuro) — sem reescrever o tema existente.

## Migration Plan

Sem dados a migrar. Deploy por commits pequenos: (1) dependência de ícones + wrapper + tokens; (2) Home (cards, chips, botão, estados); (3) Results; (4) docs. Rollback = reverter commits, sem efeitos colaterais persistentes.

## Open Questions

Nenhuma — as decisões de visual (D2–D6) já foram confirmadas com o usuário (linguagem visual; manter badge numerado; manter pill expansível) e o restante é implementação direta.