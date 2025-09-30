'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Heart, CheckCircle } from 'lucide-react';

export default function Challenge1Part2() {
  const { t } = useLanguage();
  const { completeChallenge } = useGame();
  const [lungCapacity, setLungCapacity] = useState(100);
  const [showResult, setShowResult] = useState(false);

  const handleSliderChange = (value: number) => {
    setLungCapacity(value);
  };

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      completeChallenge(6); // Challenge 6 para Parte 2
    }, 3000);
  };

  const getLungColor = () => {
    if (lungCapacity >= 80) return 'text-green-500';
    if (lungCapacity >= 60) return 'text-yellow-500';
    if (lungCapacity >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getLungMessage = () => {
    if (lungCapacity >= 80) return t('healthyLung') || 'Pulmão Saudável';
    if (lungCapacity >= 60) return t('reducedCapacity') || 'Capacidade Reduzida';
    if (lungCapacity >= 40) return t('moderateDamage') || 'Danos Moderados';
    return t('severeDamage') || 'Danos Severos';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t('part2Challenge1Title')}
        </h2>
        <p className="text-lg text-gray-700">
          {t('part2Challenge1Description')}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* Heart Visualization representing lung health */}
        <div className="flex items-center justify-center mb-6">
          <Heart 
            size={80} 
            className={`transition-colors duration-300 ${getLungColor()}`}
          />
        </div>

        {/* Capacity Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getLungColor()}`}>
            {lungCapacity}%
          </div>
          <div className="text-lg text-gray-600 mt-2">
            {getLungMessage()}
          </div>
        </div>

        {/* Slider */}
        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('lungCapacityLabel')}
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={lungCapacity}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            disabled={showResult}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>20%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Educational Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
          <h4 className="font-semibold text-blue-800 mb-2">
            💡 {t('didYouKnow')}
          </h4>
          <p className="text-blue-700 text-sm">
            {t('part2Challenge1Info')}
          </p>
        </div>

        {!showResult ? (
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t('part2Challenge1Button')}
          </button>
        ) : (
          <div className="w-full space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 w-full text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="text-green-500 mr-2" size={20} />
                <span className="font-semibold text-green-800">{t('part2Challenge1HealthyLungs')}</span>
              </div>
              <p className="text-green-700">
                {t('part2Challenge1Success')}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}