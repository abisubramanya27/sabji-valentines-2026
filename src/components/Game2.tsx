import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Game2Props {
  onSuccess: () => void;
  onFail: () => void;
}

export default function Game2({ onSuccess, onFail }: Game2Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [images, setImages] = useState<{ id: number; src: string; isReal: boolean }[]>([]);

  useEffect(() => {
    const initialImages = [
      { id: 1, src: '/assets/game2/fake1.svg', isReal: false },
      { id: 2, src: '/assets/game2/real.svg', isReal: true },
      { id: 3, src: '/assets/game2/fake2.svg', isReal: false },
      { id: 4, src: '/assets/game2/fake3.svg', isReal: false },
    ];
    // Shuffle
    setImages(initialImages.sort(() => Math.random() - 0.5));
  }, []);

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
      className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center"
    >
      <h2 className="text-3xl font-serif text-pink-600 mb-4">Level 2: My Masterpiece</h2>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4 px-4">Looking at my first masterpiece that drew you closer.</p>
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/game2/masterpiece1.svg" 
            alt="First Masterpiece" 
            className="w-48 h-64 object-cover rounded-2xl shadow-md border-4 border-pink-200" 
            referrerPolicy="no-referrer" 
          />
        </div>
        <p className="text-lg text-gray-700 px-4">Look closer to find the third masterpiece I drew (bonus if you can guess the second one, I did mention it to you once)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
