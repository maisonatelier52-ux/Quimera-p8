import React from 'react';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ArticleHeader from '../../components/article/ArticleHeader';
import ArticleMeta from '../../components/article/ArticleMeta';
import ArticleActions from '../../components/article/ArticleActions';
import ArticleStickyShare from '../../components/article/ArticleStickyShare';
import ArticleTableOfContents from '../../components/article/ArticleTableOfContents';
import ArticlePullQuote from '../../components/article/ArticlePullQuote';
import MostReadWidget from '../../components/article/MostReadWidget';
import NewsletterSidebar from '../../components/article/NewsletterSidebar';
import CommentSection from '../../components/article/CommentSection';
import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';

async function getArticleData(slug: string) {
    if (!slug) return null;
    try {
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/public/articles/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Error loading article data:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const articleData = await getArticleData(slug);
    if (!articleData) return { title: 'Article Not Found' };

    const title = `${articleData.title} | Quimera News`;
    const description = articleData.excerpt || articleData.shortdescription || 'Read the latest news report on Quimera.';
    const image = articleData.mainImage || articleData.image || '/images/news/markets-1.webp';
    const canonicalUrl = `https://quimera-news.com/articles/${slug}`;

    return {
        title,
        description: articleData.excerpt || 'Read the full story on Quimera News.',
        keywords: [articleData.category?.name || articleData.category, "Quimera", "global news", articleData.author?.name || articleData.author, "breaking news"],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Quimera News",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: articleData.title,
                }
            ],
            type: "article",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            site: "@quimeranews",
            images: [image],
        },
    };
}

export default async function ArticlePage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams?: Promise<{ headerColor?: string, paragraphColor?: string, textColor?: string, fontFamily?: string, sidebarPosition?: string }> }) {
    const { slug } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const articleData = await getArticleData(slug);

    let moreNewsArticles = [];
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/public/articles` : "${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/public/articles", { cache: "no-store" });
        const allArticles = await res.json();
        const filteredMoreNews = allArticles.filter((a: any) => a.slug !== slug);
        moreNewsArticles = [...filteredMoreNews].sort(() => 0.5 - Math.random()).slice(0, 4);
    } catch (e) {
        console.error('Error loading more news:', e);
    }

    if (!articleData) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-[#09365E] mb-4">Article Not Found</h1>
                    <p className="text-gray-500 mb-8">The article you are looking for might have been moved or deleted.</p>
                    <Link href="/" className="px-6 py-3 bg-[#09365E] text-white font-bold rounded-lg hover:bg-black transition-colors">
                        Back to Home
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    // Normalize author data for ArticleMeta
    const normalizedAuthor = {
        name: articleData.author?.name || 'Anonymous',
        role: articleData.author?.role || 'Staff Writer',
        avatar: articleData.author?.avatar || articleData.author?.image || 'https://i.pravatar.cc/150?u=staff'
    };

    let styling = {
        headerColor: '#09365E',
        paragraphColor: '#374151',
        textColor: '#000000',
        fontFamily: 'serif',
        sidebarPosition: 'right'
    };

    if (resolvedSearchParams?.headerColor) {
        styling = {
            headerColor: resolvedSearchParams.headerColor,
            paragraphColor: resolvedSearchParams.paragraphColor || '#374151',
            textColor: resolvedSearchParams.textColor || '#000000',
            fontFamily: resolvedSearchParams.fontFamily || 'serif',
            sidebarPosition: resolvedSearchParams.sidebarPosition || 'right'
        };
    } else {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/public/article-settings` : "${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/public/article-settings", { cache: 'no-store' });
            if (res.ok) {
                const settings = await res.json();
                if (settings) {
                    styling = {
                        headerColor: settings.headerColor || '#09365E',
                        paragraphColor: settings.paragraphColor || '#374151',
                        textColor: settings.textColor || '#000000',
                        fontFamily: settings.fontFamily || 'serif',
                        sidebarPosition: settings.sidebarPosition || 'right'
                    };
                }
            }
        } catch (error) {
            console.error("Failed to fetch article settings:", error);
        }
    }

    const isSidebarLeft = styling.sidebarPosition === 'left';

    const renderArticleContent = () => (
        <div className="flex-grow">
            <div className="max-w-[1330px] mx-auto px-4 py-8 lg:py-12">
                {/* Header takes full width */}
                <ArticleHeader
                    category={articleData.category}
                    title={articleData.title}
                    excerpt={articleData.excerpt || (articleData.content?.[0]?.type === 'intro' ? articleData.content[0].text : '')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                    {/* Sticky Social Share Column (Left) */}
                    <div className="hidden lg:block lg:col-span-1 lg:order-1">
                        <ArticleStickyShare />
                    </div>

                    {/* Main Content Column */}
                    <div className={`lg:col-span-7 min-w-0 ${isSidebarLeft ? 'lg:order-3' : 'lg:order-2'}`}>
                        <ArticleMeta
                            author={normalizedAuthor}
                            lastUpdated={articleData.lastUpdated || articleData.date || 'Recently Updated'}
                        />

                        <ArticleActions
                            readTime={articleData.readTime || '5 Min'}
                        />

                        {/* Main Image */}
                        <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-gray-100">
                            <img
                                src={articleData.mainImage || articleData.image}
                                alt={articleData.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Article Body Content */}
                        <div className="max-w-none text-[18px] leading-relaxed font-normal break-words article-text">
                            {articleData.paragraphs ? (
                                <>
                                    {/* Render using the simple paragraphs array */}
                                    <p className="mb-6 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] article-paragraph first-letter:text-[var(--article-header-color)]">
                                        {articleData.paragraphs[0]}
                                    </p>

                                    <ArticleTableOfContents />

                                    {articleData.paragraphs.slice(1, 4).map((para: string, index: number) => (
                                        <p key={index} className="mb-6 article-paragraph">{para}</p>
                                    ))}

                                    {articleData.quote && (
                                        <ArticlePullQuote
                                            quote={articleData.quote}
                                            author={articleData.quoteAuthor || 'Anonymous'}
                                        />
                                    )}

                                    {articleData.paragraphs.slice(4).map((para: string, index: number) => (
                                        <p key={index} className="mb-6 article-paragraph">{para}</p>
                                    ))}
                                </>
                            ) : articleData.content ? (
                                <>
                                    {/* Render using the structured content array */}
                                    {articleData.content.map((block: any, index: number) => {
                                        const isFirstPara = index === 0;

                                        if (block.type === 'intro' || block.type === 'paragraph') {
                                            return (
                                                <React.Fragment key={index}>
                                                    <p className={`mb-6 article-paragraph ${isFirstPara ? 'first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-[var(--article-header-color)]' : ''}`}>
                                                        {block.text}
                                                    </p>
                                                    {isFirstPara && <ArticleTableOfContents />}
                                                </React.Fragment>
                                            );
                                        }
                                        if (block.type === 'heading') {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold mt-10 mb-6 article-heading">
                                                    {block.text}
                                                </h2>
                                            );
                                        }
                                        if (block.type === 'quote') {
                                            return (
                                                <ArticlePullQuote
                                                    key={index}
                                                    quote={block.text}
                                                    author={block.author || 'Source'}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            ) : (
                                <p className="italic text-gray-400">No content available for this article.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className={`lg:col-span-4 ${isSidebarLeft ? 'lg:order-2 pr-10 border-r border-gray-100' : 'lg:order-3 pl-10 border-l border-gray-100'}`}>
                        <div className="sticky top-24 flex flex-col gap-12">
                            {/* Social Follow Widget */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#09365E] text-white p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-black transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black">f</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">Facebook</span>
                                        <span className="text-xs font-bold">Like</span>
                                    </div>
                                </div>
                                <div className="bg-[#09365E] text-white p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-black transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black italic">X</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">X</span>
                                        <span className="text-xs font-bold">Follow</span>
                                    </div>
                                </div>
                                <div className="bg-[#09365E] text-white p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-black transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black italic">In</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">Instagram</span>
                                        <span className="text-xs font-bold">Follow</span>
                                    </div>
                                </div>
                                <div className="bg-[#09365E] text-white p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-black transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black italic">Li</div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">LinkedIn</span>
                                        <span className="text-xs font-bold">Follow</span>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter Sidebar */}
                            <NewsletterSidebar />

                            {/* Most Read Widget */}
                            <MostReadWidget />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderRelatedArticles = () => {
        if (moreNewsArticles.length === 0) return null;
        return (
            <div className="max-w-[1330px] mx-auto px-4 py-4 pb-8 border-t border-gray-100 w-full">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-md font-black text-[#09365E]">More News</h2>
                    <span className="text-red-600 text-2xl font-black italic">//</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {moreNewsArticles.map((article: any, index: number) => (
                        <div key={index} className="group">
                            <Link href={`/articles/${article.slug}`} className="block relative overflow-hidden aspect-[4/3] mb-3 bg-gray-100 rounded-lg">
                                <img
                                    src={article.image || '/images/news/markets-1.webp'}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>
                            <div className="flex flex-col py-1">
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2">
                                    <Link
                                        href={`/category/${article.category?.slug || ''}`}
                                        className="text-red-600 hover:text-gray-900 transition-colors"
                                    >
                                        {article.category?.name || article.category}
                                    </Link>
                                    <span className="text-gray-300 font-normal">|</span>
                                    <span className="text-gray-400 font-medium normal-case">{article.date}</span>
                                </div>
                                <Link href={`/articles/${article.slug}`}>
                                    <h3 className="text-lg font-bold leading-tight text-[#09365E] group-hover:text-red-600 transition-colors line-clamp-3">
                                        {article.title}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <main className={`min-h-screen flex flex-col bg-white ${styling.fontFamily === 'sans-serif' ? 'font-sans' : styling.fontFamily === 'monospace' ? 'font-mono' : 'font-serif'}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .article-heading {
                        color: ${styling.headerColor};
                    }
                    .article-paragraph {
                        color: ${styling.paragraphColor};
                    }
                    .article-text {
                        color: ${styling.textColor};
                    }
                    :root {
                        --article-header-color: ${styling.headerColor};
                        --article-paragraph-color: ${styling.paragraphColor};
                        --article-text-color: ${styling.textColor};
                    }
                `
            }} />
            <Header />

            {renderArticleContent()}
            <CommentSection articleSlug={slug} />
            {renderRelatedArticles()}

            <Footer />
        </main>
    );
}
