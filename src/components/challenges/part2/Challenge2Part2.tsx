'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle } from 'lucide-react';

interface Scenario {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function Challenge2Part2() {
  const { t } = useLanguage();
  const { completeChallenge } = useGame();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [droppedScenarios, setDroppedScenarios] = useState<Scenario[]>([]);
  const [showResult, setShowResult] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      text: t('scenario1'),
      isCorrect: false
    },
    {
      id: 2,
      text: t('scenario2'),
      isCorrect: true
    },
    {
      id: 3,
      text: t('scenario3'),
      isCorrect: false
    },
    {
      id: 4,
      text: t('scenario4'),
      isCorrect: true
    },
    {
      id: 5,
      text: t('scenario5'),
      isCorrect: true
    }
  ];

  const handleDragStart = (e: React.DragEvent | MouseEvent | TouchEvent | PointerEvent, scenarioId: number) => {
    setDraggedItem(scenarioId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, isCorrectZone: boolean) => {
    e.preventDefault();
    if (draggedItem !== null) {
      const scenario = scenarios.find(s => s.id === draggedItem);
      if (scenario && !droppedScenarios.find(s => s.id === scenario.id)) {
        // Verificar se o cenário foi solto na zona correta
        const isCorrectPlacement = scenario.isCorrect === isCorrectZone;
        setDroppedScenarios(prev => [...prev, { ...scenario, isCorrectPlacement }]);
      }
      setDraggedItem(null);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      completeChallenge(7); // Challenge 7 para Parte 2
    }, 3000);
  };

  const correctAnswers = droppedScenarios.filter(s => s.isCorrect).length;
  const incorrectAnswers = droppedScenarios.filter(s => !s.isCorrect).length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t('part2Challenge2Title')}
        </h2>
        <p className="text-lg text-gray-700">
          {t('part2Challenge2Description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenarios to drag */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 mb-3">
            {t('part2Challenge2Scenarios')}:
          </h3>
          {scenarios.filter(s => !droppedScenarios.find(d => d.id === s.id)).map((scenario) => (
            <motion.div
              key={scenario.id}
              draggable={!showResult}
              onDragStart={(e) => handleDragStart(e, scenario.id)}
              className={`p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-move hover:bg-blue-100 transition-colors ${
                showResult ? 'cursor-default' : ''
              }`}
              whileHover={!showResult ? { scale: 1.02 } : {}}
            >
              <p className="text-sm font-medium text-blue-800">
                {scenario.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Drop zones */}
        <div className="space-y-4">
          {/* Healthy zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, true)}
            className="min-h-32 p-4 border-2 border-dashed border-green-300 bg-green-50 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <h4 className="font-semibold text-green-800">
                {t('part2Challenge2HealthyZone')}
              </h4>
            </div>
            <div className="space-y-2">
              {droppedScenarios.filter(s => s.isCorrect).map((scenario) => (
                <div key={scenario.id} className="p-2 bg-green-100 border border-green-200 rounded text-sm">
                  <p className="font-medium text-green-800">{scenario.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risky zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, false)}
            className="min-h-32 p-4 border-2 border-dashed border-red-300 bg-red-50 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <XCircle className="text-red-500 mr-2" size={20} />
              <h4 className="font-semibold text-red-800">
                {t('part2Challenge2RiskyZone')}
              </h4>
            </div>
            <div className="space-y-2">
              {droppedScenarios.filter(s => !s.isCorrect).map((scenario) => (
                <div key={scenario.id} className="p-2 bg-red-100 border border-red-200 rounded text-sm">
                  <p className="font-medium text-red-800">{scenario.text}</p>
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
          {t('part2Challenge2Tip')}
        </p>
      </div>

      {droppedScenarios.length === scenarios.length && !showResult && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t('part2Challenge2Button')}
          </button>
        </div>
      )}

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Users className="text-blue-500 mr-2" size={20} />
            <span className="font-semibold text-blue-800">{t('part2Challenge2Result')}</span>
          </div>
          <p className="text-blue-700">
            {t('part2Challenge2HealthyCount')}: {correctAnswers} | {t('part2Challenge2RiskyCount')}: {incorrectAnswers}
          </p>
          <p className="text-blue-600 text-sm mt-2">
            {t('part2Challenge2Success')}
          </p>
        </motion.div>
      )}
    </div>
  );
}