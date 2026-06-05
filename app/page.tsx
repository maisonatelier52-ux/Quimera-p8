import { Metadata } from 'next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeHero from './components/home/HomeHero';
import NewsGrid from './components/NewsGrid';
import articlesData from '@/public/data/all-articles-index.json';
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
  title: "Quimera News | Global Perspective & Premium Insights",
  description: "Your source for the latest global news, financial analysis, and cultural insights.",
};

export default function Home() {
  // Logic to organize data for the new UI - Currently HomeHero uses its own mock data 
  // to match the specific request, but eventually we can pass props.

  const economicArticles = articlesData.filter(a => a.category === 'Economic').slice(0, 4);
  const globalAffairsArticles = articlesData.filter(a => a.category === 'Global Affairs').slice(0, 4);
  const climateArticles = articlesData.filter(a => a.category === 'Climate Change').slice(0, 4);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* New 3-Column Hero Section */}
        <HomeHero />
        <JustIn />
        <FeaturedStories />
        <NewsStrip />
        <QuickLinks />
        <BusinessSection />
        <AdvertisementSection />
        <WhatToRead />
        <AdvertisementSection />
        <TheLatest />
        <CategoryAd />
        <MoreNews />
      </div>

      <Footer />
    </main>
  );
}
