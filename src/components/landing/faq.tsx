'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What services are offered by PubgStuff?",
    answer: "PubgStuff provides web design, web development, graphic design, and RDP services. Additionally, we offer Driver Booster to enhance your gaming performance."
  },
  {
    question: "How can PubgStuff improve my gaming experience?",
    answer: "You can boost your gaming by using our Driver Booster, which updates outdated drivers automatically for better performance, stability, and security."
  },
  {
    question: "How do I get started with PubgStuff services?",
    answer: "Simply choose a service plan that fits your needs, such as Web Development, Graphic Design, or RDP. After selecting your plan, you can contact us directly via email, WhatsApp, or other listed platforms."
  },
  {
    question: "How safe and secure are PubgStuff’s services?",
    answer: "Our RDP services are safe and secure, offering custom IPs, dedicated RAM options, and 24/7 WhatsApp support to ensure complete reliability."
  },
  {
    question: "Can PubgStuff support my website’s SEO needs?",
    answer: "Yes! Along with web development and design, we integrate AI-powered tools and multilingual support that can help optimize your website for better SEO results."
  },
  {
    question: "What advantages come with using Driver Booster?",
    answer: "Driver Booster keeps your PC running smoothly by updating outdated drivers automatically, improving system performance, enhancing security, and ensuring stability for the best possible user experience."
  }
];

export default function Faq() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Quick answers to questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
          <Accordion type="single" collapsible className="w-full space-y-4 flex flex-col">
            {faqs.slice(0, 3).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg p-1 transition-all duration-300 data-[state=open]:shadow-lg flex-1 flex flex-col">
                  <AccordionTrigger className="text-lg text-left font-semibold px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                      {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground px-4 sm:px-6 flex-1">
                      {faq.answer}
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full space-y-4 flex flex-col">
            {faqs.slice(3).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index+3}`} className="bg-background border rounded-lg p-1 transition-all duration-300 data-[state=open]:shadow-lg flex-1 flex flex-col">
                  <AccordionTrigger className="text-lg text-left font-semibold px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                      {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground px-4 sm:px-6 flex-1">
                      {faq.answer}
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="bg-background border rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between mt-6 text-center sm:text-left">
            <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold">Can't find an answer?</h3>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Contact us for more information.</p>
            </div>
            <Button asChild className="hover-shimmer-button w-full sm:w-auto">
                <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  )
}
