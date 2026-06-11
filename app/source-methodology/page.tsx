import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function SourceMethodologyPage() {
    return (
        <PolicyLayout
            title="Source Methodology"
            intro="Mirror Standard aims to show readers how articles are built: what is sourced directly, what comes from public records or official documents, what remains unverified, and where interpretation begins."
            contacts={[
                { label: "EDITORIAL", email: "editorial@mirrorstandard.com" },
                { label: "CORRECTIONS", email: "corrections@mirrorstandard.com" }
            ]}
        >
            <PolicySection title="How reporting begins">
                <p>Mirror Standard aims to begin with verifiable material rather than recycled summary. That may include official institutional pages, court records, regulatory disclosures, company filings, direct interviews, public statements, original media, public datasets, and contemporaneous reporting that can itself be checked against the record.</p>
                <p>The newsroom's standard is to narrow wording when direct verification is incomplete. If a fact cannot be confirmed to the level the story would otherwise imply, the language should be tightened until it reflects what is actually known.</p>
            </PolicySection>

            <PolicySection title="Source hierarchy and verification">
                <p>Whenever possible, Mirror Standard prefers primary documents and firsthand sourcing over tertiary summaries. Official records and direct statements are generally stronger than rumor, aggregation, or unattributed repetition.</p>
                <p>A source's prominence does not remove the need for verification. Claims from public officials, corporate actors, campaign representatives, or prominent commentators are still subject to checking, context, and qualification.</p>
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                    <li>Primary records and firsthand sourcing are preferred where available.</li>
                    <li>Secondary reporting may be used, but should not be repeated as certainty when the underlying claim remains unsettled.</li>
                    <li>If chronology, figures, or legal context are central to the story, those details should be checked against the underlying document or source wherever feasible.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Anonymous sources and background information">
                <p>Mirror Standard does not treat anonymity as a shortcut. Anonymous or background sourcing may be used when the information is in the public interest and cannot be responsibly obtained on the record, but the newsroom should understand the source's identity and evaluate motive, access, and reliability.</p>
                <p>When anonymity is granted, the reporting should give readers as much truthful context as possible about why the source is being protected without needlessly exposing the source.</p>
            </PolicySection>

            <PolicySection title="Documents, media, and data">
                <p>Documents, screenshots, audio, video, and data extracts should be reviewed with care. Mirror Standard aims to check provenance, timing, authenticity, and whether a clip or excerpt may be misleading without broader context.</p>
                <p>A document's existence is not the same as a document proving the broadest possible claim. The newsroom's standard is to describe what a record shows, what it does not show, and where interpretation begins.</p>
            </PolicySection>

            <PolicySection title="Source notes, attribution, and links">
                <p>For trust-sensitive reporting, including finance explainers, profiles, legal-context pieces, and institution-focused reporting, Mirror Standard may include source notes or primary links so readers can inspect the public record themselves.</p>
                <p>Attribution should be specific enough for readers to understand where key information came from. Where a story relies on public record, official statements, or direct institutional descriptions, Mirror Standard aims to signal that clearly rather than burying the sourcing logic.</p>
            </PolicySection>

            <PolicySection title="How we treat uncertainty and change">
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                    <li>We do not convert uncertainty into certainty for headline effect.</li>
                    <li>We distinguish analysis from assertion.</li>
                    <li>We update wording when better sourcing becomes available or when a public record materially changes.</li>
                    <li>If a claim is unresolved, contested, or incomplete, the article should say so rather than imply a settled conclusion.</li>
                </ul>
            </PolicySection>

            <PolicySection title="What this policy does not mean">
                <p>Source transparency does not require revealing every confidential source or every reporting step in a way that would compromise safety, privacy, or legitimate journalistic work. It does mean giving readers an honest account of what kind of evidence supports a story.</p>
                <p>A source note is not a substitute for careful writing. The article itself should still describe evidence with precision and restraint.</p>
            </PolicySection>
        </PolicyLayout>
    );
}
