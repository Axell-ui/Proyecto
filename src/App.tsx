import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { GameBoard } from './components/GameBoard';
import { BossFight } from './components/BossFight';
import { RewardScreen } from './components/RewardScreen';

export type Universe = 'volcania' | 'frostheim' | 'neural' | 'verdalis' | 'lunaris';

export type GameScreen = 'menu' | 'game' | 'boss' | 'reward';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [selectedUniverse, setSelectedUniverse] = useState<Universe | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedPowers, setUnlockedPowers] = useState<Universe[]>([]);

  const handleUniverseSelect = (universe: Universe) => {
    setSelectedUniverse(universe);
    setCurrentScreen('game');
    setCurrentLevel(1);
  };

  const handleLevelComplete = () => {
    if (currentLevel >= 3) {
      setCurrentScreen('boss');
    } else {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleBossDefeated = () => {
    if (selectedUniverse && !unlockedPowers.includes(selectedUniverse)) {
      setUnlockedPowers([...unlockedPowers, selectedUniverse]);
    }
    setCurrentScreen('reward');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setSelectedUniverse(null);
  };

  const handleReplay = () => {
    setCurrentLevel(1);
    setCurrentScreen('game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {currentScreen === 'menu' && (
        <MainMenu 
          onUniverseSelect={handleUniverseSelect}
          unlockedPowers={unlockedPowers}
        />
      )}
      
      {currentScreen === 'game' && selectedUniverse && (
        <GameBoard
          universe={selectedUniverse}
          level={currentLevel}
          onLevelComplete={handleLevelComplete}
          onBackToMenu={handleBackToMenu}
        />
      )}
      
      {currentScreen === 'boss' && selectedUniverse && (
        <BossFight
          universe={selectedUniverse}
          onBossDefeated={handleBossDefeated}
          onBackToMenu={handleBackToMenu}
        />
      )}
      
      {currentScreen === 'reward' && selectedUniverse && (
        <RewardScreen
          universe={selectedUniverse}
          onBackToMenu={handleBackToMenu}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
}