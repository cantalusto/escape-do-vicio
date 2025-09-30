'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { CheckCircle, Cigarette, Trophy, X } from 'lucide-react';

interface Strategy {
  id: number;
  text: string;
  textEn: string;
  category: 'physical' | 'mental';
}

export default function Challenge3Part2() {
  const { t } = useLanguage();
  const { completeChallenge } = useGame();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<'available' | 'physical' | 'mental' | null>(null);
  const [categorizedStrategies, setCategorizedStrategies] = useState<{
    physical: Strategy[];
    mental: Strategy[];
  }>({
    physical: [],
    mental: []
  });
  const [showResult, setShowResult] = useState(false);

  const strategies: Strategy[] = [
    {
      id: 1,
      text: t('strategy1'),
      textEn: t('strategy1'),
      category: 'physical'
    },
    {
      id: 2,
      text: t('strategy2'),
      textEn: t('strategy2'),
      category: 'mental'
    },
    {
      id: 3,
      text: t('strategy3'),
      textEn: t('strategy3'),
      category: 'physical'
    },
    {
      id: 4,
      text: t('strategy4'),
      textEn: t('strategy4'),
      category: 'physical'
    },
    {
      id: 5,
      text: t('strategy5'),
      textEn: t('strategy5'),
      category: 'mental'
    },
    {
      id: 6,
      text: t('strategy6'),
      textEn: t('strategy6'),
      category: 'physical'
    },
    {
      id: 7,
      text: t('strategy7'),
      textEn: t('strategy7'),
      category: 'mental'
    },
    {
      id: 8,
      text: t('strategy8'),
      textEn: t('strategy8'),
      category: 'physical'
    }
  ];

  const handleDragStart = (e: React.DragEvent | MouseEvent | TouchEvent | PointerEvent, strategyId: number, from: 'available' | 'physical' | 'mental' = 'available') => {
    setDraggedItem(strategyId);
    setDraggedFrom(from);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, category: 'physical' | 'mental') => {
    e.preventDefault();
    if (draggedItem !== null && draggedFrom !== null) {
      const strategy = strategies.find(s => s.id === draggedItem);
      if (strategy) {
        // Remove from previous location
        if (draggedFrom === 'physical') {
          setCategorizedStrategies(prev => ({
            ...prev,
            physical: prev.physical.filter(s => s.id !== draggedItem)
          }));
        } else if (draggedFrom === 'mental') {
          setCategorizedStrategies(prev => ({
            ...prev,
            mental: prev.mental.filter(s => s.id !== draggedItem)
          }));
        }

        // Add to new location
        setCategorizedStrategies(prev => ({
          ...prev,
          [category]: [...prev[category], strategy]
        }));
      }
      setDraggedItem(null);
      setDraggedFrom(null);
    }
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem !== null && draggedFrom !== null && draggedFrom !== 'available') {
      // Remove from current zone
      if (draggedFrom === 'physical') {
        setCategorizedStrategies(prev => ({
          ...prev,
          physical: prev.physical.filter(s => s.id !== draggedItem)
        }));
      } else if (draggedFrom === 'mental') {
        setCategorizedStrategies(prev => ({
          ...prev,
          mental: prev.mental.filter(s => s.id !== draggedItem)
        }));
      }
      setDraggedItem(null);
      setDraggedFrom(null);
    }
  };

  const removeFromZone = (strategyId: number, zone: 'physical' | 'mental') => {
    setCategorizedStrategies(prev => ({
      ...prev,
      [zone]: prev[zone].filter(s => s.id !== strategyId)
    }));
  };

  const isStrategyAlreadyDropped = (strategyId: number) => {
    return Object.values(categorizedStrategies).some(category => 
      category.some(strategy => strategy.id === strategyId)
    );
  };

  const isValidConfiguration = () => {
    // Check if all strategies in physical zone are actually correct (category: 'physical')
    const physicalCorrect = categorizedStrategies.physical.every(s => s.category === 'physical');
    // Check if all strategies in mental zone are actually negative (category: 'mental')
    const mentalCorrect = categorizedStrategies.mental.every(s => s.category === 'mental');
    // Check if all strategies are placed
    const allPlaced = getTotalDropped() === strategies.length;
    
    return physicalCorrect && mentalCorrect && allPlaced;
  };

  const handleSubmit = () => {
    if (isValidConfiguration()) {
      setShowResult(true);
      setTimeout(() => {
        completeChallenge(8); // Challenge 8 para Parte 2
      }, 3000);
    }
  };

  const getCorrectCount = (category: 'physical' | 'mental') => {
    return categorizedStrategies[category].filter(s => s.category === category).length;
  };

  const getTotalDropped = () => {
    return Object.values(categorizedStrategies).reduce((total, category) => total + category.length, 0);
  };

  const physicalCount = getCorrectCount('physical');
  const mentalCount = getCorrectCount('mental');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t('part2Challenge3Title')}
        </h2>
        <p className="text-lg text-gray-700">
          {t('part2Challenge3Description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available strategies */}
        <div 
          className="space-y-3"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          <h3 className="font-semibold text-gray-800 mb-3">
            {t('part2Challenge3AvailableStrategies')}:
          </h3>
          <div className="min-h-24 p-4 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
            {strategies.filter(s => !isStrategyAlreadyDropped(s.id)).map((strategy) => (
              <motion.div
                key={strategy.id}
                draggable={!showResult}
                onDragStart={(e) => handleDragStart(e, strategy.id, 'available')}
                className={`p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-gray-100 transition-colors mb-2 ${
                  showResult ? 'cursor-default' : ''
                }`}
                whileHover={!showResult ? { scale: 1.02 } : {}}
              >
                <p className="text-sm font-medium text-gray-800">
                  {strategy.text}
                </p>
              </motion.div>
            ))}
            {strategies.filter(s => !isStrategyAlreadyDropped(s.id)).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                {t('allStrategiesClassified')}
              </p>
            )}
          </div>
        </div>

        {/* Drop zones */}
        <div className="space-y-4">
          {/* Correct strategies */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'physical')}
            className="min-h-24 p-4 border-2 border-dashed border-green-300 bg-green-50 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <h4 className="font-semibold text-green-800">
                {t('part2Challenge3PhysicalZone')}
              </h4>
            </div>
            <div className="space-y-2">
              {categorizedStrategies.physical.map((strategy) => (
                <div key={strategy.id} className="p-2 bg-green-100 border border-green-200 rounded text-sm">
                  <div className="flex items-center">
                    <div 
                      className="flex-1 cursor-move"
                      draggable={!showResult}
                      onDragStart={(e) => handleDragStart(e, strategy.id, 'physical')}
                    >
                      <p className="font-medium text-green-800">{strategy.text}</p>
                    </div>
                    {!showResult && (
                      <button
                        onClick={() => removeFromZone(strategy.id, 'physical')}
                        className="text-green-600 hover:text-green-800 ml-2"
                        title="Remover"
                      >
                        <X size={16} />
                      </button>
                    )}
                    {showResult && strategy.category === 'physical' && (
                      <CheckCircle className="text-green-600 ml-auto" size={16} />
                    )}
                    {showResult && strategy.category !== 'physical' && (
                      <X className="text-red-600 ml-auto" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Negative strategies */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'mental')}
            className="min-h-24 p-4 border-2 border-dashed border-red-300 bg-red-50 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <Cigarette className="text-red-500 mr-2" size={20} />
              <h4 className="font-semibold text-red-800">
                {t('part2Challenge3MentalZone')}
              </h4>
            </div>
            <div className="space-y-2">
              {categorizedStrategies.mental.map((strategy) => (
                <div key={strategy.id} className="p-2 bg-red-100 border border-red-200 rounded text-sm">
                  <div className="flex items-center">
                    <div 
                      className="flex-1 cursor-move"
                      draggable={!showResult}
                      onDragStart={(e) => handleDragStart(e, strategy.id, 'mental')}
                    >
                      <p className="font-medium text-red-800">{strategy.text}</p>
                    </div>
                    {!showResult && (
                      <button
                        onClick={() => removeFromZone(strategy.id, 'mental')}
                        className="text-red-600 hover:text-red-800 ml-2"
                        title="Remover"
                      >
                        <X size={16} />
                      </button>
                    )}
                    {showResult && strategy.category === 'mental' && (
                      <CheckCircle className="text-red-600 ml-auto" size={16} />
                    )}
                    {showResult && strategy.category !== 'mental' && (
                      <X className="text-red-600 ml-auto" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-yellow-800 mb-2">
          💡 {t('tip')}:
        </h4>
        <p className="text-yellow-700 text-sm">
          {t('part2Challenge3Tip')}
        </p>
      </div>

      {/* Validation message */}
      {getTotalDropped() === strategies.length && !isValidConfiguration() && !showResult && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
          <p className="text-orange-800 text-center">
            ⚠️ Algumas estratégias não estão na categoria correta. Revise sua classificação!
          </p>
        </div>
      )}

      {getTotalDropped() === strategies.length && isValidConfiguration() && !showResult && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t('part2Challenge3Button')}
          </button>
        </div>
      )}

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mt-6 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="text-yellow-500 mr-2" size={24} />
            <span className="font-bold text-purple-800 text-lg">{t('part2Challenge3Result')}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-500 mx-auto mb-1" size={20} />
              <p className="text-green-800 font-semibold">{t('part2Challenge3PhysicalCount')}: {physicalCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Cigarette className="text-red-500 mx-auto mb-1" size={20} />
              <p className="text-red-800 font-semibold">{t('part2Challenge3MentalCount')}: {mentalCount}</p>
            </div>
          </div>
          <p className="text-purple-700 font-medium">
            🎉 {t('part2Challenge3Success')} 🎉
          </p>
        </motion.div>
      )}
    </div>
  );
}