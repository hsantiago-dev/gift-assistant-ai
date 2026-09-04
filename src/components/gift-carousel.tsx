import { useMemo, useState } from 'react';
import { NativeSyntheticEvent, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

import { GiftCard } from '@/components/gift-card';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import type { GiftSuggestion } from '@/services/gemini';

export type GiftCarouselProps = {
  suggestions: GiftSuggestion[];
};

const CARD_WIDTH = 280;
const CARD_GAP = Spacing.three;

export function GiftCarousel({ suggestions }: GiftCarouselProps) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeights, setCardHeights] = useState<number[]>(() =>
    suggestions.map(() => 0),
  );

  const uniformHeight = useMemo(() => {
    const max = Math.max(...cardHeights, 0);
    return max > 0 ? max : undefined;
  }, [cardHeights]);

  const handleScroll = (event: NativeSyntheticEvent<{ contentOffset: { x: number } }>) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(index);
  };

  const handleCardLayout = (index: number) => (event: { nativeEvent: { layout: { height: number } } }) => {
    const height = event.nativeEvent.layout.height;
    setCardHeights((prev) => {
      if (prev[index] === height) return prev;
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselArea}>
        <ScrollView
          horizontal
          pagingEnabled={Platform.OS !== 'web'}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
          onScroll={Platform.OS === 'web' ? undefined : handleScroll}
          onMomentumScrollEnd={Platform.OS === 'web' ? handleScroll : undefined}
          scrollEventThrottle={16}>
          {suggestions.map((s, i) => (
            <View key={i} style={{ width: CARD_WIDTH, marginRight: CARD_GAP }}>
              <GiftCard
                nome={s.nome}
                justificativa={s.justificativa}
                index={i}
                height={uniformHeight}
                onLayout={handleCardLayout(i)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.pagination}>
        {suggestions.map((_, i) => (
          <MotiView
            key={i}
            animate={{
              width: i === activeIndex ? 24 : 8,
              backgroundColor: i === activeIndex ? theme.primary : theme.backgroundSelected,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={styles.dot}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselArea: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginTop: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: Radius.pill,
  },
});
