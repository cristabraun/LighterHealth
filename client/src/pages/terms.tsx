import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8" data-testid="link-back-home">
            <ArrowLeft size={18} />
            Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-light tracking-tight mb-8" data-testid="text-terms-title">Terms of Service</h1>
        <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using Lighter™, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. Description of Service</h2>
            <p>Lighter™ is a wellness and lifestyle tracking application designed to help users monitor their metabolic health indicators. The app provides tools for tracking daily vitals, running experiments, and receiving personalized guidance.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. Medical Disclaimer</h2>
            <p className="text-amber-400/90">Lighter™ provides wellness and lifestyle guidance only. It is not intended to diagnose, treat, cure, or prevent any disease or health condition. The information provided through our service should not be considered medical advice. Always consult with a qualified healthcare professional before making any changes to your health routine.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. Subscription and Payment</h2>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Lighter™ offers a 3-day free trial followed by a monthly subscription of $19/month</li>
              <li>Payment is processed securely through Stripe</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are handled on a case-by-case basis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. User Conduct</h2>
            <p>You agree not to misuse the service, attempt to access it through unauthorized means, or use it for any unlawful purpose. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">7. Intellectual Property</h2>
            <p>All content, features, and functionality of Lighter™ are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Lighter™ shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the app. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-3 text-amber-400">support@getlighterapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
