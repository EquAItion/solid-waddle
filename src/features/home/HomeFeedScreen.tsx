import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius, shadows, spacing, typography} from '../../shared/theme/tokens';
import {mockFlights, FlightCardModel} from './mockFlights';

const chips = ['Today', 'Weekend', 'Pets', 'Wi-Fi'];

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function HomeFeedScreen() {
  const renderFlight = ({item}: {item: FlightCardModel}) => (
    <Pressable style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.route}>{item.route}</Text>
        {item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}
      </View>
      <Text style={styles.meta}>{item.departureWindow}</Text>
      <Text style={styles.meta}>{item.aircraft} • {item.seats} seats</Text>
      <Text style={styles.price}>{formatUsd(item.priceUsd)}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>NEAREST AIRPORT: TETERBORO</Text>
      <Text style={styles.title}>Personalized Empty Legs</Text>

      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search route, airport, or aircraft</Text>
      </View>

      <View style={styles.chipRow}>
        {chips.map(chip => (
          <Pressable key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={mockFlights}
        keyExtractor={item => item.id}
        renderItem={renderFlight}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  eyebrow: {
    color: colors.gold,
    fontSize: typography.caption,
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  title: {
    marginTop: spacing.sm,
    color: colors.ivory,
    fontSize: typography.title,
    fontWeight: '700'
  },
  searchBar: {
    marginTop: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.deepSlate
  },
  searchText: {
    color: colors.mutedText,
    fontSize: typography.body
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#FFFFFF22',
    backgroundColor: '#FFFFFF0D',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  chipText: {
    color: colors.ivory,
    fontSize: typography.caption,
    letterSpacing: 0.4
  },
  listContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.deepSlate,
    borderColor: '#FFFFFF16',
    borderWidth: 1,
    ...shadows.luxeCard
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  route: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700'
  },
  badge: {
    color: colors.charcoal,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase'
  },
  meta: {
    color: colors.platinum,
    fontSize: typography.body,
    marginTop: spacing.sm
  },
  price: {
    color: colors.ivory,
    fontSize: 24,
    marginTop: spacing.md,
    fontWeight: '700'
  }
});