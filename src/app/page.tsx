'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { Play, Info, Trophy, CheckCircle, Lock } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🔓
          </motion.div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/game">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="mr-2" size={24} />
                {gameState.completedChallenges.length > 0 ? t('continuePart1') : t('startPart1')}
              </motion.button>
            </Link>

            {/* Part 2 Button - Show if Part 1 is completed */}
            {gameState.isGameCompleted && (
              <Link href="/game2">
                <motion.button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trophy className="mr-2" size={24} />
                  {t('startPart2')}
                </motion.button>
              </Link>
            )}
            
            <Link href="/about">
              <motion.button
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Info className="mr-2" size={24} />
                {t('about')}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Progress Section */}
        {gameState.completedChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProgressBar />
          </motion.div>
        )}

        {/* Game Completion */}
        {gameState.isGameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-8 text-center mb-8"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Trophy className="mr-2" size={32} />
              {t('completed')}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'pt-BR' 
                ? 'Você completou todos os desafios e aprendeu como escapar do vício!'
                : 'You completed all challenges and learned how to escape addiction!'
              }
            </p>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('instructions')}</h2>
          <p className="text-gray-600 mb-6">{t('instructionsContent')}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">
                {t('challengesTitle')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((challenge) => (
                  <div
                    key={challenge}
                    className={`p-3 rounded-lg text-center text-sm ${
                      gameState.completedChallenges.includes(challenge)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {gameState.completedChallenges.includes(challenge) ? (
                      <CheckCircle className="mx-auto mb-1" size={20} />
                    ) : (
                      <Lock className="mx-auto mb-1" size={20} />
                    )}
                    {t(`enigma${challenge}`)}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                {t('howToPlay')}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• {t('instruction1')}</li>
                <li>• {t('instruction2')}</li>
                <li>• {t('instruction3')}</li>
                <li>• {t('instruction4')}</li>
                <li>• {t('instruction5')}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
