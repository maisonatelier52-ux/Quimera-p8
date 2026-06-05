import React from 'react';
import Link from 'next/link';
import { Bookmark, Play } from 'lucide-react';

interface StripCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
    hasVideo?: boolean;
}

export default function StripCard({ slug, image, category, title, hasVideo }: StripCardProps) {
    return (
        <div className="flex flex-col gap-3 group border-r border-gray-100 last:border-0 pr-4 last:pr-0">
            {/* Image */}
            <Link href={`/articles/${slug}`} className="block relative overflow-hidden rounded-none aspect-[1.3/1] bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {hasVideo && (
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play size={14} fill="currentColor" className="text-black ml-0.5" />
                    </div>
                )}
            </Link>

            {/* Meta row */}
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                    {category}
                </span>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Bookmark size={14} />
                </button>
            </div>

            {/* Title */}
            <Link href={`/articles/${slug}`}>
                <h3 className="text-[15px] font-bold leading-[1.3] text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-4">
                    {title}
                </h3>
            </Link>
        </div>
    );
}
