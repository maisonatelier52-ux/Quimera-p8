import React from 'react';

interface ContactInfo {
    label: string;
    email: string;
}

interface PolicyLayoutProps {
    title: string;
    intro?: React.ReactNode;
    children: React.ReactNode;
    contacts?: ContactInfo[];
    lastUpdated?: string;
    bottomNote?: React.ReactNode;
}

export default function PolicyLayout({ title, intro, children, contacts, lastUpdated, bottomNote }: PolicyLayoutProps) {
    return (
        <div className="bg-[#fdfbf7] min-h-screen py-16 md:py-24 px-4 md:px-8 font-sans text-gray-800">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gray-900 tracking-tight">
                    {title}
                </h1>
                <div className="w-12 h-px bg-gray-400 mx-auto mb-8"></div>
                
                {intro && (
                    <div className="text-center text-sm md:text-base text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {intro}
                    </div>
                )}

                <div className="space-y-8 policy-content">
                    {children}
                </div>

                {bottomNote && (
                    <div className="mt-16 text-center italic text-gray-600 text-sm max-w-xl mx-auto">
                        {bottomNote}
                    </div>
                )}

                {contacts && contacts.length > 0 && (
                    <div className="mt-16 bg-[#f4f7fb] rounded-xl p-8 border border-blue-50/50">
                        <h3 className="text-xl font-serif mb-6 text-gray-900">Contact</h3>
                        <div className="space-y-5">
                            {contacts.map((c, i) => (
                                <div key={i}>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                                        {c.label}
                                    </div>
                                    <a href={`mailto:${c.email}`} className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                        {c.email}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 text-center text-[10px] text-gray-400 italic">
                    Last Updated: {lastUpdated || "May 22, 2026"}
                </div>
            </div>
        </div>
    );
}

export const PolicySection = ({ title, children }: { title?: string, children: React.ReactNode }) => (
    <section>
        <div className="border-t border-gray-200/60 mb-6"></div>
        {title && <h2 className="text-xl md:text-2xl font-serif mb-4 text-gray-900">{title}</h2>}
        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            {children}
        </div>
    </section>
);
