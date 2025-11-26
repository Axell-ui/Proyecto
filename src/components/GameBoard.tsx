import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryCard } from './MemoryCard';
import { ArrowLeft, Star, Zap } from 'lucide-react';
import type { Universe } from '../App';

interface GameBoardProps {
  universe: Universe;
  level: number;
  onLevelComplete: () => void;
  onBackToMenu: () => void;
}

const universeConfig = {
  volcania: {
    name: 'Volcania',
    gradient: 'from-orange-600/20 via-red-600/20 to-amber-600/20',
    bgGradient: 'from-orange-950 via-red-950 to-black',
    glowColor: '#ff4500',
    symbols: ['🔥', '🌋', '💥', '⚡', '☄️', '🔴', '🟠', '🟡'],
  },
  frostheim: {
    name: 'Frostheim',
    gradient: 'from-cyan-400/20 via-blue-500/20 to-indigo-500/20',
    bgGradient: 'from-cyan-950 via-blue-950 to-black',
    glowColor: '#00d4ff',
    symbols: ['❄️', '🧊', '💎', '🔷', '🔹', '⭐', '💠', '🌨️'],
  },
  neural: {
    name: 'Neural Nexus',
    gradient: 'from-emerald-400/20 via-teal-500/20 to-cyan-500/20',
    bgGradient: 'from-emerald-950 via-teal-950 to-black',
    glowColor: '#00ff88',
    symbols: ['🧠', '🔮', '💚', '🟢', '✨', '⚛️', '🌐', '📡'],
  },
  verdalis: {
    name: 'Verdalis',
    gradient: 'from-lime-500/20 via-green-500/20 to-emerald-600/20',
    bgGradient: 'from-lime-950 via-green-950 to-black',
    glowColor: '#7fff00',
    symbols: ['🌿', '🍃', '🌱', '🌳', '🦋', '🐛', '🌺', '🌸'],
  },
  lunaris: {
    name: 'Lunaris',
    gradient: 'from-purple-400/20 via-violet-500/20 to-purple-600/20',
    bgGradient: 'from-purple-950 via-violet-950 to-black',
    glowColor: '#b19cd9',
    symbols: ['🌙', '⭐', '🌟', '✨', '💜', '🟣', '🔮', '🪐'],
  },
};

type CardType = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function GameBoard({ universe, level, onLevelComplete, onBackToMenu }: GameBoardProps) {
  const config = universeConfig[universe];
  const cardCount = 8 + (level - 1) * 4; // Más cartas en niveles superiores
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  // Initialize cards
  useEffect(() => {
    const symbols = [...config.symbols].slice(0, cardCount / 2);
    const duplicatedSymbols = [...symbols, ...symbols];
    const shuffled = duplicatedSymbols
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setMatchedPairs(0);
    setMoves(0);
    setFlippedCards([]);
  }, [level, universe]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return;
    if (cards[id].isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].symbol === cards[second].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(matchedPairs + 1);

          if (matchedPairs + 1 === cardCount / 2) {
            setTimeout(() => onLevelComplete(), 1000);
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          const unflippedCards = [...cards];
          unflippedCards[first].isFlipped = false;
          unflippedCards[second].isFlipped = false;
          setCards(unflippedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Menú</span>
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl mb-1" style={{ textShadow: `0 0 20px ${config.glowColor}` }}>
              {config.name}
            </h2>
            <p className="text-gray-400">Nivel {level}</p>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Movimientos: {moves}</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                <span>{matchedPairs}/{cardCount / 2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div 
          className="grid gap-4 max-w-5xl mx-auto"
          style={{
            gridTemplateColumns: `repeat(${Math.min(4, Math.ceil(Math.sqrt(cardCount)))}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence>
            {cards.map((card, index) => (
              <MemoryCard
                key={card.id}
                card={card}
                index={index}
                glowColor={config.glowColor}
                gradient={config.gradient}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}