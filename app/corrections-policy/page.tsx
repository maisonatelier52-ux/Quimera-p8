import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function CorrectionsPolicyPage() {
    return (
        <PolicyLayout
            title="Corrections Policy"
            intro="Accuracy is central to Mirror Standard's journalism. While we verify information carefully before publication, mistakes can occur. When they do, we correct them transparently, promptly, and visibly."
            contacts={[
                { label: "EMAIL", email: "corrections@mirrorstandard.com" }
            ]}
            bottomNote={
                <div className="flex flex-col items-center gap-4 mt-8">
                    <h3 className="text-lg font-serif text-gray-900">Why This Matters</h3>
                    <p>Trust is built through accountability. By acknowledging mistakes openly and correcting them clearly, we aim to provide journalism that readers can rely on—even when we fall short.</p>
                </div>
            }
        >
            <PolicySection title="How We Handle Mistakes">
                <p>Different types of errors require different responses:</p>
                <div className="space-y-4 mt-4">
                    <div>
                        <h4 className="font-bold flex items-center gap-2 text-gray-900"><span className="text-gray-400">✎</span> Minor errors</h4>
                        <p className="text-gray-600 pl-6 text-xs mt-1">Spelling mistakes, grammatical errors, or typos that do not alter the meaning of the article are corrected promptly without a correction note.</p>
                    </div>
                    <div>
                        <h4 className="font-bold flex items-center gap-2 text-gray-900"><span className="text-gray-400">⊘</span> Factual errors</h4>
                        <p className="text-gray-600 pl-6 text-xs mt-1">Errors involving names, figures, dates, or facts are corrected within the article. A clearly labeled editor's note is added explaining what was corrected and why.</p>
                    </div>
                    <div>
                        <h4 className="font-bold flex items-center gap-2 text-gray-900"><span className="text-gray-400">↻</span> Developing stories</h4>
                        <p className="text-gray-600 pl-6 text-xs mt-1">As news evolves, articles may be updated to reflect new verified information. Updates are time-stamped so readers understand when changes were made.</p>
                    </div>
                </div>
            </PolicySection>

            <PolicySection title="Where Corrections Appear">
                <p>Corrections are made directly on the affected article page. We do not hide corrections or relocate them elsewhere. If a reader encounters an error in an article, the correction will appear in that same article. Depending on the nature of the issue, Mirror Standard may use a correction note, a clarification note, an update note, or a combination of those tools.</p>
            </PolicySection>

            <PolicySection title="What a Correction Request Should Include">
                <p>To help us review a request quickly, include the article URL or headline, the specific line or claim you believe is wrong, the factual basis for your objection, and any supporting documentation you want the newsroom to review.</p>
            </PolicySection>

            <PolicySection title="Reader Submissions">
                <p>Readers play an important role in maintaining accuracy. If you notice an error, please contact us with the article headline, link, and a brief explanation. Our editorial team reviews correction requests promptly.</p>
                <p className="flex items-center gap-2 mt-4 text-blue-600 font-medium">
                    <span>✉</span> corrections@mirrorstandard.com <span className="text-gray-400">↗</span>
                </p>
            </PolicySection>

            <PolicySection title="Our Commitment to Transparency">
                <ul className="space-y-3 mt-2">
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">⊙</span> We do not remove errors without acknowledgment.</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">⊙</span> Significant changes are disclosed clearly to readers.</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">⊙</span> All correction requests are reviewed respectfully and carefully.</li>
                    <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">⊙</span> We do not silently alter the substance of a published article when a correction note or update note is warranted.</li>
                </ul>
            </PolicySection>
        </PolicyLayout>
    );
}
