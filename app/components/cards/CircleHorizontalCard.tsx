import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface CircleHorizontalCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
}

export default function CircleHorizontalCard({ slug, image, category, title }: CircleHorizontalCardProps) {
    return (
        <div className="flex items-center gap-4 group">
            {/* Circular Image */}
            <Link href={`/articles/${slug}`} className="block relative overflow-hidden rounded-none w-[80px] h-[80px] flex-shrink-0 bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-1">
                <Link href={`/articles/${slug}`}>
                    <h3 className="text-[15px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                        {title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/category/${category.toLowerCase()}`}
                        className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest hover:text-gray-900 transition-colors"
                    >
                        {category}
                    </Link>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Bookmark size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
