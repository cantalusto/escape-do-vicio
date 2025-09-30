'use client';

import { useGame } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Challenge1Part2 from '@/components/challenges/part2/Challenge1Part2';
import Challenge2Part2 from '@/components/challenges/part2/Challenge2Part2';
import Challenge3Part2 from '@/components/challenges/part2/Challenge3Part2';
import { ArrowRight, Trophy, Star } from 'lucide-react';
import Link from 'next/link';

export default function Game2Page() {
  const { gameState, setCurrentChallenge } = useGame();
  const { t } = useLanguage();

  // Parte 2 usa challenges 6, 7, 8
  const part2Challenges = [
    { id: 6, component: Challenge1Part2, title: 'Capacidade Pulmonar' },
    { id: 7, component: Challenge2Part2, title: 'Cenários Sociais' },
    { id: 8, component: Challenge3Part2, title: 'Estratégias de Superação' },
  ];

  // Ajustar currentChallenge para Parte 2 (6-8)
  const currentPart2Challenge = gameState.currentChallenge >= 6 ? gameState.currentChallenge : 6;
  const currentChallengeData = part2Challenges.find(c => c.id === currentPart2Challenge);
  const CurrentChallengeComponent = currentChallengeData?.component || Challenge1Part2;

  const canGoToNext = currentPart2Challenge < 8 && gameState.completedChallenges.includes(currentPart2Challenge);
  const isPart2Completed = gameState.completedChallenges.includes(6) && 
                           gameState.completedChallenges.includes(7) && 
                           gameState.completedChallenges.includes(8);

  const handleNext = () => {
    if (canGoToNext) {
      setCurrentChallenge(currentPart2Challenge + 1);
    }
  };

  const getProgress = () => {
    const completed = part2Challenges.filter(c => gameState.completedChallenges.includes(c.id)).length;
    return (completed / part2Challenges.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Part 2 Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {t('part2Title')}
            </h3>
            <Link href="/about">
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                ℹ️ {t('about')}
              </button>
            </Link>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            {part2Challenges.map((challenge, index) => {
              const isCompleted = gameState.completedChallenges.includes(challenge.id);
              const isCurrent = currentPart2Challenge === challenge.id;
              
              return (
                <div key={challenge.id} className="flex flex-col items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-purple-500 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isCompleted ? (
                      <Star size={20} />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </motion.div>
                  <span className="text-xs text-center text-gray-600 max-w-20">
                    {challenge.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2 Completion Celebration */}
        {isPart2Completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg p-8 text-center mb-8"
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
              🌟
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Trophy className="mr-2" size={32} />
              {t('part2Complete')}
            </h2>
            <p className="text-xl opacity-90 mb-6">
              {t('part2CompleteMessage')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {t('about')}
                </button>
              </Link>
              <Link href="/">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  {t('home')}
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Challenge Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPart2Challenge}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentChallengeComponent />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {t('challenge')} {currentPart2Challenge - 5} {t('of')} 3
              </p>
              
              {/* Single Advance Button - Only visible and clickable when challenge is completed */}
              {gameState.completedChallenges.includes(currentPart2Challenge) && currentPart2Challenge < 8 && (
                <button
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 rounded-lg font-semibold transition-all bg-green-600 text-white hover:bg-green-700"
                >
                  {t('advance')}
                  <ArrowRight className="ml-2" size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Hint for locked challenges */}
          {!gameState.completedChallenges.includes(currentPart2Challenge) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4 text-gray-600"
            >
              <p className="text-sm">
                {t('completeToUnlock')}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}