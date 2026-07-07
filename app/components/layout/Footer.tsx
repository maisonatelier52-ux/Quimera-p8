'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Youtube,
    Instagram,
    ChevronUp,
    LogOut,
    CheckCircle
} from 'lucide-react';
import { useSubscriber } from '../SubscriberContext';

export default function Footer() {
    const [footerData, setFooterData] = useState<any>(null);
    const [categories, setCategories] = useState<any>([]);
    
    const { subscriber, logout, setShowSubscribeModal } = useSubscriber();

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/public/footer")
            .then(res => res.json())
            .then(data => setFooterData(data))
            .catch(console.error);

        fetch("http://127.0.0.1:5000/api/public/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(console.error);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!footerData) {
        return <footer className="text-white pt-16 pb-12 font-serif mt-auto min-h-[400px]" style={{ background: 'linear-gradient(to bottom, #09365E, black)' }}></footer>;
    }

    return (
        <footer className="text-white pt-16 pb-12 font-serif mt-auto" style={{ background: `linear-gradient(to bottom, ${footerData.footerBgColor || '#09365E'}, black)` }}>
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
                        <p className="text-xs leading-relaxed mb-6 font-medium opacity-90">
                            {footerData.siteDescription || "Information You Can Trust: Stay instantly connected with breaking stories and live updates."}
                        </p>

                        {!subscriber ? (
                            <form className="flex flex-col sm:flex-row gap-2 max-w-sm mb-6">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 bg-white/10 text-white px-4 py-2.5 rounded-md text-sm border border-white/20 focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSubscribeModal(true)}
                                    className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-md text-sm hover:bg-red-700 transition-colors tracking-wide uppercase whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-4 mb-6 bg-white/10 p-3 rounded-lg max-w-sm">
                                <div className="flex items-center gap-2 flex-1">
                                    <CheckCircle size={18} className="text-green-400" />
                                    <span className="text-sm font-semibold truncate">Welcome, {subscriber.name}!</span>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider"
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </div>
                        )}

                        <div className="flex items-center gap-5 mt-6">
                            {footerData.socialLinks?.instagram && (
                                <Link href={footerData.socialLinks.instagram} className="hover:opacity-80 transition-opacity">
                                    <Instagram size={18} />
                                </Link>
                            )}
                            {footerData.socialLinks?.youtube && (
                                <Link href={footerData.socialLinks.youtube} className="hover:opacity-80 transition-opacity">
                                    <Youtube size={18} />
                                </Link>
                            )}
                            {footerData.socialLinks?.substack && (
                                <Link href={footerData.socialLinks.substack} className="hover:opacity-80 transition-opacity" title="Substack">
                                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center text-white font-black text-[10px]">S</div>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Links */}
                    <div className="flex-1">
                        {/* Newsroom */}
                        <div className="mb-10">
                            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">
                                *** {footerData.column1Title || 'Newsroom'}
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold">
                                {footerData.column1Links && footerData.column1Links.length > 0 ? (
                                    footerData.column1Links.map((link: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <Link href={link.externalUrl} className="hover:text-red-500 transition-colors">{link.title}</Link>
                                            {index < footerData.column1Links.length - 1 && <span className="text-white/20 font-normal">|</span>}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    categories.map((cat: any, index: number) => (
                                        <React.Fragment key={cat._id}>
                                            <Link href={`/category/${cat.slug}`} className="hover:text-red-500 transition-colors">{cat.name}</Link>
                                            {index < categories.length - 1 && <span className="text-white/20 font-normal">|</span>}
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Standards */}
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">
                                *** {footerData.column2Title || 'Standards'}
                            </span>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-5 text-xs font-bold">
                                {footerData.column2Links && footerData.column2Links.length > 0 ? (
                                    footerData.column2Links.map((link: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <Link href={link.externalUrl} className="hover:text-red-500 transition-colors">
                                                {link.title}
                                            </Link>
                                            {index < footerData.column2Links.length - 1 && (
                                                <span className="text-white/20 font-normal">|</span>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    [
                                        { name: "About Us", href: "/about-us" },
                                        { name: "Authors", href: "/authors" },
                                        { name: "Privacy Policy", href: "/privacy-policy" },
                                        { name: "Terms & Conditions", href: "/terms-and-conditions" },
                                        { name: "Contact Us", href: "/contact-us" },
                                        { name: "Legal", href: "/legal" },
                                        { name: "Right of Reply", href: "/right-of-reply" },
                                        { name: "Sourcing & Methodology", href: "/source-methodology" },
                                        { name: "Ownership & Funding", href: "/ownership-funding" },
                                        { name: "Editorial Policy", href: "/editorial-policy" },
                                        { name: "Corrections Policy", href: "/corrections-policy" },
                                        { name: "Advertising Policy", href: "/advertising-policy" }
                                    ].map((item, index, array) => (
                                        <React.Fragment key={item.name}>
                                            <Link href={item.href} className="hover:text-red-500 transition-colors">
                                                {item.name}
                                            </Link>
                                            {index < array.length - 1 && (
                                                <span className="text-white/20 font-normal">|</span>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-center items-center relative gap-6">
                    <p className="text-[10px] text-white/40 font-bold tracking-wider text-center">
                        {footerData.copyrightText || '© Quimera News Network. All Rights Reserved.'}
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

