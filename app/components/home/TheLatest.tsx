import React from 'react';
import LatestVerticalCard from '../cards/LatestVerticalCard';
import allArticles from '@/public/data/all-articles-index.json';

export default function TheLatest() {
    const latestArticles = allArticles.slice(28, 33);
    return (
        <section className="w-full bg-white py-8 pb-8">
            <div className="max-w-[1330px] mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-2xl font-black text-[#09365E]">The Latest</h2>
                    <span className="text-red-600 text-2xl font-black italic">//</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                    {latestArticles.map((article, index) => (
                        <LatestVerticalCard
                            key={index}
                            {...article}
                            showDivider={index < latestArticles.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
