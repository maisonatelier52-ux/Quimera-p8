import React from 'react';
import Link from 'next/link';

interface OverlayCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
}

export default function OverlayCard({ slug, image, category, title }: OverlayCardProps) {
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
        <div className="group relative block overflow-hidden rounded-none aspect-[1.6/1]">
            <Link href={`/articles/${slug}`} className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
            </Link>

            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 pointer-events-none">
                {categoryData.name && (
                    <Link
                        href={`/category/${categoryData.slug}`}
                        className="text-[10px] font-bold text-white/90 hover:text-red-400 uppercase tracking-widest mb-1.5 inline-block drop-shadow-sm pointer-events-auto transition-colors"
                    >
                        {categoryData.name}
                    </Link>
                )}
                <Link href={`/articles/${slug}`} className="pointer-events-auto">
                    <h3 className="text-lg font-bold leading-tight text-white group-hover:text-red-400 transition-colors drop-shadow-md">
                        {title}
                    </h3>
                </Link>
            </div>
        </div>
    );
}
