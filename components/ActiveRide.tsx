'use client';

import { useRideStore } from '@/store/rideStore';

interface ActiveRideProps {
  lang: 'fr' | 'ar';
}

const translations = {
  fr: {
    accepted: 'Course acceptée',
    arriving: 'Le chauffeur arrive',
    inProgress: 'Course en cours',
    completed: 'Course terminée',
    cancel: 'Annuler',
    complete: 'Terminer',
    rating: 'Note',
    estimatedTime: 'min',
    pickup: 'Départ',
    destination: 'Arrivée',
    price: 'Prix',
    callDriver: 'Appeler le chauffeur',
    messageDriver: 'Envoyer un message'
  },
  ar: {
    accepted: 'تم قبول الرحلة',
    arriving: 'السائق في الطريق',
    inProgress: 'الرحلة جارية',
    completed: 'اكتملت الرحلة',
    cancel: 'إلغاء',
    complete: 'إنهاء',
    rating: 'التقييم',
    estimatedTime: 'دقيقة',
    pickup: 'الانطلاق',
    destination: 'الوصول',
    price: 'السعر',
    callDriver: 'الاتصال بالسائق',
    messageDriver: 'إرسال رسالة'
  }
};

export default function ActiveRide({ lang }: ActiveRideProps) {
  const t = translations[lang];
  const { activeRide, updateRideStatus, completeRide, cancelRide } = useRideStore();

  if (!activeRide) return null;

  const getStatusText = () => {
    switch (activeRide.status) {
      case 'accepted':
        return t.accepted;
      case 'arriving':
        return t.arriving;
      case 'in-progress':
        return t.inProgress;
      case 'completed':
        return t.completed;
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (activeRide.status) {
      case 'accepted':
        return 'bg-blue-500';
      case 'arriving':
        return 'bg-yellow-500';
      case 'in-progress':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-up">
      <div className="max-w-2xl mx-auto">
        {/* Status Banner */}
        <div className={`${getStatusColor()} text-white text-center py-3 rounded-xl mb-6 font-semibold`}>
          {getStatusText()}
        </div>

        {/* Driver Info Card */}
        <div className="border-2 border-primary-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-4">
            {/* Driver Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {activeRide.driverName.charAt(0)}
            </div>

            {/* Driver Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                {activeRide.driverName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  {activeRide.driverRating.toFixed(1)}
                </span>
                <span>•</span>
                <span>{activeRide.estimatedTime} {t.estimatedTime}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activeRide.carModel} {activeRide.carColor}
              </p>
              <p className="text-xs text-gray-500">
                {activeRide.plateNumber}
              </p>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {activeRide.price}
              </div>
              <div className="text-xs text-gray-500">DZD</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">{t.callDriver}</span>
            </button>

            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">{t.messageDriver}</span>
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">{t.pickup}</div>
              <div className="text-sm font-medium text-gray-900">
                {activeRide.pickup.address}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">{t.destination}</div>
              <div className="text-sm font-medium text-gray-900">
                {activeRide.destination.address}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {activeRide.status !== 'completed' && (
            <>
              <button
                onClick={cancelRide}
                className="py-3 px-4 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors"
              >
                {t.cancel}
              </button>

              {activeRide.status === 'arriving' && (
                <button
                  onClick={() => updateRideStatus('in-progress')}
                  className="py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                >
                  {lang === 'fr' ? 'Démarrer' : 'ابدأ'}
                </button>
              )}

              {activeRide.status === 'in-progress' && (
                <button
                  onClick={completeRide}
                  className="py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
                >
                  {t.complete}
                </button>
              )}
            </>
          )}

          {activeRide.status === 'completed' && (
            <button
              onClick={completeRide}
              className="col-span-2 py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
            >
              {lang === 'fr' ? 'Nouvelle course' : 'رحلة جديدة'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
