import React from 'react';

interface HeaderProps {
  lang: 'fr' | 'ar';
  onLanguageChange: (lang: 'fr' | 'ar') => void;
}

const translations = {
  fr: {
    title: 'Dinim3ak',
    tagline: 'Votre VTC en Algérie'
  },
  ar: {
    title: 'دينيمعاك',
    tagline: 'خدمة النقل الخاصة بك في الجزائر'
  }
};

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg z-[1001]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white text-primary-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
            D
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-xs text-primary-100">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onLanguageChange(lang === 'fr' ? 'ar' : 'fr')}
            className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
          >
            {lang === 'fr' ? 'العربية' : 'Français'}
          </button>

          <button className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
