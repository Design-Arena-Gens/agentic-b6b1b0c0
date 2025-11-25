import { create } from 'zustand';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface RideOffer {
  id: string;
  driverName: string;
  driverRating: number;
  price: number;
  estimatedTime: number;
  carModel: string;
  carColor: string;
  plateNumber: string;
  driverPhoto?: string;
}

export interface ActiveRide extends RideOffer {
  status: 'accepted' | 'arriving' | 'in-progress' | 'completed';
  pickup: Location;
  destination: Location;
}

interface RideState {
  pickup: Location | null;
  destination: Location | null;
  requestedPrice: number | null;
  rideOffers: RideOffer[];
  activeRide: ActiveRide | null;

  setPickup: (location: Location) => void;
  setDestination: (location: Location) => void;
  setRequestedPrice: (price: number) => void;
  submitRideRequest: () => void;
  acceptOffer: (offer: RideOffer) => void;
  updateRideStatus: (status: ActiveRide['status']) => void;
  completeRide: () => void;
  cancelRide: () => void;
}

// Simulate driver offers
const generateMockOffers = (price: number): RideOffer[] => {
  const algerianNames = [
    'Ahmed Benali',
    'Karim Messaoudi',
    'Youcef Zerhouni',
    'Mohamed Brahim',
    'Sofiane Kadri'
  ];

  const carModels = [
    { model: 'Hyundai Accent', color: 'Blanc' },
    { model: 'Renault Symbol', color: 'Gris' },
    { model: 'Dacia Logan', color: 'Bleu' },
    { model: 'Peugeot 301', color: 'Noir' },
    { model: 'Volkswagen Polo', color: 'Rouge' }
  ];

  return Array.from({ length: 5 }, (_, i) => {
    const car = carModels[i];
    const priceVariation = Math.floor(Math.random() * 200) - 100;

    return {
      id: `offer-${Date.now()}-${i}`,
      driverName: algerianNames[i],
      driverRating: 4.0 + Math.random(),
      price: Math.max(price + priceVariation, 200),
      estimatedTime: 5 + Math.floor(Math.random() * 10),
      carModel: car.model,
      carColor: car.color,
      plateNumber: `${Math.floor(Math.random() * 9999999).toString().padStart(7, '0')}-16`
    };
  }).sort((a, b) => a.price - b.price);
};

export const useRideStore = create<RideState>((set, get) => ({
  pickup: null,
  destination: null,
  requestedPrice: null,
  rideOffers: [],
  activeRide: null,

  setPickup: (location) => set({ pickup: location }),

  setDestination: (location) => set({ destination: location }),

  setRequestedPrice: (price) => set({ requestedPrice: price }),

  submitRideRequest: () => {
    const { requestedPrice } = get();
    if (requestedPrice) {
      const offers = generateMockOffers(requestedPrice);
      set({ rideOffers: offers });
    }
  },

  acceptOffer: (offer) => {
    const { pickup, destination } = get();
    if (pickup && destination) {
      set({
        activeRide: {
          ...offer,
          status: 'accepted',
          pickup,
          destination
        },
        rideOffers: []
      });

      // Simulate status changes
      setTimeout(() => {
        const currentRide = get().activeRide;
        if (currentRide) {
          set({ activeRide: { ...currentRide, status: 'arriving' } });
        }
      }, 3000);
    }
  },

  updateRideStatus: (status) => {
    const { activeRide } = get();
    if (activeRide) {
      set({ activeRide: { ...activeRide, status } });
    }
  },

  completeRide: () => {
    set({
      activeRide: null,
      pickup: null,
      destination: null,
      requestedPrice: null,
      rideOffers: []
    });
  },

  cancelRide: () => {
    set({
      activeRide: null,
      rideOffers: [],
      requestedPrice: null
    });
  }
}));
