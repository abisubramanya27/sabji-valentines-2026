import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import Background from './components/Background';
import HomeScreen from './components/HomeScreen';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import Game4 from './components/Game4';

type Screen = 'home' | 'game1' | 'game2' | 'game3' | 'game4';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [showFinalOverlay, setShowFinalOverlay] = useState(false);

  const handleSuccess = (level: number) => {
    // Trigger confetti
    const duration = level === 4 ? 8 * 1000 : 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);

    if (level === 4) {
      setShowFinalOverlay(true);
      setTimeout(() => {
        setShowFinalOverlay(false);
        setUnlockedLevels(5);
        setCurrentScreen('home');
      }, 6000); // Show overlay for 6 seconds
    } else {
      // Unlock next level
      if (unlockedLevels === level) {
        setUnlockedLevels(level + 1);
      }
      setCurrentScreen('home');
    }
  };

  const handleFail = () => {
    setFailedMessage('You failed! Try again.');
    setCurrentScreen('home');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFailedMessage(null);
    }, 3000);
  };

  const handleRestart = () => {
    setUnlockedLevels(1);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 flex items-center justify-center p-4">
      <Background />

      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <HomeScreen
              unlockedLevels={unlockedLevels}
              onSelectLevel={(level) => setCurrentScreen(`game${level}` as Screen)}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {currentScreen === 'game1' && (
          <motion.div key="game1" className="w-full">
            <Game1 onSuccess={() => handleSuccess(1)} onFail={handleFail} />
          </motion.div>
        )}
        {currentScreen === 'game2' && (
          <motion.div key="game2" className="w-full">
            <Game2 onSuccess={() => handleSuccess(2)} onFail={handleFail} />
          </motion.div>
        )}
        {currentScreen === 'game3' && (
          <motion.div key="game3" className="w-full">
            <Game3 onSuccess={() => handleSuccess(3)} onFail={handleFail} />
          </motion.div>
        )}
        {currentScreen === 'game4' && (
          <motion.div key="game4" className="w-full">
            <Game4 onSuccess={() => handleSuccess(4)} onFail={handleFail} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Failed Message Toast */}
      <AnimatePresence>
        {failedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl font-semibold text-lg z-50"
          >
            {failedMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Overlay */}
      <AnimatePresence>
        {showFinalOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="bg-white/90 p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-2xl border-4 border-pink-300"
            >
              <h1 className="text-4xl md:text-5xl font-serif text-pink-600 leading-tight mb-6">
                You have all my heart, valentine. Let's keep it healthy and safe!
              </h1>
              <Heart className="w-24 h-24 text-pink-500 mx-auto animate-pulse" fill="currentColor" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
