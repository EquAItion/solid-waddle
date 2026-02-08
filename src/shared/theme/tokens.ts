export const colors = {
  charcoal: '#111315',
  ivory: '#F7F3EA',
  platinum: '#C8CBD1',
  gold: '#B89B5E',
  deepSlate: '#1A1E22',
  mutedText: '#A6ABB3',
  success: '#7EA077'
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 44
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999
} as const;

export const typography = {
  hero: 42,
  title: 28,
  subtitle: 20,
  body: 16,
  caption: 13,
  button: 15
} as const;

export const shadows = {
  luxeCard: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.32,
    shadowRadius: 22,
    elevation: 12
  }
} as const;