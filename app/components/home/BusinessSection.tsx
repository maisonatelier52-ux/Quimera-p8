import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import CircleHorizontalCard from '../cards/CircleHorizontalCard';

export default async function BusinessSection() {
    const res = await fetch("http://localhost:5000/api/public/articles", { cache: "no-store" });
    const allArticles = await res.json();
    const businessArticles = allArticles.filter((a: any) => a.category?.name === 'Business');
    const topArticles = businessArticles.slice(0, 2);
    const bottomArticles = businessArticles.slice(2, 5);

    if (businessArticles.length === 0) return null;

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1330px] mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-black font-bold text-[#09365E]">Business</h2>
                    <span className="text-red-600 text-2xl font-black italic">//</span>
                </div>

                {/* Top Articles Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 overflow-hidden">
                    {topArticles.map((article: any, index: number) => (
                        <div key={index} className={`flex gap-6 group ${index === 0 ? 'md:border-r md:border-gray-200 md:pr-10' : 'md:pl-10'}`}>
                            {/* Image */}
                            <Link href={`/articles/${article.slug}`} className="block relative overflow-hidden rounded-none w-[220px] aspect-[1.6/1] flex-shrink-0 bg-gray-100">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-1 py-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                        <Link href={`/category/${(article.category?.slug || '')}`} className="text-red-600 hover:text-gray-900 transition-colors">
                                            {article.category?.name || article.category}
                                        </Link>
                                        <span className="text-gray-300 font-normal">|</span>
                                        <span className="text-gray-400 font-medium normal-case">{article.date}</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                                        <Bookmark size={16} />
                                    </button>
                                </div>
                                <Link href={`/articles/${article.slug}`}>
                                    <h3 className="text-[20px] md:text-[22px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors">
                                        {article.title}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashed Divider */}
                <div className="w-full border-t border-dashed border-gray-200 mb-6"></div>

                {/* Bottom Articles Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {bottomArticles.map((article: any, index: number) => (
                        <div key={index} className={index !== 2 ? 'md:border-r md:border-gray-100 md:pr-10' : ''}>
                            <CircleHorizontalCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
