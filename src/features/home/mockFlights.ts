export type FlightCardModel = {
  id: string;
  route: string;
  departureWindow: string;
  aircraft: string;
  seats: number;
  priceUsd: number;
  badge?: string;
};

export const mockFlights: FlightCardModel[] = [
  {
    id: 'leg-101',
    route: 'TEB -> MIA',
    departureWindow: 'Today, 18:40 - 19:30',
    aircraft: 'Gulfstream G550',
    seats: 8,
    priceUsd: 18900,
    badge: 'Invite-only'
  },
  {
    id: 'leg-206',
    route: 'VNY -> ASE',
    departureWindow: 'Tomorrow, 08:10 - 09:00',
    aircraft: 'Challenger 650',
    seats: 7,
    priceUsd: 14200
  },
  {
    id: 'leg-332',
    route: 'OPF -> BQN',
    departureWindow: 'Sun, 14:20 - 15:15',
    aircraft: 'Praetor 600',
    seats: 6,
    priceUsd: 12650
  }
];