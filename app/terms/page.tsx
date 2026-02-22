export const metadata = {
  title: "Terms of Service | Bihar Vikas Tracker",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 mt-3">
            Effective Date: [Insert Date]
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-[#1B263B] rounded-2xl p-8 md:p-12 border border-slate-700 space-y-10 text-slate-300 leading-relaxed">

          <p>
            By accessing or using Bihar Vikas Tracker, you agree to the following terms.
          </p>

          <Section title="1. Nature of the Platform">
            <p>
              Bihar Vikas Tracker is an independent civic transparency platform that:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Aggregates publicly available development project data</li>
              <li>Structures information for accessibility</li>
              <li>Attempts reasonable verification where possible</li>
            </ul>

            <p>We are:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Not a government body</li>
              <li>Not an auditing authority</li>
              <li>Not an official data certifying agency</li>
            </ul>
          </Section>

          <Section title="2. Data Presentation">
            <p>
              All data presented is based on publicly available sources or documented materials.
            </p>

            <p>
              While efforts are made to structure data accurately:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>We do not guarantee completeness</li>
              <li>We do not guarantee absolute accuracy</li>
              <li>We do not guarantee timeliness of updates</li>
            </ul>

            <p>
              Users should independently verify information before making decisions based on it.
            </p>
          </Section>

          <Section title="3. Sponsorship & Funding">
            <p>
              To sustain operations, the platform may accept sponsorships or funding.
            </p>

            <p>However:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Sponsorship does not influence data structure, categorization, or presentation</li>
              <li>Sponsors cannot modify, suppress, or bias project information</li>
              <li>Financial support does not alter platform neutrality</li>
            </ul>

            <p>
              Funding is intended solely for infrastructure, maintenance, and development improvements.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>Users agree not to:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Attempt to disrupt platform operations</li>
              <li>Manipulate displayed data</li>
              <li>Misrepresent platform data as official certification</li>
              <li>Use content for unlawful purposes</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              Platform structure, design, and presentation format are protected.
              Public data sources remain owned by their respective authorities.
            </p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>The platform is provided “as is.”</p>

            <p>We are not liable for:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Decisions made based on platform data</li>
              <li>Errors originating from source data</li>
              <li>Service interruptions</li>
            </ul>
          </Section>

          <Section title="7. Governing Law">
            <p>
              These terms shall be governed by applicable laws of India.
            </p>
          </Section>

          <Section title="8. Changes to Terms">
            <p>
              Terms may be updated periodically. Continued use of the platform implies acceptance of revised terms.
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#B3AF8F] mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}