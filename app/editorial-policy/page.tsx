import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function EditorialPolicyPage() {
    return (
        <PolicyLayout
            title="Editorial Policy"
            intro="Mirror Standard is an independent digital newsroom committed to factual, transparent, and accountable journalism. Our editorial standards exist to ensure that readers can trust our reporting and understand how our stories are produced."
            bottomNote="Our commitment is to independent, fact-based journalism — accountable to readers and guided by evidence."
        >
            <PolicySection title="Editorial Independence">
                <p>We do not accept payment, favors, or influence in exchange for coverage. Editorial decisions are made solely by journalists and editors, free from corporate, political, or government interference. Commercial support, advertising, sponsorship, and distribution relationships do not grant editorial control over reported articles.</p>
            </PolicySection>

            <PolicySection title="Accuracy and Verification">
                <p>Accuracy is more important than speed. Our journalists verify information using reliable sources, document-based reporting, and direct attribution. When information cannot be independently confirmed, that uncertainty is clearly stated. Errors are corrected transparently in accordance with our Corrections Policy. Stories involving criticism, allegations, finance, legal context, or reputationally sensitive facts are expected to use careful wording and, where appropriate, source notes and pre-publication outreach.</p>
            </PolicySection>

            <PolicySection title="Fairness and Balance">
                <p>We seek diverse perspectives on complex issues while avoiding false balance. Claims are evaluated on evidence and credibility, not ideology.</p>
            </PolicySection>

            <PolicySection title="Transparency">
                <p>Readers deserve to know how reporting decisions are made. We commit to the following practices:</p>
                <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">✓</span> Clearly distinguish between news reporting, opinion, and analysis</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">✓</span> Publish articles under an individual journalist's byline whenever possible</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">✓</span> Use a "Mirror Standard Staff" byline for collaborative reporting</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">✓</span> Label sponsored, paid, affiliate, or partner-funded material clearly enough that readers do not mistake it for independent reporting</li>
                </ul>
            </PolicySection>

            <PolicySection title="Disclosure and Labeling">
                <p>Mirror Standard aims to disclose material relationships that a reasonable reader would consider relevant to understanding a piece of coverage. Paid content, sponsored placements, affiliate links, or partner-funded material should be labeled clearly and kept distinct from independent reporting.</p>
            </PolicySection>

            <PolicySection title="Ethical Standards">
                <div className="space-y-6 mt-4">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">No undisclosed conflicts of interest</h4>
                        <p className="text-gray-600 text-sm">Journalists disclose relevant personal or financial relationships when applicable.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">No hidden sponsored content</h4>
                        <p className="text-gray-600 text-sm">Paid or sponsored material is clearly labeled and separated from news coverage.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Respect for privacy</h4>
                        <p className="text-gray-600 text-sm">We balance the public's right to know with individual rights and personal dignity.</p>
                    </div>
                </div>
            </PolicySection>

            <PolicySection title="Reader Feedback and Accountability">
                <p>Journalism improves through dialogue. Readers are encouraged to contact our editorial team with feedback, corrections, or concerns.</p>
                <p className="flex items-center gap-2 mt-4 text-gray-800 font-medium">
                    <span className="text-gray-500">✉</span> editorial@mirrorstandard.com <span className="text-gray-400">→</span>
                </p>
            </PolicySection>
        </PolicyLayout>
    );
}
