import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function OwnershipFundingPage() {
    return (
        <PolicyLayout
            title="Ownership and Funding"
            intro="This page explains who controls editorial decisions at Mirror Standard, how commercial support is separated from reporting, and how the newsroom handles conflicts, material relationships, and future ownership or funding disclosures."
            contacts={[
                { label: "EDITORIAL", email: "editorial@mirrorstandard.com" },
                { label: "CORRECTIONS AND TRANSPARENCY", email: "corrections@mirrorstandard.com" }
            ]}
        >
            <PolicySection title="What this page covers">
                <p>Mirror Standard publishes as an independent digital newsroom operated by a distributed editorial team based in the United States. This page is intended to help readers understand how editorial control, commercial support, and conflict disclosures are handled on the public site.</p>
                <p>This page is not a substitute for a corporate registry filing or a securities disclosure. It is a reader-facing explanation of how editorial independence is protected and what kinds of material relationships Mirror Standard expects to disclose.</p>
            </PolicySection>

            <PolicySection title="Editorial control and decision-making">
                <p>Editorial judgments at Mirror Standard are made by editors and reporters. Coverage decisions, headlines, source selection, framing, and publication timing are not sold to advertisers, sponsors, political actors, governments, or commercial partners.</p>
                <p>A business relationship does not create a right to favorable coverage, prior review of a reported article, or suppression of accurate reporting. If a proposed arrangement would blur those lines, the newsroom's standard is to reject the arrangement or remove the affected journalist from the assignment.</p>
            </PolicySection>

            <PolicySection title="How Mirror Standard may be funded">
                <p>Mirror Standard may generate revenue through advertising, sponsorships, platform distribution, licensing, partnerships, and other ordinary publishing-related commercial arrangements. Any such revenue stream is expected to remain structurally separate from editorial decision-making.</p>
                <p>If Mirror Standard enters into a material funding relationship, ownership change, or strategic arrangement that a reasonable reader would consider relevant to editorial independence, the newsroom's expectation is that the relationship is disclosed on this page, on affected coverage, or both.</p>
            </PolicySection>

            <PolicySection title="Conflicts of interest and recusals">
                <p>Journalists and editors are expected to disclose personal, financial, political, or family relationships that could reasonably call their impartiality into question on a relevant assignment. When necessary, the assignment should be moved, edited with explicit disclosure, or declined.</p>
                <p>Mirror Standard does not treat conflicts as a private housekeeping issue when reader trust is materially affected. If a relationship could alter how a reasonable reader interprets coverage, the newsroom's standard is disclosure, recusal, or both.</p>
                <ul className="list-disc list-outside ml-4 space-y-2 mt-4 text-gray-700">
                    <li>Relevant personal or financial ties should be disclosed internally before publication.</li>
                    <li>Gifts, favors, or special access that would compromise independence should not be accepted.</li>
                    <li>Outside work, advocacy, or consulting that conflicts with newsroom independence should be disclosed and may require reassignment.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Commercial support does not buy coverage">
                <p>Mirror Standard keeps a clear boundary between revenue activity and journalism. Advertising or sponsorship does not guarantee coverage, shape a reporter's conclusions, or entitle a commercial party to veto criticism.</p>
                <p>Paid content, sponsored features, affiliate relationships, and other commercial material should be labeled clearly enough that a reader does not have to guess whether they are reading journalism or advertising.</p>
            </PolicySection>

            <PolicySection title="Political, governmental, and advocacy influence">
                <p>Mirror Standard does not present political, governmental, or advocacy messaging as independent reporting. If an external actor seeks to influence coverage through money, access, or pressure, the newsroom's standard is to preserve editorial control rather than trade independence for convenience.</p>
                <p>When a story concerns a subject with which Mirror Standard has a material relationship, the relationship should be disclosed in language a reader can understand.</p>
            </PolicySection>

            <PolicySection title="Changes to ownership or material support">
                <p>Ownership, control, and funding arrangements can change over time. If Mirror Standard undergoes a material ownership change, takes on a relationship that bears directly on editorial independence, or launches a funding structure that a reasonable reader should know about, this page should be updated.</p>
                <p>Readers who believe a relevant ownership or funding relationship has not been disclosed may contact the newsroom and request review of the omission.</p>
            </PolicySection>
        </PolicyLayout>
    );
}
