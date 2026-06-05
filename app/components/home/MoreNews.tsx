'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Play } from 'lucide-react';
import moreNewsData from '@/public/data/more-news.json';

interface NewsArticle {
    slug: string;
    image: string;
    category: string;
    date: string;
    title: string;
    hasVideo?: boolean;
}

export default function MoreNews() {
    const [showAll, setShowAll] = useState(false);

    // Each row has 2 articles. Initial: 3 rows (6 articles). Total: 6 rows (12 articles).
    const initialArticlesCount = 6;
    const articles = (moreNewsData as NewsArticle[]);
    const displayedArticles = showAll ? articles : articles.slice(0, initialArticlesCount);

    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1330px] mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-2xl font-black text-[#09365E]">More News</h2>
                    <span className="text-red-600 text-2xl font-black italic">//</span>
                </div>

                {/* Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {displayedArticles.map((article, index) => (
                        <div key={index} className="flex gap-6 group">
                            {/* Image side */}
                            <Link href={`/articles/${article.slug}`} className="block relative overflow-hidden rounded-none w-[220px] aspect-[1.6/1] flex-shrink-0 bg-gray-100">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {article.hasVideo && (
                                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-black/5">
                                        <Play size={14} fill="currentColor" className="text-black ml-0.5" />
                                    </div>
                                )}
                            </Link>

                            {/* Content side */}
                            <div className="flex flex-col flex-1 py-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                        <Link
                                            href={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-red-600 hover:text-gray-900 transition-colors"
                                        >
                                            {article.category}
                                        </Link>
                                        <span className="text-gray-300 font-normal">|</span>
                                        <span className="text-gray-400 font-medium normal-case">{article.date}</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                                        <Bookmark size={16} />
                                    </button>
                                </div>
                                <Link href={`/articles/${article.slug}`}>
                                    <h3 className="text-[18px] md:text-[20px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-3">
                                        {article.title}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-20 w-full py-2 bg-white border border-gray-200 rounded-2xl text-[#09365E] font-bold text-sm hover:bg-[#ED1C24] hover:text-white hover:border-[#ED1C24] transition-all duration-300 shadow-sm"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
        </section>
    );
}
