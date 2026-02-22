export const metadata = {
  title: "Privacy Policy | Bihar Vikas Tracker",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black">
            Privacy Policy
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
            Bihar Vikas Tracker ("we", "our", "the platform") is a public civic transparency initiative designed to structure and present publicly available development project data in an accessible format.
          </p>

          <p>
            We respect user privacy and are committed to transparency in how limited data is handled.
          </p>

          <Section title="1. Information We Collect">
            <p>We do not require user registration.</p>
            <p>We do not collect personal accounts.</p>
            <p>We do not sell or trade user data.</p>

            <p>We may collect limited, anonymous technical data including:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Page views</li>
              <li>Visit counts</li>
              <li>General device/browser information</li>
              <li>Approximate geographic region (non-precise)</li>
              <li>Referring pages</li>
            </ul>

            <p>
              This data is collected using privacy-respecting analytics tools.
            </p>
          </Section>

          <Section title="2. Analytics">
            <p>
              We use privacy-focused analytics (e.g., Vercel Web Analytics) to measure website traffic and performance.
            </p>

            <p>These analytics:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Do not use invasive tracking cookies</li>
              <li>Do not create personal profiles</li>
              <li>Do not track users across websites</li>
              <li>Do not sell data to third parties</li>
            </ul>

            <p>Data is collected in aggregate form and is used solely to:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Improve website performance</li>
              <li>Understand public usage trends</li>
              <li>Report overall traffic metrics (including for transparency and sponsorship purposes)</li>
            </ul>
          </Section>

          <Section title="3. Cookies">
            <p>This website does not use marketing or advertising cookies.</p>

            <p>
              Limited technical cookies may be used by the hosting platform strictly for:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Basic site functionality</li>
              <li>Security</li>
              <li>Performance optimization</li>
            </ul>

            <p>
              Users may disable cookies through their browser settings if desired.
            </p>
          </Section>

          <Section title="4. Data Usage Purpose">
            <p>Collected data is used only for:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Platform improvement</li>
              <li>Infrastructure stability</li>
              <li>Security monitoring</li>
              <li>Aggregate reporting of visitor statistics</li>
            </ul>

            <p>We do not use collected data for:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Behavioral advertising</li>
              <li>Political targeting</li>
              <li>Commercial profiling</li>
            </ul>
          </Section>

          <Section title="5. Data Sharing">
            <p>We do not sell, rent, or trade user data.</p>

            <p>
              Aggregated statistics (e.g., total visitors per month) may be shared publicly or with sponsors strictly for transparency and sustainability purposes.
            </p>

            <p>No personally identifiable information is shared.</p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>
              The platform may rely on third-party infrastructure providers (e.g., hosting, analytics) that process limited technical data necessary to operate the website.
            </p>

            <p>
              These providers operate under their own privacy standards.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We implement reasonable technical measures to protect platform integrity. However, no online system can guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              This Privacy Policy may be updated as the platform evolves. Updates will be reflected with a revised effective date.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>For privacy-related inquiries:</p>
            <p className="text-[#B3AF8F] font-semibold">
              biharvikastracker@gmail.com
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