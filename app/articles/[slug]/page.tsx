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
import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';

async function getArticleData(slug: string) {
    if (!slug) return null;
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'articles', `${slug}.json`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error loading article data:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const articleData = await getArticleData(slug);
    if (!articleData) return { title: 'Article Not Found' };

    return {
        title: `${articleData.title} | Quimera News`,
        description: articleData.excerpt || 'Read the latest news report on Quimera.',
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articleData = await getArticleData(slug);

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

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Header />

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
                        <div className="hidden lg:block lg:col-span-1">
                            <ArticleStickyShare />
                        </div>

                        {/* Main Content Column */}
                        <div className="lg:col-span-7">
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
                            <div className="max-w-none text-[18px] text-gray-700 leading-relaxed font-normal">
                                {articleData.paragraphs ? (
                                    <>
                                        {/* Render using the simple paragraphs array */}
                                        <p className="mb-6 first-letter:text-6xl first-letter:font-black first-letter:text-[#09365E] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
                                            {articleData.paragraphs[0]}
                                        </p>

                                        <ArticleTableOfContents />

                                        {articleData.paragraphs.slice(1, 4).map((para: string, index: number) => (
                                            <p key={index} className="mb-6">{para}</p>
                                        ))}

                                        {articleData.quote && (
                                            <ArticlePullQuote
                                                quote={articleData.quote}
                                                author={articleData.quoteAuthor || 'Anonymous'}
                                            />
                                        )}

                                        {articleData.paragraphs.slice(4).map((para: string, index: number) => (
                                            <p key={index} className="mb-6">{para}</p>
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
                                                        <p className={`mb-6 ${isFirstPara ? 'first-letter:text-6xl first-letter:font-black first-letter:text-[#09365E] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]' : ''}`}>
                                                            {block.text}
                                                        </p>
                                                        {isFirstPara && <ArticleTableOfContents />}
                                                    </React.Fragment>
                                                );
                                            }
                                            if (block.type === 'heading') {
                                                return (
                                                    <h2 key={index} className="text-2xl font-bold text-[#09365E] mt-10 mb-6">
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

                        {/* Sidebar Column (Right) */}
                        <div className="lg:col-span-4 border-l border-gray-100 pl-10">
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

            <Footer />
        </main>
    );
}
