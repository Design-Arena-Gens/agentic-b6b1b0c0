'use client';

import { useRideStore } from '@/store/rideStore';

interface RideOffersProps {
  lang: 'fr' | 'ar';
}

const translations = {
  fr: {
    title: 'Offres disponibles',
    accept: 'Accepter',
    cancel: 'Annuler',
    rating: 'Note',
    estimatedTime: 'min',
    waiting: 'En attente d\'offres...'
  },
  ar: {
    title: 'العروض المتاحة',
    accept: 'قبول',
    cancel: 'إلغاء',
    rating: 'التقييم',
    estimatedTime: 'دقيقة',
    waiting: 'في انتظار العروض...'
  }
};

export default function RideOffers({ lang }: RideOffersProps) {
  const t = translations[lang];
  const { rideOffers, acceptOffer, cancelRide } = useRideStore();

  if (rideOffers.length === 0) {
    return (
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-up">
        <div className="max-w-2xl mx-auto text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-lg text-gray-600">{t.waiting}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <button
            onClick={cancelRide}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {t.cancel}
          </button>
        </div>

        <div className="space-y-3">
          {rideOffers.map((offer) => (
            <div
              key={offer.id}
              className="border-2 border-gray-200 rounded-xl p-4 hover:border-primary-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Driver Avatar */}
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {offer.driverName.charAt(0)}
                  </div>

                  {/* Driver Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {offer.driverName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        {offer.driverRating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{offer.estimatedTime} {t.estimatedTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {offer.carModel} {offer.carColor} • {offer.plateNumber}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-primary-600">
                      {offer.price}
                    </div>
                    <div className="text-xs text-gray-500">DZD</div>
                  </div>
                </div>

                {/* Accept Button */}
                <button
                  onClick={() => acceptOffer(offer)}
                  className="ml-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg flex-shrink-0"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Best Price Indicator */}
        {rideOffers.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">
                {lang === 'fr'
                  ? `Meilleur prix: ${rideOffers[0].price} DZD`
                  : `أفضل سعر: ${rideOffers[0].price} دج`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
