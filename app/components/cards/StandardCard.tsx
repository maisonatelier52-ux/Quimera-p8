import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface StandardCardProps {
    slug: string;
    image?: string;
    category: string;
    date: string;
    title: string;
    isLarge?: boolean;
}

export default function StandardCard({ slug, image, category, date, title, isLarge = false }: StandardCardProps) {
    const fallbackImage = 'https://picsum.photos/seed/news-fallback/800/500';

    return (
        <div className="flex flex-col gap-3 group">
            {/* Image */}
            <Link href={`/articles/${slug}`} className="block relative overflow-hidden rounded-none aspect-[16/10] bg-gray-100">
                <img
                    src={image || fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <Link href={`/category/${category.toLowerCase()}`} className="text-red-600 hover:underline">
                        {category}
                    </Link>
                    <span className="text-gray-400 text-[10px] normal-case">
                        {date}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Bookmark size={15} />
                </button>
            </div>

            {/* Title */}
            <Link href={`/articles/${slug}`}>
                <h3 className={`font-bold leading-tight text-[#09365E] group-hover:text-red-600 ${isLarge ? 'text-2xl md:text-3xl' : 'text-sm'
                    }`}>
                    {title}
                </h3>
            </Link>
        </div>
    );
}
