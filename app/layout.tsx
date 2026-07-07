import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interSecondary = Inter({
  subsets: ['latin'],
  variable: '--font-serif-next',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quimera-news.com'),
  title: {
    default: 'Quimera News | Global Perspective & Premium Insights',
    template: '%s | Quimera News'
  },
  description: 'Unrivaled news coverage and expert analysis for the discerning reader.',
  keywords: ['news', 'finance', 'tech', 'lifestyle', 'premium insights'],
};

import { SubscriberProvider } from './components/SubscriberContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let appearance: any = {
    headerBgColor: "#09365E",
    footerBgColor: "#09365E",
    primaryAccentColor: "#E12A32",
    globalTextColor: "#333333",
    globalFontFamily: "sans-serif"
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/public/appearance`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      appearance = { ...appearance, ...data };
    }
  } catch (error) {
    console.error("Failed to fetch appearance settings:", error);
  }

  return (
    <html lang="en" className={`${inter.variable} ${interSecondary.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --header-bg: ${appearance.headerBgColor};
            --footer-bg: ${appearance.footerBgColor};
            --primary-accent: ${appearance.primaryAccentColor};
            --global-text-color: ${appearance.globalTextColor};
            --global-font-family: ${appearance.globalFontFamily};
          }
          body {
            color: var(--global-text-color);
            font-family: var(--global-font-family);
          }
        `}} />
      </head>
      <body className="antialiased">
        <SubscriberProvider>
          {children}
        </SubscriberProvider>
      </body>
    </html>
  );
}
