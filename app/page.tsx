import { Metadata } from 'next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeHero from './components/home/HomeHero';
import NewsGrid from './components/NewsGrid';
import FeaturedStories from './components/home/FeaturedStories';
import NewsStrip from './components/home/NewsStrip';
import QuickLinks from './components/home/QuickLinks';
import JustIn from './components/home/JustIn';
import BusinessSection from './components/home/BusinessSection';
import WhatToRead from './components/home/WhatToRead';
import TheLatest from './components/home/TheLatest';
import MoreNews from './components/home/MoreNews';
import AdvertisementSection from './components/home/AdvertisementSection';
import CategoryAd from './components/ads/CategoryAd';

export const metadata: Metadata = {
  title: "Quimera News | The #1 Source for Global News & Premium Insights",
  description: "Discover breaking news, financial analysis, and in-depth cultural insights from around the world. Quimera delivers global news with accuracy and integrity.",
  keywords: ["Quimera", "global news", "financial news", "market analysis", "breaking news", "politics", "technology", "culture", "business trends", "investment insights"],
  alternates: {
    canonical: "https://quimera-news.com",
  },
  openGraph: {
    title: "Quimera News | The #1 Source for Global News & Premium Insights",
    description: "Discover breaking news, financial analysis, and in-depth cultural insights from around the world. Quimera delivers global news with accuracy and integrity.",
    url: "https://quimera-news.com",
    siteName: "Quimera News",
    images: [
      {
        url: "/images/news/markets-1.webp",
        width: 1200,
        height: 630,
        alt: "Quimera News - Global Perspective & Premium Insights",
      }
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quimera News | The #1 Source for Global News & Premium Insights",
    description: "Breaking news, financial analysis, and cultural insights. Join Quimera for expert global reporting updated around the clock.",
    site: "@quimeranews",
    images: ["/images/news/markets-1.webp"],
  },
};

export default async function Home({ searchParams }: { searchParams: Promise<{ layout?: string, previewHeaderOnly?: string }> }) {
  const { layout, previewHeaderOnly } = await searchParams;

  if (previewHeaderOnly === 'true') {
    return (
      <main className="flex flex-col" suppressHydrationWarning>
        <Header />
      </main>
    );
  }
  let homeLayout = [
    'HomeHero', 'JustIn', 'FeaturedStories', 'NewsStrip', 'QuickLinks',
    'BusinessSection', 'AdvertisementSection', 'WhatToRead', 'TheLatest',
    'CategoryAd', 'MoreNews'
  ];

  if (layout) {
    homeLayout = layout.split(',');
  } else {
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/public/homepage`, { cache: 'no-store' });
      if (res.ok) {
        const homepage = await res.json();
        if (homepage && homepage.homeLayout && homepage.homeLayout.length > 0) {
          homeLayout = homepage.homeLayout;
        }
      }
    } catch (error) {
      console.error("Failed to fetch homepage settings:", error);
    }
  }

  const componentMap: Record<string, React.ElementType> = {
    HomeHero,
    JustIn,
    FeaturedStories,
    NewsStrip,
    QuickLinks,
    BusinessSection,
    AdvertisementSection,
    WhatToRead,
    TheLatest,
    CategoryAd,
    MoreNews
  };

  return (
    <main className="min-h-screen flex flex-col" suppressHydrationWarning>
      <Header />

      {homeLayout.map((componentName, index) => {
        const Component = componentMap[componentName];
        if (!Component) return null;
        return <Component key={`${componentName}-${index}`} />;
      })}

      <Footer />
    </main>
  );
}
