import { Metadata } from "next";
import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar"; // Navbar component not found in codebase
import Footer from "../components/layout/Footer";
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, Eye, Bell } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | Quimera News",
    description: "Learn how Quimera collects, uses, and protects your personal information.",
    openGraph: {
        title: "Privacy Policy | Quimera News",
        description: "Learn how Quimera collects, uses, and protects your personal information.",
        url: "https://quimera-news.com/privacy-policy",
        siteName: "Quimera",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | Quimera News",
        description: "Learn how Quimera collects, uses, and protects your personal information.",
    },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "February 23, 2026";

    return (
        <main className="bg-[#f8f9fa] min-h-screen font-serif">
            <Header />
            {/* <Navbar /> */}

            {/* Breadcrumb Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1330px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-gray-300" />
                        <span className="text-gray-900 border-b-2 border-red-500 pb-0.5">Privacy Policy</span>
                    </div>
                </div>
            </div>

            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header Title */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-10 bg-red-600"></div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 uppercase">
                            Privacy Policy
                        </h1>
                    </div>

                    {/* Introduction Overlay */}
                    <div className="bg-[#00008B] text-white rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Lock size={120} />
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed relative z-10 font-medium text-blue-50">
                            Your privacy is important to us at <span className="font-black text-yellow-400">QUIMERA</span>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-16">
                        {/* 1. Information We Collect */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">01</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Information We Collect</h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-[#00008B] mb-4">Personal Data</h3>
                                    <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">
                                        We may collect personally identifiable information that you voluntarily provide to us when you:
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                                        {['Register on the website', 'Subscribe to our newsletter', 'Fill out a contact form', 'Make a purchase or transaction', 'Participate in surveys or promotions'].map((item) => (
                                            <li key={item} className="flex items-center gap-3 bg-gray-50 border border-transparent hover:border-red-600/20 p-4 rounded-xl transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                                <span className="font-bold text-sm text-gray-900">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-base md:text-lg leading-relaxed mt-6 text-gray-600">
                                        This information may include your name, email address, phone number, postal address, payment information, and other details you choose to provide.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-[#00008B] mb-4">Automatically Collected Information</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
                                        When you visit our website, we may automatically collect certain information about your device, including:
                                    </p>
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                        {['IP address', 'Browser type', 'Operating system', 'Device info', 'Pages viewed', 'Time spent', 'Referring site', 'Date and time', 'Clickstream data'].map(i => <div key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-300 rounded-full"></div>{i}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. How We Use Your Information */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-[#00008B]/20 transition-colors">02</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Usage of Information</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">
                                We use the information we collect in the following ways:
                            </p>
                            <ul className="grid grid-cols-1 gap-3 list-none p-0">
                                {[
                                    "To provide, operate, and maintain our website and services",
                                    "To improve, personalize, and expand our content",
                                    "To understand and analyze how you use our website",
                                    "To develop new products, services, features, and functionality",
                                    "To communicate with you for customer service, updates, and marketing",
                                    "To process transactions and send related information",
                                    "To prevent fraudulent transactions and protect against criminal activity",
                                    "To comply with legal obligations and enforce our terms"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"></div>
                                        <span className="text-base text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Disclosure of Your Information */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">03</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Disclosure</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">
                                We may share your information in the following situations:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "Service Providers", desc: "With third-party vendors who perform services on our behalf." },
                                    { title: "Business Transfers", desc: "In connection with mergers, acquisitions, or sale of assets." },
                                    { title: "Legal Requirements", desc: "When required by law or to protect our rights." },
                                    { title: "With Your Consent", desc: "When you give us explicit permission to share your data." }
                                ].map((box) => (
                                    <div key={box.title} className="p-6 border border-gray-100 rounded-2xl bg-white hover:border-red-600/30 transition-colors">
                                        <h4 className="font-black uppercase text-sm mb-2 text-[#00008B]">{box.title}</h4>
                                        <p className="text-sm text-gray-600">{box.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Cookies */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">04</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Cookies</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                            </p>
                        </div>

                        {/* 5. Data Security */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">05</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Data Security</h2>
                            </div>
                            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center bg-gray-50/50">
                                <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
                                </p>
                            </div>
                        </div>

                        {/* 6. Privacy Rights */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">06</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Your Privacy Rights</h2>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                                {[
                                    { title: "Access", desc: "Request access to your personal data" },
                                    { title: "Correction", desc: "Request correction of inaccurate data" },
                                    { title: "Deletion", desc: "Request deletion of your personal data" },
                                    { title: "Opt-Out", desc: "Opt-out of marketing communications" },
                                    { title: "Portability", desc: "Request a copy of your data in a portable format" }
                                ].map((right) => (
                                    <li key={right.title} className="p-4 bg-gray-50 rounded-xl">
                                        <span className="font-black uppercase text-xs text-[#00008B] block mb-1">{right.title}</span>
                                        <span className="text-sm text-gray-600">{right.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 7. Third-Party Links */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">07</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Third-Party Links</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
                            </p>
                        </div>

                        {/* 8. Children's Privacy */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">08</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Children's Privacy</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us immediately.
                            </p>
                        </div>

                        {/* 9. Changes */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl font-black text-[#00008B]/10 group-hover:text-red-600/20 transition-colors">09</div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">Changes to This Policy</h2>
                            </div>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
