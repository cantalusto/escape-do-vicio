'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GameState {
  completedChallenges: number[];
  currentChallenge: number;
  isGameCompleted: boolean;
}

interface GameContextType {
  gameState: GameState;
  completeChallenge: (challengeId: number) => void;
  setCurrentChallenge: (challengeId: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  completedChallenges: [],
  currentChallenge: 1,
  isGameCompleted: false,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Removed localStorage persistence - game state resets on page reload

  const completeChallenge = (challengeId: number) => {
    setGameState(prev => {
      const newCompletedChallenges = prev.completedChallenges.includes(challengeId)
        ? prev.completedChallenges
        : [...prev.completedChallenges, challengeId];
      
      // Parte 1: desafios 1-5
      const isPart1Completed = newCompletedChallenges.filter(id => id <= 5).length === 5;
      // Parte 2: desafios 6-8
      const isPart2Completed = newCompletedChallenges.filter(id => id >= 6 && id <= 8).length === 3;
      
      let newCurrentChallenge = prev.currentChallenge;
      
      // Se estamos na Parte 1 (desafios 1-5)
      if (challengeId <= 5) {
        newCurrentChallenge = isPart1Completed ? prev.currentChallenge : Math.min(challengeId + 1, 5);
      }
      // Se estamos na Parte 2 (desafios 6-8)
      else if (challengeId >= 6 && challengeId <= 8) {
        newCurrentChallenge = isPart2Completed ? prev.currentChallenge : Math.min(challengeId + 1, 8);
      }
      
      return {
        ...prev,
        completedChallenges: newCompletedChallenges,
        isGameCompleted: isPart1Completed && isPart2Completed,
        currentChallenge: newCurrentChallenge,
      };
    });
  };

  const setCurrentChallenge = (challengeId: number) => {
    setGameState(prev => ({
      ...prev,
      currentChallenge: challengeId,
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider value={{ gameState, completeChallenge, setCurrentChallenge, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}