import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif-next',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Quimera News | Global Perspective & Premium Insights',
    template: '%s | Quimera News'
  },
  description: 'Unrivaled news coverage and expert analysis for the discerning reader.',
  keywords: ['news', 'finance', 'tech', 'lifestyle', 'premium insights'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body className="antialiased font-serif">
        {children}
      </body>
    </html>
  );
}
