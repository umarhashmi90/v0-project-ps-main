'use client';
import dynamic from 'next/dynamic';
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import FeaturedProducts from "@/components/landing/featured-products";
import HowItWorks from "@/components/landing/how-it-works";
import BentoGridFeatures from "@/components/landing/bento-grid-features";
import UseCases from "@/components/landing/use-cases";
import Footer from "@/components/landing/footer";
import NotificationPopup from '@/components/notification-popup';

const Testimonials = dynamic(() => import('@/components/landing/testimonials'), { ssr: false });
const Faq = dynamic(() => import('@/components/landing/faq'), { ssr: false });
const Cta = dynamic(() => import('@/components/landing/cta'), { ssr: false });

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <NotificationPopup />
      <Header />
      <div className="flex-1">
        <main>
          <Hero />
          <div className="overflow-x-hidden">
            <FeaturedProducts />
            <HowItWorks />
            <BentoGridFeatures />
            <UseCases />
            <Testimonials />
            <Faq />
            <Cta />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
