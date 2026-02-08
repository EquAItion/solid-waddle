import React, {useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {onboardingData, OnboardingCard} from './onboardingData';
import {colors, radius, spacing, typography, shadows} from '../../shared/theme/tokens';
import {LuxuryButton} from '../../shared/components/LuxuryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({navigation}: Props) {
  const {width} = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<OnboardingCard>>(null);

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(nextIndex);
  };

  const continuePress = () => {
    if (activeIndex < onboardingData.length - 1) {
      listRef.current?.scrollToIndex({index: activeIndex + 1});
      setActiveIndex(prev => prev + 1);
      return;
    }

    navigation.replace('AuthGateway');
  };

  const renderItem = ({item}: ListRenderItemInfo<OnboardingCard>) => {
    return (
      <View style={[styles.cardWrap, {width}]}> 
        <View style={styles.card}>
          <Text style={styles.eyebrow}>{item.eyebrow}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={onboardingData}
        keyExtractor={item => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumEnd}
      />

      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {onboardingData.map((item, index) => (
            <View
              key={item.title}
              style={[styles.dot, {backgroundColor: index === activeIndex ? colors.gold : '#4A4F55'}]}
            />
          ))}
        </View>

        <LuxuryButton
          label={activeIndex === onboardingData.length - 1 ? 'Continue to Sign In' : 'Continue'}
          onPress={continuePress}
        />
        <LuxuryButton label="Skip" variant="ghost" onPress={() => navigation.replace('AuthGateway')} style={styles.skipButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    paddingTop: spacing.xxl
  },
  cardWrap: {
    paddingHorizontal: spacing.lg,
    justifyContent: 'center'
  },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.deepSlate,
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    padding: spacing.xl,
    minHeight: 340,
    justifyContent: 'center',
    ...shadows.luxeCard
  },
  eyebrow: {
    color: colors.gold,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.md
  },
  title: {
    color: colors.ivory,
    fontSize: typography.title,
    lineHeight: 36,
    fontWeight: '700'
  },
  description: {
    color: colors.platinum,
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24
  },
  footer: {
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    marginBottom: spacing.sm
  },
  dot: {
    width: 26,
    height: 4,
    borderRadius: radius.pill
  },
  skipButton: {
    marginTop: spacing.sm
  }
});