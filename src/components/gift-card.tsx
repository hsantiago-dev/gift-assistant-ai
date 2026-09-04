import { MotiView } from 'moti';
import { DimensionValue, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

import { DMSans, Radius, Spacing, tintedShadow } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type GiftCardProps = {
  nome: string;
  justificativa: string;
  index: number;
  height?: DimensionValue;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export function GiftCard({ nome, justificativa, index, height, onLayout }: GiftCardProps) {
  const theme = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 18, stiffness: 260, delay: index * 80 }}
      onLayout={onLayout}
      style={[
        styles.card,
        { height },
        { backgroundColor: theme.backgroundElement },
        tintedShadow(theme.secondary, 0.15, 14),
      ]}>
      <View style={[styles.badge, { backgroundColor: theme.secondary }]}>
        <Text style={styles.badgeText}>{index + 1}</Text>
      </View>
      <Text style={[styles.nome, { color: theme.text }]}>{nome}</Text>
      <Text style={[styles.justificativa, { color: theme.textSecondary }]}>
        {justificativa}
      </Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: Radius.card,
    padding: Spacing.three,
    gap: Spacing.two,
    minHeight: 200,
  },
  badge: {
    alignSelf: 'flex-start',
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: DMSans.bold,
    fontSize: 13,
    color: '#ffffff',
  },
  nome: {
    fontFamily: DMSans.bold,
    fontSize: 18,
    lineHeight: 24,
  },
  justificativa: {
    fontFamily: DMSans.medium,
    fontSize: 14,
    lineHeight: 20,
  },
});
