import { motion } from 'motion/react';
import { Bike, Check, Lock, MapPin, Heart } from 'lucide-react';

interface HomeScreenProps {
  unlockedLevels: number;
  onSelectLevel: (level: number) => void;
  onRestart: () => void;
}

export default function HomeScreen({ unlockedLevels, onSelectLevel, onRestart }: HomeScreenProps) {
  const levels = [
    { id: 1, title: 'The Real Sabji', x: 10, y: 85 },
    { id: 2, title: 'My Masterpiece', x: 30, y: 60 },
    { id: 3, title: 'Good Old Times', x: 50, y: 35 },
    { id: 4, title: 'Go for dates', x: 70, y: 10 },
  ];

  // Calculate bike position based on unlockedLevels
  // If unlockedLevels = 1, bike is at level 1.
  // If unlockedLevels = 5 (all done), bike is at destination.
  const currentLevelIndex = Math.min(unlockedLevels - 1, 3);
  const bikePos = unlockedLevels > 4 ? { x: 95, y: 10 } : levels[currentLevelIndex];

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[700px] bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 pt-10 pr-16 pb-24 pl-20 overflow-hidden">
      <button 
        onClick={onRestart}
        className="absolute top-6 right-6 text-sm font-medium text-pink-500 hover:text-pink-700 bg-white/60 hover:bg-white px-4 py-2 rounded-full shadow-sm transition-all z-20"
      >
        Restart Game
      </button>
      <h1 className="text-4xl font-serif text-pink-600 text-center mb-8 mt-2">Journey to Sabji</h1>
      
      <div className="relative w-full h-full mt-12">
        {/* Path line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M ${levels[0].x} ${levels[0].y} C 20 85, 20 60, ${levels[1].x} ${levels[1].y} C 40 60, 40 35, ${levels[2].x} ${levels[2].y} C 60 35, 60 10, ${levels[3].x} ${levels[3].y} L 95 10`}
            fill="none"
            stroke="rgba(236, 72, 153, 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Levels */}
        {levels.map((level, i) => {
          const isUnlocked = unlockedLevels >= level.id;
          const isCompleted = unlockedLevels > level.id;
          
          return (
            <motion.div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${level.x}%`, top: `${level.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <button
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isCompleted
                    ? 'bg-pink-500 text-white hover:bg-pink-600 hover:scale-110'
                    : isUnlocked
                    ? 'bg-white text-pink-500 border-4 border-pink-400 hover:scale-110'
                    : 'bg-gray-200 text-gray-400 border-4 border-gray-300 cursor-not-allowed'
                }`}
              >
                {isCompleted ? <Check size={28} /> : isUnlocked ? <Heart size={28} fill="currentColor" /> : <Lock size={28} />}
              </button>
              <span className="mt-3 text-sm font-medium text-pink-800 bg-white/80 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                {level.title}
              </span>
            </motion.div>
          );
        })}

        {/* Final Destination */}
        {unlockedLevels > 4 && (
          <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: '95%', top: '10%' }}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-red-500 text-white flex items-center justify-center shadow-pink-500/50 shadow-2xl">
              <Heart size={40} fill="currentColor" />
            </div>
            <span className="mt-3 text-lg font-bold text-pink-600 bg-white/90 px-4 py-1 rounded-full shadow-md">
              Forever
            </span>
          </motion.div>
        )}

        {/* Bike */}
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-pink-600 bg-white p-2 rounded-full shadow-xl z-10"
          animate={{
            left: `${bikePos.x}%`,
            top: `${bikePos.y}%`,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        >
          <Bike size={32} />
        </motion.div>
      </div>
    </div>
  );
}
