import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import OverlayCard from '../cards/OverlayCard';
import justInData from '@/public/data/just-in.json';

export default function JustIn() {
    const { mainArticle, bottomArticles } = justInData;

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1330px] mx-auto px-4">
                <div className="border border-gray-700 rounded-2xl p-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold text-[#09365E]">Just In</h2>
                        <span className="text-red-600 text-2xl font-black italic">//</span>
                    </div>

                    {/* Main Article (Horizontal) */}
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                        <div className="w-full md:w-[45%]">
                            <Link href={`/articles/${mainArticle.slug}`} className="block overflow-hidden rounded-none aspect-[1.5/1]">
                                <img
                                    src={mainArticle.image}
                                    alt={mainArticle.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </Link>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center justify-between mb-3 text-[11px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <Link href={`/category/${mainArticle.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-red-600 hover:underline">
                                        {mainArticle.category}
                                    </Link>
                                    <span className="text-gray-300 font-normal">|</span>
                                    <span className="text-gray-500 normal-case font-medium">{mainArticle.date}</span>
                                </div>
                                <button className="text-gray-400 hover:text-red-600 transition-colors">
                                    <Bookmark size={18} />
                                </button>
                            </div>
                            <Link href={`/articles/${mainArticle.slug}`}>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight text-[#09365E] hover:text-red-600 transition-colors">
                                    {mainArticle.title}
                                </h3>
                            </Link>
                        </div>
                    </div>

                    {/* Dotted Divider */}
                    <div className="w-full border-t border-dashed border-gray-200 mb-6"></div>

                    {/* Bottom Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bottomArticles.map((article, index) => (
                            <OverlayCard key={index} {...article} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
