import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {findFlightById} from '../home/mockFlights';
import {LuxuryButton} from '../../shared/components/LuxuryButton';
import {colors, radius, spacing, typography} from '../../shared/theme/tokens';
import {TravelerDetails} from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutTraveler'>;

type FormErrors = Partial<Record<keyof TravelerDetails, string>>;

const initialForm: TravelerDetails = {
  leadTravelerName: '',
  passengerCount: 1,
  documentType: 'Passport',
  specialRequest: '',
  contactEmail: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutTravelerScreen({navigation, route}: Props) {
  const flight = findFlightById(route.params.flightId);
  const [form, setForm] = useState<TravelerDetails>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const seatCount = flight?.seats ?? 1;
  const passengerOverLimit = form.passengerCount > seatCount;

  const title = useMemo(() => {
    return flight ? `Traveler Details • ${flight.route}` : 'Traveler Details';
  }, [flight]);

  const patchField = <K extends keyof TravelerDetails>(key: K, value: TravelerDetails[K]) => {
    setForm(current => ({...current, [key]: value}));
    setErrors(current => ({...current, [key]: undefined}));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.leadTravelerName.trim()) {
      nextErrors.leadTravelerName = 'Lead traveler name is required.';
    }
    if (!emailRegex.test(form.contactEmail.trim())) {
      nextErrors.contactEmail = 'Enter a valid contact email.';
    }
    if (form.passengerCount < 1) {
      nextErrors.passengerCount = 'At least one passenger is required.';
    }
    if (form.passengerCount > seatCount) {
      nextErrors.passengerCount = `Passenger count exceeds available seats (${seatCount}).`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueToPayment = () => {
    if (!validate()) {
      return;
    }

    navigation.navigate('CheckoutPayment', {
      flightId: route.params.flightId,
      traveler: form
    });
  };

  if (!flight) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Flight no longer available</Text>
        <LuxuryButton label="Back to Feed" onPress={() => navigation.replace('HomeFeed')} style={styles.fullWidth} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Checkout Step 1</Text>
      <Text style={styles.title}>{title}</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.label}>Lead Traveler</Text>
        <TextInput
          value={form.leadTravelerName}
          onChangeText={value => patchField('leadTravelerName', value)}
          placeholder="Full legal name"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
        />
        {errors.leadTravelerName ? <Text style={styles.error}>{errors.leadTravelerName}</Text> : null}

        <Text style={styles.label}>Passengers</Text>
        <View style={styles.counterRow}>
          <Pressable
            style={styles.counterBtn}
            onPress={() => patchField('passengerCount', Math.max(1, form.passengerCount - 1))}>
            <Text style={styles.counterText}>-</Text>
          </Pressable>
          <Text style={styles.counterValue}>{form.passengerCount}</Text>
          <Pressable
            style={styles.counterBtn}
            onPress={() => patchField('passengerCount', Math.min(12, form.passengerCount + 1))}>
            <Text style={styles.counterText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.helper}>Available seats: {seatCount}</Text>
        {passengerOverLimit ? <Text style={styles.error}>Passenger count exceeds available seats ({seatCount}).</Text> : null}
        {errors.passengerCount ? <Text style={styles.error}>{errors.passengerCount}</Text> : null}

        <Text style={styles.label}>ID Requirement</Text>
        <View style={styles.optionRow}>
          {(['Passport', 'National ID'] as const).map(option => {
            const active = form.documentType === option;
            return (
              <Pressable
                key={option}
                style={[styles.optionChip, active ? styles.optionChipActive : null]}
                onPress={() => patchField('documentType', option)}>
                <Text style={[styles.optionText, active ? styles.optionTextActive : null]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Special Requests</Text>
        <TextInput
          value={form.specialRequest}
          onChangeText={value => patchField('specialRequest', value)}
          placeholder="Catering, pets, accessibility needs"
          placeholderTextColor={colors.mutedText}
          multiline
          style={[styles.input, styles.multiline]}
        />

        <Text style={styles.label}>Contact Email</Text>
        <TextInput
          value={form.contactEmail}
          onChangeText={value => patchField('contactEmail', value)}
          placeholder="name@email.com"
          placeholderTextColor={colors.mutedText}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        {errors.contactEmail ? <Text style={styles.error}>{errors.contactEmail}</Text> : null}
      </ScrollView>

      <LuxuryButton label="Continue to Payment" onPress={continueToPayment} />
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
    paddingBottom: spacing.lg
  },
  label: {
    color: colors.platinum,
    fontSize: typography.caption,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
    backgroundColor: colors.deepSlate,
    color: colors.ivory,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top'
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  counterBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF25',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF12'
  },
  counterText: {
    color: colors.ivory,
    fontSize: 20,
    lineHeight: 24
  },
  counterValue: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center'
  },
  helper: {
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.sm
  },
  optionRow: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  optionChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF24',
    backgroundColor: '#FFFFFF0C',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  optionChipActive: {
    borderColor: colors.gold,
    backgroundColor: colors.gold
  },
  optionText: {
    color: colors.ivory,
    fontSize: typography.caption
  },
  optionTextActive: {
    color: colors.charcoal,
    fontWeight: '600'
  },
  error: {
    color: '#E8A5A5',
    fontSize: typography.caption,
    marginTop: spacing.xs
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