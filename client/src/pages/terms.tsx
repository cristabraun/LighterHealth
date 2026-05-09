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
        <p className="text-white/60 mb-8">Last Updated: February 2026</p>
        
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Use of the App</h2>
            <p>You must be at least 18 years old to use Lighter™. You agree to use the app only for lawful purposes and in accordance with these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. Accounts</h2>
            <p>To use Lighter™, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your login information.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. Health &amp; Wellness Disclaimer</h2>
            <p className="text-amber-400/90">Lighter™ provides general wellness information and AI-generated guidance. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making changes to your health routines.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. Subscriptions &amp; Payments</h2>
            <p>Lighter™ offers Lighter Premium Monthly, an auto-renewable monthly subscription purchased through Apple In-App Purchase. Start your free trial, then pay $4.99/month. Payment is charged to your Apple ID at confirmation of purchase. The subscription renews automatically unless canceled at least 24 hours before the end of the current period, and you can manage or cancel it from your Apple ID subscription settings.</p>
            <p className="mt-3">Use of Lighter™ is also governed by Apple’s standard End User License Agreement: <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" className="text-amber-400 hover:text-amber-300 transition-colors">Apple Standard EULA</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. User Content</h2>
            <p>When you enter logs (energy, sleep, digestion, notes), you retain ownership of your content. By using the app, you grant us permission to store and process your data to operate the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/70">
              <li>Reverse-engineer or attempt to extract source code</li>
              <li>Use the app for harmful, illegal, or abusive behavior</li>
              <li>Upload inappropriate, harmful, or misleading content</li>
            </ul>
            <p className="mt-3">We may suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">7. Third-Party Services</h2>
            <p>Lighter™ uses OpenAI for AI responses, Vibecode/Expo for app infrastructure, Apple for in-app purchases, and RevenueCat to manage subscription status. We are not responsible for downtime or issues caused by third-party platforms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">8. Limitation of Liability</h2>
            <p>Lighter™ is provided “as is.” We are not liable for health decisions made based on app guidance, data loss, service interruptions, or any indirect, incidental, or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">9. Termination</h2>
            <p>We reserve the right to suspend or terminate your access if you violate these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">10. Changes to These Terms</h2>
            <p>We may update these Terms at any time. Continued use of the app means you accept the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">11. Contact Us</h2>
            <p>Questions? Email us at:</p>
            <p className="mt-3 text-amber-400">support@getlighterapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
