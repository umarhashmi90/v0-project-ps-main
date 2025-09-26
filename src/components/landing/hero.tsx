'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Hero() {
  const [isCelebrated, setIsCelebrated] = useState(false);

  const handleConfettiClick = () => {
    if (isCelebrated) return;

    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) {
        setIsCelebrated(true);
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32">
      <section className="relative py-12 sm:py-16 lg:pb-20 xl:pb-40">
        <div className="absolute bottom-0 right-0 overflow-hidden hidden lg:block">
          <Image
            className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
            alt=""
            width={1000}
            height={1000}
            priority
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2">
            <div className="text-center lg:text-left xl:col-span-1 md:px-8 lg:px-0 xl:pr-12">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl font-pj">
                Your One-Stop Digital Shop
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 font-inter max-w-xl mx-auto lg:mx-0">
                Instantly access a massive collection of game skins, currency, and other digital goods. Level up your gaming experience today.
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800 hover-shimmer-button w-full sm:w-auto">
                  <Link
                    href="/products"
                  >
                    Browse Products
                  </Link>
                </Button>
                 {isCelebrated ? (
                    <Button asChild size="lg" variant="outline" className="hover-shimmer-button w-full sm:w-auto">
                        <Link href="https://discord.gg/PwbEZ7wa3v" target="_blank" rel="noopener noreferrer">
                            Join Discord
                        </Link>
                    </Button>
                ) : (
                    <Button size="lg" variant="outline" onClick={handleConfettiClick} className="hover-shimmer-button w-full sm:w-auto">
                        Celebrate New UI
                    </Button>
                )}
              </div>

              <div className="mt-12 sm:mt-16 flex flex-col items-center lg:items-start space-y-8">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="relative inline-flex overflow-hidden rounded-full p-[1px] shadow-sm shadow-black/5">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
                      <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-0.5 py-0.5 text-xs font-bold text-primary backdrop-blur-3xl gap-1.5">
                          <div className="flex -space-x-1">
                              <Avatar className="size-7 rounded-full">
                              <AvatarImage
                                  src="https://i.pravatar.cc/40?img=1"
                                  alt="@user1"
                                  className="border-2 border-background hover:z-10 rounded-full"
                              />
                              <AvatarFallback className="rounded-full">U1</AvatarFallback>
                              </Avatar>
                              <Avatar className="size-7 rounded-full">
                              <AvatarImage
                                  src="https://i.pravatar.cc/40?img=2"
                                  alt="@user2"
                                  className="border-2 border-background hover:z-10 rounded-full"
                              />
                              <AvatarFallback className="rounded-full">U2</AvatarFallback>
                              </Avatar>
                              <Avatar className="size-7 rounded-full">
                              <AvatarImage
                                  src="https://i.pravatar.cc/40?img=3"
                                  alt="@user3"
                                  className="border-2 border-background hover:z-10 rounded-full"
                              />
                              <AvatarFallback className="rounded-full">U3</AvatarFallback>
                              </Avatar>
                              <Avatar className="size-7 rounded-full">
                              <AvatarImage
                                  src="https://i.pravatar.cc/40?img=4"
                                  alt="@user4"
                                  className="border-2 border-background hover:z-10 rounded-full"
                              />
                              <AvatarFallback className="rounded-full">U4</AvatarFallback>
                              </Avatar>
                          </div>
                          <p className="text-xs text-muted-foreground me-1.5">
                              Trusted by <span className="font-semibold text-foreground">100K+</span>{" "}
                              users.
                          </p>
                      </div>
                  </div>
                </div>

                <blockquote className="max-w-md mx-auto lg:mx-0">
                  <p className="text-base sm:text-lg font-bold text-gray-900 font-pj">
                    Best prices for in-game items!
                  </p>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-7 text-gray-600 font-inter">
                   I always find the best deals on the skins and items I want. Delivery is instant and secure. Highly recommended!
                  </p>
                </blockquote>

                <div className="flex items-center justify-center lg:justify-start">
                  <Image
                    className="flex-shrink-0 object-cover w-8 h-8 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/avatar-female.png"
                    alt="Satisfied female customer"
                    width={32}
                    height={32}
                    data-ai-hint="woman portrait"
                  />
                  <p className="ml-3 text-sm sm:text-base font-bold text-gray-900 font-pj">
                    Sarah L.
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-1">
              <Image
                className="w-full mx-auto"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
                alt="Illustration of digital goods and services"
                width={600}
                height={450}
                data-ai-hint="gaming items abstract"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
