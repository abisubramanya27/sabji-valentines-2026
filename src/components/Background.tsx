import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function Background() {
  const hearts = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 z-[-1]">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute text-pink-300/40"
            initial={{ y: '110vh', x: `${left}vw`, scale: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              scale: [0, 1, 1, 0],
              rotate: 360,
              x: `${left + (Math.random() * 10 - 5)}vw`,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart size={size} fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
}
