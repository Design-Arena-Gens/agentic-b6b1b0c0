'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/rideStore';

interface RideRequestFormProps {
  lang: 'fr' | 'ar';
}

const translations = {
  fr: {
    pickup: 'Point de départ',
    destination: 'Destination',
    price: 'Votre prix (DZD)',
    search: 'Chercher un chauffeur',
    pickupPlaceholder: 'Entrez votre position',
    destPlaceholder: 'Où allez-vous?',
    pricePlaceholder: 'Ex: 500'
  },
  ar: {
    pickup: 'نقطة الانطلاق',
    destination: 'الوجهة',
    price: 'السعر المقترح (دج)',
    search: 'ابحث عن سائق',
    pickupPlaceholder: 'أدخل موقعك',
    destPlaceholder: 'إلى أين تذهب؟',
    pricePlaceholder: 'مثال: 500'
  }
};

// Algerian locations for demo
const locations = [
  { name: 'Place des Martyrs, Alger', lat: 36.7538, lng: 3.0588 },
  { name: 'Aéroport Houari Boumediene', lat: 36.6910, lng: 3.2154 },
  { name: 'Université d\'Alger', lat: 36.7174, lng: 3.1534 },
  { name: 'Riadh El Feth, Alger', lat: 36.7475, lng: 3.0533 },
  { name: 'Port d\'Alger', lat: 36.7656, lng: 3.0601 },
  { name: 'Bab El Oued', lat: 36.7831, lng: 3.0464 },
  { name: 'Hussein Dey', lat: 36.7382, lng: 3.1043 },
  { name: 'Sidi M\'Hamed', lat: 36.7550, lng: 3.0550 },
];

export default function RideRequestForm({ lang }: RideRequestFormProps) {
  const t = translations[lang];
  const { pickup, destination, requestedPrice, setPickup, setDestination, setRequestedPrice, submitRideRequest } = useRideStore();

  const [pickupSearch, setPickupSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [showPickupResults, setShowPickupResults] = useState(false);
  const [showDestResults, setShowDestResults] = useState(false);

  const handlePickupSelect = (location: typeof locations[0]) => {
    setPickup({ lat: location.lat, lng: location.lng, address: location.name });
    setPickupSearch(location.name);
    setShowPickupResults(false);
  };

  const handleDestSelect = (location: typeof locations[0]) => {
    setDestination({ lat: location.lat, lng: location.lng, address: location.name });
    setDestSearch(location.name);
    setShowDestResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && destination && requestedPrice) {
      submitRideRequest();
    }
  };

  const filteredPickupLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(pickupSearch.toLowerCase())
  );

  const filteredDestLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(destSearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.pickup}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
              <input
                type="text"
                value={pickupSearch}
                onChange={(e) => {
                  setPickupSearch(e.target.value);
                  setShowPickupResults(true);
                }}
                onFocus={() => setShowPickupResults(true)}
                placeholder={t.pickupPlaceholder}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>
            {showPickupResults && pickupSearch && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {filteredPickupLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePickupSelect(loc)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.destination}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary-500 rounded-full"></div>
              <input
                type="text"
                value={destSearch}
                onChange={(e) => {
                  setDestSearch(e.target.value);
                  setShowDestResults(true);
                }}
                onFocus={() => setShowDestResults(true)}
                placeholder={t.destPlaceholder}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>
            {showDestResults && destSearch && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {filteredDestLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDestSelect(loc)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.price}
            </label>
            <div className="relative">
              <input
                type="number"
                value={requestedPrice || ''}
                onChange={(e) => setRequestedPrice(Number(e.target.value))}
                placeholder={t.pricePlaceholder}
                min="100"
                step="50"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                DZD
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!pickup || !destination || !requestedPrice}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {t.search}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-primary-800">
              {lang === 'fr'
                ? "Proposez votre prix et les chauffeurs vous enverront leurs offres. Choisissez celle qui vous convient le mieux!"
                : "اقترح السعر الخاص بك وسيرسل لك السائقون عروضهم. اختر العرض الأفضل لك!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
