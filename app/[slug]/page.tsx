import { notFound } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Link from 'next/link';
import { ChevronRight } from "lucide-react";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    
    let page = null;
    let isNotFound = false;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/public/pages/${slug}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });
        
        if (res.ok) {
            page = await res.json();
        } else if (res.status === 404) {
            isNotFound = true;
        }
    } catch (error) {
        console.error("Failed to fetch page:", error);
    }

    if (isNotFound || !page) {
        notFound();
    }

    return (
        <main className="bg-[#f8f9fa] min-h-screen font-serif flex flex-col">
            <Header />

            {/* Breadcrumb Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1330px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-gray-300" />
                        <span className="text-gray-900 border-b-2 border-red-500 pb-0.5">{page.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 px-4 md:py-16 flex-grow">
                <div className="max-w-[1000px] mx-auto">
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm p-8 md:p-12">
                        
                        {(page.heroTitle || page.title) && (
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-10 bg-red-600"></div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
                                    {page.heroTitle || page.title}
                                </h1>
                            </div>
                        )}

                        {page.heroSubtitle && (
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                {page.heroSubtitle}
                            </p>
                        )}

                        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                            {page.blocks && page.blocks.map((block: any, index: number) => {
                                if (block.type === 'heading') {
                                    return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{block.data.text}</h2>;
                                }
                                if (block.type === 'paragraph') {
                                    return <p key={index}>{block.data.text}</p>;
                                }
                                return null;
                            })}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
