import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface ArticleMetaProps {
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    lastUpdated: string;
}

export default function ArticleMeta({ author, lastUpdated }: ArticleMetaProps) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-none overflow-hidden bg-gray-100">
                <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[13px] leading-none">
                    <span className="text-gray-600 font-medium">By</span>
                    <Link href="/authors/julian-west" className="font-extrabold text-[#09365E] uppercase hover:text-red-600 transition-colors">
                        {author.name}
                    </Link>
                    <span className="text-gray-300">-</span>
                    <span className="text-gray-500 font-medium">{author.role}</span>
                    <span className="text-gray-300">•</span>
                    <button className="flex items-center gap-1.5 font-extrabold text-[#09365E] hover:text-red-600 transition-colors uppercase text-[11px] tracking-wider">
                        <Bookmark size={14} fill="currentColor" className="text-[#09365E] group-hover:text-red-600" />
                        Save It
                    </button>
                </div>
                <div className="text-[12px] text-gray-400 mt-2 font-medium">
                    Last Updated: {lastUpdated}
                </div>
            </div>
        </div>
    );
}
