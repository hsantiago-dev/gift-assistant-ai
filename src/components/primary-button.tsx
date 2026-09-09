import { MotiView, useAnimationState } from 'moti';
import { Pressable, StyleSheet, Text } from 'react-native';

import { GiftIcon, type GiftIconName } from '@/components/ui/gift-icon';
import { DMSans, Radius, Spacing, tintedShadow } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: GiftIconName;
};

export function PrimaryButton({ label, onPress, disabled = false, icon }: PrimaryButtonProps) {
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

  const labelColor = disabled ? theme.textSecondary : '#ffffff';

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
        {icon && <GiftIcon name={icon} size={20} color={labelColor} />}
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.two + Spacing.half,
  },
  label: {
    fontFamily: DMSans.bold,
    fontSize: 18,
  },
});