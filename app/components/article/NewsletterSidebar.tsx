import React from 'react';

export default function NewsletterSidebar() {
    return (
        <div className="border border-gray-100 rounded-xl p-8 bg-white shadow-sm">
            {/* Logo Part */}
            <div className="flex items-center gap-1 mb-6">
                <div className="flex gap-[2px] h-5 skew-x-[-15deg]">
                    <div className="w-1.5 h-full bg-red-500"></div>
                    <div className="w-1.5 h-full bg-yellow-400"></div>
                    <div className="w-1.5 h-full bg-cyan-400"></div>
                </div>
                <span className="text-2xl font-black italic tracking-tighter text-[#09365E]">
                    QUIMERA
                </span>
            </div>

            <p className="text-[#09365E] font-bold text-[15px] leading-snug mb-6">
                Subscribe to our newsletter to get our newest articles instantly!
            </p>

            <form className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-[#09365E] transition-colors"
                />
                <button
                    type="submit"
                    className="w-full bg-[#09365E] text-white font-bold py-3 rounded-lg hover:bg-black transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}
