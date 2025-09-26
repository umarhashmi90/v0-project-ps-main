'use client';
import { Button } from "@/components/ui/button";
import { Check, User, Shield, Gem, Wand2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShimmeringText } from "@/components/ui/shimmering-text";

const plans = [
  {
    name: "Free",
    icon: <Wand2 className="h-6 w-6 text-foreground" />,
    headerText: "30-Day Free Trial",
    price: "Free",
    priceSuffix: "",
    description: "Unlock your full potential with Stay AI—try all our tools and features absolutely free for 30 days!",
    badge: null,
    buttonVariant: "default",
    buttonText: "Try for Free",
    href: "/ai-tools",
    features: [
      "Subscription Management Tools",
      "Advanced A/B testing capabilities",
      "AI-powered cancellation",
      "Churn prevention features",
      "Branded digital punch card",
      "Integrations with top e-comm tools",
    ],
  },
  {
    name: "Pro Plan",
    icon: <Shield className="h-6 w-6 text-foreground" />,
    headerText: "Pro Plan",
    price: "$4999",
    priceSuffix: "One time Fee",
    description: "Perfect for Shopify merchants or want to scale their subscription.",
    badge: "Client Choice",
    buttonVariant: "gradient",
    buttonText: "Book a 20-min Call",
    href: "/signup",
    loggedInHref: "/contact",
    features: [
        "1:1 Migration And Onboarding",
        "Subscription management tools",
        "Advanced A/B testing capabilities",
        "AI-powered cancellation",
        "Churn prevention features",
        "Branded digital punch card",
        "Integrations with top e-comm tools",
    ],
  },
  {
    name: "Enterprise",
    icon: <Gem className="h-6 w-6 text-foreground" />,
    headerText: "Enterprise",
    price: "Custom Pricing",
    priceSuffix: "",
    description: "For larger brands looking to supercharge their subscription program.",
    badge: null,
    buttonVariant: "default",
    buttonText: "Contact Us",
    href: "/contact",
    features: [
      "Every feature we offer in Pro plus",
      "1:1 Migration And Onboarding",
      "AI-Powered Cancellation",
      "Custom development",
      "Personalized growth planning",
      "Early access to new features and tools",
    ],
  },
];

export default function FeaturedProducts() {
  return (
    <section id="featured-products" className="py-16 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Simple, transparent pricing for teams of all sizes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pt-4">
          {plans.map((plan) => {
            const href = plan.href;
            return (
              <div key={plan.name}>
                <Card className={cn(
                    "flex flex-col rounded-2xl shadow-lg transition-all duration-300 text-left group h-full",
                    plan.badge && "relative"
                  )}>
                  {plan.badge && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 z-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                            <Shield className="h-4 w-4" />
                            {plan.badge}
                        </div>
                    </div>
                  )}

                  <div className="flex flex-col flex-grow">
                    <CardHeader className={cn("p-6 rounded-t-2xl", plan.name === 'Pro Plan' ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'bg-card')}>
                      <div className="flex items-center gap-3">
                          {plan.icon}
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{plan.headerText}</h3>
                      </div>
                      <div className="min-h-[60px] pt-2">
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                      </div>
                      
                      <div className="flex items-baseline gap-2 pt-4">
                        <div className="text-4xl font-extrabold tracking-tight text-gray-900">
                            <span className="group-hover:hidden">{plan.price}</span>
                            <div className="hidden group-hover:block">
                              <ShimmeringText text={plan.price} duration={3} />
                            </div>
                        </div>
                        {plan.priceSuffix && <p className="text-sm text-gray-500">{plan.priceSuffix}</p>}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1">
                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="p-6 mt-auto">
                      {plan.buttonVariant === 'gradient' ? (
                        <Button asChild size="lg" className="w-full text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow hover-shimmer-button">
                            <Link href={href}>
                              <User className="mr-2 h-5 w-5 rounded-full bg-white/20 p-1" />
                              <span>{plan.buttonText}</span>
                            </Link>
                          </Button>
                      ) : (
                          <Button asChild size="lg" className="w-full text-base bg-gray-800 text-white rounded-full hover:bg-gray-900 hover-shimmer-button">
                              <Link href={href}>
                                  <span>{plan.buttonText}</span>
                              </Link>
                          </Button>
                      )}
                    </CardFooter>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
