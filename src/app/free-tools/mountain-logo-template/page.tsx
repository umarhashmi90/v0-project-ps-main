'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Check, Settings, Info, FileText, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const features = [
    "EPS file", "Ai file", "Logo template", "Readme file with Font link",
    "Full vectors", "100% editable and scalable", "High resolution 300 DPI",
    "CMYK colors", "Free fonts"
];

export default function MountainLogoTemplatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Mountain Logo Template Design</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                         <Image src="https://i.postimg.cc/wMqSN7k8/preview-xl-2.jpg" alt="Mountain Logo" fill className="object-cover" data-ai-hint="mountain logo vector" />
                    </div>
                    <div className="mt-6 prose prose-gray max-w-none">
                        <h3 className="font-semibold font-headline">Overview</h3>
                        <p>Mountain Logo Template Design combines modernity and simplicity. This logo is print-ready, fully editable, and scalable, ensuring a professional look that enhances your brand's visibility.</p>
                        <p>Purchase today for a sleek, impactful logo that’s easy to use and if you love it, a 5-star review would be much appreciated!</p>
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-headline">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {features.map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                 <CardHeader>
                    <CardTitle className="text-xl font-bold font-headline flex items-center gap-2"><FileText className="w-5 h-5"/> Instructions</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="prose prose-sm max-w-none">
                        <p>Simply open the AI or EPS file in Adobe Illustrator to start editing. The Readme file includes a link to download the free font used in the template.</p>
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky top-28 space-y-6">
                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Button asChild size="lg" className="w-full hover-shimmer-button">
                            <Link href="https://drive.google.com/file/d/1siwFeqOKKWOk_QJF4TtNOyD-0gILR4Xs/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" />
                                Download Now
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                       <div className="flex items-start gap-3">
                           <AlertTriangle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                           <p className="text-xs text-green-800">This item is one of the free files of the week. You are able to download this item for free for a limited time. Updates and support are only available if you purchase this item.</p>
                       </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-headline flex items-center gap-2"><Settings className="w-5 h-5"/> Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Adobe Illustrator and the free font linked in the Readme file.</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-headline flex items-center gap-2"><Info className="w-5 h-5"/> Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="font-semibold">Category:</span>
                            <span>Graphics / Logos</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">First release:</span>
                            <span>22 Dec 2024</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">Last update:</span>
                            <span>22 Dec 2024</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">Files included:</span>
                            <span>EPS, AI</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
