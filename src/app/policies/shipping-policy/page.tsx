'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Shipping Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 md:text-base">
                Last updated: Friday, 21 February 2025 in I-9, Islamabad
                </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Digital Delivery</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  At PubgStuff, all our products are available for digital download. This means that once your purchase is completed, you won’t have to wait for physical shipping; your product will be ready for immediate access.
                </p>
                <p className="mt-2 text-gray-700 md:mt-4">
                  Just like downloading your favorite song or movie, the process is quick and efficient. No waiting at the door for a package to arrive!
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Download Instructions</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  After your purchase, you’ll receive an email with a link to download your product. Simply follow these steps:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 md:mt-4 md:pl-6">
                  <li>Check your email for the download link.</li>
                  <li>Click the link to initiate the download.</li>
                  <li>Save the file to your preferred location on your device.</li>
                  <li>Follow any additional instructions provided in the email to install or access your product.</li>
                </ul>
                 <p className="mt-2 text-gray-700 md:mt-4">
                  If you encounter any issues, please refer to our support section below.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Support</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  If you have any questions regarding the download process or need assistance, our support team is here to help. We aim to provide a seamless experience, and your satisfaction is our priority.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Contact Us</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  If you have any questions regarding our Cookies Policy, please contact us:
                </p>
                <ul className="mt-2 space-y-2 text-gray-700 md:mt-4">
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
