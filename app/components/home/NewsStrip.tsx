import React from 'react';
import StripCard from '../cards/StripCard';
import allArticles from '@/public/data/all-articles-index.json';

export default function NewsStrip() {
    const stripItems = allArticles.slice(17, 23);

    return (
        <section className="w-full bg-white py-8 border-t border-gray-100">
            <div className="max-w-[1330px] mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {stripItems.map((item, index) => (
                        <StripCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
