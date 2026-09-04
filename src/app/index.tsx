import { useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';

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
import { generateSuggestion } from '@/services/gemini';

function pickPlaceholder(): string {
  return Placeholders[Math.floor(Math.random() * Placeholders.length)];
}

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const [text, setText] = useState('');
  const [budget, setBudget] = useState<BudgetOption | null>(null);
  const [occasion, setOccasion] = useState<OccasionOption | null>(null);
  const [placeholder] = useState(pickPlaceholder);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    web: {
      paddingTop: Spacing.six,
    },
  });

  const footerPlatformStyle = Platform.select({
    android: {
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingBottom: Spacing.four,
    },
  });

  const canSubmit = text.trim().length > 0 && !loading;

  const handleGenerate = async () => {
    if (!canSubmit) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const suggestions = await generateSuggestion({
        text,
        budget: budget ?? undefined,
        occasion: occasion ?? undefined,
      });

      router.push({
        pathname: '/results',
        params: { suggestions: JSON.stringify(suggestions) },
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Ocorreu um erro inesperado ao gerar sugestões.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
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

          {errorMessage && (
            <ThemedView style={[styles.errorContainer, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText style={[styles.errorText, { color: theme.primary }]}>
                {errorMessage}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.background }, footerPlatformStyle]}>
        <View style={styles.footerInner}>
          {loading ? (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <ThemedText type="smallBold" themeColor="textSecondary">
                Gerando sugestões com IA...
              </ThemedText>
            </MotiView>
          ) : (
            <PrimaryButton
              label="Gerar sugestões"
              onPress={handleGenerate}
              disabled={!canSubmit}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
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
  errorContainer: {
    borderRadius: Radius.card,
    padding: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: DMSans.medium,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'transparent',
    width: '100%',
  },
  footerInner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
