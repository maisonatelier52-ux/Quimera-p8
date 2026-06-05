import React from 'react';
import Link from 'next/link';

interface MostReadItem {
    id: number;
    title: string;
    image: string;
    slug: string;
}

import mostReadData from '@/public/data/most-read.json';

export default function MostReadWidget() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#09365E]">Most Read</h3>
                <span className="text-red-500 font-black italic tracking-tighter">//</span>
            </div>

            <div className="flex flex-col gap-6">
                {mostReadData.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start group">
                        <div className="relative flex-shrink-0">
                            <span className="absolute -top-2 -left-2 w-7 h-7 bg-red-600 text-white flex items-center justify-center rounded-full text-sm font-bold border-2 border-white z-10">
                                {item.id}
                            </span>
                            <div className="w-[80px] aspect-[1.2/1] rounded-none overflow-hidden bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <Link href={`/articles/${item.slug}`} className="flex-1">
                            <h4 className="text-[14px] font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-3">
                                {item.title}
                            </h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
