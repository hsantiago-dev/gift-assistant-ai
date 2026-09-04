import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GiftCarousel } from '@/components/gift-carousel';
import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DMSans, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { GiftSuggestion } from '@/services/gemini';

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

  let parsedSuggestions: unknown = null;
  let parseError = false;

  if (params.suggestions) {
    try {
      parsedSuggestions = JSON.parse(params.suggestions);
    } catch {
      parseError = true;
    }
  }

  const suggestionList = parsedSuggestions as GiftSuggestion[] | null;
  const hasValidSuggestions =
    !parseError &&
    Array.isArray(suggestionList) &&
    suggestionList.length > 0;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
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
            </ThemedView>
          ) : (
            <GiftCarousel suggestions={suggestionList as GiftSuggestion[]} />
          )}
        </ThemedView>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.background }, footerPlatformStyle]}>
        <View style={styles.footerInner}>
          <PrimaryButton
            label="Voltar"
            onPress={() => router.back()}
          />
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
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: DMSans.bold,
    lineHeight: 36,
  },
  emptyContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Spacing.six,
  },
  emptyText: {
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
});
