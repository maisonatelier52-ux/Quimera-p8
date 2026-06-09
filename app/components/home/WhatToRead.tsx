import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import allArticles from '@/public/data/all-articles-index.json';

export default function WhatToRead() {
    const mainArticle = allArticles[23];
    const gridArticles = allArticles.slice(24, 28);

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1330px] mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-2xl font-bold text-[#09365E]">What to Read</h2>
                    <span className="text-red-600 text-2xl font-black italic">//</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side: Large Feature with Red Overlay */}
                    <div className="relative group overflow-hidden rounded-none aspect-[4/3] lg:aspect-auto lg:h-full min-h-[500px]">
                        <Link href={`/articles/${mainArticle.slug}`} className="block h-full">
                            <img
                                src={mainArticle.image}
                                alt={mainArticle.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </Link>

                        {/* Red Box Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 bg-[#ED1C24] p-8 rounded-xl text-white shadow-xl transform transition-transform duration-300 group-hover:-translate-y-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                                    <Link
                                        href={`/category/${mainArticle.category.toLowerCase()}`}
                                        className="hover:text-black transition-colors"
                                    >
                                        {mainArticle.category}
                                    </Link>
                                    <span className="opacity-60 font-normal">|</span>
                                    <span className="opacity-90 normal-case font-medium">{mainArticle.date}</span>
                                </div>
                                <button className="hover:text-black transition-colors">
                                    <Bookmark size={20} />
                                </button>
                            </div>
                            <Link href={`/articles/${mainArticle.slug}`}>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                                    {mainArticle.title}
                                </h3>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: 2x2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                        {gridArticles.map((article, index) => (
                            <div key={index} className="flex flex-col gap-4 group">
                                {/* Image */}
                                <Link href={`/articles/${article.slug}`} className="block relative overflow-hidden rounded-none aspect-[1.5/1] bg-gray-100">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </Link>

                                {/* Meta */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
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

                                    {/* Title */}
                                    <Link href={`/articles/${article.slug}`}>
                                        <h3 className="text-[17px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-3">
                                            {article.title}
                                        </h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
