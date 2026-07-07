import React from 'react';

interface ArticleHeaderProps {
    category: any;
    title: string;
    excerpt: string;
}

export default function ArticleHeader({ category, title, excerpt }: ArticleHeaderProps) {
    return (
        <div className="flex flex-col gap-5 mb-8">
            <div className="text-[12px] font-black text-black uppercase tracking-[0.25em]">
                {category?.name || category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.1] text-[var(--article-header-color)]">
                {title}
            </h1>
            <p className="text-lg md:text-lg text-gray-500 leading-relaxed font-medium max-w-[1100px]">
                {excerpt}
            </p>
        </div>
    );
}
