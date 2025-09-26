'use client';

import React, { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { GlowingInput } from "@/components/ui/glowing-input";
import { Github, Twitter, Linkedin, Facebook, Instagram, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/my-account", label: "My account" },
];

const policyLinks = [
  { href: "/policies/disclaimer", label: "Disclaimer" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-use", label: "Terms of Service" },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Mock subscription logic
      setTimeout(() => {
        toast({
            title: "Subscription Successful!",
            description: "Thank you for subscribing. Please check your email.",
        });
        setEmail('');
        setLoading(false);
      }, 1500);

    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-card border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-muted-foreground text-sm sm:text-base">
              Your one-stop shop for digital gaming products.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/dev_umar9" target="_blank" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="https://www.instagram.com/umarhashmi.dev/" target="_blank" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="https://github.com/umarhashmi-dev" target="_blank" aria-label="Github"><Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="https://www.facebook.com/bilal.hashim.3" target="_blank" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-headline font-semibold text-foreground">Newsletter</h3>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={handleSubscription} className="mt-4 flex flex-col sm:flex-row gap-2">
              <GlowingInput 
                type="email" 
                placeholder="Your Email Address" 
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" className="hover-shimmer-button min-w-[140px]" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">
            &copy; {new Date().getFullYear()} PUBGSTUFF. All rights reserved. Developed by{' '}
            <a
              href="https://umarhashmi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Umar Hashmi
            </a>
          </p>
          <a href='https://postimages.org/' target='_blank' rel="noopener noreferrer">
              <Image 
                  src='https://i.postimg.cc/YC16tTst/secure-checkout-badge-hd-text-logo-symbol-potted-plant-transparent-png-1290135-1024x168.webp' 
                  alt='Secure Checkout Badge'
                  width={256}
                  height={42}
                  className="w-auto h-auto"
              />
          </a>
        </div>
      </div>
    </footer>
  );
}
