import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/use-theme';

export type GiftIconName =
  | 'gift'
  | 'cash-multiple'
  | 'calendar'
  | 'creation'
  | 'gift-outline'
  | 'package-variant'
  | 'refresh'
  | 'close'
  | 'heart';

export type GiftIconProps = {
  name: GiftIconName;
  size?: number;
  color?: string;
};

const GLYPH_MAP: Record<GiftIconName, keyof typeof MaterialCommunityIcons.glyphMap> = {
  gift: 'gift',
  'cash-multiple': 'cash-multiple',
  calendar: 'calendar',
  creation: 'creation',
  'gift-outline': 'gift-outline',
  'package-variant': 'package-variant',
  refresh: 'refresh',
  close: 'close',
  heart: 'heart',
};

export function GiftIcon({ name, size = 24, color }: GiftIconProps) {
  const theme = useTheme();
  const tint = color ?? theme.primary;

  return <MaterialCommunityIcons name={GLYPH_MAP[name]} size={size} color={tint} />;
}