import { MotiView, useAnimationState } from 'moti';
import { Pressable, StyleSheet, Text } from 'react-native';

import { DMSans, Radius, Spacing, tintedShadow } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: PrimaryButtonProps) {
  const theme = useTheme();

  const animation = useAnimationState({
    from: {
      scale: 1,
    },
    pressed: {
      scale: 0.96,
    },
    released: {
      scale: 1,
    },
  });

  const handlePressIn = () => {
    if (!disabled) {
      animation.transitionTo('pressed');
    }
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={() => animation.transitionTo('released')}
      disabled={disabled}>
      <MotiView
        state={animation}
        transition={{ type: 'spring', damping: 17, stiffness: 300 }}
        style={[
          styles.button,
          { backgroundColor: disabled ? theme.backgroundElement : theme.primary },
          !disabled && tintedShadow(theme.primary),
        ]}>
        <Text
          style={[
            styles.label,
            { color: disabled ? theme.textSecondary : '#ffffff' },
          ]}>
          {label}
        </Text>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: DMSans.bold,
    fontSize: 16,
  },
});
