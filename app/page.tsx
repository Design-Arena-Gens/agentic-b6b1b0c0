'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRideStore } from '@/store/rideStore';
import Header from '@/components/Header';
import RideRequestForm from '@/components/RideRequestForm';
import RideOffers from '@/components/RideOffers';
import ActiveRide from '@/components/ActiveRide';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
      <p className="text-gray-600">Chargement de la carte...</p>
    </div>
  ),
});

export default function Home() {
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const { activeRide, rideOffers } = useRideStore();

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header lang={lang} onLanguageChange={setLang} />

      <div className="flex-1 relative overflow-hidden">
        <MapView />

        <div className="absolute inset-x-0 bottom-0 z-[1000] pointer-events-none">
          <div className="pointer-events-auto">
            {activeRide ? (
              <ActiveRide lang={lang} />
            ) : rideOffers.length > 0 ? (
              <RideOffers lang={lang} />
            ) : (
              <RideRequestForm lang={lang} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
