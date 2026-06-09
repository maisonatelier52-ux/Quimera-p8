import React from 'react';
import FeaturedVerticalCard from '../cards/FeaturedVerticalCard';
import allArticles from '@/public/data/all-articles-index.json';

export default function FeaturedStories() {
    const stories = allArticles.slice(13, 17);

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1330px] mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-tight text-[#09365E]">
                        Featured Stories
                    </h2>
                    <span className="text-red-600 text-2xl font-black italic">
                        <span className="rotate-0 inline-block">//</span>
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stories.map((story, index) => (
                        <FeaturedVerticalCard
                            key={index}
                            {...story}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
