'use client';
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Cta() {
  return (
    <section id="cta" className="py-8 md:py-12 bg-white text-black">
      <div className="container text-center">
        <div className="bg-primary text-primary-foreground p-6 sm:p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="font-headline text-2xl md:text-4xl font-bold">
            Witness The Magic With 50K+ People Like You!
          </h2>
          <p className="mt-4 text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join our community of satisfied gamers and digital enthusiasts. Get instant access to the best products and deals.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg hover-shimmer-button">
              <Link href="/products">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
