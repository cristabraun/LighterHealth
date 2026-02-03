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
        <p className="text-white/60 mb-8">Last Updated: February 2025</p>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Information We Collect</h2>
            <p>We collect the following information:</p>
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
                <p className="mt-2">When you log data in the app, we collect:</p>
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
                <p className="mt-2">Basic analytics collected through our app framework (Vibecode/Expo), such as app performance and general usage.</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Payments</h3>
                <p className="mt-2">If subscriptions are enabled, payments are processed through RevenueCat. We do not store credit card information.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Provide and improve the Lighter™ app</li>
              <li>Personalize your user experience</li>
              <li>Offer AI-generated guidance (via OpenAI)</li>
              <li>Manage account authentication</li>
              <li>Provide customer support</li>
              <li>Maintain app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. How Your Information Is Shared</h2>
            <p>We do not sell or rent your information.</p>
            <p className="mt-3">We may share limited data with:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>OpenAI, to generate AI responses (your messages are sent to OpenAI’s API)</li>
              <li>RevenueCat, to process subscriptions (if enabled)</li>
            </ul>
            <p className="mt-3">These services only receive what is necessary to perform their function.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. Data Storage &amp; Security</h2>
            <p>We use secure, industry-standard methods to store and protect your information. No system is 100% secure, but we take all reasonable measures to keep your data safe.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. Your Rights</h2>
            <p>Depending on your location, you may have the right to access the information we hold, update or correct your information, request deletion of your data, or withdraw consent.</p>
            <p className="mt-3">To request any of these actions, email us at support@getlighterapp.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. Children’s Privacy</h2>
            <p>Lighter™ is not intended for users under 18. We do not knowingly collect data from minors.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Updates will be posted on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">8. Contact Us</h2>
            <p>If you have questions, email us at:</p>
            <p className="mt-3 text-amber-400">support@getlighterapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
