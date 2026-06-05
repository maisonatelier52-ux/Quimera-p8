'use client';

import React, { useState, useEffect } from 'react'; // Re-scan trigger
import {
    Search,
    TrendingUp,
    Youtube,
    Facebook,
    Instagram,
    Rss,
    Menu,
    ChevronDown,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('en-GB', dateOptions));
    }, []);

    const isActive = (path: string) => pathname === path;
    const isPagesActive = ['/about-us', '/authors', '/privacy-policy', '/terms-and-conditions'].includes(pathname);

    return (
        <header className="flex flex-col w-full font-serif sticky top-[-80px] z-50">
            {/* Top Bar - Deep Blue */}
            <div className="bg-[#00008B] text-white">
                <div className="max-w-[1330px] mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        {/* Left: Logo & Date */}
                        <div className="flex flex-col justify-center">
                            {/* Logo Simulation */}
                            <Link href="/" className="flex items-center gap-1 group">
                                {/* Colored Bars */}
                                <div className="flex gap-[2px] h-6 skew-x-[-15deg]">
                                    <div className="w-1.5 h-full bg-red-500"></div>
                                    <div className="w-1.5 h-full bg-yellow-400"></div>
                                    <div className="w-1.5 h-full bg-cyan-400"></div>
                                </div>
                                {/* Text */}
                                <span className="text-3xl font-black italic tracking-tighter ml-1">
                                    QUIMERA
                                </span>
                            </Link>
                            {/* Date */}
                            <div className="text-[10px] text-gray-300 mt-1 font-medium tracking-wide">
                                {currentDate}
                            </div>
                        </div>


                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Bright Red */}
            <div className="bg-red-600 text-white overflow-hidden">
                <div className="max-w-[1330px] mx-auto px-4 h-10 flex items-center justify-between">
                    {/* Left: Trending/Scroller */}
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap ">
                        <div className="flex-shrink-0">
                            <TrendingUp size={16} className="stroke-[3]" />
                        </div>

                        <div className="flex items-center text-xs font-bold tracking-wide gap-3">
                            <Link href="/" className={"hover:underline"}>Home</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/politics" className="hover:underline">Politics</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/market" className="hover:underline">Market</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/finance" className="hover:underline">Finance</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/tech" className="hover:underline">Tech</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/business" className="hover:underline">Business</Link>
                            <span className="text-white/50">/</span>
                            <Link href="/category/sports" className="hover:underline">Sports</Link>
                        </div>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="hidden md:flex items-center gap-4 pl-4 bg-red-600 relative z-10">
                        <Link href="#" className="hover:opacity-80 transition-opacity">
                            <Instagram size={16} />
                        </Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity">
                            <Youtube size={16} />
                        </Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity" title="Substack">
                            <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-white font-black text-[10px]">S</div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Running News Headlines */}
            <div className="bg-blue-600 text-white py-1.5 overflow-hidden border-t border-blue-500 shadow-md">
                <div className="max-w-[1330px] mx-auto px-4 flex items-center">
                    <div className="bg-blue-800 text-white font-black px-3 py-1 text-[10px] uppercase tracking-widest z-10 flex-shrink-0 shadow-sm rounded-sm mr-4">
                        LATEST HEADLINES
                    </div>
                    <div className="flex-1 overflow-hidden relative flex items-center">
                        <div className="animate-marquee text-sm font-semibold flex items-center gap-16">
                            <span>Global Markets Hit Record Highs Following Tech Earnings</span>
                            <span className="text-blue-300 text-xs">●</span>
                            <span>Election Polls Show Tight Race in Key Swing States</span>
                            <span className="text-blue-300 text-xs">●</span>
                            <span>Major Merger Announced in the Telecommunications Sector</span>
                            <span className="text-blue-300 text-xs">●</span>
                            <span>New Breakthrough in Renewable Energy Tech Revealed</span>
                            <span className="text-blue-300 text-xs">●</span>
                            <span>Championship Finals Set for This Weekend</span>
                            <span className="text-blue-300 text-xs">●</span>
                            <span>Global Markets Hit Record Highs Following Tech Earnings</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
