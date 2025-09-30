'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Brain, DollarSign, Users, Shield, LucideIcon } from 'lucide-react';
import { TranslationKey } from '@/lib/translations';

export default function AboutPage() {
  const { t } = useLanguage();

  const dangers: Array<{
    icon: LucideIcon;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    color: string;
    bgColor: string;
  }> = [
    {
      icon: Heart,
      titleKey: 'aboutDanger1Title' as TranslationKey,
      descKey: 'aboutDanger1Desc' as TranslationKey,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Brain,
      titleKey: 'aboutDanger2Title' as TranslationKey,
      descKey: 'aboutDanger2Desc' as TranslationKey,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: DollarSign,
      titleKey: 'aboutDanger3Title' as TranslationKey,
      descKey: 'aboutDanger3Desc' as TranslationKey,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      titleKey: 'aboutDanger4Title' as TranslationKey,
      descKey: 'aboutDanger4Desc' as TranslationKey,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Shield,
      titleKey: 'aboutDanger5Title' as TranslationKey,
      descKey: 'aboutDanger5Desc' as TranslationKey,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('aboutSubtitle')}
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {t('aboutMissionTitle')}
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            {t('aboutMissionDesc')}
          </p>
        </motion.div>

        {/* Dangers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dangers.map((danger, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`${danger.bgColor} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className={`${danger.color} mb-4`}>
                <danger.icon size={48} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {t(danger.titleKey)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t(danger.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('aboutStatsTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">27%</div>
              <p className="opacity-90">{t('aboutStat1')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3.6M</div>
              <p className="opacity-90">{t('aboutStat2')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="opacity-90">{t('aboutStat3')}</p>
            </div>
          </div>
        </motion.div>

        {/* How to Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {t('aboutHelpTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">
                {t('aboutHelpParentsTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('aboutHelpParentsDesc')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                {t('aboutHelpTeensTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('aboutHelpTeensDesc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {t('aboutCtaTitle')}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {t('aboutCtaDesc')}
          </p>
          <motion.a
            href="/game"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            {t('startGame')}
          </motion.a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}