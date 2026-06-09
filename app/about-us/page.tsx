import { Metadata } from "next";
import { Newspaper, Globe, CheckCircle2, Scale, Search, Shield, ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "About Us | Quimera News",
    description: "Learn about Quimera - your premier source for global news, economic analysis, and breaking stories across the world.",
    keywords: ["Quimera", "about us", "global news", "news company", "journalism", "media organization", "financial news", "editorial team"],
    alternates: {
        canonical: "https://quimera-news.com/about-us",
    },
    openGraph: {
        title: "About Us | Quimera News",
        description: "Discover the journey and mission of Quimera, a leader in modern financial and global journalism.",
        url: "https://quimera-news.com/about-us",
        siteName: "Quimera News",
        images: [
            {
                url: "/images/news/markets-1.webp",
                width: 1200,
                height: 630,
                alt: "About Quimera",
            }
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Quimera News",
        description: "Official Quimera About Us page - detailing our commitment to journalism and transparency.",
        site: "@quimeranews",
        images: ["/images/news/markets-1.webp"],
    },
};

export default function AboutUsPage() {
    return (
        <main className="bg-[#f8f9fa] min-h-screen font-serif">
            <Header />

            {/* Breadcrumb Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1330px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-gray-300" />
                        <span className="text-gray-900 border-b-2 border-red-500 pb-0.5">About Us</span>
                    </div>
                </div>
            </div>

            {/* Main Content - Our Story */}
            <section className="py-12 px-4 md:py-16">
                <div className="max-w-[1330px] mx-auto">
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-8 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-red-600"></div>
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
                                        OUR STORY
                                    </h1>
                                </div>
                                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                    <p>
                                        Founded in 2025, <span className="font-extrabold text-[#00008B]">QUIMERA</span> was born from a simple yet powerful belief: that quality journalism matters. In an era of information overload and clickbait headlines, we set out to create a news platform dedicated to accuracy, integrity, and in-depth reporting that empowers readers.
                                    </p>
                                    <p>
                                        What began as a small team of passionate journalists working from a modest modern office has evolved into a respected digital news source serving millions of readers worldwide. Our commitment to investigative journalism and unbiased reporting has earned us the trust of the global community.
                                    </p>
                                    <p>
                                        Through market upheavals, global crises, and technological revolutions, we've remained steadfast in our mission: to inform and empower our audience with reliable, well-researched journalism that cuts through the noise.
                                    </p>
                                    <p className="text-xl md:text-2xl font-bold text-red-600 pt-4">
                                        At Quimera, we don't just report the news — we help you understand what it means for the world and your future.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Stats sidebar for desktop */}
                            <div className="lg:col-span-4 bg-gray-50/50 p-8 md:p-12">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-10">Fast Facts</h3>
                                <div className="space-y-12">
                                    <div>
                                        <div className="text-5xl font-black text-[#00008B] tracking-tighter mb-2">10M+</div>
                                        <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">Monthly Readers</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-red-600 tracking-tighter mb-2">50+</div>
                                        <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">Major Awards</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-[#00008B] tracking-tighter mb-2">200+</div>
                                        <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">Global Partners</div>
                                    </div>
                                    <div className="pt-6">
                                        <div className="inline-flex items-center gap-1 bg-yellow-400 text-black px-4 py-2 rounded font-black text-xs uppercase tracking-tighter">
                                            Verified Source
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-8 px-4 bg-white border-y border-gray-100">
                <div className="max-w-[1330px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
                        {/* Our Mission */}
                        <div className="group p-10 border border-gray-100 rounded-2xl hover:bg-[#00008B] hover:text-white transition-all duration-300 cursor-default">
                            <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                                <Newspaper className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter mb-6 text-gray-900 group-hover:text-white transition-colors">OUR MISSION</h2>
                            <p className="text-lg leading-relaxed text-gray-600 group-hover:text-blue-100 transition-colors">
                                To deliver accurate, unbiased, and timely news that empowers our readers to make informed decisions.
                                We are committed to investigative journalism that holds power accountable and gives voice to the voiceless,
                                while maintaining the highest standards of editorial integrity.
                            </p>
                        </div>

                        {/* Our Vision */}
                        <div className="group p-10 border border-gray-100 rounded-2xl hover:bg-[#00008B] hover:text-white transition-all duration-300 cursor-default">
                            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                                <Globe className="w-8 h-8 text-[#00008B] group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter mb-6 text-gray-900 group-hover:text-white transition-colors">OUR VISION</h2>
                            <p className="text-lg leading-relaxed text-gray-600 group-hover:text-blue-100 transition-colors">
                                To be the most trusted and respected news source globally, recognized for our commitment to truth,
                                journalistic excellence, and positive impact on society. We envision a world where quality journalism thrives
                                and informed citizens shape a better future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Principles */}
            <section className="py-16 px-4">
                <div className="max-w-[1330px] mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Values & Standards</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">EDITORIAL PRINCIPLES</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Accuracy */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-green-50 rounded-full w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                                <CheckCircle2 className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-center text-gray-900">Accuracy</h3>
                            <p className="text-sm leading-relaxed text-gray-600 text-center">
                                Every fact is verified, every source is checked. We correct errors promptly and transparently to maintain truth.
                            </p>
                        </div>

                        {/* Impartiality */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-yellow-50 rounded-full w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                                <Scale className="w-7 h-7 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-center text-gray-900">Impartiality</h3>
                            <p className="text-sm leading-relaxed text-gray-600 text-center">
                                We report without bias, presenting all sides of a story fairly and objectively without personal agendas.
                            </p>
                        </div>

                        {/* Independence */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-purple-50 rounded-full w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                                <Search className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-center text-gray-900">Independence</h3>
                            <p className="text-sm leading-relaxed text-gray-600 text-center">
                                Our editorial decisions are free from political, commercial, or personal influence outside our newsroom.
                            </p>
                        </div>

                        {/* Accountability */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-blue-50 rounded-full w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                                <Shield className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-center text-gray-900">Accountability</h3>
                            <p className="text-sm leading-relaxed text-gray-600 text-center">
                                We hold ourselves to the highest standards, admitting and correcting mistakes to serve our readers faithfully.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Call to Action */}
            <section className="py-20 px-4 bg-[#00008B] text-white">
                <div className="max-w-[1330px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">JOIN THE QUIMERA COMMUNITY</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Get the most important stories delivered to your inbox every morning. Stay informed with the global perspective.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <input
                            type="email"
                            placeholder="Your email address..."
                            className="w-full sm:w-80 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-serif"
                        />
                        <button className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-black uppercase tracking-tighter hover:bg-yellow-300 transition-colors">
                            SUBSCRIBE NOW
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
