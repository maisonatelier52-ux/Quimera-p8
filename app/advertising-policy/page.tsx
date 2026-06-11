import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function AdvertisingPolicyPage() {
    return (
        <PolicyLayout
            title="Advertising and Sponsored Content Policy"
            intro="Mirror Standard separates commercial material from editorial reporting and aims to label advertising, sponsorships, affiliate links, and other paid relationships clearly and conspicuously for readers."
            contacts={[
                { label: "ADVERTISING AND PARTNERSHIPS", email: "editorial@mirrorstandard.com" },
                { label: "READER CONCERNS", email: "corrections@mirrorstandard.com" }
            ]}
        >
            <PolicySection title="Editorial separation">
                <p>Commercial relationships do not grant editorial control. Reporting decisions, headlines, editorial framing, source selection, and publication timing are not sold as part of an advertising, affiliate, sponsorship, or partnership arrangement.</p>
                <p>Mirror Standard's standard is that journalism and advertising should remain distinguishable without guesswork. A reader should not have to infer whether content is paid for, promotional, or independently reported.</p>
            </PolicySection>

            <PolicySection title="How paid material is labeled">
                <p>When content is paid for, sponsored, or published because of a commercial arrangement, Mirror Standard's expectation is that the disclosure appears in a clear location and uses language ordinary readers can understand before they mistake the material for independent reporting.</p>
                <ul className="list-disc list-outside ml-4 space-y-2 mt-4 text-gray-700">
                    <li>Clear labels may include: Advertisement, Ad, Sponsored, Paid Content, or Sponsored Advertising Content.</li>
                    <li>The disclosure should appear close enough to the content that a reader sees it before or as they engage with the material, not only after scrolling deep into the page.</li>
                    <li>Visual design, bylines, and page layout should not be used to make paid material look indistinguishable from independently reported journalism.</li>
                    <li>Vague labels that could confuse readers should be avoided if they do not make the commercial nature of the material obvious.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Native, branded, and partner content">
                <p>If Mirror Standard publishes sponsored features, branded content, partner-funded explainer material, or similarly designed promotional pages, those pages should carry a disclosure that is prominent, plain-language, and durable across desktop and mobile views.</p>
                <p>A sponsor may buy placement or a clearly labeled promotional package, but a sponsor does not buy the right to masquerade as the newsroom, to receive a deceptive byline, or to alter unrelated reporting.</p>
            </PolicySection>

            <PolicySection title="Affiliate links, commerce, and material connections">
                <p>If Mirror Standard uses affiliate links, referral arrangements, or any other material connection that could result in compensation when a reader clicks or makes a purchase, that relationship should be disclosed clearly in or near the affected content.</p>
                <p>Commerce-related disclosures should be written for readers, not buried in legal shorthand. The point is to let readers understand when a recommendation, link, or product mention could generate revenue.</p>
                <ul className="list-disc list-outside ml-4 space-y-2 mt-4 text-gray-700">
                    <li>Affiliate or referral disclosures should be clear and conspicuous.</li>
                    <li>A material connection should not be hidden only in a footer, general policy page, or terms page if it affects a specific piece of content.</li>
                    <li>Editorial recommendations should not be conditioned on compensation alone.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Newsletters, video, audio, and social distribution">
                <p>Disclosure standards apply across formats, not only article pages. Sponsored newsletter placements, paid podcast segments, video sponsorships, and social media promotions should also be labeled in a way that travels with the content or appears clearly at the point of exposure.</p>
                <p>The format may change, but the reader-facing principle does not: paid communication should look paid, not editorially disguised.</p>
            </PolicySection>

            <PolicySection title="Political and issue advertising">
                <p>If Mirror Standard accepts political, advocacy, or issue-based advertising, the material should be clearly labeled as advertising and should not be presented as reported journalism or independent analysis.</p>
                <p>Acceptance of an advertisement does not imply endorsement of a campaign, candidate, issue position, organization, or claim contained in the advertisement.</p>
            </PolicySection>

            <PolicySection title="Practices Mirror Standard should not use">
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                    <li>Selling editorial conclusions or offering favorable coverage in exchange for payment or access.</li>
                    <li>Using a newsroom byline, headline style, or article layout to disguise paid material where the commercial nature is not obvious.</li>
                    <li>Allowing an advertiser, sponsor, or affiliate partner to control unrelated reporting.</li>
                    <li>Hiding a material connection in a place a normal reader would not reasonably notice.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Questions, complaints, and review requests">
                <p>Readers, advertisers, partners, and subjects may contact Mirror Standard if they believe commercial material was mislabeled or the boundary between advertising and editorial work was not clear enough.</p>
                <p>When a disclosure problem is substantiated, the newsroom's expectation is that the label, placement, or page treatment is corrected promptly.</p>
            </PolicySection>
        </PolicyLayout>
    );
}
