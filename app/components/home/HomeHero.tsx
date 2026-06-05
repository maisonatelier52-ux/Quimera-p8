import React from 'react';
import StandardCard from '../cards/StandardCard';
import FeatureMainCard from '../cards/FeatureMainCard';
import HorizontalCard from '../cards/HorizontalCard';
import MostReadWidget from '../sidebar/MostReadWidget';
import heroData from '@/public/data/home-hero.json';

export default function HomeHero() {
    const { featured: featuredArticle, sideArticles, bottomArticles, mostRead } = heroData;

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1330px] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">

                    {/* Left Column (1/4) - Standard Cards */}
                    <div className="col-span-1 flex flex-col gap-8 pr-0 lg:pr-6">
                        {sideArticles.map((article, idx) => (
                            <StandardCard key={idx} {...article} />
                        ))}
                    </div>

                    {/* Middle Column (2/4) - Featured & Horizontal */}
                    <div className="col-span-1 lg:col-span-2 pr-0 lg:pr-6 lg:pl-4">
                        <FeatureMainCard article={featuredArticle} />

                        {/* Divider */}
                        

                        <div className="flex flex-col gap-4">
                            {bottomArticles.map((article, idx) => (
                                <div key={idx} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
                                    <HorizontalCard article={article} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (1/4) - Most Read */}
                    <div className="col-span-1">
                        <MostReadWidget items={mostRead} />
                    </div>

                </div>
            </div>
        </section>
    );
}
