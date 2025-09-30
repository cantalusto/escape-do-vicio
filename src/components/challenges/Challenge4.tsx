'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Users } from 'lucide-react';

export default function Challenge4() {
  const { t, tArray } = useLanguage();
  const { completeChallenge } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswer = 2; // "Porque sofrem influência de amigos ou querem se encaixar no grupo"
  const options = tArray('question4Options');

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setIsCorrect(index === correctAnswer);
    
    // Não prosseguir automaticamente - usuário deve clicar em "Seguir"
  };

  const resetChallenge = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Users className="text-blue-500 mr-2" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">{t('enigma4')}</h2>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-lg text-gray-700 font-medium text-center">
            {t('question4')}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? showResult
                  ? index === correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                  : 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
            } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleAnswerSelect(index)}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
            disabled={showResult}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {showResult && selectedAnswer === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {index === correctAnswer ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center mb-2">
            {isCorrect ? (
              <CheckCircle className="text-green-500 mr-2" size={20} />
            ) : (
              <XCircle className="text-red-500 mr-2" size={20} />
            )}
            <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? t('correct') : t('incorrect')}
            </span>
          </div>
          
          <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'} mb-4`}>
            {t('question4Explanation')}
          </p>

          <div className="flex gap-3">
            {!isCorrect && (
              <button
                onClick={resetChallenge}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('tryAgain')}
              </button>
            )}
            {isCorrect && (
              <button
                onClick={() => {
                  setTimeout(() => {
                    completeChallenge(4);
                  }, 500);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                {t('continue')} →
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}