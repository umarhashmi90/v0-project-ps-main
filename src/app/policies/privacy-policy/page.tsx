'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Link from "next/link";
import Cta from "@/components/landing/cta";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 md:text-base">
                Last updated: Friday, 21 February 2025 in I-9, Islamabad
                </p>
            </div>

            <div className="space-y-6 md:space-y-8 prose prose-gray max-w-none">
               <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <p>
                  This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our service, along with your privacy rights and legal protections.
                </p>
                <p>
                  By using our service, you consent to the collection and use of information in accordance with this policy.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Definitions</h2>
                 <ul>
                  <li><strong>Account:</strong> A unique account created for you to access our service.</li>
                  <li><strong>Company:</strong> Refers to PubgStuff, located in Shams Colony H-13, Islamabad.</li>
                  <li><strong>Cookies:</strong> Small files placed on your device to track browsing activity.</li>
                  <li><strong>Personal Data:</strong> Any information that can identify an individual.</li>
                  <li><strong>You:</strong> The individual or entity using the service.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Data Collection</h2>
                <p>We may collect personal data including:</p>
                <ul>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Address, City, ZIP/Postal code</li>
                    <li>Usage Data</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Use of Data</h2>
                 <p>We may use your personal data for:</p>
                <ul>
                    <li>Maintaining our service</li>
                    <li>Managing your account</li>
                    <li>Contacting you with updates</li>
                </ul>
              </div>

               <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Children’s Privacy</h2>
                <p>
                  Our service is not intended for anyone under 18. If you believe we have collected personal data from your child, please contact us.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy periodically. Changes will be posted on this page.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
