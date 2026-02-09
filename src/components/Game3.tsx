import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface Game3Props {
  onSuccess: () => void;
  onFail: () => void;
}

interface ImageItem {
  id: number;
  src: string;
  order: number; // 1 to 9
}

export default function Game3({ onSuccess, onFail }: Game3Props) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'checking' | 'failed' | 'success'>('idle');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const initialItems: ImageItem[] = Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      src: `${import.meta.env.BASE_URL}assets/game3/${i + 1}.jpeg`,
      order: i + 1,
    }));
    
    // Shuffle
    setItems(initialItems.sort(() => Math.random() - 0.5));
  }, []);

  const handleItemClick = (index: number) => {
    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      // Swap items
      const newItems = [...items];
      const temp = newItems[selectedIdx];
      newItems[selectedIdx] = newItems[index];
      newItems[index] = temp;
      setItems(newItems);
      setSelectedIdx(null);
    }
  };

  const handleCheck = () => {
    setStatus('checking');
    const isCorrect = items.every((item, index) => item.order === index + 1);
    
    setTimeout(() => {
      if (isCorrect) {
        setStatus('success');
        setTimeout(onSuccess, 1000);
      } else {
        setStatus('failed');
        setTimeout(() => {
          setStatus('idle');
          onFail();
        }, 1500);
      }
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center"
    >
      <h2 className="text-3xl font-serif text-pink-600 mb-4">Level 3: Good Old Times</h2>
      <p className="text-lg text-gray-700 mb-4 px-4">Carefully vet and arrange your sexy memories that made you wet in chronological order. Click two images to swap them.</p>

      <div className="h-8 mb-4 flex items-center justify-center">
        {selectedIdx !== null ? (
          <span className="text-pink-600 font-semibold animate-pulse bg-pink-100 px-4 py-1 rounded-full">
            Image {selectedIdx + 1} selected. Click another to swap!
          </span>
        ) : (
          <span className="text-gray-500 text-sm">
            Select an image to start swapping
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            whileHover={{ scale: 1.05 }}
            animate={{ 
              scale: selectedIdx === index ? 1.05 : 1,
              zIndex: selectedIdx === index ? 10 : 1
            }}
            transition={{
              layout: { type: "spring", stiffness: 200, damping: 25 },
              scale: { duration: 0.2 }
            }}
            onClick={() => handleItemClick(index)}
            className={`relative rounded-xl overflow-hidden shadow-md cursor-pointer bg-white p-2 ${
              selectedIdx === index ? 'ring-4 ring-pink-500 animate-pulse' : ''
            }`}
          >
            <img
              src={item.src}
              alt={`Timeline ${item.id}`}
              className="w-full h-96 object-cover rounded-lg pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Optional: Show current position number for clarity */}
            <div className="absolute top-4 left-4 bg-white/80 text-pink-600 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-sm">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={status !== 'idle' || items.length === 0}
        className={`px-8 py-3 text-white rounded-full font-semibold text-lg shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center mx-auto gap-2 ${
          status === 'failed' ? 'bg-red-500' : status === 'success' ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-600'
        }`}
      >
        {status === 'checking' ? 'Checking...' : status === 'failed' ? 'Failed! 💔' : status === 'success' ? 'Correct! 💖' : (
          <>
            <CheckCircle size={24} />
            Submit Timeline
          </>
        )}
      </button>
    </motion.div>
  );
}
