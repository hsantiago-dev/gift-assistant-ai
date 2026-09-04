# results-screen-visualization Specification

## Purpose

Define a experiência visual da ResultsScreen com carrossel de cards e card único utilizando Moti e o design system Candy, permitindo a apresentação rica e elegante das sugestões de presentes obtidas da Gemini.

## Requirements

### Requirement: Renderização com Moti e Design System Candy
Os cards de sugestão de presentes na ResultsScreen DEVEM ser renderizados com animações suaves e interações baseadas em Moti, aplicando o design system "Candy" (cores primária/secundária, bordas arredondadas e sombras tingidas).

#### Scenario: Animação de entrada dos cards
- **WHEN** os cards de sugestão são exibidos na ResultsScreen
- **THEN** os cards entram na tela com animações de escala e fade suave via Moti

### Requirement: Altura uniforme dos cards
Todos os cards de sugestão no carrossel DEVEM ter a mesma altura, correspondendo à altura do maior card entre as sugestões exibidas.

#### Scenario: Cards com altura uniforme
- **WHEN** o carrossel exibe múltiplas sugestões com conteúdos de tamanhos variados
- **THEN** todos os cards são redimensionados para a altura do maior card
