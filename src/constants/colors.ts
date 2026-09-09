/**
 * Paleta "Candy" — design system do Gift Assistant AI.
 * Referência: docs/DESIGN.md
 *
 * Mantém a estrutura `light`/`dark` consumida pelo `useTheme()` e demais
 * componentes, agora com os tokens Candy de cor de destaque.
 */

export const CandyColors = {
  Primary: '#e040a0',
  Secondary: '#7c52aa',
  Tertiary: '#0096cc',
  Background: '#fef7ff',
} as const;

export const Colors = {
  light: {
    text: '#3a2a40',
    background: '#fef7ff',
    backgroundElement: '#f3e9fb',
    backgroundSelected: '#eadff6',
    textSecondary: '#7a6a82',
    textPrimary: CandyColors.Primary,
    primary: CandyColors.Primary,
    secondary: CandyColors.Secondary,
    tertiary: CandyColors.Tertiary,
    surfaceCard: '#ffffff',
    outlineVariant: '#dcc8e0',
    primaryContainer: '#f080c0',
    onPrimaryContainer: '#2e1a28',
    error: '#e53e3e',
    errorContainer: '#ffe8e8',
  },
  dark: {
    text: '#f6ecff',
    background: '#1d1622',
    backgroundElement: '#2a2030',
    backgroundSelected: '#372a40',
    textSecondary: '#b8a6c0',
    textPrimary: CandyColors.Primary,
    primary: CandyColors.Primary,
    secondary: CandyColors.Secondary,
    tertiary: CandyColors.Tertiary,
    surfaceCard: '#241c2a',
    outlineVariant: '#4a3a52',
    primaryContainer: '#8a2b6a',
    onPrimaryContainer: '#f6ecff',
    error: '#ff9a9a',
    errorContainer: '#4a1e20',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export type CandyColorToken = keyof typeof CandyColors;
