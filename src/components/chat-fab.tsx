'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const contacts = [
    { name: 'Developer', role: 'Technical Support', link: 'http://wa.me/+923021550385', avatar: 'https://i.postimg.cc/MZDMm4sF/8690c156-f9a4-44ec-a7fc-313bb99f4b09.jpg' },
    { name: 'Support Team', role: 'Sales & General Inquiries', link: 'http://wa.me/+923355448505', avatar: 'https://i.postimg.cc/7h0f7sWq/vn-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg' },
];

export default function ChatFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-3 w-72 origin-bottom-right rounded-2xl bg-card border border-border shadow-2xl"
          >
            <div className="p-4 bg-secondary/50 rounded-t-2xl relative">
              <h3 className="font-bold text-card-foreground font-headline">Hi there!</h3>
              <p className="text-muted-foreground text-sm mt-1">We are here to help. Chat with us for any queries.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:bg-secondary transition-colors"
                aria-label="Close chat"
              >
                  <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {contacts.map((contact, index) => (
                <Link 
                    href={contact.link}
                    key={index}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
            scale: [1, 1.05, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse'
            }
        }}
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isOpen ? "close" : "chat"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
            </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
