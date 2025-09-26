'use client';
import { cn } from "@/lib/utils";
import React from "react";
import { Code, Palette, Users, Megaphone, Search, FileText, Bot, Heart } from "lucide-react";


const features = [
  {
    title: "Development",
    description:
      "At PubgStuff, we offer comprehensive web development services to create your web-based product.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Web Design",
    description:
      "At PubgStuff, we offer comprehensive web Designing services to create your online appearance.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    title: "SMM Service",
    description:
      "At PubgStuff, we offer comprehensive SMM services to manage your social appearance.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Ads & Marketing Tools",
    description: "At PubgStuff, we offer Ads & Marketing Tools & services to create your achive your social goals.",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    title: "Website SEO",
    description: "At PubgStuff, we provide SEO services to boost your SEO score with optimized metadata for social ranking.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Research Content",
    description:
      "At PubgStuff, we offer content research tools to enhance your content strategy for university and researches.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "AI Automation",
    description:
      "We build custom AI agents and automation tools to streamline your business processes.",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    title: "And everything else",
    description: "We are passionate about creating amazing digital experiences. Contact us with your ideas.",
    icon: <Heart className="w-6 h-6" />,
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "md:border-l dark:border-neutral-800",
        index < 4 && "md:border-b dark:border-neutral-800",
        "border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-800 dark:bg-neutral-100 transition-all duration-200 origin-center opacity-0 group-hover/feature:opacity-100" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-600 dark:text-neutral-300 group-hover/feature:text-neutral-800 dark:group-hover/feature:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default function UseCases() {
  return (
    <section id="use-cases" className="py-12 md:py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Multiple Use Cases Of PubgStuff
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A versatile AI Tool with a multitude of use cases
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
