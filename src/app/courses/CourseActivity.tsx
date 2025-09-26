'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Clock, Award, Users, Download, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const RelatedCourses = dynamic(() => import('@/components/related-courses').then(mod => mod.RelatedCourses), { ssr: false });

interface CourseLayoutProps {
  title: string;
  icon: LucideIcon;
  description: string;
  learningObjectives: string[];
  modules: { title: string; description: string }[];
  bannerUrl: string;
  bannerAiHint: string;
}

export function CourseLayout({
  title,
  description,
  learningObjectives,
  modules,
  bannerUrl,
  bannerAiHint,
}: CourseLayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white text-black">
      <Header />
      <main className="flex-1 pt-32 md:pt-40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
                <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md mb-2 sm:mb-0">
                  COMPLETELY FREE
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-sm text-gray-600">(4.9 stars from 2,150 reviews)</p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-6 leading-tight">{title}</h1>
              <p className="text-lg text-gray-700 mb-8">{description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 rounded-lg text-base w-full sm:w-auto hover-shimmer-button">
                  <Link href="#">Start Learning Now - FREE <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white border-gray-300 hover:bg-gray-100 rounded-lg text-base w-full sm:w-auto hover-shimmer-button hover:text-black">
                  <Link href="#"><Download className="mr-2 h-5 w-5" /> Download Course Materials</Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <h4 className="text-2xl font-bold">12K+</h4>
                  <p className="text-gray-600">Active Students</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">40+</h4>
                  <p className="text-gray-600">Course Hours</p>
                </div>
                 <div>
                  <h4 className="text-2xl font-bold">98%</h4>
                  <p className="text-gray-600">Success Rate</p>
                </div>
                 <div>
                  <h4 className="text-2xl font-bold">FREE</h4>
                  <p className="text-gray-600">Forever</p>
                </div>
              </div>

              {/* What you'll learn Section */}
              <div className="mt-16 md:mt-24">
                  <div className="border border-gray-200 rounded-lg p-6 md:p-8">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-6">What you'll learn</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          {learningObjectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-4">
                              <Check className="h-6 w-6 text-black mt-1 shrink-0" />
                              <span className="text-gray-700">{objective}</span>
                          </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Certificate Section */}
              <div className="mt-16 md:mt-24">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                      <div className="shrink-0">
                          <Award className="w-16 h-16 sm:w-24 sm:h-24 text-black" />
                      </div>
                      <div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">Free Certificate of Completion</h2>
                          <p className="mt-4 text-base sm:text-lg text-gray-700">
                              Upon successfully completing the course, you'll receive a free, industry-recognized certificate.
                              Showcase your new skills on your resume and LinkedIn profile.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-start gap-3">
                                <Check className="h-5 w-5 text-black mt-1 shrink-0" />
                                <span className="text-gray-700">Downloadable PDF certificate</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="h-5 w-5 text-black mt-1 shrink-0" />
                                <span className="text-gray-700">Shareable on LinkedIn</span>
                            </li>
                        </ul>
                      </div>
                  </div>
              </div>

              {/* Course Curriculum Section */}
              <div className="mt-16 md:mt-24">
                  <div className="max-w-3xl mx-auto text-center">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-black">Course Curriculum</h2>
                      <p className="mt-4 text-lg text-gray-700">
                          A detailed breakdown of what you'll learn in each module.
                      </p>
                  </div>

                  <div className="mt-12 max-w-3xl mx-auto">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                          {modules.map((module, index) => (
                              <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                  <AccordionTrigger className="text-base sm:text-lg text-left font-semibold px-6 py-4 hover:no-underline">
                                      <span className="mr-4 text-black font-bold">0{index + 1}</span>
                                      {module.title}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-base text-gray-700 px-6 pb-4">
                                      {module.description}
                                  </AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </div>
              </div>
            </div>

            {/* Sticky Card */}
            <div className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="sticky top-24">
                <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image 
                      src={bannerUrl}
                      alt={`${title} course banner`}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                      data-ai-hint={bannerAiHint}
                      priority
                    />
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded">100% FREE</div>
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" /> 4.9
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">{title} Bootcamp 2024</h2>
                    <div className="flex justify-between text-sm text-gray-600 mb-6">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 40+ Hours</span>
                      <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 12K+ Students</span>
                    </div>
                     <Button asChild size="lg" className="w-full bg-black text-white hover:bg-gray-800 rounded-lg text-base hover-shimmer-button">
                        <Link href="#">Enroll Now - It's Free</Link>
                     </Button>
                    <hr className="border-gray-200 my-6" />
                    <div className="text-center">
                      <h3 className="text-3xl font-extrabold">100% FREE</h3>
                      <p className="text-gray-600 text-sm mt-1">No hidden costs • Lifetime access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <RelatedCourses currentCourseTitle={title} />
          
          {/* CTA Section */}
          <div className="mt-16 md:mt-24">
            <div className="container text-center">
              <div className="bg-black text-white p-8 md:p-12 rounded-xl shadow-lg">
                <h2 className="text-2xl md:text-4xl font-extrabold">
                  Witness The Magic With 50K+ People Like You!
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                  Join our community of satisfied gamers and digital enthusiasts. Get instant access to the best products and deals.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" variant="secondary" className="text-base md:text-lg hover-shimmer-button bg-white text-black hover:bg-gray-200">
                    <Link href="/products">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
