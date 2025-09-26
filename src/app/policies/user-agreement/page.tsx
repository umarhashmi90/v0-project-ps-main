'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Cta from "@/components/landing/cta";

export default function UserAgreementPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24">
        <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                User Agreement
                </h1>
                <p className="mt-4 text-sm text-gray-500 md:text-base">
                Last updated: Friday, 21 February 2025 in I-9, Islamabad
                </p>
            </div>

            <div className="mt-8 space-y-6 md:mt-12 md:space-y-8">
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Eligibility</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using our services, you represent that you meet this requirement.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Account Creation</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  To access certain features of our services, you may be required to create an account. You agree to:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 md:mt-4 md:pl-6">
                  <li>Provide accurate, current, and complete information during the registration process.</li>
                  <li>Update such information to keep it accurate, current, and complete.</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Account Security</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  You are responsible for safeguarding your password and for any activities or actions under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Prohibited Activities</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                 <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 md:mt-4 md:pl-6">
                  <li>Using the service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                  <li>Attempting to gain unauthorized access to the service, user accounts, or computer systems or networks connected to the service.</li>
                  <li>Interfering with the operation of the service or any user’s enjoyment of the service.</li>
                  <li>Impersonating any person or entity or misrepresenting your affiliation with any person or entity.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Termination</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  We reserve the right to terminate or suspend your account and access to the service at our discretion, without notice, for conduct that we believe violates this Agreement or is harmful to other users of the service, us, or third parties.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-bold md:text-2xl">Contact Us</h2>
                <p className="mt-2 text-gray-700 md:mt-4">
                  If you have any questions regarding our Cookies Policy, please contact us:
                </p>
                <ul className="mt-2 space-y-2 text-gray-700 md:mt-4">
                  <li><strong>By email:</strong> <a href="mailto:info@pubgstuff.store" className="text-black underline">info@pubgstuff.store</a></li>
                  <li><strong>By visiting our website:</strong> <a href="/contact" className="text-black underline">Contact Us</a></li>
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
