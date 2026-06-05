import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface FeatureMainCardProps {
    article: {
        slug: string;
        image?: string;
        category: string;
        subcategory?: string;
        date: string;
        title: string;
        isLarge?: boolean;
    };
}

export default function FeatureMainCard({ article }: FeatureMainCardProps) {
    const fallbackImage = 'https://picsum.photos/seed/news-fallback/800/500';

    return (
        <div className="flex flex-col gap-4 group mb-8 md:mb-8">
            {/* Image */}
            <Link
                href={`/articles/${article.slug}`}
                className="block relative overflow-hidden  aspect-[16/10] bg-gray-100"
            >
                <img
                    src={article.image || fallbackImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </Link>

            {/* Meta */}
            <div className="flex items-center justify-between font-bold text-xs uppercase tracking-wider">
                <div className="flex items-center gap-3">
                    <Link href={`/category/${article.category.toLowerCase()}`} className="text-red-600 hover:underline">
                        {article.category}
                    </Link>
                    {article.subcategory && (
                        <>
                            <span className="text-gray-300">|</span>
                            <Link href={`/category/${article.subcategory.toLowerCase()}`} className="text-red-600 hover:underline">
                                {article.subcategory}
                            </Link>
                        </>
                    )}
                    <span className="text-gray-400 text-[10px] normal-case ml-2">
                        {article.date}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Bookmark size={15} />
                </button>
            </div>

            {/* Title */}
            <Link href={`/articles/${article.slug}`}>
                <h1 className="text-2xl text-[#09365E] md:text-3xl font-extrabold leading-tight hover:underline transition-colors">
                    {article.title}
                </h1>
            </Link>
        </div>
    );
}
