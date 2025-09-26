'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotificationPopup() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const hasBeenDismissed = sessionStorage.getItem('notificationDismissed');
    if (!hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // 1.5-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('notificationDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4"
        >
          <div className="relative w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden p-6">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-50/10 via-blue-50/10 to-indigo-50/10"></div>
             
             <div className="relative text-center">
                <Button variant="ghost" size="icon" onClick={handleClose} className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-black/5 hover:bg-black/10">
                    <X className="h-4 w-4 text-gray-500" />
                </Button>

                <h3 className="font-headline font-bold text-gray-900 text-lg sm:text-xl">Important Notice</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
                    These are our only official contact channels. We are not responsible for any communication or payments made to other numbers or platforms.
                </p>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                    <Button asChild variant="outline" className="w-full justify-center bg-transparent text-black border-gray-900 hover:bg-black hover:text-white hover-shimmer-button text-xs sm:text-sm">
                        <Link href="http://wa.me/+923021550385" target="_blank" rel="noopener noreferrer">
                            Chat with Developer
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-center bg-transparent text-black border-gray-900 hover:bg-black hover:text-white hover-shimmer-button text-xs sm:text-sm">
                        <Link href="http://wa.me/+923355448505" target="_blank" rel="noopener noreferrer">
                            Chat with Support
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-center bg-transparent text-black border-gray-900 hover:bg-black hover:text-white hover-shimmer-button text-xs sm:text-sm">
                        <Link href="https://discord.gg/PwbEZ7wa3v" target="_blank" rel="noopener noreferrer">
                            Join Discord
                        </Link>
                    </Button>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
