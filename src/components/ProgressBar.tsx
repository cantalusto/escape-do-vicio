'use client';

import { useGame } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const { gameState } = useGame();
  const { t } = useLanguage();

  const challenges = [
    { id: 1, name: t('enigma1') },
    { id: 2, name: t('enigma2') },
    { id: 3, name: t('enigma3') },
    { id: 4, name: t('enigma4') },
    { id: 5, name: t('enigma5') },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-full overflow-hidden">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('progress')}</h3>
      
      <div className="w-full">
        {/* Challenges with connecting lines */}
        <div className="flex items-center justify-between w-full">
          {challenges.map((challenge, index) => {
            const isCompleted = gameState.completedChallenges.includes(challenge.id);
            const isCurrent = gameState.currentChallenge === challenge.id;
            
            return (
              <div key={challenge.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
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
                      <Unlock size={20} />
                    ) : (
                      <Lock size={20} />
                    )}
                  </motion.div>
                  
                  <span className={`text-xs text-center max-w-20 ${
                    isCompleted ? 'text-green-600 font-semibold' : 'text-gray-600'
                  }`}>
                    {challenge.name}
                  </span>
                </div>
                
                {/* Connection line - only show between challenges, not after the last one */}
                {index < challenges.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    gameState.completedChallenges.includes(challenge.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-200 rounded-full h-3 w-full">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(gameState.completedChallenges.length / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {gameState.isGameCompleted && (
          <p className="text-center text-gray-600 mt-2">
            {t('completed')}
          </p>
        )}
      </div>
    </div>
  );
}