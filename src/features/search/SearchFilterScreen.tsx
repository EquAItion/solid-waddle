import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/RootNavigator';
import {LuxuryButton} from '../../shared/components/LuxuryButton';
import {colors, radius, spacing, typography} from '../../shared/theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchFilter'>;

const sortOptions = ['Price', 'Earliest Departure', 'Popularity'];
const preferenceOptions = ['Wi-Fi', 'Pets Allowed', 'Min 6 Bags', 'Light Catering'];

export function SearchFilterScreen({navigation}: Props) {
  const [origin, setOrigin] = useState('Teterboro (TEB)');
  const [destination, setDestination] = useState('Miami (OPF, MIA)');
  const [departureWindow, setDepartureWindow] = useState('Today - Next 3 days');
  const [sortBy, setSortBy] = useState('Price');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(['Wi-Fi']);

  const togglePref = (option: string) => {
    setSelectedPrefs(current =>
      current.includes(option) ? current.filter(item => item !== option) : [...current, option]
    );
  };

  const activeSummary = useMemo(() => {
    return `${selectedPrefs.length} preferences • Sort: ${sortBy}`;
  }, [selectedPrefs.length, sortBy]);

  const resetFilters = () => {
    setOrigin('');
    setDestination('');
    setDepartureWindow('Anytime');
    setSortBy('Price');
    setSelectedPrefs([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <View style={styles.headerRow}>
        <Text style={styles.title}>Search & Filters</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.label}>Origin</Text>
        <TextInput value={origin} onChangeText={setOrigin} style={styles.input} placeholder="Choose airport" placeholderTextColor={colors.mutedText} />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
          placeholder="Choose airport"
          placeholderTextColor={colors.mutedText}
        />

        <Text style={styles.label}>Date / Time Window</Text>
        <TextInput
          value={departureWindow}
          onChangeText={setDepartureWindow}
          style={styles.input}
          placeholder="Select timeframe"
          placeholderTextColor={colors.mutedText}
        />

        <Text style={styles.label}>Cabin Preferences</Text>
        <View style={styles.optionWrap}>
          {preferenceOptions.map(option => {
            const active = selectedPrefs.includes(option);
            return (
              <Pressable
                key={option}
                style={[styles.optionChip, active ? styles.optionChipActive : null]}
                onPress={() => togglePref(option)}>
                <Text style={[styles.optionChipText, active ? styles.optionChipTextActive : null]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Sort By</Text>
        <View style={styles.optionWrap}>
          {sortOptions.map(option => {
            const active = sortBy === option;
            return (
              <Pressable
                key={option}
                style={[styles.optionChip, active ? styles.optionChipActive : null]}
                onPress={() => setSortBy(option)}>
                <Text style={[styles.optionChipText, active ? styles.optionChipTextActive : null]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.summary}>{activeSummary}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <LuxuryButton label="Apply Filters" onPress={() => navigation.goBack()} />
        <LuxuryButton label="Reset" variant="ghost" onPress={resetFilters} style={styles.reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF30',
    alignSelf: 'center',
    marginBottom: spacing.lg
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: colors.ivory,
    fontSize: typography.subtitle,
    fontWeight: '700'
  },
  close: {
    color: colors.gold,
    fontSize: typography.body
  },
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg
  },
  label: {
    color: colors.platinum,
    fontSize: typography.caption,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.md
  },
  input: {
    backgroundColor: colors.deepSlate,
    borderColor: '#FFFFFF18',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.ivory,
    fontSize: typography.body
  },
  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  optionChip: {
    borderRadius: radius.pill,
    borderColor: '#FFFFFF24',
    borderWidth: 1,
    backgroundColor: '#FFFFFF0D',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  optionChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold
  },
  optionChipText: {
    color: colors.ivory,
    fontSize: typography.caption,
    letterSpacing: 0.3
  },
  optionChipTextActive: {
    color: colors.charcoal,
    fontWeight: '600'
  },
  summary: {
    marginTop: spacing.lg,
    color: colors.mutedText,
    fontSize: typography.caption
  },
  footer: {
    paddingVertical: spacing.md
  },
  reset: {
    marginTop: spacing.sm
  }
});