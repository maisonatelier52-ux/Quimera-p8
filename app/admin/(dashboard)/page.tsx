"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Users, Folder, LayoutTemplate, Eye, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin/login");
            return;
        }
        
        fetch("${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/dashboard/stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setStats(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [router]);

    if (loading) {
        return <div className="p-8 text-gray-500 flex items-center justify-center h-64">Loading dashboard statistics...</div>;
    }

    const metrics = stats?.metrics || {
        totalArticles: 0,
        totalCategories: 0,
        totalAuthors: 0,
        totalPages: 0,
        totalViews: 0
    };

    const recentActivity = stats?.recentActivity || [];

    const cards = [
        { name: "Total Articles", count: metrics.totalArticles, icon: FileText, href: "/admin/articles", color: "bg-neutral-100 text-neutral-700" },
        { name: "Total Views", count: metrics.totalViews, icon: Eye, href: "/admin/articles", color: "bg-neutral-100 text-neutral-700" },
        { name: "Categories", count: metrics.totalCategories, icon: Folder, href: "/admin/categories", color: "bg-neutral-100 text-neutral-700" },
        { name: "Authors", count: metrics.totalAuthors, icon: Users, href: "/admin/authors", color: "bg-neutral-100 text-neutral-700" },
        { name: "Pages", count: metrics.totalPages, icon: LayoutTemplate, href: "/admin/pages", color: "bg-neutral-100 text-neutral-700" }
    ];

    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">Overview</h2>
                    <p className="text-[13px] text-neutral-500 mt-0.5">Summary of your content and site metrics.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {cards.map((card, idx) => (
                    <Link key={idx} href={card.href} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-300 transition-colors group flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[13px] font-medium text-neutral-600">{card.name}</h3>
                            <card.icon className="w-4 h-4 text-neutral-400" />
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 tracking-tight">{card.count.toLocaleString()}</div>
                    </Link>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col">
                    <div className="px-5 py-3.5 border-b border-neutral-200 flex justify-between items-center">
                        <h3 className="text-[14px] font-semibold text-neutral-900">Recent Content</h3>
                        <Link href="/admin/articles" className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">View All</Link>
                    </div>
                    <div className="flex-1 divide-y divide-neutral-100">
                        {recentActivity.length > 0 ? recentActivity.map((article: any) => (
                            <div key={article._id} className="px-5 py-3 hover:bg-neutral-50/50 transition-colors flex items-center justify-between group">
                                <div className="min-w-0 pr-4">
                                    <h4 className="text-[14px] font-medium text-neutral-900 truncate">{article.title}</h4>
                                    <div className="flex items-center text-[12px] text-neutral-500 space-x-2 mt-0.5">
                                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 font-medium">{article.category?.name || "Uncategorized"}</span>
                                        <span>•</span>
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/admin/articles/edit/${article._id}`} className="px-2.5 py-1 text-[12px] font-medium text-neutral-600 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 hover:text-neutral-900 opacity-0 group-hover:opacity-100 transition-all shrink-0 shadow-sm">
                                    Edit
                                </Link>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-[13px] text-neutral-500">No recent articles found.</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col">
                    <div className="px-5 py-3.5 border-b border-neutral-200">
                        <h3 className="text-[14px] font-semibold text-neutral-900">Quick Actions</h3>
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-2.5">
                        <Link href="/admin/articles/create" className="w-full flex items-center justify-center px-4 py-2 bg-zinc-900 text-white text-[13px] font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-sm">
                            <FileText className="w-4 h-4 mr-2" /> Write Article
                        </Link>
                        <Link href="/admin/settings/homepage" className="w-full flex items-center justify-center px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-[13px] font-medium rounded-lg hover:bg-neutral-50 transition-colors shadow-sm">
                            <LayoutTemplate className="w-4 h-4 mr-2" /> Layout Settings
                        </Link>
                        <Link href="/admin/authors/create" className="w-full flex items-center justify-center px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-[13px] font-medium rounded-lg hover:bg-neutral-50 transition-colors shadow-sm">
                            <Users className="w-4 h-4 mr-2" /> Add Author
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
