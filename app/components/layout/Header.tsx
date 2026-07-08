'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    TrendingUp,
    Youtube,
    Facebook,
    Instagram,
    Rss,
    Menu,
    ChevronDown,
    FileText,
    LogOut,
    User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from '../SearchModal';
import { useSubscriber } from '../SubscriberContext';

export default function Header() {
    const pathname = usePathname();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    const { subscriber, logout, setShowSubscribeModal } = useSubscriber();

    const [categories, setCategories] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [headerSettings, setHeaderSettings] = useState<any>({
        logoType: 'text',
        logoText: 'QUIMERA',
        logoImageUrl: '',
        layoutOrder: ['date', 'logo', 'search'],
        verticalOrder: ['topBar', 'navbar', 'ticker'],
        topBarBgColor: '#09365E',
        topBarTextColor: '#FFFFFF',
        navbarBgColor: '#000000',
        navbarTextColor: '#FFFFFF',
        tickerBgColor: '#09365E',
        tickerTextColor: '#FFFFFF'
    });

    useEffect(() => {
        setMounted(true);
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

        fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/header`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) {
                    setHeaderSettings({
                        ...data,
                        layoutOrder: data.layoutOrder && data.layoutOrder.length === 3 ? data.layoutOrder : ['date', 'logo', 'search'],
                        verticalOrder: data.verticalOrder && data.verticalOrder.length === 3 ? data.verticalOrder : ['topBar', 'navbar', 'ticker'],
                        topBarBgColor: data.topBarBgColor || '#09365E',
                        topBarTextColor: data.topBarTextColor || '#FFFFFF',
                        navbarBgColor: data.navbarBgColor || '#000000',
                        navbarTextColor: data.navbarTextColor || '#FFFFFF',
                        tickerBgColor: data.tickerBgColor || '#09365E',
                        tickerTextColor: data.tickerTextColor || '#FFFFFF'
                    });
                }
            })
            .catch(console.error);

        fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/public/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(console.error);

        fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/public/articles`)
            .then(res => res.json())
            .then(data => setLatestArticles(data.slice(0, 10)))
            .catch(console.error);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            if (event.data && event.data.type === 'UPDATE_HEADER_SETTINGS') {
                setHeaderSettings((prev: any) => ({
                    ...prev,
                    ...event.data.settings
                }));
            }
        };

        window.addEventListener('message', messageHandler);
        return () => window.removeEventListener('message', messageHandler);
    }, []);

    const isActive = (path: string) => pathname === path;
    const isPagesActive = ['/about-us', '/authors', '/privacy-policy', '/terms-and-conditions'].includes(pathname);

    const renderHeaderElement = (type: string) => {
        if (type === 'date') {
            return (
                <div className="text-[10px] font-medium tracking-wide min-w-[160px]" suppressHydrationWarning>
                    <span suppressHydrationWarning>{mounted ? currentDateTime : ''}</span>
                </div>
            );
        }
        if (type === 'logo') {
            return (
                <Link href="/" className="flex items-center gap-1 group">
                    {headerSettings?.logoType === 'text' ? (
                        <>
                            <span className="flex gap-[2px] h-6 skew-x-[-15deg]">
                                <span className="w-1.5 h-full bg-red-500 block"></span>
                                <span className="w-1.5 h-full bg-yellow-400 block"></span>
                                <span className="w-1.5 h-full bg-cyan-400 block"></span>
                            </span>
                            <span className="text-5xl font-black italic tracking-tighter ml-1">
                                {headerSettings?.logoText || 'QUIMERA'}
                            </span>
                        </>
                    ) : (
                        <img src={headerSettings?.logoImageUrl} alt="Site Logo" className="h-10 object-contain" />
                    )}
                </Link>
            );
        }
        if (type === 'search') {
            return (
                <div className="flex items-center gap-3">
                    <button
                        className="p-2 hover:bg-black/10 rounded-full transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={20} className='text-current' />
                    </button>
                    {!subscriber ? (
                        <button 
                            onClick={() => setShowSubscribeModal(true)}
                            className="bg-red-600 text-white font-bold px-5 py-2 rounded-md text-xs hover:bg-red-700 transition-colors tracking-wide uppercase"
                        >
                            Subscribe
                        </button>
                    ) : (
                        <div className="group relative">
                            <button className="flex items-center gap-2 bg-gray-100 text-[#09365E] font-bold px-4 py-1.5 rounded-full text-xs hover:bg-gray-200 transition-colors border border-gray-200">
                                <User size={14} />
                                <span className="max-w-[100px] truncate">{subscriber.name}</span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-900 truncate">{subscriber.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{subscriber.email}</p>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 text-left font-medium transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    const layoutOrder = headerSettings?.layoutOrder?.length === 3 ? headerSettings.layoutOrder : ['date', 'logo', 'search'];
    const verticalOrder = headerSettings?.verticalOrder?.length === 3 ? headerSettings.verticalOrder : ['topBar', 'navbar', 'ticker'];

    const renderVerticalElement = (type: string) => {
        if (type === 'topBar') {
            return (
                <div key="topBar" style={{ backgroundColor: headerSettings?.topBarBgColor || '#09365E', color: headerSettings?.topBarTextColor || '#FFFFFF' }}>
                    <div className="max-w-[1330px] mx-auto px-4 h-25 grid grid-cols-3 items-center">
                        <div className="flex justify-start">
                            {renderHeaderElement(layoutOrder[0])}
                        </div>
                        <div className="flex justify-center">
                            {renderHeaderElement(layoutOrder[1])}
                        </div>
                        <div className="flex justify-end gap-4">
                            {renderHeaderElement(layoutOrder[2])}
                        </div>
                    </div>
                </div>
            );
        }
        if (type === 'navbar') {
            return (
                <div key="navbar" className="overflow-hidden border-1" style={{ backgroundColor: headerSettings?.navbarBgColor || '#000000', color: headerSettings?.navbarTextColor || '#FFFFFF' }}>
                    <div className="max-w-[1330px] mx-auto px-4 h-10 flex items-center justify-between">
                        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap ">
                            <div className="flex-shrink-0">
                                <TrendingUp size={16} className="stroke-[3]" />
                            </div>
                            <div className="flex items-center text-[10px] font-bold tracking-wide gap-3">
                                <Link href="/" className={"hover:underline"}>Home</Link>
                                {categories.length > 0 && <span className="text-white/50"></span>}
                                {categories.map((cat: any, i: number) => (
                                    <React.Fragment key={cat._id || i}>
                                        <Link href={`/category/${cat.slug}`} className="hover:underline">{cat.name}</Link>
                                        {i < categories.length - 1 && <span className="text-white/50"></span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4 pl-4 relative z-10">
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
            );
        }
        if (type === 'ticker') {
            return (
                <div key="ticker" className="py-2 overflow-hidden shadow-md" style={{ backgroundColor: headerSettings?.tickerBgColor || '#09365E', color: headerSettings?.tickerTextColor || '#FFFFFF' }}>
                    <div className="max-w-[1330px] mx-auto px-4 flex items-center">
                        <div className="bg-white/50 text-black font-black px-2 py-1 text-[8px] uppercase tracking-widest z-10 flex-shrink-0 shadow-sm rounded-sm mr-4">
                            LATEST HEADLINES
                        </div>
                        <div className="flex-1 overflow-hidden relative flex items-center group">
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx} aria-hidden={idx === 1} className="animate-marquee text-[10px] font-normal flex items-center gap-16 pr-16 shrink-0 group-hover:[animation-play-state:paused]">
                                    {latestArticles.length > 0 ? latestArticles.map((art: any) => (
                                        <React.Fragment key={art._id}>
                                            <Link href={`/articles/${art.slug}`} className="hover:underline whitespace-nowrap">
                                                <span>{art.title}</span>
                                            </Link>
                                            <span className="text-blue-300 text-xs">  ●  </span>
                                        </React.Fragment>
                                    )) : (
                                        <span>No recent news</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <header className="flex flex-col w-full font-serif sticky top-[-109px] z-50">
            {verticalOrder.map(renderVerticalElement)}

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}
