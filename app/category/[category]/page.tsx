import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import CategoryInfo from '@/app/components/category/CategoryInfo';
import CategoryFeed from '@/app/components/category/CategoryFeed';
import CategoryAd from '@/app/components/ads/CategoryAd';
import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

async function getCategoryData(category: string) {
    if (!category) return null;
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'categoryNews', `${category.toLowerCase()}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        return null;
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const data = await getCategoryData(category);
    const title = data?.title || category.charAt(0).toUpperCase() + category.slice(1);

    return {
        title: `${title} | Quimera News`,
        description: data?.description || `Latest news and updates in ${title}.`,
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

