import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface FeaturedVerticalCardProps {
    slug: string;
    image?: string;
    category: string;
    date: string;
    title: string;
}

export default function FeaturedVerticalCard({ slug, image, category, date, title }: FeaturedVerticalCardProps) {
    const fallbackImage = 'https://picsum.photos/seed/news-fallback/800/500';

    const getCatDetails = (cat: any) => {
        if (!cat) return { name: '', slug: '' };
        if (Array.isArray(cat)) cat = cat[0];
        if (typeof cat === 'object') {
            return {
                name: cat.name || '',
                slug: cat.slug || (cat.name || '').toLowerCase().replace(/\s+/g, '-')
            };
        }
        return {
            name: String(cat),
            slug: String(cat).toLowerCase().replace(/\s+/g, '-')
        };
    };

    const categoryData = getCatDetails(category);

    return (
        <div className="flex flex-col gap-4 group">
            {/* Image */}
            <Link href={`/articles/${slug}`} className="block relative overflow-hidden rounded-none aspect-[4/5] bg-gray-100">
                <img
                    src={image || fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* Meta */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mt-1">
                <div className="flex items-center gap-1.5">
                    {categoryData.name && (
                        <Link href={`/category/${categoryData.slug}`} className="text-red-600 hover:text-red-700 transition-colors">
                            {categoryData.name}
                        </Link>
                    )}
                    <span className="text-gray-300 font-normal">|</span>
                    <span className="text-gray-500 font-medium normal-case">
                        {date}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Bookmark size={15} />
                </button>
            </div>

            {/* Title */}
            <Link href={`/articles/${slug}`}>
                <h3 className="text-xl md:text-[18px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors">
                    {title}
                </h3>
            </Link>
        </div>
    );
}
