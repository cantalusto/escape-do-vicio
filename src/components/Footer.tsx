'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300">{t('madeWith')}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{t('language')}:</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Languages size={18} />
              <span className="font-medium">
                {language === 'pt-BR' ? 'Português' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}