export const metadata = {
  title: "Privacy Portal | Astiox Network Inc.",
  description:
    "Learn how Astiox Network Inc. protects your personal data and privacy.",
};

const principles = [
  {
    title: "Transparency at All Times",
    description:
      "We keep you informed about how your data is collected, used, stored, and shared. Our privacy notices are regularly updated to ensure you remain informed about any changes affecting your personal information.",
  },
  {
    title: "Data Minimization & Purpose Limitation",
    description:
      "We only collect personal information necessary to provide our services and fulfill legitimate business purposes. We do not collect unnecessary information.",
  },
  {
    title: "Accountability and Compliance",
    description:
      "Our privacy program follows applicable data protection laws, industry standards, and internal governance frameworks to ensure responsible handling of personal data.",
  },
  {
    title: "User Rights and Access",
    description:
      "We respect your privacy rights and provide mechanisms that allow you to access, update, download, or request deletion of your personal information where applicable.",
  },
  {
    title: "Data Security",
    description:
      "We implement strong technical and organizational safeguards, including encryption, secure infrastructure, and access controls to protect personal information.",
  },
  {
    title: "Privacy by Design",
    description:
      "Privacy and security considerations are incorporated into the design and development of our products and services from the start.",
  },
];

const rights = [
  "Access your personal data",
  "Request a copy of your data",
  "Correct inaccurate information",
  "Close your account",
  "Request deletion of eligible data",
  "Object to marketing communications",
  "Withdraw consent where applicable",
  "Exercise your data portability rights",
  "Request support regarding automated decisions",
];

export default function PrivacyPortalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-isoColor1 dark:bg-isoColor2 dark:text-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-4xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              Privacy Portal
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Astiox Network Inc.
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Our commitment to protecting your data.
            </p>

            <p className="mt-4 max-w-3xl text-blue-100">
              Welcome to our Privacy Portal. We created this page to help
              you understand how we collect, process, store, and protect
              your personal information while providing transparency about
              your privacy rights.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Privacy Notice Dashboard
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Global",
              "North America",
              "Europe",
              "United Kingdom",
              "Asia Pacific",
              "Middle East",
              "Africa",
              "Latin America",
            ].map((region) => (
              <button
                key={region}
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 transition hover:border-isoColor1 dark:text-isoColor2 hover:text-isoColor1 dark:text-isoColor2"
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Privacy Principles
          </h2>

          <p className="mt-4 text-gray-600">
            Our privacy framework is built around transparency, security,
            accountability, and user control.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 h-12 w-12 rounded-xl bg-isoColor1 dark:text-isoColor2/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-isoColor1 dark:text-isoColor2" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Usage */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold text-gray-900">
            How Astiox Network Uses Your Data
          </h2>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">
              Definition of Personal Data
            </h3>

            <p className="mt-4 text-gray-600 leading-8">
              Personal data refers to any information that identifies,
              relates to, describes, or can reasonably be associated with
              an individual. Examples include names, email addresses,
              account identifiers, location information, device data,
              transaction information, and other information that may
              identify a user directly or indirectly.
            </p>
          </div>
        </div>
      </section>

      {/* Rights */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900">
          Exercising Your Privacy Rights
        </h2>

        <p className="mt-4 max-w-3xl text-gray-600">
          We are committed to helping users exercise their privacy rights
          under applicable data protection laws.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {rights.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 p-5 hover:border-isoColor1 dark:text-isoColor2"
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-isoColor1 dark:text-isoColor2" />
                <span className="font-medium text-gray-800">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-6">
            {[
              {
                q: "How can I access my personal data?",
                a: "You may request a copy of your personal information through our privacy request process.",
              },
              {
                q: "Can I request deletion of my data?",
                a: "Yes. Eligible users may request deletion of personal data subject to legal and regulatory obligations.",
              },
              {
                q: "How do I withdraw my consent?",
                a: "You may withdraw consent through your account settings or by contacting our privacy team.",
              },
              {
                q: "How can I update inaccurate information?",
                a: "Most account information can be updated directly within your profile settings.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {faq.q}
                </h3>

                <p className="mt-3 text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-isoColor1 dark:bg-isoColor2 dark:text-black py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Contact Our Privacy Team
          </h2>

          <p className="mt-5 text-blue-100">
            If you have questions regarding privacy, data protection,
            compliance, or wish to exercise your privacy rights, contact
            our Data Protection Team.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-isoColor1 dark:text-isoColor2 transition hover:scale-105">
            Contact Privacy Team
          </button>
        </div>
      </section>
    </main>
  );
}