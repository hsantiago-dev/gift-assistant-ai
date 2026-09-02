import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChipGroup } from '@/components/chip-group';
import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  DMSans,
  MaxContentWidth,
  Placeholders,
  Radius,
  Spacing,
  BudgetOptions,
  OccasionOptions,
  type BudgetOption,
  type OccasionOption,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function pickPlaceholder(): string {
  return Placeholders[Math.floor(Math.random() * Placeholders.length)];
}

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const [text, setText] = useState('');
  const [budget, setBudget] = useState<BudgetOption | null>(null);
  const [occasion, setOccasion] = useState<OccasionOption | null>(null);
  const [placeholder] = useState(pickPlaceholder);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const canSubmit = text.trim().length > 0;

  const handleGenerate = () => {
    // Fase sem IA: o handler fica preparado, mas ainda não dispara rede nem navega.
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} themeColor="text">
          O que você quer presentear?
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle} themeColor="textSecondary">
          Conte sobre a pessoa e a ocasião para receber ideias personalizadas.
        </ThemedText>

        <ThemedText type="smallBold" style={styles.label} themeColor="textSecondary">
          Descreva o pedido
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.backgroundElement, color: theme.text },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          multiline
          value={text}
          onChangeText={setText}
        />

        <ThemedText type="smallBold" style={styles.label} themeColor="textSecondary">
          Orçamento
        </ThemedText>
        <ChipGroup
          options={BudgetOptions}
          selected={budget}
          onChange={setBudget}
        />

        <ThemedText type="smallBold" style={styles.label} themeColor="textSecondary">
          Ocasião
        </ThemedText>
        <ChipGroup
          options={OccasionOptions}
          selected={occasion}
          onChange={setOccasion}
        />

        <PrimaryButton
          label="Gerar sugestões"
          onPress={handleGenerate}
          disabled={!canSubmit}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  container: {
    maxWidth: MaxContentWidth,
    width: '100%',
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  title: {
    fontSize: 28,
    fontFamily: DMSans.bold,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: DMSans.medium,
    marginBottom: Spacing.two,
  },
  label: {
    marginTop: Spacing.three,
  },
  input: {
    minHeight: 120,
    borderRadius: Radius.card,
    padding: Spacing.three,
    fontFamily: DMSans.medium,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
