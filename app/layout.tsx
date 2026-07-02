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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let appearance = {
    headerBgColor: "#09365E",
    footerBgColor: "#09365E",
    primaryAccentColor: "#E12A32"
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/public/appearance", { cache: 'no-store' });
    if (res.ok) {
      appearance = await res.json();
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
          }
        `}} />
      </head>
      <body className="antialiased font-serif">
        {children}
      </body>
    </html>
  );
}
