import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DMSans, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ResultsScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ suggestions?: string }>();

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

  let parsedSuggestions: unknown = null;
  let parseError = false;

  if (params.suggestions) {
    try {
      parsedSuggestions = JSON.parse(params.suggestions);
    } catch {
      parseError = true;
    }
  }

  const hasValidSuggestions =
    !parseError &&
    Array.isArray(parsedSuggestions) &&
    parsedSuggestions.length > 0;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} themeColor="text">
          Sugestões de Presentes
        </ThemedText>

        {!params.suggestions || parseError || !hasValidSuggestions ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText} themeColor="textSecondary">
              Nenhuma sugestão encontrada ou dados inválidos. Volte e tente gerar novamente.
            </ThemedText>
            <PrimaryButton
              label="Voltar"
              onPress={() => router.back()}
            />
          </ThemedView>
        ) : (
          <>
            <ThemedText type="smallBold" style={styles.subtitle} themeColor="textSecondary">
              Resultado bruto da IA (JSON):
            </ThemedText>
            <ThemedView
              style={[
                styles.jsonBox,
                { backgroundColor: theme.backgroundElement },
              ]}>
              <ThemedText style={[styles.jsonText, { color: theme.text }]}>
                {JSON.stringify(parsedSuggestions, null, 2)}
              </ThemedText>
            </ThemedView>
            <PrimaryButton
              label="Voltar"
              onPress={() => router.back()}
            />
          </>
        )}
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
  },
  jsonBox: {
    borderRadius: Radius.card,
    padding: Spacing.three,
  },
  jsonText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 14,
  },
  emptyContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingVertical: Spacing.six,
  },
  emptyText: {
    fontFamily: DMSans.medium,
    textAlign: 'center',
  },
});
