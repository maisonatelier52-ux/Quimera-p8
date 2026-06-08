"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Article {
    slug: string;
    title: string;
    shortdescription: string;
    category: string;
    author: string;
    date: string;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Article[]>([]);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load all articles once
    useEffect(() => {
        if (allArticles.length === 0 && isOpen) {
            fetch("/data/all-articles-index.json")
                .then((res) => res.json())
                .then((data) => setAllArticles(data))
                .catch(() => console.log("Search index not found"));
        }
    }, [isOpen, allArticles.length]);

    // Live search as user types
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const filtered = allArticles
            .filter((article) =>
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.shortdescription.toLowerCase().includes(query.toLowerCase()) ||
                article.category.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 6); // Show max 6 results

        setResults(filtered);
    }, [query, allArticles]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex backdrop-blur items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out opacity-100 visible"
            onClick={handleOverlayClick}
        >
            <div className="w-full max-w-md sm:max-w-lg bg-black border-2 border-gray-700 rounded-3xl transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 scale-100 shadow-2xl">
                {/* Search Input */}
                <div className="w-full bg-black border-2 border-gray-900 rounded-3xl overflow-hidden flex items-center">
                    <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                        <input
                            ref={inputRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="flex-1 px-4 py-3 text-sm text-white outline-none placeholder-gray-500 font-medium bg-black"
                            autoFocus
                        />
                    </form>
                </div>

                {/* Results Dropdown */}
                {results.length > 0 && (
                    <div className="border-t-2 border-black max-h-96 overflow-y-auto no-scrollbar">
                        {results.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/articles/${article.slug}`}
                                title={`${article.title} – ${article.category} News`}
                                onClick={onClose}
                                className="block p-4 hover:bg-gray-900 border-b border-gray-800 transition"
                            >
                                <div className="font-bold text-sm text-white mb-1">
                                    {article.title}
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2">
                                    {article.shortdescription}
                                </p>
                                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                                    <span className="font-bold text-white">{article.category}</span>
                                    <span>{article.author}</span>
                                    <span>{article.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className="p-8 text-center text-gray-500 border-t-2 border-black">
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
