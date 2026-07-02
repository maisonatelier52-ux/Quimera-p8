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
        
        fetch("http://localhost:5000/api/dashboard/stats", {
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
        { name: "Total Articles", count: metrics.totalArticles, icon: FileText, href: "/admin/articles", color: "bg-blue-50 text-blue-600" },
        { name: "Total Views", count: metrics.totalViews, icon: Eye, href: "/admin/articles", color: "bg-purple-50 text-purple-600" },
        { name: "Categories", count: metrics.totalCategories, icon: Folder, href: "/admin/categories", color: "bg-green-50 text-green-600" },
        { name: "Authors", count: metrics.totalAuthors, icon: Users, href: "/admin/authors", color: "bg-orange-50 text-orange-600" },
        { name: "Pages", count: metrics.totalPages, icon: LayoutTemplate, href: "/admin/pages", color: "bg-teal-50 text-teal-600" }
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500 mt-1">Welcome to Quimera Admin. Here is a summary of your site's content.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {cards.map((card, idx) => (
                    <Link key={idx} href={card.href} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${card.color} group-hover:scale-110 transition-transform`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.count}</h3>
                        <p className="text-sm font-medium text-gray-500">{card.name}</p>
                    </Link>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-500" /> Recent Articles
                        </h3>
                        <Link href="/admin/articles" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentActivity.length > 0 ? recentActivity.map((article: any) => (
                            <div key={article._id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-1">{article.title}</h4>
                                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                                        <span>{article.category?.name || "Uncategorized"}</span>
                                        <span>•</span>
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/admin/articles/edit/${article._id}`} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                    Edit
                                </Link>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-gray-500">No recent articles found.</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
                        <Link href="/admin/articles/create" className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            <FileText className="w-5 h-5 mr-2" /> Write New Article
                        </Link>
                        <Link href="/admin/settings/homepage" className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            <LayoutTemplate className="w-5 h-5 mr-2" /> Edit Homepage Layout
                        </Link>
                        <Link href="/admin/authors/create" className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            <Users className="w-5 h-5 mr-2" /> Add New Author
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
