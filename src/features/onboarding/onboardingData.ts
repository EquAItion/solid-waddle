export type OnboardingCard = {
  title: string;
  description: string;
  eyebrow: string;
};

export const onboardingData: OnboardingCard[] = [
  {
    eyebrow: 'Discovery',
    title: 'Premium Empty Legs, Curated Daily',
    description:
      'Explore routes selected for your nearest airport and preferred departure windows.'
  },
  {
    eyebrow: 'Speed',
    title: 'Reserve In Minutes, Not Hours',
    description: 'Luxury booking flow designed for decisive travel with transparent pricing at every step.'
  },
  {
    eyebrow: 'Trust',
    title: 'Verified Operators, Protected Payments',
    description: 'Every listing is verification-checked and processed with enterprise-grade security controls.'
  }
];