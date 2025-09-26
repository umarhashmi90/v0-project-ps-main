'use client';

import React from 'react';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Star, Check, Minus, Plus, Share, Heart, Maximize, HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import { useCurrency } from '@/hooks/use-currency';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductLayout } from '@/components/product-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/use-favorites';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const RelatedProducts = dynamic(() => import('@/components/related-products').then(mod => mod.RelatedProducts), { ssr: false });

const images = [
    { id: 1, src: 'https://i.postimg.cc/3N60d0qM/Anubis-week-key.jpg', alt: 'Main product image', aiHint: 'gaming character cinematic' },
    { id: 2, src: 'https://picsum.photos/1000/1000?random=1', alt: 'Product feature view', aiHint: 'gaming action screenshot' },
    { id: 3, src: 'https://picsum.photos/1000/1000?random=2', alt: 'Product in-game', aiHint: 'futuristic weapon' },
    { id: 4, src: 'https://picsum.photos/1000/1000?random=3', alt: 'Product details', aiHint: 'glowing abstract' },
    { id: 5, src: 'https://picsum.photos/1000/1000?random=4', alt: 'Product usage', aiHint: 'gamer setup' },
];

const features = [
    "Safe & Secure",
    "Silent Aimbot + FOV",
    "ESP Visuals",
    "FOV Circle & Aim Position",
    "Skip Knocked Enemies",
    "Radar & Visuals",
    "Advanced Bypass System",
];

const BASE_PRICE = 20;
const EXTRA_PRICE = 5;

const reviews = [
    {
        name: "Alex Johnson",
        avatar: "https://picsum.photos/100/100?random=10",
        aiHint: "man portrait",
        rating: 5,
        comment: "Absolutely game-changing! The ESP is flawless and the aimbot is incredibly precise. My K/D ratio has skyrocketed. 100% recommend!"
    },
    {
        name: "Samantha Bee",
        avatar: "https://picsum.photos/100/100?random=11",
        aiHint: "woman portrait",
        rating: 5,
        comment: "I was skeptical at first, but this is the real deal. The security is top-notch, and I've had zero issues with my main account. The support team is also very responsive."
    },
    {
        name: "Mike Thompson",
        avatar: "https://picsum.photos/100/100?random=12",
        aiHint: "person portrait",
        rating: 4,
        comment: "Great tool with lots of features. The recoil control is insane. My only suggestion would be to add more customization options for the visuals. Otherwise, it's perfect."
    }
]

export default function SingleProductPage() {
    const [selectedImage, setSelectedImage] = React.useState(images[0]);
    const [quantity, setQuantity] = React.useState(1);
    const { formatPrice, currency } = useCurrency();
    const [extras, setExtras] = React.useState({
        windows: false,
        drivers: false,
        extras: false
    });
    const [totalPrice, setTotalPrice] = React.useState(BASE_PRICE);
    const { user } = useAuth();
    const { toast } = useToast();
    const { addToCart } = useCart();
    const router = useRouter();
    const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites();
    const [relatedTotal, setRelatedTotal] = React.useState(0);

    const product = {
        id: 9,
        name: "Anubis Week Key",
        category: "PC" as "PC",
        price: 20,
        href: "/products/anubis-week-key",
        imageUrl: 'https://i.postimg.cc/3N60d0qM/Anubis-week-key.jpg',
        aiHint: 'gaming character cinematic'
    };

    const isProductFavorited = isFavorited(product.id);

    const handleBuyNow = () => {
        addToCart(product, quantity);
        toast({
            title: "Added to Cart",
            description: `${product.name} (x${quantity}) has been added to your cart.`,
        });
        router.push('/cart');
    };

    const handleFavoriteClick = () => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "You need to be logged in to favorite products.",
                variant: "destructive",
            });
            return;
        }
        if (isProductFavorited) {
            removeFromFavorites(product.id);
            toast({
                title: "Removed from Favorites",
                description: `Anubis Week Key has been removed from your favorites.`,
            });
        } else {
            addToFavorites(product);
            toast({
                title: "Added to Favorites",
                description: `Anubis Week Key has been added to your favorites.`,
            });
        }
    };
    
    const handleShareClick = () => {
        const productUrl = window.location.href;
        navigator.clipboard.writeText(productUrl)
            .then(() => {
                toast({
                    title: "Link Copied!",
                    description: "Product link has been copied to your clipboard.",
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast({
                    title: "Error",
                    description: "Failed to copy the link.",
                    variant: "destructive",
                });
            });
    };
    React.useEffect(() => {
        const extrasCount = Object.values(extras).filter(Boolean).length;
        const newTotal = (BASE_PRICE * quantity) + (extrasCount * EXTRA_PRICE) + relatedTotal;
        setTotalPrice(newTotal);
    }, [quantity, extras, relatedTotal]);

    const handleExtraChange = (extra: keyof typeof extras) => {
        setExtras(prev => ({...prev, [extra]: !prev[extra]}));
    }

    return (
        <ProductLayout>
            <div className="flex min-h-screen flex-col bg-gray-50">
                <Header />
                <main className="flex-1 pt-24 md:pt-32">
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[6fr,5fr] gap-8 md:gap-12 max-w-5xl mx-auto">
                            {/* Image Gallery */}
                            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-headline mt-1">Anubis Week Key</h1>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex items-center gap-0.5 text-yellow-500">
                                                <Star className="w-5 h-5 fill-current" />
                                                <Star className="w-5 h-5 fill-current" />
                                                <Star className="w-5 h-5 fill-current" />
                                                <Star className="w-5 h-5 fill-current" />
                                                <Star className="w-5 h-5 fill-current" />
                                            </div>
                                            <p className="text-sm text-gray-600">(4.9/5.0 from 13,000+ ratings)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black hover:bg-gray-100" onClick={handleShareClick}><Share className="w-5 h-5" /></Button>
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black hover:bg-gray-100" onClick={handleFavoriteClick}>
                                            <Heart className={cn("w-5 h-5", isProductFavorited && "fill-red-500 text-red-500")} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="aspect-square relative rounded-xl overflow-hidden shadow-inner bg-gray-50">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        fill
                                        className="object-contain transition-transform duration-300"
                                        data-ai-hint={selectedImage.aiHint}
                                        priority
                                    />
                                    <Button variant="ghost" size="icon" className="absolute top-3 left-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-700">
                                        <Maximize className="w-5 h-5"/>
                                    </Button>
                                </div>
                               <div className="mt-4">
                                    <ScrollArea>
                                        <div className="flex items-center gap-2 pb-4">
                                            {images.map((image) => (
                                                <button
                                                    key={image.id}
                                                    onClick={() => setSelectedImage(image)}
                                                    className={cn(
                                                        'aspect-square w-16 sm:w-20 relative rounded-md overflow-hidden border-2 transition-all flex-shrink-0',
                                                        selectedImage.id === image.id ? 'border-primary' : 'border-gray-200 hover:border-primary/50'
                                                    )}
                                                >
                                                    <Image
                                                        src={image.src}
                                                        alt={image.alt}
                                                        fill
                                                        className="object-cover"
                                                        data-ai-hint={image.aiHint}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </div>
                            </div>

                            {/* Product Configuration */}
                            <div className="flex flex-col">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg p-3 flex items-start gap-3">
                                            <HeartHandshake className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-semibold">Donation Included!</p>
                                                <p className="mt-1">Price includes a small donation for orphans & the needy. You pay nothing extra.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="border border-gray-200 rounded-lg p-4 mt-4">
                                            <p className="text-2xl font-bold">{formatPrice(totalPrice)}</p>
                                            <p className="text-green-600 font-semibold">{currency === 'PKR' ? 'Rs (Pakistani Rupees)' : '$ (United States Dollar)'}</p>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500 mb-2">Add Extra Support ( {formatPrice(EXTRA_PRICE)} each )</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                    <label htmlFor="windows" className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50 cursor-pointer has-[input:checked]:bg-primary/5 has-[input:checked]:border-primary transition-all">
                                                        <Checkbox id="windows" checked={extras.windows} onCheckedChange={() => handleExtraChange('windows')} />
                                                        <span className="text-sm font-medium">Windows</span>
                                                    </label>
                                                    <label htmlFor="drivers" className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50 cursor-pointer has-[input:checked]:bg-primary/5 has-[input:checked]:border-primary transition-all">
                                                        <Checkbox id="drivers" checked={extras.drivers} onCheckedChange={() => handleExtraChange('drivers')} />
                                                        <span className="text-sm font-medium">Drivers</span>
                                                    </label>
                                                    <label htmlFor="extras" className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50 cursor-pointer has-[input:checked]:bg-primary/5 has-[input:checked]:border-primary transition-all">
                                                        <Checkbox id="extras" checked={extras.extras} onCheckedChange={() => handleExtraChange('extras')} />
                                                        <span className="text-sm font-medium">Extras</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4 mt-4">
                                            <ul className="space-y-3">
                                                {features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                                                        <span className="text-foreground text-sm sm:text-base">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6">
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex items-center border rounded-md p-1">
                                                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-8 w-8"><Minus className="w-4 h-4" /></Button>
                                                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                                                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)} className="h-8 w-8"><Plus className="w-4 h-4" /></Button>
                                            </div>
                                            <Button size="lg" className="flex-1 hover-shimmer-button bg-black text-white hover:bg-gray-800 rounded-lg" onClick={handleBuyNow}>
                                                Buy Now
                                            </Button>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
                            <Tabs defaultValue="description" className="w-full">
                                <ScrollArea>
                                    <TabsList className="grid w-full grid-cols-4 min-w-[400px]">
                                        <TabsTrigger value="description">Description</TabsTrigger>
                                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                        <TabsTrigger value="faqs">FAQs</TabsTrigger>
                                        <TabsTrigger value="comparison">Comparison</TabsTrigger>
                                    </TabsList>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                                <TabsContent value="description" className="mt-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200">
                                    <div className="prose prose-gray max-w-none space-y-4">
                                        <div className="bg-[#F5EFFF] p-4 rounded-lg">
                                            <p>Anubis – Bypass is a professional PUBG Mobile enhancement tool built for players who want to gain a sharp advantage in every match. With its advanced bypass technology, Anubis ensures a seamless and secure experience while unlocking powerful in-game advantages.</p>
                                            <p>Designed with precision and Antiban protection, Anubis allows you to dominate battles using its unique mix of aiming assistance, ESP visuals, and secure bypass functionality. Whether you play casually or aim for higher ranks, Anubis makes sure your gameplay remains smooth, smart, and reliable.</p>
                                        </div>
                                        
                                        <div className="bg-[#E5D9F2] p-4 rounded-lg">
                                            <h3 className="font-headline font-bold text-xl mb-4">Key Features:</h3>
                                            <ul className="space-y-2 list-disc pl-5">
                                                <li>Safe & Secure – Built-in Antiban protection for worry-free gameplay.</li>
                                                <li>Silent Aimbot + FOV – Sharp and accurate aim with adjustable field of view.</li>
                                                <li>ESP Visuals – Detect players, bots, and key in-game elements with ease.</li>
                                                <li>FOV Circle & Aim Position – Enhanced aim awareness in real-time.</li>
                                                <li>Skip Knocked Enemies – Focus only on active targets.</li>
                                                <li>Radar & Visuals – Smarter decision-making with on-screen tracking.</li>
                                                <li>Advanced Bypass System – Ensures safe and stable performance on devices.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-[#CDC1FF] p-4 rounded-lg">
                                            <h3 className="font-headline font-bold text-xl mb-4">Why Choose Anubis – Bypass?</h3>
                                            <p>Unlike regular cheats, Anubis – Bypass is engineered for long-term safety and performance. It combines Silent Aimbot, advanced ESP, and a secure bypass system to give players a competitive edge without compromising their account. For serious PUBG Mobile players who value both safety and precision, Anubis is the ultimate choice.</p>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="reviews" className="mt-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200">
                                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                                    <div className="space-y-6">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.aiHint} />
                                                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">{review.name}</h3>
                                                        <div className="flex text-yellow-500">
                                                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 mt-1">{review.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="faqs" className="mt-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200">
                                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Is Anubis safe to use on my main account?</AccordionTrigger>
                                            <AccordionContent>
                                            Yes, it's 100% safe. Our product is equipped with advanced Antiban protection to ensure your main account's security.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>What platforms are supported?</AccordionTrigger>
                                            <AccordionContent>
                                            Anubis is designed for PUBG Mobile and includes an integrated emulator bypass for smooth performance on PC.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>How long does it take to receive the key after purchase?</AccordionTrigger>
                                            <AccordionContent>
                                            Delivery is instant. You will receive your key and setup instructions via email immediately after completing your purchase.
                                            </AccordionContent>
                                        </AccordionItem>
                                         <AccordionItem value="item-4">
                                            <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
                                            <AccordionContent>
                                            We offer 24/7 dedicated support via our Discord server and customer service channels to assist you with any questions or issues.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </TabsContent>
                                <TabsContent value="comparison" className="mt-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200">
                                    <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Feature</TableHead>
                                                <TableHead className="text-center">Anubis</TableHead>
                                                <TableHead className="text-center">Other Cheats</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Safe & Secure</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Yes</TableCell>
                                                <TableCell className="text-center text-red-600">No</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Silent Aimbot + FOV</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Yes</TableCell>
                                                <TableCell className="text-center text-red-600">No</TableCell>
                                            </TableRow>
                                             <TableRow>
                                                <TableCell className="font-medium">ESP Visuals</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Advanced</TableCell>
                                                <TableCell className="text-center text-yellow-600">Basic</TableCell>
                                            </TableRow>
                                             <TableRow>
                                                <TableCell className="font-medium">Radar & Visuals</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Advanced</TableCell>
                                                <TableCell className="text-center text-yellow-600">Limited</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Skip Knocked Enemies</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Yes</TableCell>
                                                <TableCell className="text-center text-red-600">No</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Advanced Bypass System</TableCell>
                                                <TableCell className="text-center text-green-600 font-bold">Yes</TableCell>
                                                <TableCell className="text-center text-red-600">No</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <RelatedProducts category="pc" currentProduct="Anubis Week Key" onPriceChange={setRelatedTotal}/>

                    </div>
                </main>
                <Footer />
            </div>
        </ProductLayout>
    );
}
