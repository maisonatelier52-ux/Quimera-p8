import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
    slug: string;
    title: string;
    shortdescription: string;
    category: string;
    author: string;
    date: string;
    image?: string;
}

interface HeroSectionProps {
    mainArticle: Article;
    sideArticles: Article[];
}

export default function HeroSection({ mainArticle, sideArticles }: HeroSectionProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Article */}
                <div className="lg:col-span-8 group">
                    <Link href={`/articles/${mainArticle.slug}`} className="block relative aspect-[16/9] overflow-hidden rounded-none bg-gray-100">
                        <img
                            src={mainArticle.image || '/images/news/markets-1.webp'}
                            alt={mainArticle.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4 w-fit rounded">
                                Featured
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl group-hover:underline decoration-primary underline-offset-8">
                                {mainArticle.title}
                            </h2>
                            <p className="mt-4 text-gray-200 line-clamp-2 max-w-2xl text-lg hidden md:block">
                                {mainArticle.shortdescription}
                            </p>
                            <div className="mt-6 flex items-center gap-4 text-gray-300 text-sm">
                                <span className="font-bold text-white">{mainArticle.author}</span>
                                <span className="opacity-50">•</span>
                                <span>{mainArticle.date}</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Side Articles */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {sideArticles.map((article, index) => (
                        <div key={article.slug} className="group pb-8 border-b border-border last:border-0 last:pb-0">
                            <Link href={`/articles/${article.slug}`} className="flex gap-6">
                                <div className="flex-1">
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                                        {article.category}
                                    </span>
                                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors leading-snug line-clamp-3">
                                        {article.title}
                                    </h3>
                                    <div className="mt-4 flex items-center gap-2 text-muted text-xs">
                                        <span className="font-bold text-foreground">{article.author}</span>
                                        <span className="opacity-30">•</span>
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                                <div className="relative w-24 h-24 overflow-hidden rounded-none bg-gray-100 flex-shrink-0">
                                    <img
                                        src={article.image || '/images/news/markets-1.webp'}
                                        alt={article.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
