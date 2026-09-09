/**
 * Agregador dos tokens do design system "Candy" e das constantes de domínio.
 *
 * Mantém o caminho `@/constants/theme` importado por componentes existentes,
 * reexportando os tokens de cada módulo temático em `src/constants/`.
 */

export { Colors, CandyColors, type ThemeColor, type CandyColorToken } from '@/constants/colors';
export { Spacing, BottomTabInset, MaxContentWidth } from '@/constants/spacing';
export { Radius } from '@/constants/radius';
export { tintedShadow } from '@/constants/shadows';
export { Fonts, DMSans, Typography } from '@/constants/typography';
export { BudgetOptions, OccasionOptions, type BudgetOption, type OccasionOption } from '@/constants/options';
export { Placeholders } from '@/constants/placeholders';
export { Copy } from '@/constants/copy';
