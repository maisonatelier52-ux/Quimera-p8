import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import CategoryInfo from '@/app/components/category/CategoryInfo';
import CategoryFeed from '@/app/components/category/CategoryFeed';
import CategoryAd from '@/app/components/ads/CategoryAd';
import { Metadata } from 'next';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

async function getCategoryData(categorySlug: string) {
    if (!categorySlug) return null;
    try {
        const baseUrl = (process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000');
        const categoriesRes = await fetch(`${baseUrl}/api/public/categories`, { cache: 'no-store' });
        const categories = await categoriesRes.json();
        const categoryData = categories.find((c: any) => c.slug === categorySlug);
        
        if (!categoryData) return null;

        const articlesRes = await fetch(`${baseUrl}/api/public/articles?category=${categorySlug}`, { cache: 'no-store' });
        const articles = await articlesRes.json();
        
        return {
            title: categoryData.name,
            description: categoryData.description || `Latest news and updates in ${categoryData.name}.`,
            articles: articles
        };
    } catch (err) {
        return null;
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const data = await getCategoryData(category);
    const title = data?.title || category.charAt(0).toUpperCase() + category.slice(1);
    const fullTitle = `${title} | Quimera News`;
    const description = data?.description || `Latest news and updates in ${title}.`;
    const canonicalUrl = `https://quimera-news.com/category/${category.toLowerCase()}`;

    return {
        title: fullTitle,
        description,
        keywords: [title, "Quimera", "news", "updates", category],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonicalUrl,
            siteName: "Quimera News",
            images: [
                {
                    url: "/images/news/markets-1.webp",
                    width: 1200,
                    height: 630,
                    alt: `${title} News - Quimera`,
                }
            ],
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            site: "@quimeranews",
            images: ["/images/news/markets-1.webp"],
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const data = await getCategoryData(category);

    if (!data) {
        return (
            <main className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex items-center justify-center p-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-black mb-4">Category Not Found</h1>
                        <p className="text-muted">The category "{category}" does not exist or has no content.</p>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Header />

            <div className="flex-grow">
                <CategoryInfo
                    title={data.title}
                    description={data.description}
                />

                <CategoryFeed articles={data.articles} />
                <CategoryAd />
            </div>

            <Footer />
        </main>
    );
}

