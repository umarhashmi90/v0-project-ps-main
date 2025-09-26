'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, User, X } from 'lucide-react';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-white"
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const contacts = [
    { name: 'Developer', role: 'Technical Support', link: 'http://wa.me/+923021550385' },
    { name: 'Support Team', role: 'Sales & General Inquiries', link: 'http://wa.me/+923355448505' },
];

export default function WhatsAppFab() {
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
              <p className="text-muted-foreground text-sm mt-1">We are here to help. Chat with us on WhatsApp for any queries.</p>
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
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border">
                        <User className="h-5 w-5 text-muted-foreground" />
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

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isOpen ? "close" : "whatsapp"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <X className="h-8 w-8 text-white" /> : <WhatsAppIcon />}
            </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
