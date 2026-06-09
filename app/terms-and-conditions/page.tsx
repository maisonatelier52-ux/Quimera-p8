import { Metadata } from "next";
import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar"; // Navbar component not found in codebase
import Footer from "../components/layout/Footer";
import Link from 'next/link';
import { ChevronRight, FileText, Copyright, UserCheck, MessageSquare, AlertTriangle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms & Conditions | Quimera News",
    description: "Read the terms and conditions for using Quimera website and our news services. Review our legal agreement and usage policies.",
    keywords: ["Quimera", "terms and conditions", "terms of service", "legal agreement", "usage policies", "user guidelines"],
    alternates: {
        canonical: "https://quimera-news.com/terms-and-conditions",
    },
    openGraph: {
        title: "Terms & Conditions | Quimera News",
        description: "Review the legal agreement and usage policies for Quimera.",
        url: "https://quimera-news.com/terms-and-conditions",
        siteName: "Quimera News",
        images: [
            {
                url: "/images/news/markets-1.webp",
                width: 1200,
                height: 630,
                alt: "Terms and Conditions - Quimera",
            }
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms & Conditions | Quimera News",
        description: "Official Quimera Terms & Conditions - outlining usage rights and responsibilities.",
        site: "@quimeranews",
        images: ["/images/news/markets-1.webp"],
    },
};

export default function TermsConditionsPage() {
    const lastUpdated = "February 23, 2026";

    return (
        <main className="bg-[#f8f9fa] min-h-screen font-serif">
            <Header />
            {/* <Navbar /> */}

            {/* Breadcrumb Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1330px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-gray-300" />
                        <span className="text-gray-900 border-b-2 border-red-500 pb-0.5">Terms & Conditions</span>
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-[800px] mx-auto px-4 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                        <div className="hidden md:block w-1.5 h-10 bg-red-600"></div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 uppercase">
                            Terms & Conditions
                        </h1>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <AlertTriangle size={14} className="text-yellow-600" />
                        <span>Please read carefully</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span>Last Updated: {lastUpdated}</span>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-[800px] mx-auto space-y-16">

                    {/* Introduction */}
                    <div className="bg-[#00008B] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <FileText size={140} />
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed relative z-10 font-medium text-blue-50">
                            Your use of the <span className="font-black text-yellow-400">QUIMERA</span> platform and our digital services is subject to these Terms & Conditions. By accessing or using Quimera, you agree to be bound by these legal terms. If you do not agree with any part of these terms, you must not use our website or services.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-20">

                        {/* 1. Acceptance */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors">01</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Acceptance of Terms</h2>
                            </div>
                            <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl border-l-4 border-[#00008B]">
                                <UserCheck className="w-8 h-8 text-[#00008B] flex-shrink-0" />
                                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                    By accessing and using this news website, you accept and agree to be bound by these terms and conditions. These terms apply to all visitors, readers, and others who access or use our news service.
                                </p>
                            </div>
                        </div>

                        {/* 2. Content Usage */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors">02</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Content Usage & Copyright</h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-black uppercase text-[#00008B] mb-4 flex items-center gap-2">
                                        <Copyright size={18} /> Our Content Rights
                                    </h3>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        All news articles, photographs, videos, graphics, and other content published on Quimera are protected by international copyright laws and are owned by Quimera or our content contributors. Unauthorized reproduction is strictly prohibited.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-6 rounded-2xl">
                                        <span className="text-green-700 font-black text-xs uppercase tracking-widest block mb-4">✓ Permissible Actions</span>
                                        <ul className="space-y-3 text-sm font-bold text-green-900">
                                            <li className="flex items-center gap-2">Read and view content</li>
                                            <li className="flex items-center gap-2">Share via official tools</li>
                                            <li className="flex items-center gap-2">Print for personal reference</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-6 rounded-2xl">
                                        <span className="text-red-700 font-black text-xs uppercase tracking-widest block mb-4">✗ Strictly Prohibited</span>
                                        <ul className="space-y-3 text-sm font-bold text-red-900">
                                            <li className="flex items-center gap-2">Commercial redistribution</li>
                                            <li className="flex items-center gap-2">Content scraping via bots</li>
                                            <li className="flex items-center gap-2">Removing watermarks/notices</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Accounts */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors">03</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">User Registration</h2>
                            </div>
                            <p className="text-gray-700 mb-8 border-b border-gray-100 pb-8">
                                Some features of our news website may require registration. When creating an account, you agree to provide accurate information and maintain the security of your credentials.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black uppercase tracking-tighter text-[#00008B]">
                                <div className="bg-blue-50 p-3 rounded-lg">✓ Accurate Information</div>
                                <div className="bg-blue-50 p-3 rounded-lg">✓ Password Security</div>
                                <div className="bg-blue-50 p-3 rounded-lg">✓ Update Credentials</div>
                                <div className="bg-blue-50 p-3 rounded-lg">✓ Immediate Intrusion Notice</div>
                            </div>
                        </div>

                        {/* 4. Comments */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors">04</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Comments & Submissions</h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-7">
                                    <h3 className="text-lg font-black text-[#00008B] mb-4 uppercase">Comment Policy</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        We welcome reader discussions. By posting, you grant Quimera a non-exclusive license to display your comments. You are solely responsible for the content of your submissions.
                                    </p>
                                </div>
                                <div className="lg:col-span-5 bg-gray-900 p-6 rounded-2xl text-white">
                                    <h3 className="text-xs font-black text-red-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldAlert size={14} /> Blacklisted Content
                                    </h3>
                                    <ul className="text-[10px] space-y-2 opacity-80 uppercase tracking-widest font-bold">
                                        <li>Hate Speech / Harassment</li>
                                        <li>Misleading Information</li>
                                        <li>Third-Party Promotions</li>
                                        <li>Spam / Advertising</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 5. Standards */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors">05</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Journalistic Standards</h2>
                            </div>
                            <div className="bg-yellow-50 border-2 border-yellow-200 p-8 rounded-3xl relative">
                                <div className="absolute top-0 right-0 -mt-3 mr-6 bg-yellow-400 text-black px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest">Corrections Policy</div>
                                <p className="text-lg font-bold text-gray-900 mb-4">"We strive for 100% accuracy, but we are committed to transparency when we fall short."</p>
                                <p className="text-sm text-gray-700 mb-6">If you believe we have published inaccurate information, please contact our editorial team. Opinions expressed are those of the authors, not necessarily Quimera News.</p>
                                <Link href="/contact" className="text-xs font-black uppercase border-b-2 border-yellow-600 pb-0.5 hover:text-red-600 hover:border-red-600 transition-all">Submit a Correction Request</Link>
                            </div>
                        </div>

                        {/* 6. Disclaimers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-2xl font-black text-[#00008B]/10">06</div>
                                    <h2 className="text-xl font-black tracking-tighter text-gray-900 uppercase">Third-Party Links</h2>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-bold">We are not responsible for content, accuracy, or opinions expressed in third-party materials or advertiser links.</p>
                            </div>
                            <div className="group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-2xl font-black text-[#00008B]/10">07</div>
                                    <h2 className="text-xl font-black tracking-tighter text-gray-900 uppercase">Warranty Disclaimer</h2>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-bold">Our services are provided "as is" without warranties. We do not guarantee uninterrupted access or absolute currentness.</p>
                            </div>
                        </div>

                        {/* Final Note */}
                        <div className="bg-gray-50 p-10 rounded-3xl text-center">
                            <h2 className="text-lg font-black text-gray-900 mb-4 uppercase">8. Changes to Terms</h2>
                            <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">We reserve the right to modify these Terms and Conditions at any time. Your continued use of the website after changes constitutes acceptance.</p>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
