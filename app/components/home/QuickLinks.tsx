import React from 'react';
import Link from 'next/link';

export default async function QuickLinks() {
    const res = await fetch("http://127.0.0.1:5000/api/public/categories", { cache: "no-store" });
    const categories = await res.json();

    return (
        <section className="w-full bg-white py-0 border-gray-100">
            <div className="max-w-[1330px] mx-auto px-4 flex items-center gap-4 flex-wrap">
                <span className="text-red-600 font-bold text-sm whitespace-nowrap">
                    Quick Links:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                    {categories.map((category: any, index: number) => (
                        <Link
                            key={index}
                            href={`/category/${category.slug}`}
                            className="px-4 py-1.5 bg-gray-100 hover:bg-[#ED1C24] hover:text-white text-[#09365E] font-bold text-xs rounded-lg transition-colors"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
