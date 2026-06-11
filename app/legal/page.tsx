import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function LegalPage() {
    return (
        <PolicyLayout
            title="Legal"
            intro="This page provides a plain-language overview of legal and compliance topics relevant to Mirror Standard's publishing, reader use of site content, complaints, permissions, and formal requests."
            contacts={[
                { label: "GENERAL LEGAL CONTACT", email: "editorial@mirrorstandard.com" },
                { label: "CORRECTIONS AND FACTUAL CONCERNS", email: "corrections@mirrorstandard.com" }
            ]}
        >
            <PolicySection title="Informational use of Mirror Standard content">
                <p>Mirror Standard publishes journalism, analysis, and explanatory material for informational purposes. Articles are edited to newsroom standards, but they should not be treated as legal, financial, tax, medical, or other professional advice tailored to an individual reader's situation.</p>
                <p>Where a story touches legal, regulatory, or financial matters, Mirror Standard aims to use precise sourcing and bounded language rather than sweeping implication. Readers remain responsible for seeking professional advice when they need it.</p>
            </PolicySection>

            <PolicySection title="Copyright, quotation, and reuse">
                <p>Readers may link to Mirror Standard reporting and may quote brief excerpts with clear attribution where applicable law permits. Republishing full articles, bulk reproduction, commercial reuse, scraping for republication, or systematic copying requires permission unless a separate license or legal exception applies.</p>
                <p>If you want to syndicate, reproduce, translate, archive commercially, or otherwise reuse substantial Mirror Standard content, contact the newsroom before doing so.</p>
            </PolicySection>

            <PolicySection title="Complaints about accuracy, rights, or fairness">
                <p>If you believe a Mirror Standard article contains a material factual error, omits critical context, infringes rights, or raises a serious legal concern, contact the newsroom promptly with the specific URL, the exact material at issue, the basis for your concern, and supporting documentation where available.</p>
                <p>Different complaints may be handled under different newsroom processes. A factual dispute may be reviewed under the corrections or right-of-reply process, while a copyright, privacy, or other rights complaint may require separate review.</p>
            </PolicySection>

            <PolicySection title="What to include in a formal request">
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                    <li>The URL or headline of the content at issue.</li>
                    <li>A clear description of the statement, image, video, or other material you are challenging.</li>
                    <li>The legal or factual basis for the request, including supporting documents where relevant.</li>
                    <li>Your name, organization if applicable, and a reliable contact method for follow-up.</li>
                    <li>If you are acting on behalf of someone else, a brief statement of your authority to do so.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Removal, restriction, and update requests">
                <p>Mirror Standard reviews serious requests for correction, clarification, update, removal, or restricted display. Submission of a request does not by itself guarantee removal of accurate reporting or immediate depublication.</p>
                <p>The newsroom's standard is to evaluate the request against the public record, editorial standards, applicable law, and the public interest. In some cases the appropriate response may be a correction, clarification, update note, or follow-up article rather than removal.</p>
            </PolicySection>

            <PolicySection title="Links to third-party material">
                <p>Mirror Standard may link to third-party sites, official records, social platforms, public databases, and outside documents for sourcing and reader context. Those third-party properties are governed by their own terms, policies, and accuracy practices.</p>
                <p>A link to a third-party source does not necessarily mean Mirror Standard endorses every statement or policy on that external site.</p>
            </PolicySection>

            <PolicySection title="Formal notices and requests">
                <p>For legal notices, permissions questions, rights complaints, or formal requests related to published content, contact the newsroom directly so the request can be routed to the appropriate reviewer.</p>
                <p>At the time of this update, Mirror Standard handles public-facing legal and policy correspondence through the published newsroom email addresses on this site.</p>
            </PolicySection>
        </PolicyLayout>
    );
}
