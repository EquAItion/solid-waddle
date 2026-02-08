import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {colors, spacing, typography} from '../../shared/theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true
      })
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.glowLarge} />
      <View style={styles.glowSmall} />
      <Animated.View style={[styles.content, {opacity: fadeAnim, transform: [{scale: scaleAnim}]}]}>
        <Text style={styles.brand}>AUREJET</Text>
        <Text style={styles.subtitle}>PRIVATE EMPTY-LEG ACCESS</Text>
      </Animated.View>
      <Text style={styles.securityNote}>Secured by enterprise-grade encryption</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl
  },
  content: {
    alignItems: 'center',
    gap: spacing.sm
  },
  brand: {
    color: colors.ivory,
    fontSize: typography.hero,
    letterSpacing: 3,
    fontWeight: '700'
  },
  subtitle: {
    color: colors.platinum,
    fontSize: typography.caption,
    letterSpacing: 1.8
  },
  securityNote: {
    position: 'absolute',
    bottom: spacing.xl,
    color: colors.mutedText,
    fontSize: typography.caption,
    letterSpacing: 0.3
  },
  glowLarge: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: '#B89B5E33',
    top: -80,
    right: -60
  },
  glowSmall: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#F7F3EA12',
    bottom: -40,
    left: -40
  }
});