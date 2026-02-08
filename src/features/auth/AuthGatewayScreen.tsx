import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {colors, radius, spacing, typography, shadows} from '../../shared/theme/tokens';
import {LuxuryButton} from '../../shared/components/LuxuryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthGateway'>;

export function AuthGatewayScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>WELCOME BACK</Text>
      <Text style={styles.title}>Access Your Concierge Booking Desk</Text>
      <Text style={styles.subtitle}>
        Frictionless sign-in with security-first verification for premium travel.
      </Text>

      <View style={styles.card}>
        <LuxuryButton label="Continue with Email" onPress={() => navigation.replace('HomeFeed')} />
        <LuxuryButton
          label="Continue with Phone OTP"
          variant="ghost"
          onPress={() => navigation.replace('HomeFeed')}
          style={styles.gapTop}
        />
        <LuxuryButton
          label="Continue with Apple / Google"
          variant="ghost"
          onPress={() => navigation.replace('HomeFeed')}
          style={styles.gapTop}
        />
      </View>

      <Text style={styles.securityTitle}>Why verification matters</Text>
      <Text style={styles.securityBody}>
        We protect high-value travel activity with MFA, encrypted sessions, and risk-based checks for unusual logins.
      </Text>
      <Text style={styles.footerLinks}>Terms • Privacy • Security</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl
  },
  kicker: {
    color: colors.gold,
    fontSize: typography.caption,
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  title: {
    marginTop: spacing.md,
    color: colors.ivory,
    fontSize: typography.title,
    lineHeight: 37,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.platinum,
    fontSize: typography.body,
    lineHeight: 24
  },
  card: {
    marginTop: spacing.xl,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.deepSlate,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    ...shadows.luxeCard
  },
  gapTop: {
    marginTop: spacing.md
  },
  securityTitle: {
    marginTop: spacing.xl,
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '600'
  },
  securityBody: {
    marginTop: spacing.sm,
    color: colors.platinum,
    fontSize: typography.body,
    lineHeight: 23
  },
  footerLinks: {
    marginTop: spacing.xl,
    color: colors.mutedText,
    fontSize: typography.caption,
    letterSpacing: 0.3
  }
});