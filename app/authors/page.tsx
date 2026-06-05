'use client';

import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar"; // Navbar component not found in codebase
import Footer from "../components/layout/Footer";
import Image from "next/image";
import Link from 'next/link';
import { ChevronRight, Mail, Twitter, Linkedin } from "lucide-react";

const authors = [
    {
        name: "Jessica Wu",
        role: "Lead Tech Strategist",
        bio: "Jessica spans the gap between complex algorithms and business outcomes, focusing on the real-world deployment of Agentic AI and emerging technologies.",
        image: "/images/authors/jessica-wu.webp",
        email: "jessicawu123@proton.me"
    },
    {
        name: "Sarah Jenkins",
        role: "Senior Political Analyst",
        bio: "Sarah brings decades of experience covering global politics and economic policy, with a focus on central banking and fiscal strategy.",
        image: "/images/authors/sarah-jenkins.webp",
        email: "sarahjenkins@quimera-news.com"
    },
    {
        name: "Michael Chen",
        role: "Economic Correspondent",
        bio: "Michael specializes in Asian markets and global trade dynamics, providing insights into the shifting economic landscape of the 21st century.",
        image: "/images/authors/michael-chen.webp",
        email: "Michaelchen4@proton.me"
    },
    {
        name: "Robert Miller",
        role: "Political Columnist",
        bio: "Robert delivers sharp analysis on political developments and their market implications, with expertise in regulatory frameworks and policy impact.",
        image: "/images/authors/robert-miller.webp",
        email: "Robertmiller777@proton.me"
    },
    {
        name: "Alex Thorne",
        role: "Tech Strategist",
        bio: "Alex covers the intersection of technology and finance, from fintech disruption to cryptocurrency regulation and digital transformation.",
        image: "/images/authors/alex-thorne.webp",
        email: "Alexthorne4@proton.me"
    },
    {
        name: "James O'Connor",
        role: "Wealth Management Specialist",
        bio: "James advises some of the world's most successful families on transition and growth, covering family offices and high-net-worth strategies.",
        image: "/images/authors/james-oconnor.webp",
        email: "JamesOConnor4@proton.me"
    },
    {
        name: "Maria Sanchez",
        role: "Real Estate Analyst",
        bio: "Maria provides expert coverage of global real estate markets, luxury property trends, and investment strategies for high-value assets.",
        image: "/images/authors/maria-sanchez.webp",
        email: "MariaSanchez126@proton.me"
    },
    {
        name: "David Smith",
        role: "Senior Policy Analyst",
        bio: "David covers regulatory developments and their impact on markets, with deep expertise in government policy and international relations.",
        image: "/images/authors/david-smith.webp",
        email: "DavidSmith773@proton.me"
    },
    {
        name: "Emily Rodriguez",
        role: "Business Correspondent",
        bio: "Emily reports on corporate strategy, mergers and acquisitions, and the evolving landscape of global business operations.",
        image: "/images/authors/emily-rodriguez.webp",
        email: "Emilyrodriguez4@proton.me"
    },
];

export default function AuthorsPage() {
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
                        <span className="text-gray-900 border-b-2 border-red-500 pb-0.5">Our Authors</span>
                    </div>
                </div>
            </div>

            {/* Header Title Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-[1330px] mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-10 bg-red-600"></div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 uppercase">
                                    The Voices of Quimera
                                </h1>
                            </div>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                Behind every groundbreaking report is a dedicated professional. Meet the award-winning team of journalists, analysts, and contributors shaping the future of global news.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 pb-2">
                            <div className="px-4 py-2 bg-gray-900 text-white rounded font-black text-xs tracking-tighter uppercase">
                                {authors.length} CONTRIBUTORS
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authors Grid */}
            <section className="py-16 px-4">
                <div className="max-w-[1330px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authors.map((author) => (
                            <div
                                key={author.name}
                                id={author.name.toLowerCase().replace(/\s+/g, '-')}
                                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                            >
                                {/* Signature Quimera Decorative Bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 flex gap-[1px]">
                                    <div className="flex-1 bg-red-600"></div>
                                    <div className="flex-1 bg-yellow-400"></div>
                                    <div className="flex-1 bg-cyan-400"></div>
                                </div>

                                {/* Author Image with Hover Effect */}
                                <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden p-1.5 bg-gray-50 border-2 border-gray-100 group-hover:border-red-600 transition-colors duration-500">
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src={author.image}
                                            alt={author.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                // Fallback for missing images
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(author.name) + '&background=00008B&color=fff&size=200';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <h2 className="text-2xl font-black tracking-tighter text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                                    {author.name}
                                </h2>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00008B] mb-4">
                                    {author.role}
                                </p>

                                {author.email && (
                                    <a
                                        href={`mailto:${author.email}`}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors mb-6 border-b border-transparent hover:border-red-600 pb-0.5"
                                    >
                                        <Mail size={12} />
                                        {author.email}
                                    </a>
                                )}

                                <p className="text-sm leading-relaxed text-gray-600 mb-8 flex-grow">
                                    {author.bio}
                                </p>

                                {/* Social placeholders to match premium feel */}
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 w-full justify-center">
                                    <button className="text-gray-300 hover:text-[#00008B] transition-colors"><Twitter size={16} /></button>
                                    <button className="text-gray-300 hover:text-[#00008B] transition-colors"><Linkedin size={16} /></button>
                                    <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                                    <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600">VIEW POSTS</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-[#00008B] text-white">
                <div className="max-w-[1330px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Become a Contributor</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Do you have a unique perspective on global affairs or financial markets? We're always looking for new voices.
                    </p>
                    <Link href="/contact" className="inline-block bg-yellow-400 text-black px-12 py-4 rounded-lg font-black uppercase tracking-tighter hover:bg-yellow-300 transition-colors">
                        APPLY TO JOIN THE TEAM
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
