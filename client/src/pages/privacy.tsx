import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8" data-testid="link-back-home">
            <ArrowLeft size={18} />
            Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-light tracking-tight mb-8" data-testid="text-privacy-title">Privacy Policy</h1>
        <p className="text-white/60 mb-8">Last Updated: February 2026</p>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Information We Collect</h2>
            <div className="mt-4 space-y-4 text-white/70">
              <div>
                <h3 className="text-base font-medium text-white">Personal Information</h3>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Account login information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Health &amp; Wellness Information</h3>
                <p className="mt-2">When you log data in the app, we may collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Temperature</li>
                  <li>Pulse</li>
                  <li>Energy</li>
                  <li>Sleep</li>
                  <li>Digestion</li>
                  <li>Stress</li>
                  <li>Mood</li>
                  <li>Notes related to metabolic experiments or daily wellbeing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Usage Data</h3>
                <p className="mt-2">We collect limited technical data through our app framework (Vibecode/Expo), such as app performance data and general usage analytics.</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Payments</h3>
                <p className="mt-2">Lighter™ offers Lighter Premium Monthly through Apple In-App Purchase. Subscriptions are auto-renewable, can be managed or canceled in Apple ID subscription settings, and may be managed by RevenueCat. We do not collect or store credit card information.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Provide and improve the Lighter™ app</li>
              <li>Personalize your experience</li>
              <li>Generate AI-powered responses (via OpenAI)</li>
              <li>Manage account authentication</li>
              <li>Provide customer support</li>
              <li>Maintain app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. AI Data Use</h2>
            <p>When you choose to use the AI Coach feature, the text you enter (such as questions or notes you submit to the AI feature) is sent securely to OpenAI’s API in order to generate a response.</p>
            <p className="mt-4">We only transmit the information necessary to generate the response. We do not send payment information.</p>
            <p className="mt-4">AI processing occurs through OpenAI’s API. Data handling is subject to OpenAI’s data policies.</p>
            <p className="mt-4">Users must provide consent before using AI-powered features.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. How Your Information Is Shared</h2>
            <p>We do not sell or rent your information.</p>
            <p className="mt-3">We may share limited data with:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>OpenAI, to generate AI responses when you use AI features</li>
              <li>Apple and RevenueCat, to process purchases and manage subscription status</li>
            </ul>
            <p className="mt-3">Each service only receives the minimum information necessary to perform its function.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. Data Storage &amp; Security</h2>
            <p>We use reasonable administrative, technical, and physical safeguards to protect your information. However, no system can be guaranteed 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Access the information we hold about you</li>
              <li>Update or correct your information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for AI data processing</li>
            </ul>
            <p className="mt-3">To request any of these actions, email us at support@getlighterapp.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">7. Children’s Privacy</h2>
            <p>Lighter™ is not intended for users under 18. We do not knowingly collect personal information from minors.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact:</p>
            <p className="mt-3 text-amber-400">Lighter™</p>
            <p className="text-amber-400">Email: support@getlighterapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
