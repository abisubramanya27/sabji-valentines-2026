import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Game1Props {
  onSuccess: () => void;
  onFail: () => void;
}

export default function Game1({ onSuccess, onFail }: Game1Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const images = [
    { id: 1, src: '/assets/game1/real.svg', isReal: true },
    { id: 2, src: '/assets/game1/fake.svg', isReal: false },
  ];

  const handleSelect = (id: number, isReal: boolean) => {
    setSelected(id);
    setStatus(isReal ? 'success' : 'failed');
    setTimeout(() => {
      if (isReal) {
        onSuccess();
      } else {
        onFail();
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center"
    >
      <h2 className="text-3xl font-serif text-pink-600 mb-4">Level 1: The Real Sabji</h2>
      <p className="text-lg text-gray-700 mb-8 px-4">First step to being truly happy is to recognize true happiness. Guess the real happy sabji picture.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => handleSelect(img.id, img.isReal)}
            disabled={selected !== null}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ${
              selected === null ? 'hover:scale-105 hover:shadow-xl' : ''
            } ${selected === img.id ? 'ring-4 ring-pink-500 scale-105' : ''}`}
          >
            <img src={img.src} alt="Option" className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
            
            {selected === img.id && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                {img.isReal ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Heart size={64} className="text-pink-500 drop-shadow-lg" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <span className="text-6xl drop-shadow-lg">💔</span>
                  </motion.div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="h-12 mt-8 flex items-center justify-center">
        {status === 'failed' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-red-500">Failed! 💔</motion.p>}
        {status === 'success' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-pink-500">Correct! 💖</motion.p>}
      </div>
    </motion.div>
  );
}
