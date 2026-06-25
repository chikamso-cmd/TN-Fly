import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  targetDate: string; // "YYYY-MM-DD"
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timerItems = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="flex justify-center items-center py-4">
        <span className="font-display font-bold text-xl md:text-2xl text-pink-500 animate-pulse tracking-wider">
          LIVE EVENT CURRENTLY IN PROGRESS
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto select-none" id="countdown-timer">
      {timerItems.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center p-3 md:p-4 rounded-xl glass-premium border border-violet-500/20 bg-slate-900/60 shadow-lg relative overflow-hidden group"
        >
          {/* Subtle gradient glow behind on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="font-display font-bold text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-mono tracking-tight text-glow-purple">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs font-semibold text-slate-400 tracking-wider mt-1 md:mt-2">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
