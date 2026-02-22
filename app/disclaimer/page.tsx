export const metadata = {
  title: "Disclaimer | Bihar Vikas Tracker",
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black">
            Disclaimer
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-[#1B263B] rounded-2xl p-8 md:p-12 border border-slate-700 space-y-10 text-slate-300 leading-relaxed">

          <p>
            Bihar Vikas Tracker is an independent civic transparency platform.
          </p>

          <Section title="Platform Status">
            <p>The platform:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Aggregates and structures publicly available data</li>
              <li>Does not claim official status</li>
              <li>Is not affiliated with any government department unless explicitly stated</li>
            </ul>
          </Section>

          <Section title="Informational Purpose">
            <p>
              All project information is presented for informational purposes only.
            </p>
          </Section>

          <Section title="Data Responsibility">
            <p>We:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>Do not certify data accuracy</li>
              <li>Do not guarantee completeness</li>
              <li>Do not provide legal, financial, or official advice</li>
            </ul>

            <p>
              Users are encouraged to verify information directly from primary government sources before making decisions.
            </p>
          </Section>

          <Section title="Neutrality">
            <p>
              The platform does not endorse any political party, public office holder, or private entity.
            </p>

            <p>
              All content is presented neutrally and without bias.
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