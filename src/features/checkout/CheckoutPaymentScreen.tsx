import React, {useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {findFlightById} from '../home/mockFlights';
import {LuxuryButton} from '../../shared/components/LuxuryButton';
import {colors, radius, spacing, typography} from '../../shared/theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutPayment'>;

type PaymentMethod = 'Card' | 'Bank Request' | 'Wallet Credits';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function CheckoutPaymentScreen({navigation, route}: Props) {
  const flight = findFlightById(route.params.flightId);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [addOnSelected, setAddOnSelected] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'failed' | 'success'>('idle');
  const [error, setError] = useState('');
  const attemptCountRef = useRef(0);
  const idempotencyKeyRef = useRef(`idem_${Date.now()}_${Math.floor(Math.random() * 1000)}`);

  if (!flight) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Flight no longer available</Text>
        <LuxuryButton label="Back to Feed" onPress={() => navigation.replace('HomeFeed')} style={styles.fullWidth} />
      </View>
    );
  }

  const baseFare = flight.priceUsd;
  const taxesFees = Math.round(baseFare * 0.0835);
  const conciergeAddOn = addOnSelected ? 650 : 0;
  const total = baseFare + taxesFees + conciergeAddOn;

  const statusText = useMemo(() => {
    if (status === 'processing') {
      return 'Processing payment and 3D Secure challenge...';
    }
    if (status === 'failed') {
      return error;
    }
    if (status === 'success') {
      return 'Payment successful. Booking confirmed. Screen 09 can now be connected.';
    }
    return '';
  }, [error, status]);

  const confirmPayment = () => {
    setStatus('processing');
    setError('');
    attemptCountRef.current += 1;

    setTimeout(() => {
      if (attemptCountRef.current === 1) {
        setStatus('failed');
        setError('Payment failed. Retry with the same idempotency key or switch method.');
        return;
      }

      setStatus('success');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Checkout Step 2</Text>
      <Text style={styles.title}>Payment & Confirm</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traveler</Text>
          <Text style={styles.sectionText}>{route.params.traveler.leadTravelerName}</Text>
          <Text style={styles.sectionText}>{route.params.traveler.passengerCount} passenger(s)</Text>
          <Text style={styles.sectionText}>{route.params.traveler.contactEmail}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fare Breakdown</Text>
          <View style={styles.row}><Text style={styles.rowLabel}>Base fare</Text><Text style={styles.rowValue}>{formatUsd(baseFare)}</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Taxes & fees</Text><Text style={styles.rowValue}>{formatUsd(taxesFees)}</Text></View>
          <Pressable style={styles.row} onPress={() => setAddOnSelected(value => !value)}>
            <Text style={styles.rowLabel}>Concierge transfer add-on</Text>
            <Text style={styles.rowValue}>{addOnSelected ? formatUsd(conciergeAddOn) : 'Add'}</Text>
          </Pressable>
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{formatUsd(total)}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.optionRow}>
            {(['Card', 'Bank Request', 'Wallet Credits'] as const).map(option => {
              const active = paymentMethod === option;
              return (
                <Pressable
                  key={option}
                  style={[styles.methodChip, active ? styles.methodChipActive : null]}
                  onPress={() => setPaymentMethod(option)}>
                  <Text style={[styles.methodText, active ? styles.methodTextActive : null]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.securityRow}>
            <Text style={styles.securityTitle}>PCI-compliant processing • 3DS • Encryption</Text>
            <Text style={styles.securitySub}>Idempotency key: {idempotencyKeyRef.current}</Text>
          </View>
        </View>

        {status !== 'idle' ? (
          <View style={[styles.statusBox, status === 'failed' ? styles.statusFailed : null, status === 'success' ? styles.statusSuccess : null]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        ) : null}
      </ScrollView>

      <LuxuryButton label={status === 'failed' ? 'Retry Payment' : 'Pay and Confirm'} onPress={confirmPayment} />
      <LuxuryButton label="Back to Traveler Details" variant="ghost" onPress={() => navigation.goBack()} style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md
  },
  kicker: {
    color: colors.gold,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  title: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginTop: spacing.sm
  },
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md
  },
  section: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FFFFFF16',
    backgroundColor: colors.deepSlate,
    padding: spacing.lg
  },
  sectionTitle: {
    color: colors.ivory,
    fontSize: typography.body,
    fontWeight: '700',
    marginBottom: spacing.sm
  },
  sectionText: {
    color: colors.platinum,
    fontSize: typography.body,
    marginTop: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.sm
  },
  rowLabel: {
    color: colors.platinum,
    fontSize: typography.body,
    flex: 1
  },
  rowValue: {
    color: colors.ivory,
    fontSize: typography.body,
    fontWeight: '600'
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF20',
    paddingTop: spacing.md,
    marginTop: spacing.md
  },
  totalLabel: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700'
  },
  totalValue: {
    color: colors.gold,
    fontSize: typography.subtitle,
    fontWeight: '700'
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  methodChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF24',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF0D'
  },
  methodChipActive: {
    borderColor: colors.gold,
    backgroundColor: colors.gold
  },
  methodText: {
    color: colors.ivory,
    fontSize: typography.caption
  },
  methodTextActive: {
    color: colors.charcoal,
    fontWeight: '600'
  },
  securityRow: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    borderColor: '#FFFFFF20',
    borderWidth: 1,
    padding: spacing.md,
    backgroundColor: '#FFFFFF08'
  },
  securityTitle: {
    color: colors.ivory,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.3
  },
  securitySub: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: spacing.xs
  },
  statusBox: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    backgroundColor: '#FFFFFF10',
    padding: spacing.md
  },
  statusFailed: {
    borderColor: '#E8A5A5'
  },
  statusSuccess: {
    borderColor: '#9CC7A3'
  },
  statusText: {
    color: colors.ivory,
    fontSize: typography.body
  },
  backBtn: {
    marginTop: spacing.sm
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.charcoal,
    justifyContent: 'center',
    padding: spacing.xl
  },
  emptyTitle: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginBottom: spacing.lg
  },
  fullWidth: {
    width: '100%'
  }
});