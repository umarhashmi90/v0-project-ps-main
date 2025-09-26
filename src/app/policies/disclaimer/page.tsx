'use client';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 bg-white text-black pt-24">
        <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Disclaimer
              </h1>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Interpretation and Definitions</h2>
                <h3 className="text-lg font-semibold mt-4">Interpretation</h3>
                <p className="mt-2 text-gray-700">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h3 className="text-lg font-semibold mt-4">Definitions</h3>
                <p className="mt-2 text-gray-700">For the purposes of this Disclaimer:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 md:pl-6">
                  <li><strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Disclaimer) refers to PubgStuff, Shams Colony H-13 Islamabad.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                  <li><strong>Website</strong> refers to PubgStuff, accessible from https://www.pubgstuff.store/</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Disclaimer</h2>
                <p className="mt-2 text-gray-700">The information contained on the Service is for general information purposes only.</p>
                <p className="mt-2 text-gray-700">The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
                <p className="mt-2 text-gray-700">In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">External Links Disclaimer</h2>
                <p className="mt-2 text-gray-700">The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</p>
                <p className="mt-2 text-gray-700">Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Errors and Omissions Disclaimer</h2>
                <p className="mt-2 text-gray-700">The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules, and regulations, there may be delays, omissions, or inaccuracies in the information contained on the Service.</p>
                <p className="mt-2 text-gray-700">The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Fair Use Disclaimer</h2>
                <p className="mt-2 text-gray-700">The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</p>
                <p className="mt-2 text-gray-700">The Company believes this constitutes a “fair use” of any such copyrighted material as provided for in section 107 of the United States Copyright law.</p>
                <p className="mt-2 text-gray-700">If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
              </div>
              
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Views Expressed Disclaimer</h2>
                <p className="mt-2 text-gray-700">The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer, or company, including the Company.</p>
                <p className="mt-2 text-gray-700">Comments published by users are their sole responsibility and the users will take full responsibility, liability, and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">No Responsibility Disclaimer</h2>
                <p className="mt-2 text-gray-700">The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal, or other competent advisers.</p>
                <p className="mt-2 text-gray-700">In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">“Use at Your Own Risk” Disclaimer</h2>
                <p className="mt-2 text-gray-700">All information in the Service is provided “as is”, with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not to warranties of performance, merchantability, and fitness for a particular purpose.</p>
                <p className="mt-2 text-gray-700">The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special, or similar damages, even if advised of the possibility of such damages.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 md:p-6">
                <h2 className="text-xl font-bold md:text-2xl">Contact Us</h2>
                <p className="mt-2 text-gray-700">If you have any questions about this Disclaimer, You can contact Us:</p>
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
