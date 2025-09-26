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
    "Built with React Native", "State Management with Redux", "Clean & Modular Code", "Splash Screen",
    "Side & Bottom Tab Menus", "Beautiful Auth Screens", "Lottie Icons & Images", "Profile Management",
    "Multi-language Support", "Notifications & Settings", "Reviews, FAQ, and Help", "Interactive UI Elements"
];

export default function CrmLeadManagementPage() {
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
                  <CardTitle className="text-3xl font-bold font-headline">CRM - Lead Management App React Native</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                         <Image src="https://i.postimg.cc/J7Fxk27S/preview-xl-1.jpg" alt="CRM App" fill className="object-cover" data-ai-hint="mobile app crm" />
                    </div>
                    <div className="mt-6 prose prose-gray max-w-none">
                        <h3 className="font-semibold font-headline">Overview</h3>
                        <p>CRM App is a React Native template built with React Native CLI, designed exclusively for Android. This template offers a clean, well-formatted code structure, making it simple to install, customize, and deploy.</p>
                        <p>With its intuitive UI, this CRM app streamlines business interactions by centralizing customer data, managing sales processes, and enhancing communication channels. Perfect for businesses looking to boost customer satisfaction and drive sales, this app is a powerful tool for lead and pipeline management.</p>
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-headline">Key Features</CardTitle>
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
                        <p>Instructions to Set Up and Run the CRM App Template:</p>
                        <ol>
                            <li><strong>Download and Extract:</strong> Download and extract the ZIP file.</li>
                            <li><strong>Install Prerequisites:</strong> Ensure Node.js and React Native CLI are installed.</li>
                            <li><strong>Install Dependencies:</strong> Run <code>npm install</code> in the project folder.</li>
                            <li><strong>Run the App:</strong> Start the Metro bundler with <code>npx react-native start</code> and then run on your device/emulator with <code>npx react-native run-android</code>.</li>
                        </ol>
                        <p>Refer to the documentation for detailed guidance.</p>
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky top-28 space-y-6">
                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Button asChild size="lg" className="w-full hover-shimmer-button">
                            <Link href="https://drive.google.com/file/d/1oihpVwX9q9BeKCIMafYmsjisbxe68NAm/view?usp=sharing" target="_blank" rel="noopener noreferrer">
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
                        <p className="text-sm">Node.js, React Native CLI, and Android Studio. Basic knowledge of React Native is recommended.</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-headline flex items-center gap-2"><Info className="w-5 h-5"/> Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="font-semibold">Category:</span>
                            <span>App Templates / React</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">First release:</span>
                            <span>24 Dec 2024</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">Last update:</span>
                            <span>30 Dec 2024</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between">
                            <span className="font-semibold">Operating Systems:</span>
                            <span>Android</span>
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
