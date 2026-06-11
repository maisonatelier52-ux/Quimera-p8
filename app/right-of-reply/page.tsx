import PolicyLayout, { PolicySection } from '@/app/components/layout/PolicyLayout';

export default function RightOfReplyPage() {
    return (
        <PolicyLayout
            title="Right of Reply Policy"
            intro="Mirror Standard aims to give relevant people and institutions a fair opportunity to respond when criticism, allegations, or materially disputed factual context are central to a story."
            contacts={[
                { label: "EDITORIAL", email: "editorial@mirrorstandard.com" },
                { label: "CORRECTIONS", email: "corrections@mirrorstandard.com" }
            ]}
        >
            <PolicySection title="When we seek a response">
                <p>If a story includes criticism, allegations, serious factual dispute, or materially adverse claims about a person or institution, Mirror Standard aims to seek a response before publication when feasible and when doing so does not compromise necessary reporting, safety, or legitimate public-interest work.</p>
                <p>The goal is not to offer editorial control to the subject of reporting. The goal is to test the story against relevant rebuttal, correction, or context before publication where the circumstances warrant it.</p>
            </PolicySection>

            <PolicySection title="How outreach is usually handled">
                <p>The method and timing of outreach may vary with the story. Mirror Standard may contact a subject or representative by email, phone, public contact channel, counsel, or other reasonable means depending on the nature of the allegation and the urgency of publication.</p>
                <p>A reasonable opportunity to respond does not always mean an unlimited one. Fast-moving stories, breaking developments, public-safety issues, and time-sensitive reporting may require shorter response windows than feature or investigative work.</p>
            </PolicySection>

            <PolicySection title="What to send if you are seeking a reply or correction">
                <p>If you are contacting Mirror Standard in response to published or pending coverage, include the article URL or headline, the specific claim you dispute, the factual basis for your objection, any supporting documents you want reviewed, and the best contact information for follow-up.</p>
                <p>General denials without specifics are less useful than direct identification of what is said to be wrong, incomplete, misleading, or outdated.</p>
            </PolicySection>

            <PolicySection title="Post-publication responses">
                <p>After publication, a person or institution that believes context is missing or materially wrong may contact the newsroom. Relevant responses may lead to a clarification, correction, update note, follow-up coverage, or no change if the reporting remains supported.</p>
                <p>Mirror Standard may publish or summarize a substantive response when it materially helps readers understand the dispute or the evidentiary record.</p>
            </PolicySection>

            <PolicySection title="What this policy does not guarantee">
                <p>A right-of-reply request does not guarantee publication of a full statement, removal of accurate reporting, or advance approval of an article by the subject of that article.</p>
                <p>It does mean the newsroom should review the request seriously, compare it against the evidence, and respond according to its editorial standards and corrections process.</p>
            </PolicySection>

            <PolicySection title="Urgent matters and legal sensitivity">
                <p>Where a story concerns active legal proceedings, regulatory matters, allegations of misconduct, or reputationally sensitive claims, Mirror Standard's standard is to handle outreach carefully and document the response process in the newsroom's working record.</p>
                <p>A reply request should improve factual accuracy, not become a back door to pressure the newsroom into weakening supported reporting.</p>
            </PolicySection>
        </PolicyLayout>
    );
}
