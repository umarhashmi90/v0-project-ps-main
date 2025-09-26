'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);


  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (!isClient) {
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-center">
            {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex flex-col items-center justify-center bg-gray-50 p-3 sm:p-4 rounded-lg w-20 sm:w-24 shadow-inner">
                    <span className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-gray-900">00</span>
                    <span className="text-xs sm:text-sm uppercase text-gray-500">{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 text-center">
      <div className="flex flex-col items-center justify-center bg-gray-50 p-3 sm:p-4 rounded-lg w-20 sm:w-24 shadow-inner">
        <span className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-gray-900">
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-xs sm:text-sm uppercase text-gray-500">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 p-3 sm:p-4 rounded-lg w-20 sm:w-24 shadow-inner">
        <span className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-gray-900">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-xs sm:text-sm uppercase text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 p-3 sm:p-4 rounded-lg w-20 sm:w-24 shadow-inner">
        <span className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-gray-900">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-xs sm:text-sm uppercase text-gray-500">Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 p-3 sm:p-4 rounded-lg w-20 sm:w-24 shadow-inner">
        <span className="text-2xl sm:text-4xl font-bold font-mono tracking-tighter text-gray-900">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-xs sm:text-sm uppercase text-gray-500">Seconds</span>
      </div>
    </div>
  );
}
