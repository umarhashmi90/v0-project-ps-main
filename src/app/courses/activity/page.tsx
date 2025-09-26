'use client';
import dynamic from 'next/dynamic';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, Code, Bot, Film, ShoppingCart, DollarSign, Search, Tv, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const allCourses = [
  {
    title: 'CSS',
    href: '/courses/css',
    description: 'Master the art of styling web pages.',
    icon: <Palette className="h-8 w-8 text-black" />,
  },
  {
    title: 'HTML',
    href: '/courses/html',
    description: 'Learn the fundamental structure of the web.',
    icon: <Code className="h-8 w-8 text-black" />,
  },
  {
    title: 'Gen AI',
    href: '/courses/gen-ai',
    description: 'Explore the world of generative AI.',
    icon: <Bot className="h-8 w-8 text-black" />,
  },
  {
    title: 'TikTok',
    href: '/courses/tiktok',
    description: 'Create engaging short-form video content.',
    icon: <Film className="h-8 w-8 text-black" />,
  },
  {
    title: 'Shopify',
    href: '/courses/shopify',
    description: 'Build your own e-commerce empire.',
    icon: <ShoppingCart className="h-8 w-8 text-black" />,
  },
  {
    title: 'AI Money',
    href: '/courses/ai-money',
    description: 'Monetize your AI skills and projects.',
    icon: <DollarSign className="h-8 w-8 text-black" />,
  },
  {
    title: 'AI Coding',
    href: '/courses/ai-coding',
    description: 'Leverage AI to accelerate your coding.',
    icon: <Bot className="h-8 w-8 text-black" />,
  },
  {
    title: 'Deepseek',
    href: '/courses/deepseek',
    description: 'Advanced search and data analysis.',
    icon: <Search className="h-8 w-8 text-black" />,
  },
  {
    title: 'JavaScript',
    href: '/courses/javascript',
    description: 'Bring interactivity to your websites.',
    icon: <Code className="h-8 w-8 text-black" />,
  },
  {
    title: 'After Effects',
    href: '/courses/after-effects',
    description: 'Create stunning motion graphics.',
    icon: <Film className="h-8 w-8 text-black" />,
  },
  {
    title: 'Premiere Pro',
    href: '/courses/premiere-pro',
    description: 'Professional video editing mastery.',
    icon: <Tv className="h-8 w-8 text-black" />,
  },
];

const featuredCourses = [
    {
        title: 'Generative AI Fundamentals',
        href: '/courses/gen-ai',
        category: 'Artificial Intelligence',
        imageUrl: 'https://picsum.photos/800/600',
        aiHint: 'abstract neural network'
    },
    {
        title: 'JavaScript: The Advanced Concepts',
        href: '/courses/javascript',
        category: 'Web Development',
        imageUrl: 'https://picsum.photos/800/600',
        aiHint: 'code on screen'
    },
    {
        title: 'Shopify E-commerce Blueprint',
        href: '/courses/shopify',
        category: 'E-commerce',
        imageUrl: 'https://picsum.photos/800/600',
        aiHint: 'online shopping interface'
    },
    {
        title: 'Adobe After Effects for Beginners',
        href: '/courses/after-effects',
        category: 'Motion Graphics',
        imageUrl: 'https://picsum.photos/800/600',
        aiHint: 'motion graphics design'
    },
]

export default function AllCoursesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-50 text-black">
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 text-center">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black font-headline">
                        Find Your Next Course
                    </h1>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-8 text-gray-600">
                       Explore our library of free, expert-led courses.
                    </p>
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input 
                                type="search"
                                placeholder="Search for a course..."
                                className="w-full pl-12 pr-4 py-6 text-base bg-white border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-black focus:border-black"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        <section className="container pb-12 md:pb-16">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnInteraction: true,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {featuredCourses.map((course, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                           <div className="p-1">
                                <Link href={course.href}>
                                    <Card className="overflow-hidden rounded-2xl group relative shadow-md hover:shadow-xl transition-all duration-300">
                                        <div className="aspect-video relative">
                                             <Image
                                                src={course.imageUrl}
                                                alt={course.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                data-ai-hint={course.aiHint}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        </div>
                                        <CardContent className="absolute bottom-0 left-0 p-4 md:p-6">
                                            <p className="text-sm text-white/80 font-medium mb-1">{course.category}</p>
                                            <h3 className="text-lg md:text-xl font-bold text-white font-headline">{course.title}</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                           </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

        <section className="container pb-16 md:pb-24">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-black">All Courses</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {allCourses.map((course, index) => (
              <motion.div
                key={course.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={course.href} className="h-full block">
                  <Card className="bg-white hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border-gray-200 text-left h-full flex flex-col group p-6 rounded-2xl">
                    <div className="p-4 bg-gray-100 rounded-lg w-fit mb-4">
                        {course.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline text-black">{course.title}</h3>
                    <p className="text-gray-600 mt-2 flex-1">{course.description}</p>
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-black inline-flex items-center gap-2">
                        Start Learning
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
