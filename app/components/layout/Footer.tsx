'use client';
import React from 'react';
import Link from 'next/link';
import {
    Youtube,
    Instagram,
    ChevronUp
} from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gradient-to-b from-red-950 to-black text-white pt-16 pb-12 font-serif">
            <div className="max-w-[1330px] mx-auto px-4 md:px-8">
                {/* Top Row: Logo and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-8">
                    <Link href="/" className="flex items-center gap-1 group">
                        <div className="flex gap-[2px] h-6 skew-x-[-15deg]">
                            <div className="w-1.5 h-full bg-red-500"></div>
                            <div className="w-1.5 h-full bg-yellow-400"></div>
                            <div className="w-1.5 h-full bg-cyan-400"></div>
                        </div>
                        <span className="text-3xl font-black italic tracking-tighter ml-1 text-white">
                            QUIMERA
                        </span>
                    </Link>

                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
                    {/* Left Column: Brand & Subscribe */}
                    <div className="max-w-xl">
                        <p className="text-xs leading-relaxed mb-4 font-medium opacity-90">
                            <span className="font-bold">Information You Can Trust:</span> Stay instantly connected with breaking stories and live updates. From politics and technology to entertainment and beyond, we provide real-time coverage you can rely on, making us your dependable source for 24/7 news.
                        </p>
                        
                        <div className="flex items-center gap-5 mt-6">
                            <Link href="#" className="hover:opacity-80 transition-opacity">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">
                                <Youtube size={18} />
                            </Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity" title="Substack">
                                <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-white font-black text-[10px]">S</div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Links */}
                    <div className="flex-1">
                        {/* Quick Links */}
                        <div className="mb-10">
                            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">
                                *** Quick Links
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold">
                                <Link href="/category/politics" className="hover:text-red-500 transition-colors">Politics</Link>
                                <span className="text-white/20 font-normal">|</span>
                                <Link href="/category/market" className="hover:text-red-500 transition-colors">Market</Link>
                                <span className="text-white/20 font-normal">|</span>
                                <Link href="/category/finance" className="hover:text-red-500 transition-colors">Finance</Link>
                                <span className="text-white/20 font-normal">|</span>
                                <Link href="/category/tech" className="hover:text-red-500 transition-colors">Tech</Link>
                                <span className="text-white/20 font-normal">|</span>
                                <Link href="/category/business" className="hover:text-red-500 transition-colors">Business</Link>
                                <span className="text-white/20 font-normal">|</span>
                                <Link href="/category/sports" className="hover:text-red-500 transition-colors">Sports</Link>
                            </div>
                        </div>

                        {/* About Company */}
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">
                                *** About Company
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold">
                                {[
                                    { name: "About Us", href: "/about-us" },
                                    { name: "Authors", href: "/authors" },
                                    { name: "Privacy Policy", href: "/privacy-policy" },
                                    { name: "Terms & Conditions", href: "/terms-conditions" },
                                    { name: "Contact Us", href: "/contact-us" },
                                    { name: "Editorial Policy", href: "/editorial-policy" },
                                    { name: "Corrections Policy", href: "/corrections-policy" },
                                    { name: "Source Methodology", href: "/source-methodology" },
                                    { name: "Ownership & Funding", href: "/ownership-funding" },
                                    { name: "Advertising Policy", href: "/advertising-policy" },
                                    { name: "Right of Reply", href: "/right-of-reply" },
                                    { name: "Legal", href: "/legal" }
                                ].map((item, index, array) => (
                                    <React.Fragment key={item.name}>
                                        <Link href={item.href} className="hover:text-red-500 transition-colors">
                                            {item.name}
                                        </Link>
                                        {index < array.length - 1 && (
                                            <span className="text-white/20 font-normal">|</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-center items-center relative gap-6">
                    <p className="text-[10px] text-white/40 font-bold tracking-wider text-center">
                        © Quimera News Network. All Rights Reserved.
                    </p>

                    {/* Scroll to top */}
                    <button
                        onClick={scrollToTop}
                        className="md:absolute right-0 bottom-0 p-2.5 bg-gray-900 rounded-lg hover:bg-red-600 transition-all group shadow-xl"
                    >
                        <ChevronUp size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

