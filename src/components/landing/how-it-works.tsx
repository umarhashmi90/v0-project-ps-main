'use client';
import { Handshake, Search, Zap } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Browse Our Services",
    description: "Explore our digital solutions, from web development to performance boosters.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-primary" />,
    title: "Select Your Plan",
    description: "Choose the service that best fits your needs and get started in minutes.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Get Instant Access",
    description: "Your services and digital products are activated instantly upon purchase.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            A simple, three-step process to get your digital goods.
          </p>
        </div>
        <div className="mt-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4/5 h-px bg-gray-200 hidden md:block" aria-hidden="true"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl blur-md"></div>
                  <div className="relative p-4 bg-white rounded-xl border border-gray-200">
                    <div className="absolute -top-3 -left-3 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {index + 1}
                    </div>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-headline mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
