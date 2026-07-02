import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface HorizontalCardProps {
    article: {
        slug: string;
        image?: string;
        title: string;
        category: string;
        date: string;
        shortdescription?: string;
    };
}

export default function HorizontalCard({ article }: HorizontalCardProps) {

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

    const categoryData = getCatDetails(article.category);

    return (
        <div className="flex gap-4 group cursor-pointer items-start">
            <Link href={`/articles/${article.slug}`} className="w-24 h-24 md:w-32 md:h-32 shrink-0 relative overflow-hidden bg-gray-100">
                <img
                    src={article.image || '/fallback-image.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-col justify-between py-1">
                <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider mb-2">
                    {categoryData.name && (
                        <Link href={`/category/${categoryData.slug}`} className="text-[#E12A32] hover:text-gray-900 transition-colors">
                            {categoryData.name}
                        </Link>
                    )}
                    <span className="text-gray-400 text-[10px] normal-case">
                        {article.date}
                    </span>
                    <button className="text-gray-400 hover:text-[#E12A32] transition-colors ml-auto">
                        <Bookmark size={15} />
                    </button>
                </div>

                {/* Title */}
                <Link href={`/articles/${article.slug}`}>
                    <h3 className="text-[15px] text-[#09365E] font-bold leading-[1.3] group-hover:text-[#E12A32] transition-colors line-clamp-3">
                        {article.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {article.shortdescription && (
                    <p className="text-gray-600 text-[12px] leading-snug line-clamp-2 mt-1">
                        {article.shortdescription}
                    </p>
                )}
            </div>
        </div>
    );
}
