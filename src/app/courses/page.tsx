'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Code, Bot, Film, ShoppingCart, DollarSign, Search, Tv } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    title: 'CSS',
    href: '/courses/css',
    description: 'Master the art of styling web pages.',
    icon: <Palette className="h-8 w-8 text-primary" />,
  },
  {
    title: 'HTML',
    href: '/courses/html',
    description: 'Learn the fundamental structure of the web.',
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Gen AI',
    href: '/courses/gen-ai',
    description: 'Explore the world of generative AI.',
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    title: 'TikTok',
    href: '/courses/tiktok',
    description: 'Create engaging short-form video content.',
    icon: <Film className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Shopify',
    href: '/courses/shopify',
    description: 'Build your own e-commerce empire.',
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
  },
  {
    title: 'AI Money',
    href: '/courses/ai-money',
    description: 'Monetize your AI skills and projects.',
    icon: <DollarSign className="h-8 w-8 text-primary" />,
  },
  {
    title: 'AI Coding',
    href: '/courses/ai-coding',
    description: 'Leverage AI to accelerate your coding.',
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Deepseek',
    href: '/courses/deepseek',
    description: 'Advanced search and data analysis.',
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    title: 'JavaScript',
    href: '/courses/javascript',
    description: 'Bring interactivity to your websites.',
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: 'After Effects',
    href: '/courses/after-effects',
    description: 'Create stunning motion graphics.',
    icon: <Film className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Premiere Pro',
    href: '/courses/premiere-pro',
    description: 'Professional video editing mastery.',
    icon: <Tv className="h-8 w-8 text-primary" />,
  },
];


export default function CoursesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary mb-4">
                            LEARNING PATHS
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
                            Unlock Your Potential with Our Courses
                        </h1>
                        <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                            Explore our comprehensive library of free courses designed to help you master new skills and advance your career in tech and creativity.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>

        <section className="container pb-16 md:pb-24 -mt-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={course.href} className="h-full block">
                  <Card className="bg-card hover:bg-card/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-border/10 text-left h-full flex flex-col group">
                    <CardHeader className="p-6">
                      <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                          {course.icon}
                      </div>
                      <CardTitle className="text-xl font-headline">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-1">
                      <p className="text-muted-foreground">{course.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <div className="text-sm font-semibold text-primary inline-flex items-center gap-2">
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
