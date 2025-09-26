'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Check, Settings, Info, FileText, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function BuildBalancePage() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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
                  <CardTitle className="text-3xl font-bold font-headline">Build Balance - Unity App Template</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                         <Image src="https://i.postimg.cc/Ls48RvP8/preview-xl.jpg" alt="Build Balance Game" fill className="object-cover" data-ai-hint="unity game balance" />
                    </div>
                    <div className="mt-6 prose prose-gray max-w-none">
                        <h3 className="font-semibold font-headline">Overview</h3>
                        <p>Build Balance is a fully developed Unity 3D casual mobile game, designed for quick deployment on the Google Play Store (Android) or the Apple App Store (iOS).</p>
                        <p>Customization is simple: update UI elements, adjust sounds, and replace fonts. To integrate ads, simply update the ad keys using GLEY Tools. The project is compatible with multiple ad networks.</p>
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-headline">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {["Easy to add new features", "Compatible with mobile & desktop", "Easy to reskin, ready to publish", "Unity Ads integrated", "Admob / FAN / Iron Source (Gley)", "Easy to add new levels", "Easy customization", "Responsive UI", "Support for 64-bit build", "Increasing difficulty", "Commented, clean C# scripts"].map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky top-28 space-y-6">
                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Button asChild size="lg" className="w-full hover-shimmer-button">
                            <Link href="https://drive.google.com/file/d/1_IkqMaiGy8t7bbAVa3o8--3z7O_rU2wx/view" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" />
                                Download Now
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full mt-3">
                            <Link href="https://drive.google.com/file/d/1sS-nDh_vsOcLjizHixtHQXwUZRTjNamO/view" target="_blank" rel="noopener noreferrer">
                                Try APK
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
                        <p className="text-sm">Install Unity 2019.3.9f1 or higher.</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-white">
                     <CardHeader>
                        <CardTitle className="text-lg font-bold font-headline flex items-center gap-2"><FileText className="w-5 h-5"/> Instructions</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm">Unzip the file, import into Unity. Customize, modify, and run. Read the Document.pdf for details on editing and reskinning.</p>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-headline flex items-center gap-2"><Info className="w-5 h-5"/> Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="font-semibold">Category:</span>
                            <span>App Templates / Casual</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">First release:</span>
                            <span>{currentDate}</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">Last update:</span>
                            <span>{currentDate}</span>
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
