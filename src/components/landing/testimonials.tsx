'use client';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const testimonials = [
  {
    name: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "man portrait",
    title: "Medical Assistant",
    rating: 5,
    review: "The PubgStuff support team is always responsive and helpful. They resolve issues quickly and make sure everything runs smoothly thank you pubgstuff team."
  },
  {
    name: "Courtney Henry",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "woman portrait",
    title: "Dog Trainer",
    rating: 5,
    review: "PubgStuff support is outstanding! Fast response times and helpful solutions make them a reliable partner for any technical issues personally recommended."
  },
  {
    name: "Cody Fisher",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "person portrait",
    title: "President of Sales",
    rating: 5,
    review: "PubgStuff’s development services are top-notch! They delivered exactly what we needed, with exceptional attention to detail and professionalism."
  },
  {
    name: "Annette Black",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "woman portrait",
    title: "Web Designer",
    rating: 5,
    review: "Highly recommended! PubgStuff’s development team worked hard, delivering quality results on time while keeping us informed throughout the process."
  },
  {
    name: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "man portrait",
    title: "Marketer",
    rating: 5,
    review: "PubgStuff’s social media ads are amazing! They create engaging, audience-focused content that boosts brand awareness and engagement significantly."
  },
  {
    name: "Courtney Henry",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "person portrait",
    title: "Sales man",
    rating: 5,
    review: "I saw significant growth in my campaigns with PubgStuff’s ad creative services. Their expertise made a really the difference i am surprised and shocked!"
  },
   {
    name: "Cody Fisher",
    avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "man portrait glasses",
    title: "Gym Adviser",
    rating: 5,
    review: "PubgStuff’s video production services are fantastic. Their strategy-driven approach delivered videos that perfectly conveyed our brand’s message to viewers."
  },
  {
    name: "Annette Black",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
    aiHint: "woman portrait smiling",
    title: "Developer",
    rating: 5,
    review: "PubgStuff’s video production team created high-quality, engaging videos that aligned perfectly with our marketing goals and strategy best team ever."
  }
];

const people = [
  {
    id: 1,
    name: "Robert Fox",
    designation: "Medical Assistant",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Courtney Henry",
    designation: "Dog Trainer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Cody Fisher",
    designation: "President of Sales",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Annette Black",
    designation: "Web Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Robert Fox",
    designation: "Marketer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Courtney Henry",
    designation: "Sales man",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mt-12 mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="pt-0 pb-12 md:pb-16">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What People Say About Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Real stories from satisfied customers.
          </p>
        </div>
        <AnimatedTooltipPreview />
        <div className="mt-8 flex flex-col items-center justify-center relative overflow-hidden">
           <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
           <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
        </div>
      </div>
    </section>
  )
}
