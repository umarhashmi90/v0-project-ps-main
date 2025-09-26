'use client';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Star, Tag } from 'lucide-react';
import { CountdownTimer } from '@/components/countdown-timer';
import Link from 'next/link';

const freeTools = [
  {
    title: 'Build Balance - Unity App Template',
    category: 'App Template',
    imageUrl: 'https://i.postimg.cc/Ls48RvP8/preview-xl.jpg',
    aiHint: 'game development unity',
    href: '/free-tools/build-balance',
    reviews: '1.2k reviews'
  },
  {
    title: 'CRM - Lead Management App React Native',
    category: 'React Native App',
    imageUrl: 'https://i.postimg.cc/J7Fxk27S/preview-xl-1.jpg',
    aiHint: 'mobile app crm',
    href: '/free-tools/crm-lead-management',
    reviews: '980 reviews'
  },
  {
    title: 'Mountain Logo Template Design',
    category: 'Graphics',
    imageUrl: 'https://i.postimg.cc/wMqSN7k8/preview-xl-2.jpg',
    aiHint: 'mountain logo vector',
    href: '/free-tools/mountain-logo-template',
    reviews: '2.5k reviews'
  },
  {
    title: 'Creative Cat Crafting Sewing Machine Logo',
    category: 'Graphics',
    imageUrl: 'https://i.postimg.cc/4NtS3vG7/preview-xl-3.jpg',
    aiHint: 'sewing logo cat',
    href: '/free-tools/creative-cat-logo',
    reviews: '1.5k reviews'
  },
];

export default function FreeToolsPage() {
  const getNextMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (daysUntilMonday === 0 ? 7 : daysUntilMonday));
    nextMonday.setHours(0, 0, 0, 0); // Set to midnight
    return nextMonday;
  };
  
  const targetDate = getNextMonday();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="container">
          <section className="py-12 md:py-16 text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-gray-900">
                Free Tools of the Week
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-8 text-gray-600">
                Download these exclusive tools before they are gone. New tools every week!
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-block rounded-lg p-4 bg-white border shadow-sm">
                  <CountdownTimer targetDate={targetDate.toISOString()} />
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {freeTools.map((tool, index) => (
                    <Card key={index} className="group overflow-hidden rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
                        <Link href={tool.href}>
                            <div className="aspect-video relative">
                                <Image
                                    src={tool.imageUrl}
                                    alt={tool.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={tool.aiHint}
                                />
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                    FREE
                                </div>
                            </div>
                        </Link>
                        <CardContent className="p-4 flex flex-col flex-1">
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1.5">
                                    <Tag className="h-4 w-4" />
                                    <span>{tool.category}</span>
                                </div>
                            </div>
                            <h3 className="font-semibold font-headline text-gray-800 group-hover:text-primary transition-colors h-12">
                                <Link href={tool.href}>{tool.title}</Link>
                            </h3>
                            <div className="flex-grow"></div>
                            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-0.5 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4" />
                                </div>
                                <span>({tool.reviews})</span>
                            </div>
                            <Button asChild className="w-full mt-4 hover-shimmer-button">
                                <Link href={tool.href}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Get it now
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
