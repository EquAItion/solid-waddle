import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {findFlightById} from '../home/mockFlights';
import {LuxuryButton} from '../../shared/components/LuxuryButton';
import {colors, radius, spacing, typography, shadows} from '../../shared/theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'FlightDetail'>;

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function FlightDetailScreen({navigation, route}: Props) {
  const flight = findFlightById(route.params.flightId);

  if (!flight) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Flight no longer available</Text>
        <Text style={styles.emptyCopy}>Availability is live and may change until booking is confirmed.</Text>
        <LuxuryButton label="Back to Feed" onPress={() => navigation.replace('HomeFeed')} style={styles.emptyButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.route}>{flight.route}</Text>
          <Text style={styles.departure}>{flight.departureWindow}</Text>
          <Text style={styles.price}>{formatUsd(flight.priceUsd)}</Text>
          <Text style={styles.priceNote}>Member fare shown. Availability is live.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aircraft & Cabin</Text>
          <Text style={styles.sectionText}>{flight.aircraft}</Text>
          <Text style={styles.sectionText}>Range: {flight.rangeNm} nm</Text>
          <Text style={styles.sectionText}>Baggage allowance: {flight.baggageKg} kg</Text>
          <Text style={styles.sectionText}>Amenities: {flight.wifi ? 'Wi-Fi' : 'No Wi-Fi'} • {flight.petsAllowed ? 'Pets allowed' : 'No pets'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verified Operator</Text>
          <Text style={styles.sectionText}>{flight.operator}</Text>
          <Text style={styles.badge}>Verification checked</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation & Refund Policy</Text>
          <Text style={styles.sectionText}>{flight.cancellationPolicy}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <LuxuryButton label="Book Now" onPress={() => navigation.navigate('CheckoutTraveler', {flightId: flight.id})} />
        <Pressable style={styles.conciergeBtn} onPress={() => {}}>
          <Text style={styles.conciergeText}>Chat with concierge</Text>
        </Pressable>
      </View>
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
  content: {
    paddingBottom: spacing.xxl
  },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    backgroundColor: colors.deepSlate,
    borderColor: '#FFFFFF16',
    borderWidth: 1,
    ...shadows.luxeCard
  },
  route: {
    color: colors.ivory,
    fontSize: typography.title,
    fontWeight: '700'
  },
  departure: {
    color: colors.platinum,
    fontSize: typography.body,
    marginTop: spacing.sm
  },
  price: {
    color: colors.gold,
    fontSize: 34,
    fontWeight: '700',
    marginTop: spacing.lg
  },
  priceNote: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.xs
  },
  section: {
    marginTop: spacing.lg,
    borderRadius: radius.md,
    borderColor: '#FFFFFF14',
    borderWidth: 1,
    backgroundColor: '#FFFFFF08',
    padding: spacing.lg
  },
  sectionTitle: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginBottom: spacing.sm
  },
  sectionText: {
    color: colors.platinum,
    fontSize: typography.body,
    lineHeight: 24,
    marginTop: 2
  },
  badge: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    color: colors.charcoal,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 0.4,
    overflow: 'hidden'
  },
  footer: {
    paddingVertical: spacing.md
  },
  conciergeBtn: {
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF33',
    paddingVertical: spacing.md
  },
  conciergeText: {
    color: colors.ivory,
    textAlign: 'center',
    fontSize: typography.button,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl
  },
  emptyTitle: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700'
  },
  emptyCopy: {
    color: colors.platinum,
    fontSize: typography.body,
    textAlign: 'center',
    marginTop: spacing.sm
  },
  emptyButton: {
    marginTop: spacing.xl,
    width: '100%'
  }
});