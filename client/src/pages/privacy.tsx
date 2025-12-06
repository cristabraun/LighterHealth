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
        <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Information We Collect</h2>
            <p>When you use Lighter™, we collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Account information (name, email address)</li>
              <li>Health and wellness data you choose to log (temperature, pulse, energy levels, sleep, mood)</li>
              <li>Messages you send through the app</li>
              <li>Payment information processed securely through Stripe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and provide insights</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices and support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. Data Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. Your data is encrypted in transit and at rest. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also request a copy of your data or opt out of certain communications. Contact us at support@getlighterapp.com to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-3 text-amber-400">support@getlighterapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
