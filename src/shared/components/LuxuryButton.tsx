import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

type LuxuryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

export function LuxuryButton({label, onPress, variant = 'primary', style}: LuxuryButtonProps) {
  const {colors, radius, spacing, typography} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        {
          backgroundColor: variant === 'primary' ? colors.gold : 'transparent',
          borderColor: variant === 'primary' ? colors.gold : colors.platinum,
          borderRadius: radius.pill,
          paddingVertical: spacing.md,
          opacity: pressed ? 0.9 : 1
        },
        style
      ]}>
      <Text
        style={{
          color: variant === 'primary' ? colors.charcoal : colors.ivory,
          fontSize: typography.button,
          fontWeight: '600',
          letterSpacing: 0.6,
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1
  }
});