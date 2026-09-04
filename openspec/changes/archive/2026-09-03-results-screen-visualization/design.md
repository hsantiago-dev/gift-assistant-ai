## Context

See proposal.md - Why. The current ResultsScreen displays raw JSON text. We are replacing this with a visual presentation using card carousel / single card view with Moti animations and Candy design system styling.

## Goals / Non-Goals

**Goals:**
- Render gift suggestions as visual cards with name and justification.
- Support card carousel for multiple suggestions or single card view for one suggestion.
- Apply Moti animations for card entrance and transition.
- Align styling strictly with the Candy Design System (`docs/DESIGN.md` / existing constants).

**Non-Goals:**
- Regeneration logic and attempt counting (deferred to a subsequent change).
- Error handling / retry states (handled in separate or subsequent flows).

## Decisions

- **Carousel Component Implementation**: Use React Native ScrollView / FlatList or custom Moti-animated views to present cards cleanly.
- **Card Styling**: Follow Candy design system tokens (rounded pill badges/containers, primary/secondary/tertiary colors, tinged shadows).
- **Fixed Footer Layout**: Both screens use a `flex: 1` column container with a scrollable content area (`flex: 1`) and a persistent footer pinned at the bottom containing the action button. Footer applies safe-area bottom inset and `theme.background` to match the screen. This keeps the button visible while the content scrolls.
- **Carousel Vertical Space**: The carousel wrapper uses `flex: 1` to fill the available vertical space between the title and the fixed footer, centering the cards vertically.
- **Uniform Card Height**: Each card reports its measured height via `onLayout`; the carousel tracks all heights, computes the tallest, and applies it as a fixed height to every card so they align as one size.

## Risks / Trade-offs

- [Layout overflow on small screens] → Mitigation: Ensure flexible card dimensions, proper padding, and clean typography scaling.
