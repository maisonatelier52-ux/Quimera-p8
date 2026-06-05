import React from 'react';
import Link from 'next/link';

interface MostReadItem {
    id: number;
    title: string;
    slug: string;
    image: string;
}

interface MostReadWidgetProps {
    items: MostReadItem[];
}

export default function MostReadWidget({ items }: MostReadWidgetProps) {
    return (
        <div className="bg-white">
            <h2 className="text-lg text-[#09365E] font-bold uppercase mb-6 flex items-center gap-2">
                Most Read
                <span className="text-red-600 text-lg font-black italic">
                    <span className=" inline-block">//</span>
                </span>
            </h2>
            <div className="flex flex-col gap-6">
                {items.map((item, index) => (
                    <div key={item.id} className="group flex items-start gap-4">
                        {/* Number */}
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                            {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex justify-between w-full">
                            <Link href={`/articles/${item.slug}`} className="group-hover:text-red-600 transition-colors font-bold text-[#09365E] text-xs leading-snug line-clamp-3">
                                {item.title}
                            </Link>

                            {/* Thumbnail */}
                            <div className="w-16 h-12 ml-2 rounded overflow-hidden flex-shrink-0 relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Ad Space */}
            <div className="mt-8 bg-black rounded-none overflow-hidden text-center text-white relative aspect-[4/4] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-blue-900 opacity-20"></div>
                <div className="relative z-10 px-6">
                    <h3 className="text-3xl font-black italic mb-2 tracking-tighter">QUIMERA</h3>
                    <p className="text-sm font-medium opacity-90">Modern Mobile-First WP Theme for News & Magazines</p>
                    <button className="mt-4 bg-white text-black px-4 py-2 text-xs font-bold uppercase rounded hover:bg-gray-200 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
