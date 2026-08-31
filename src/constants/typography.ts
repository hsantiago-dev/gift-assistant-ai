import { Platform } from 'react-native';

/**
 * Tipografia "Candy" — todas as fontes são DM Sans.
 * Os pesos bold (700) e medium (500) são carregados no `_layout.tsx`
 * via `@expo-google-fonts/dm-sans` + `expo-font`.
 */

export const DMSans = {
  medium: 'DMSans_500Medium',
  bold: 'DMSans_700Bold',
} as const;

/**
 * Compatível com o `Fonts` anterior do template (usado por `themed-text.tsx`).
 * `sans` passa a ser a DM Sans medium; os demais mantêm os system fonts
 * para não quebrar componentes existentes.
 */
export const Fonts = Platform.select({
  ios: {
    sans: DMSans.medium,
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: DMSans.medium,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});
