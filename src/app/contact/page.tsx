'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, MapPin, Phone, ArrowRight, User, Map, Check, Star } from "lucide-react";
import Faq from "@/components/landing/faq";
import { motion } from "framer-motion";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cta from "@/components/landing/cta";
import ContactForm from "@/components/landing/contact-form";


export default function ContactPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="pt-28 md:pt-32">
            <div className="container px-4">
                <div
                    className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white opacity-60"></div>
                    <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] bg-repeat opacity-20"></div>

                    <div className="relative z-10 p-6 md:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-headline leading-tight">
                                    Get in Touch With Our Team
                                </h1>
                                <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                                   We have the team and know-how to help you scale 10x faster. We're here to help, so reach out with any questions.
                                </p>
                                <div className="mt-6 md:mt-8">
                                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover-shimmer-button rounded-full text-base">
                                        <Link href="/about">
                                            About Us <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <p className="mt-3 text-xs md:text-sm text-gray-500">Learn more about our mission</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                    <div className="flex items-center mb-4">
                                        <div className="flex -space-x-2">
                                            <Avatar className="h-10 w-10 border-2 border-white">
                                                <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Alex Rivera" data-ai-hint="man portrait" />
                                                <AvatarFallback>AR</AvatarFallback>
                                            </Avatar>
                                             <Avatar className="h-10 w-10 border-2 border-white">
                                                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Samantha Bee" data-ai-hint="woman portrait" />
                                                <AvatarFallback>SB</AvatarFallback>
                                            </Avatar>
                                             <Avatar className="h-10 w-10 border-2 border-white">
                                                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Mike Thompson" data-ai-hint="person portrait" />
                                                <AvatarFallback>MT</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 bg-green-400 rounded-full animate-pulse"></div>
                                            <p className="text-sm font-medium text-gray-700">We reply within minutes</p>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 font-headline">Let's start a conversation</h3>
                                    <p className="mt-1 text-gray-500">Our team is here to help you with any questions.</p>

                                    <div className="mt-6 space-y-4">
                                        <Button asChild variant="outline" size="lg" className="w-full justify-start hover-shimmer-button bg-white/50 text-sm sm:text-base">
                                            <a href="mailto:info@pubgstuff.store">
                                                <Mail className="mr-3 h-5 w-5" />
                                                info@pubgstuff.store
                                            </a>
                                        </Button>
                                         <Button asChild variant="outline" size="lg" className="w-full justify-start hover-shimmer-button bg-white/50 text-sm sm:text-base">
                                            <a href="https://wa.me/923355448505">
                                                <Phone className="mr-3 h-5 w-5" />
                                                +92 335 5448505
                                            </a>
                                        </Button>
                                         <Button asChild variant="outline" size="lg" className="w-full justify-start hover-shimmer-button bg-white/50 text-sm sm:text-base">
                                            <a href="https://wa.me/923021550385">
                                                <Phone className="mr-3 h-5 w-5" />
                                                +92 302 1550385
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <ContactForm />
        
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
