import { useState, type ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

import { ChipGroup } from '@/components/chip-group';
import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GiftIcon, type GiftIconName } from '@/components/ui/gift-icon';
import {
  Copy,
  DMSans,
  MaxContentWidth,
  Placeholders,
  Radius,
  Spacing,
  tintedShadow,
  Typography,
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

function LoadingState() {
  const theme = useTheme();

  return (
    <View style={styles.stateContainer}>
      <MotiView
        from={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0.95, opacity: 0.7 }}
        transition={{
          type: 'timing',
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          loop: true,
          repeatReverse: true,
        }}
        style={[styles.loadingCircle, { backgroundColor: theme.primaryContainer }]}>
        <GiftIcon name="gift-outline" size={48} color={theme.onPrimaryContainer} />
      </MotiView>

      <View style={styles.stateTextBlock}>
        <ThemedText style={[styles.stateTitle, { color: theme.primary }]}>
          {Copy.loading.title}
        </ThemedText>
        <ThemedText
          style={[Typography.bodyLg, styles.stateDescription, { color: theme.textSecondary }]}>
          {Copy.loading.description}
        </ThemedText>
      </View>

      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 900,
              delay: i * 200,
              loop: true,
              repeatReverse: true,
            }}
            style={[styles.dot, { backgroundColor: theme.primary }]}
          />
        ))}
      </View>
    </View>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.stateContainer}>
      <View style={styles.errorIconArea}>
        <View
          style={[
            styles.errorDecorative,
            styles.errorDecorativeA,
            { backgroundColor: theme.errorContainer },
          ]}
        />
        <View
          style={[
            styles.errorDecorative,
            styles.errorDecorativeB,
            { backgroundColor: theme.backgroundSelected },
          ]}
        />
        <View style={[styles.errorMainCircle, { backgroundColor: theme.surfaceCard }]}>
          <GiftIcon name="package-variant" size={56} color={theme.error} />
          <View style={[styles.errorCloseIcon, styles.errorCloseIconTop]}>
            <GiftIcon name="close" size={26} color={theme.outlineVariant} />
          </View>
          <View style={[styles.errorCloseIcon, styles.errorCloseIconBottom]}>
            <GiftIcon name="close" size={20} color={theme.outlineVariant} />
          </View>
        </View>
      </View>

      <View style={styles.stateTextBlock}>
        <ThemedText style={[styles.stateTitle, { color: theme.text }]}>
          {Copy.error.title}
        </ThemedText>
        <ThemedText
          style={[Typography.bodyLg, styles.stateDescription, { color: theme.textSecondary }]}>
          {Copy.error.description}
        </ThemedText>
      </View>

      <PrimaryButton label={Copy.error.retry} icon="refresh" onPress={onRetry} />
    </View>
  );
}

type SectionCardProps = {
  icon: GiftIconName;
  label: string;
  children: ReactNode;
};

function SectionCard({ icon, label, children }: SectionCardProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[styles.sectionCard, { backgroundColor: theme.surfaceCard }, tintedShadow()]}>
      <View style={styles.sectionHeader}>
        <GiftIcon name={icon} size={18} color={theme.textSecondary} />
        <ThemedText type="smallBold" themeColor="textSecondary">
          {label}
        </ThemedText>
      </View>
      {children}
    </ThemedView>
  );
}

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const [text, setText] = useState('');
  const [budget, setBudget] = useState<BudgetOption | null>(null);
  const [occasion, setOccasion] = useState<OccasionOption | null>(null);
  const [placeholder] = useState(pickPlaceholder);
  const [focused, setFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
    },
    web: {
      paddingTop: Spacing.four,
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
      setFocused(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {loading ? (
        <LoadingState />
      ) : errorMessage ? (
        <ErrorState onRetry={handleGenerate} />
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
            <ThemedView style={styles.container}>
              <View style={styles.header}>
                <ThemedText style={[styles.title, { color: theme.primary }]}>
                  {Copy.home.title}
                </ThemedText>
                <ThemedText
                  style={[Typography.bodyLg, { color: theme.textSecondary }]}>
                  {Copy.home.subtitle}
                </ThemedText>
              </View>

              <ThemedView
                style={[styles.inputCard, { backgroundColor: theme.surfaceCard }, tintedShadow()]}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.backgroundElement,
                      color: theme.text,
                      borderColor: focused ? theme.primary : 'transparent',
                    },
                  ]}
                  placeholder={placeholder}
                  placeholderTextColor={theme.textSecondary}
                  multiline
                  value={text}
                  onChangeText={setText}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </ThemedView>

              <SectionCard icon="cash-multiple" label={Copy.home.budgetLabel}>
                <ChipGroup options={BudgetOptions} selected={budget} onChange={setBudget} />
              </SectionCard>

              <SectionCard icon="calendar" label={Copy.home.occasionLabel}>
                <ChipGroup options={OccasionOptions} selected={occasion} onChange={setOccasion} />
              </SectionCard>
            </ThemedView>
          </ScrollView>

          <View
            style={[styles.footer, { backgroundColor: theme.background }, footerPlatformStyle]}>
            <View style={styles.footerInner}>
              <PrimaryButton
                label={Copy.home.generate}
                icon="creation"
                onPress={handleGenerate}
                disabled={!canSubmit}
              />
            </View>
          </View>
        </>
      )}
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
    paddingBottom: Spacing.four,
  },
  container: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing.sectionGap,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: DMSans.bold,
    textAlign: 'center',
  },
  inputCard: {
    borderRadius: Radius.card,
    padding: Spacing.three,
  },
  input: {
    minHeight: 140,
    borderRadius: Radius.cardSmall,
    padding: Spacing.three,
    borderWidth: 2,
    fontFamily: DMSans.medium,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  sectionCard: {
    borderRadius: Radius.card,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
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
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sectionGap,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  loadingCircle: {
    width: 128,
    height: 128,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateTextBlock: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  stateTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: DMSans.bold,
    textAlign: 'center',
  },
  stateDescription: {
    textAlign: 'center',
    maxWidth: 320,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: Radius.pill,
  },
  errorIconArea: {
    position: 'relative',
    width: 192,
    height: 192,
    marginBottom: Spacing.three,
  },
  errorDecorative: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.pill,
  },
  errorDecorativeA: {
    opacity: 0.2,
    transform: [{ rotate: '-6deg' }],
  },
  errorDecorativeB: {
    opacity: 0.5,
    transform: [{ rotate: '3deg' }],
  },
  errorMainCircle: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCloseIcon: {
    position: 'absolute',
  },
  errorCloseIconTop: {
    top: 32,
    left: 32,
    transform: [{ rotate: '-12deg' }],
  },
  errorCloseIconBottom: {
    bottom: 40,
    right: 32,
    transform: [{ rotate: '45deg' }],
  },
});