## 1. Components & Carousel Setup

- [x] 1.1 Create GiftCard component adhering to Candy design system and verify it renders name and justification correctly.
- [x] 1.2 Implement card carousel component with Moti animations and pagination indicator, verifying smooth swiping/scrolling behavior.

## 2. ResultsScreen Integration

- [x] 2.1 Update ResultsScreen (`src/app/results.tsx`) to display either the carousel (for multiple suggestions) or single card view (for one suggestion) instead of raw JSON text.
- [x] 2.2 Verify navigation from HomeScreen successfully passes suggestions and ResultsScreen renders them correctly.

## 3. Layout & Fixed Footer

- [x] 3.1 Restructure ResultsScreen and HomeScreen into a `flex: 1` column container with a persistent footer pinned at the bottom (safe-area inset, `theme.background`).
- [x] 3.2 Keep "Voltar" fixed at the bottom of ResultsScreen and "Gerar sugestões"/loading fixed at the bottom of HomeScreen.

## 4. Carousel Sizing

- [x] 4.1 Make the carousel occupy the available vertical space between the title and the fixed footer (flex wrapper, vertical centering).
- [x] 4.2 Size all carousel cards to the height of the tallest card via measured `onLayout` heights.
