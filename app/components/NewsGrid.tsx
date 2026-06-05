import React from 'react';
import Link from 'next/link';

interface Article {
    slug: string;
    title: string;
    shortdescription: string;
    category: string;
    author: string;
    date: string;
    image?: string;
}

interface NewsGridProps {
    title: string;
    articles: Article[];
}

export default function NewsGrid({ title, articles }: NewsGridProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border mt-12">
            <div className="flex justify-between items-end mb-12">
                <h2 className="font-serif text-4xl font-black tracking-tight border-l-4 border-primary pl-6">
                    {title}
                </h2>
                <Link href={`/category/${title.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {articles.map((article) => (
                    <article key={article.slug} className="group flex flex-col cursor-pointer">
                        <Link href={`/articles/${article.slug}`} className="block relative aspect-square overflow-hidden rounded-none bg-gray-100 mb-6 premium-card">
                            <img
                                src={article.image || 'https://picsum.photos/seed/news-fallback/800/500'}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-2 py-1 bg-white/90 dark:bg-black/90 text-foreground text-[10px] font-black uppercase tracking-tighter backdrop-blur rounded shadow-sm">
                                    {article.category}
                                </span>
                            </div>
                        </Link>
                        <Link href={`/articles/${article.slug}`}>
                            <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                        </Link>
                        <p className="mt-3 text-muted text-sm line-clamp-2 leading-relaxed">
                            {article.shortdescription}
                        </p>
                        <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted">
                            <span>{article.author}</span>
                            <span>{article.date}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
