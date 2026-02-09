import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Heart } from 'lucide-react';

interface Game4Props {
  onSuccess: () => void;
  onFail: () => void;
}

export default function Game4({ onSuccess, onFail }: Game4Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [status, setStatus] = useState<'idle' | 'checking' | 'failed' | 'success'>('idle');

  const dates = [
    { id: 1, occasion: 'First Sex', date: 'Feb 18', isSignificant: true },
    { id: 2, occasion: 'Nothing', date: 'Aug 22', isSignificant: false },
    { id: 3, occasion: 'First Movie (Amaran)', date: 'Nov 1', isSignificant: true },
    { id: 4, occasion: 'First Flight (Southwest DAL to SJC)', date: 'Nov 7', isSignificant: true },
    { id: 5, occasion: 'First Heated Fight (About Oldest Language)', date: 'Oct 16', isSignificant: true },
    { id: 6, occasion: 'Nothing', date: 'Oct 29', isSignificant: false },
    { id: 7, occasion: 'First Gift (Ghirardelli Chocolates and Peacock Earrings)', date: 'Sept 20', isSignificant: true },
    { id: 8, occasion: 'Nothing', date: 'Sept 29', isSignificant: false },
    { id: 9, occasion: 'Nothing', date: 'Nov 14', isSignificant: false },
  ];

  const handleToggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    setStatus('checking');
    
    const correctIds = dates.filter(d => d.isSignificant).map(d => d.id);
    const isCorrect = 
      selectedIds.length === correctIds.length && 
      selectedIds.every(id => correctIds.includes(id));

    setTimeout(() => {
      if (isCorrect) {
        setStatus('success');
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
      className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center"
    >
      <h2 className="text-3xl font-serif text-pink-600 mb-4">Level 4: Go for dates</h2>
      <p className="text-lg text-gray-700 mb-8 px-4">Before we go on significant dates, go for dates that were significant in our lives in this final game.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
        {dates.map((date) => {
          const isSelected = selectedIds.includes(date.id);
          return (
            <button
              key={date.id}
              onClick={() => handleToggle(date.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-pink-500 bg-pink-50 text-pink-900 shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
              }`}
            >
              <div className="text-left flex-1 pr-4">
                <div className="font-semibold text-lg">{date.date}</div>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="text-sm font-medium text-pink-700 mt-1"
                  >
                    {date.occasion}
                  </motion.div>
                )}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSelected ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-300'
              }`}>
                <Heart size={16} fill={isSelected ? 'currentColor' : 'none'} />
              </div>
            </button>
          );
        })}
      </div>

      {status === 'success' ? (
        <button
          onClick={onSuccess}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-pink-600 transition-colors flex items-center justify-center mx-auto gap-2"
        >
          Go back to Home Screen
        </button>
      ) : (
        <button
          onClick={handleCheck}
          disabled={status !== 'idle' || selectedIds.length === 0}
          className={`px-8 py-3 text-white rounded-full font-semibold text-lg shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center mx-auto gap-2 ${
            status === 'failed' ? 'bg-red-500' : 'bg-pink-500 hover:bg-pink-600'
          }`}
        >
          {status === 'checking' ? 'Checking...' : status === 'failed' ? 'Failed! 💔' : (
            <>
              <CheckCircle size={24} />
              Submit Answers
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}
