import { MotiView, useAnimationState } from 'moti';
import { Pressable, StyleSheet, Text } from 'react-native';

import { DMSans, Radius, tintedShadow } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  const theme = useTheme();

  const animation = useAnimationState({
    from: {
      scale: 1,
    },
    pressed: {
      scale: 0.95,
    },
    released: {
      scale: 1,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animation.transitionTo('pressed')}
      onPressOut={() => animation.transitionTo('released')}>
      <MotiView
        state={animation}
        transition={{ type: 'spring', damping: 18, stiffness: 320 }}
        style={[
          styles.chip,
          {
            backgroundColor: selected ? theme.primary : theme.surfaceCard,
            borderColor: selected ? theme.primary : theme.outlineVariant,
          },
          selected && tintedShadow(theme.primary),
        ]}>
        <Text style={[styles.label, { color: selected ? '#ffffff' : theme.text }]}>
          {label}
        </Text>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
  },
  label: {
    fontFamily: DMSans.medium,
    fontSize: 14,
  },
});
