import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface LatestVerticalCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
    showDivider?: boolean;
}

export default function LatestVerticalCard({ slug, image, category, title, showDivider = true }: LatestVerticalCardProps) {
    return (
        <div className="relative group">
            <div className="flex flex-col gap-4">
                {/* Image */}
                <Link href={`/articles/${slug}`} className="block relative overflow-hidden rounded-none aspect-[1.3/1] bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>

                {/* Meta row */}
                <div className="flex items-center justify-between">
                    <Link
                        href={`/category/${category.toLowerCase()}`}
                        className="text-[11px] font-extrabold text-[#ED1C24] uppercase tracking-widest hover:text-gray-900 transition-colors"
                    >
                        {category}
                    </Link>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Bookmark size={16} />
                    </button>
                </div>

                {/* Title */}
                <Link href={`/articles/${slug}`}>
                    <h3 className="text-[17px] font-bold leading-[1.3] text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-3">
                        {title}
                    </h3>
                </Link>
            </div>

            {/* Vertical Divider - Centered in the grid gap */}
            {showDivider && (
                <div className="hidden lg:block absolute top-0 -right-[12px] lg:-right-[16px] bottom-0 w-px bg-gray-100" />
            )}
        </div>
    );
}
