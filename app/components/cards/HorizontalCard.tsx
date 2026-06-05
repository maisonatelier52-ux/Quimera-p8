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

    return (
        <div className="flex gap-6 group">
            {/* Image */}
            <Link
                href={`/articles/${article.slug}`}
                className="block relative overflow-hidden  w-[200px] aspect-[16/10] flex-shrink-0 bg-gray-100"
            >
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2 pt-1">
                {/* Meta */}
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    <Link href={`/category/${article.category.toLowerCase()}`} className="text-[#E12A32] hover:text-gray-900 transition-colors">
                        {article.category}
                    </Link>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 font-medium normal-case">
                        {article.date}
                    </span>
                    <button className="text-gray-400 hover:text-[#E12A32] transition-colors ml-auto">
                        <Bookmark size={15} />
                    </button>
                </div>

                {/* Title */}
                <Link href={`/articles/${article.slug}`}>
                    <h3 className="text-[16px] text-[#09365E] font-bold leading-[1.3] group-hover:text-[#E12A32] transition-colors line-clamp-3">
                        {article.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {article.shortdescription && (
                    <p className="text-gray-600 text-[13px] leading-snug line-clamp-2 mt-1">
                        {article.shortdescription}
                    </p>
                )}
            </div>
        </div>
    );
}
