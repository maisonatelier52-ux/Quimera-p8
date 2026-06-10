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
import SearchModal from '../SearchModal';

export default function Header() {
    const pathname = usePathname();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
            const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            
            const dateStr = now.toLocaleDateString('en-GB', dateOptions);
            const timeStr = now.toLocaleTimeString('en-US', timeOptions);
            
            setCurrentDateTime(`${dateStr} | ${timeStr}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const isActive = (path: string) => pathname === path;
    const isPagesActive = ['/about-us', '/authors', '/privacy-policy', '/terms-and-conditions'].includes(pathname);

    return (
        <header className="flex flex-col w-full font-serif sticky top-[-109px] z-50">
            {/* Running News Headlines */}
            <div className="bg-red-950 text-gray-300 py-1.5 overflow-hidden  shadow-md">
                <div className="max-w-[1330px] mx-auto px-4 flex items-center">
                    <div className="bg-gray-900 text-white font-black px-3 py-1 text-[8px] uppercase tracking-widest z-10 flex-shrink-0 shadow-sm rounded-sm mr-4">
                        LATEST HEADLINES
                    </div>
                    <div className="flex-1 overflow-hidden relative flex items-center">
                        <div className="animate-marquee text-[10px] font-normal flex items-center gap-16">
                            <span>Global Markets Hit Record Highs Following Tech Earnings</span>
                            <span className="text-blue-300 text-xs">  ●  </span>
                            <span>Election Polls Show Tight Race in Key Swing States</span>
                            <span className="text-blue-300 text-xs">  ●  </span>
                            <span>Major Merger Announced in the Telecommunications Sector</span>
                            <span className="text-blue-300 text-xs">  ●  </span>
                            <span>New Breakthrough in Renewable Energy Tech Revealed</span>
                            <span className="text-blue-300 text-xs">  ●  </span>
                            <span>Championship Finals Set for This Weekend</span>
                            <span className="text-blue-300 text-xs">  ●  </span>
                            <span>Global Markets Hit Record Highs Following Tech Earnings</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Top Bar - Deep Blue */}
            <div className="bg-white text-white">
                <div className="max-w-[1330px] mx-auto px-4 h-20 grid grid-cols-3 items-center">
                    
                    {/* Left: Date */}
                    <div className="flex justify-start">
                        <div className="text-[10px] text-black font-medium tracking-wide">
                            {currentDateTime}
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex justify-center">
                        <Link href="/" className="flex items-center gap-1 group">
                            {/* Colored Bars */}
                            <div className="flex gap-[2px] h-6 skew-x-[-15deg]">
                                <div className="w-1.5 h-full bg-red-500"></div>
                                <div className="w-1.5 h-full bg-yellow-400"></div>
                                <div className="w-1.5 h-full bg-cyan-400"></div>
                            </div>
                            {/* Text */}
                            <span className="text-3xl font-black text-black italic tracking-tighter ml-1">
                                QUIMERA
                            </span>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex justify-end gap-4">
                        <button 
                            className="p-2 hover:bg-black/10 rounded-full transition-colors"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={20} className='text-black' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Black */}
            <div className="bg-red-50 text-gray-900 overflow-hidden">
                <div className="max-w-[1330px] mx-auto px-4 h-10 flex items-center justify-between">
                    {/* Left: Trending/Scroller */}
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap ">
                        <div className="flex-shrink-0">
                            <TrendingUp size={16} className="stroke-[3]" />
                        </div>

                        <div className="flex items-center text-[10px] font-bold tracking-wide gap-3">
                            <Link href="/" className={"hover:underline"}>Home</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/politics" className="hover:underline">Politics</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/market" className="hover:underline">Market</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/finance" className="hover:underline">Finance</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/tech" className="hover:underline">Tech</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/business" className="hover:underline">Business</Link>
                            <span className="text-white/50"></span>
                            <Link href="/category/sports" className="hover:underline">Sports</Link>
                        </div>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="hidden md:flex items-center gap-4 pl-4 bg-red-50 relative z-10">
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

            
            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}
