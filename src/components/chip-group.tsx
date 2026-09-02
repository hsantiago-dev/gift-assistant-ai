import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { Spacing } from '@/constants/theme';

export type ChipGroupProps<T extends string> = {
  options: readonly T[];
  selected: T | null;
  onChange: (value: T | null) => void;
};

export function ChipGroup<T extends string>({ options, selected, onChange }: ChipGroupProps<T>) {
  const handlePress = (option: T) => {
    onChange(selected === option ? null : option);
  };

  return (
    <View style={styles.group}>
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          selected={selected === option}
          onPress={() => handlePress(option)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
