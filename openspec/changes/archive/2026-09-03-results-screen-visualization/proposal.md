## Why

The ResultsScreen currently only displays JSON text in the minimal integration phase. To fulfill the product vision and functional requirements (RF06, RNF06), we need to implement a polished visual presentation layer featuring a card carousel (powered by Moti) or single card view with justification, following the "Candy" design system.

## What Changes

- Implement visual card carousel and single card views on ResultsScreen using Moti for animations.
- Display gift suggestions with names and justifications in styled cards with the Candy design system (primary/secondary colors, pill badges, shadows, and smooth transitions).
- Support pure data presentation of already fetched gift suggestions passed via route parameters.
- Make the carousel occupy more of the available vertical space between the screen title and the fixed footer.
- Keep action buttons fixed at the bottom of the screen: "Voltar" on ResultsScreen and "Gerar sugestões" (or loading indicator) on HomeScreen.
- Size all carousel cards to the same height as the tallest card.

## Capabilities

### New Capabilities
- `results-screen-visualization`: Visual rendering of gift suggestions in a card carousel or single card view with Moti animations and Candy design system styling.

### Modified Capabilities
- `results-screen`: Update requirements to support visual card carousel / single card view presentation instead of raw text.

## Impact

- `src/app/results.tsx`: Update ResultsScreen to render cards and carousel instead of raw JSON text, and keep "Voltar" in a fixed footer.
- `src/app/index.tsx`: Keep "Gerar sugestões"/loading in a fixed footer.
- `src/components/`: Add card components or carousel components if needed, or implement them cleanly.
- No changes to API services or core business logic in this step.
