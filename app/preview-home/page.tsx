import React from 'react';
import HomeHero from '../components/home/HomeHero';
import JustIn from '../components/home/JustIn';
import FeaturedStories from '../components/home/FeaturedStories';
import NewsStrip from '../components/home/NewsStrip';
import QuickLinks from '../components/home/QuickLinks';
import BusinessSection from '../components/home/BusinessSection';
import WhatToRead from '../components/home/WhatToRead';
import TheLatest from '../components/home/TheLatest';
import MoreNews from '../components/home/MoreNews';
import AdvertisementSection from '../components/home/AdvertisementSection';
import CategoryAd from '../components/ads/CategoryAd';

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

export default function PreviewHome({ searchParams }: { searchParams: { layout?: string } }) {
  const layout = searchParams.layout ? searchParams.layout.split(',') : [];

  return (
    <main className="w-full bg-white min-h-screen">
      <section className="flex-grow w-full pointer-events-none">
        {layout.map((componentName, index) => {
          const Component = componentMap[componentName];
          if (!Component) return null;
          return <Component key={`${componentName}-${index}`} />;
        })}
      </section>
    </main>
  );
}
