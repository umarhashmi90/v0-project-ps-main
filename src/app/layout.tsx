import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ChatFabLoader } from '@/components/chat-fab-loader';
import Script from 'next/script';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ExitIntentPopupLoader } from '@/components/exit-intent-popup-loader';
import { BannerProvider } from '@/context/BannerContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'PUBGSTUFF - Digital Gaming Products, AI Tools & Courses',
  description: 'PUBGSTUFF is your one-stop shop for digital gaming products, AI tools, and courses. Get expert support, SEO services, and game boosters with secure checkout. Developed by Umar Hashmi.',
  keywords: ['PUBGSTUFF', 'PUBG Stuff', 'gaming products', 'AI tools', 'online courses', 'SEO services', 'Umar Hashmi developer', 'digital services', 'game boosters', 'Pakistan top web developer'],
  authors: [{ name: 'Umar Hashmi' }],
  openGraph: {
    title: 'PUBGSTUFF - Digital Gaming Products, AI Tools & Courses',
    description: 'Join 50K+ people already using PUBGSTUFF. Explore digital gaming products, AI tools, and expert services. Developed by Umar Hashmi.',
    type: 'website',
    url: 'https://pubgstuff.store/',
    images: ['https://i.postimg.cc/T1cnjp8N/Untitled-design.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUBGSTUFF - Digital Gaming Products, AI Tools & Courses',
    description: 'Explore PUBG Stuff digital gaming products, AI tools, and services. Developed by Umar Hashmi.',
    images: ['https://i.postimg.cc/T1cnjp8N/Untitled-design.png'],
  },
  icons: {
    icon: 'https://i.postimg.cc/T1cnjp8N/Untitled-design.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PUBGSTUFF",
    "url": "https://pubgstuff.store",
    "founder": {
      "@type": "Person",
      "name": "Umar Hashmi",
      "url": "https://www.umarhashmi.dev",
      "jobTitle": "Full Stack Developer"
    },
    "sameAs": [
      "https://www.umarhashmi.dev",
      "https://www.instagram.com/umarhashmi.dev/",
      "https://www.threads.com/@umarhashmi.dev",
      "https://www.facebook.com/umarhashmi.dev",
      "https://x.com/umarhashmi_dev",
      "https://www.linkedin.com/in/umarhashmi-dev",
      "https://github.com/umarhashmi-dev",
      "https://codepen.io/umarhashmi-dev"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+92 335 5448505",
        "contactType": "sales",
        "email": "info@pubgstuff.store",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Urdu"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+92 302 1550385",
        "contactType": "support",
        "email": "contact@umarhashmi.dev",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Urdu"]
      }
    ],
    "description": "PUBGSTUFF is a digital gaming products and AI tools platform. Offering web development, SEO, SMM, ads, marketing, courses, and automation solutions."
  };

  const developerSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Umar Hashmi",
    "url": "https://www.umarhashmi.dev",
    "jobTitle": "Web Developer & UI/UX Designer",
    "worksFor": {
      "@type": "Organization",
      "name": "U-Designer"
    },
    "sameAs": [
      "https://www.instagram.com/umarhashmi.dev/",
      "https://www.threads.com/@umarhashmi.dev",
      "https://www.facebook.com/umarhashmi.dev",
      "https://x.com/umarhashmi_dev",
      "https://www.linkedin.com/in/umarhashmi-dev",
      "https://github.com/umarhashmi-dev",
      "https://codepen.io/umarhashmi-dev"
    ],
    "email": "contact@umarhashmi.dev"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services are offered by PubgStuff?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PubgStuff offers gaming products, AI tools, SEO, SMM, ads, web development, courses, and automation services."
        }
      },
      {
        "@type": "Question",
        "name": "How can PubgStuff improve my gaming experience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PubgStuff provides premium digital keys, game boosters, and AI-powered tools to optimize gameplay performance."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with PubgStuff services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply sign up at pubgstuff.store, browse products, and purchase instantly with secure checkout."
        }
      },
      {
        "@type": "Question",
        "name": "How safe and secure are PubgStuff’s services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All services are safe and protected with secure payment gateways, trusted by 50K+ users worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "Can PubgStuff support my website’s SEO needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PubgStuff provides SEO optimization services, including keyword research, metadata optimization, and content strategy."
        }
      }
    ]
  };

  return (
    <html lang="en" className={`!scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="developer-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(developerSchema),
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body>
          <CurrencyProvider>
            <CartProvider>
              <FavoritesProvider>
                <BannerProvider>
                  {children}
                  <Toaster />
                  <ChatFabLoader />
                  <ExitIntentPopupLoader />
                </BannerProvider>
              </FavoritesProvider>
            </CartProvider>
          </CurrencyProvider>
      </body>
    </html>
  );
}
