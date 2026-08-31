import { Platform, type ViewStyle } from 'react-native';

import { CandyColors } from '@/constants/colors';

/**
 * Gera uma sombra "tingida" com a cor do próprio elemento (15–20% de
 * opacidade), em vez de cinza puro, conforme docs/DESIGN.md.
 * Sem valor de `shadow`/`elevation` gera uma sombra padrão a 20% da cor.
 */
export function tintedShadow(
  tint: string = CandyColors.Primary,
  opacity: number = 0.2,
  radius: number = 16,
): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: tint,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: radius,
    },
    web: {
      boxShadow: `0 4px ${radius}px rgba(${hexToRgba(tint, opacity)})`,
    },
    default: {
      shadowColor: tint,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 4 },
    },
  });
}

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}, ${opacity}`;
}
