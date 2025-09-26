'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Link from "next/link";

export default function CookiesPolicyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Cookies Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 md:text-base">
                Last Update: Friday, 21 February 2025 Date in I-9, Islamabad, Pakistan
                </p>
            </div>

            <div className="space-y-6 md:space-y-8 prose prose-gray max-w-none">
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">1. Use of Cookies</h2>
                <p>
                  At PubgStuff, we do not display a cookie notice on our website. However, we use cookies to enhance user experience and analyze how our website is used.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">2. Analytics Tools</h2>
                <p>
                  We utilize various analytics and performance tools, such as Google Analytics, to analyze how users interact with our website. This helps us improve our services and user experience.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">3. Advertising Platforms</h2>
                <p>
                  We use advertising platforms, including Google Ads and Facebook Ads, to promote our website. This includes retargeting users who have previously visited our site.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">4. Social Media Integration</h2>
                <p>
                  Our website features social media like/follow buttons and “Log-in” options. These may also utilize cookies to facilitate user engagement and functionality.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Contact Us</h2>
                <p>
                  If you have any questions regarding our Cookies Policy, please contact us:
                </p>
                <ul>
                  <li><strong>By email:</strong> <a href="mailto:info@pubgstuff.store" className="text-black underline">info@pubgstuff.store</a></li>
                  <li><strong>By visiting our website:</strong> <Link href="/contact" className="text-black underline">Contact Us</Link></li>
                  <li><strong>By phone:</strong> +92 335 5448505 | +92 302 1550385</li>
                  <li><strong>Address:</strong> Shams Colony H-13, Islamabad, Pakistan, 46000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
