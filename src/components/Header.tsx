'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-purple-100 mt-1">{t('subtitle')}</p>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-purple-200 transition-colors font-medium"
            >
              {t('home')}
            </Link>
            <Link 
              href="/game" 
              className="hover:text-purple-200 transition-colors font-medium"
            >
              {t('game')}
            </Link>
            <Link 
              href="/about" 
              className="hover:text-purple-200 transition-colors font-medium"
            >
              {t('about')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
              title={t('language')}
            >
              <Languages size={18} />
              <span className="text-sm font-medium">
                {language === 'pt-BR' ? 'PT' : 'EN'}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}