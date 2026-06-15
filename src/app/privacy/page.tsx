import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SpeakIQ",
  description: "Privacy policy for SpeakIQ — how we collect, use and protect your data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="opacity-50 mb-10">Last updated: 15 June 2026</p>

      <Section title="1. Who We Are">
        <p>SpeakIQ (https://speakiq.app) is operated by an independent developer. SpeakIQ is an AI-powered language learning app — practice real conversations with an AI tutor in 50+ languages and get instant corrections.</p>
        <p className="mt-2">Contact: <a href="mailto:info.siva@gmail.com" className="underline">info.siva@gmail.com</a></p>
      </Section>

      <Section title="2. Information We Collect">
        <p>We may collect the following information when you use our service:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Usage data</strong> — pages visited, features used, time on site (via analytics).</li>
          <li><strong>Device/browser data</strong> — browser type, operating system, screen resolution, IP address.</li>
          <li><strong>Cookies</strong> — small files stored on your device to remember preferences and enable advertising.</li>
          <li><strong>Account data</strong> (if you register) — email address and profile information you provide.</li>
          <li><strong>Lesson and conversation data</strong> — language preferences, conversation transcripts, and progress, used to personalize lessons and processed by AI providers.</li>
        </ul>
        <p className="mt-2">We do <strong>not</strong> sell your personal data to third parties.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To provide and improve the service, including AI conversation practice and feedback.</li>
          <li>To display relevant advertising through Google AdSense.</li>
          <li>To analyse usage patterns and fix bugs.</li>
          <li>To send service-related emails (if you have an account).</li>
        </ul>
      </Section>

      <Section title="4. Google AdSense and Advertising">
        <p>This site uses Google AdSense to display ads. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
      </Section>

      <Section title="5. AI Processing">
        <p>Conversation and lesson content you submit may be processed by third-party AI/LLM providers to generate responses, corrections, and personalized lessons. Please avoid including sensitive personal information in your messages.</p>
      </Section>

      <Section title="6. Data Security">
        <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
      </Section>

      <Section title="7. Your Rights">
        <p>You may request access to, correction of, or deletion of your personal data — including your account and lesson history — by contacting us at the email above.</p>
      </Section>

      <Section title="8. Changes to This Policy">
        <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </section>
  );
}
