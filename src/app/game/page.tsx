'use client';

import { useGame } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import Challenge1 from '@/components/challenges/Challenge1';
import Challenge2 from '@/components/challenges/Challenge2';
import Challenge3 from '@/components/challenges/Challenge3';
import Challenge4 from '@/components/challenges/Challenge4';
import Challenge5 from '@/components/challenges/Challenge5';
import { ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
  const { gameState, setCurrentChallenge, resetGame } = useGame();
  const { t, language } = useLanguage();

  const challenges = [
    { id: 1, component: Challenge1 },
    { id: 2, component: Challenge2 },
    { id: 3, component: Challenge3 },
    { id: 4, component: Challenge4 },
    { id: 5, component: Challenge5 },
  ];

  const currentChallengeData = challenges.find(c => c.id === gameState.currentChallenge);
  const CurrentChallengeComponent = currentChallengeData?.component || Challenge1;

  const canGoToNext = gameState.currentChallenge < 5 && gameState.completedChallenges.includes(gameState.currentChallenge);

  const handleNext = () => {
    if (canGoToNext) {
      setCurrentChallenge(gameState.currentChallenge + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <ProgressBar />

        {/* Game Completion Celebration */}
        {gameState.isGameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
            <p className="text-xl opacity-90 mb-6">
              {language === 'pt-BR' 
                ? 'Você completou todos os desafios e aprendeu como escapar do vício!'
                : 'You completed all challenges and learned how to escape addiction!'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <RotateCcw className="mr-2" size={20} />
                {t('playAgain')}
              </button>
              <Link href="/game2">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Trophy className="mr-2" size={20} />
                  {t('startPart2')}
                </button>
              </Link>
              <Link href="/">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  {t('backToHome')}
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Challenge Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.currentChallenge}
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
                {t('challenge')} {gameState.currentChallenge} {t('of')} 5
              </p>
              
              {/* Single Advance Button - Only visible and clickable when challenge is completed */}
              {gameState.completedChallenges.includes(gameState.currentChallenge) && gameState.currentChallenge < 5 && (
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
          {!gameState.completedChallenges.includes(gameState.currentChallenge) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 text-center"
            >
              <p className="text-yellow-800">
                💡 {t('completeToUnlock')}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}