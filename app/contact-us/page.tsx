import PolicyLayout from '@/app/components/layout/PolicyLayout';
import { Mail, ShieldAlert, AlertCircle, Users, Twitter, Instagram, Youtube, Rss } from 'lucide-react';

export default function ContactUsPage() {
    return (
        <PolicyLayout
            title="Get in Touch with Mirror Standard"
            intro="Mirror Standard is an independent newsroom. We welcome tips, corrections, and communication from readers, journalists, organizations, and people responding to our coverage."
            lastUpdated="May 22, 2026"
        >
            <div className="space-y-4 max-w-2xl mx-auto mb-10">
                {/* Contact Cards */}
                <div className="bg-white rounded-xl p-5 border border-gray-200/60 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-900 font-serif text-lg">
                        <Mail size={18} className="text-gray-500" />
                        <h3>Editorial & General Contact</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">Questions about our reporting, coverage ideas, or editorial matters.</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200/60 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-900 font-serif text-lg">
                        <ShieldAlert size={18} className="text-gray-500" />
                        <h3>Confidential News Tips</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">Share information that you believe should be investigated or reported.</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200/60 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-900 font-serif text-lg">
                        <AlertCircle size={18} className="text-gray-500" />
                        <h3>Corrections</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">If you believe we made an error, please notify us so we can correct it promptly.</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200/60 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-900 font-serif text-lg">
                        <Users size={18} className="text-gray-500" />
                        <h3>Media & Press Inquiries</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">Journalists, researchers, or organizations seeking collaboration.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200/60 shadow-sm text-center max-w-2xl mx-auto">
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    Contact the newsroom through the address that best matches your request. If you are reporting an error, challenging a factual claim, requesting a reply, or sending a permissions or legal concern, include the article URL and the specific issue so the request can be routed quickly.
                </p>
                <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Editorial: <a href="mailto:editorial@mirrorstandard.com" className="text-gray-900 font-medium underline underline-offset-2">editorial@mirrorstandard.com</a></p>
                    <p className="text-gray-600">Tips: <a href="mailto:tips@mirrorstandard.com" className="text-gray-900 font-medium underline underline-offset-2">tips@mirrorstandard.com</a></p>
                    <p className="text-gray-600">Corrections: <a href="mailto:corrections@mirrorstandard.com" className="text-gray-900 font-medium underline underline-offset-2">corrections@mirrorstandard.com</a></p>
                    <p className="text-gray-600">Rights, permissions, and formal notices: <a href="mailto:editorial@mirrorstandard.com" className="text-gray-900 font-medium underline underline-offset-2">editorial@mirrorstandard.com</a></p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h3 className="font-serif text-lg text-gray-900 mb-6">Stay Connected</h3>
                <div className="flex justify-center items-center gap-8 text-sm font-medium text-gray-800">
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Twitter size={16} /> X (Twitter)</a>
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Instagram size={16} /> Instagram</a>
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Youtube size={16} /> YouTube</a>
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Rss size={16} /> Substack</a>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-200/60 pt-8 text-center max-w-md mx-auto text-[10px] text-gray-400">
                Mirror Standard is an independent digital publication operated by a distributed editorial team based in the United States.
            </div>
        </PolicyLayout>
    );
}
