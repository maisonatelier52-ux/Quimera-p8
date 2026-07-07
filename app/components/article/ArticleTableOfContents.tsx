'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

export default function ArticleTableOfContents() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-8 border border-gray-100 rounded-none overflow-hidden max-w-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
                <span className="flex items-center gap-3">
                    <BookOpen size={20} className="text-red-600" />
                    <span className="font-extrabold text-[#09365E]">Contents</span>
                </span>
                <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link href="#section-1" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                                1. Economic Implications of Trade Wars
                            </Link>
                        </li>
                        <li>
                            <Link href="#section-2" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                                2. Key Areas of Contention
                            </Link>
                        </li>
                        <li>
                            <Link href="#section-3" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                                3. The Future of Global Markets
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

import Link from 'next/link';
