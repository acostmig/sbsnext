import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/forked/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/forked/ui/sidebar';

import { getSession } from '@/app/session';
import { ChatContextProvider } from "@/components/forked/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { ThemeProvider } from '@/components/forked/theme-provider';
import { Toaster } from 'sonner';
import Script from "next/script";
import { URL } from "url";
import Head from "next/head";

export const viewport : Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width'
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sbsnext.com"),
  title: "SBSNext - AI, Test Automation & Full-Stack Development",
  description: "Leveraging AI/ML to build innovative solutions, designing test automation frameworks, and delivering scalable full-stack applications.",
  keywords: "AI, ML, Test Automation, Software Development, Full-Stack, Chatbots, Code Generators, Predictive Analytics",
  robots: "index, follow",
  authors: { name: "SBSNext LLC", url: "https://sbsnext.com/" },
  applicationName: "SBSNext",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "SBSNext LLC",
  publisher: "SBSNext LLC",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://sbsnext.com/",
  },

  // Open Graph for Social Media Previews
  openGraph: {
    type: "website",
    title: "SBSNext - AI, Test Automation & Full-Stack Development",
    description: "Leveraging AI/ML to build innovative solutions, designing test automation frameworks, and delivering scalable full-stack applications.",
    url: "https://sbsnext.com/",
    siteName: "SBSNext",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "SBSNext - AI, Test Automation & Full-Stack Development",
      },
    ],
    locale: "en_US",
  },

  // Twitter Card for social sharing
  twitter: {
    card: "summary_large_image",
    title: "SBSNext - AI, Test Automation & Full-Stack Development",
    description: "Leveraging AI/ML to build innovative solutions, designing test automation frameworks, and delivering scalable full-stack applications.",
    site: "@sbsnext", // Replace with actual Twitter handle if available
    creator: "@sbsnext",
    images: ["https://sbsnext.com/images/logo.png"],
  },
  // Structured Data (Schema.org JSON-LD)
  other: {
    "google-site-verification":"ShkTI5OdsGWp_bUu0sG0gZr3Qz1-cDyRTWudAo4289k",
    "ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SBSNext LLC",
      "url": "https://sbsnext.com",
      "logo": "/images/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-551-294-4913",
          "contactType": "customer service",
          "areaServed": "US",
          "availableLanguage": ["English", "Spanish"]
        }
      ],
      "sameAs": ["https://www.linkedin.com/company/sbsnext"]
    }),
  },
};

export const experimental_ppr = true;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, cookieStore] = await Promise.all([getSession(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  const modelIdFromCookieId = cookieStore.get('chat-model')?.value;

  return (
    <html lang="en" suppressHydrationWarning>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16881455634" strategy="afterInteractive"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16881455634');
          `}
        </Script>
        <Script>
            {`
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-16881455634/9ycFCM3ZwZ8aEJKk2vE-',
                    'value': 1.0,
                    'currency': 'USD',
                    'event_callback': callback
                });
                return false;
              }
            `}
        </Script>
      <body
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
          strategy="beforeInteractive"
          />

          <ChatContextProvider selectedChatModelId={modelIdFromCookieId ?? DEFAULT_CHAT_MODEL}>
            <SidebarProvider defaultOpen={!isCollapsed}>
              <AppSidebar user={session?.user} />
              <SidebarInset>
                <div className="relative flex flex-col min-h-screen">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </SidebarInset>
            </SidebarProvider>
          </ChatContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
