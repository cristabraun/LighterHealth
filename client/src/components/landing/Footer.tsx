import { Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl" data-testid="section-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
                <Activity size={18} />
              </div>
              <span className="text-xl font-semibold tracking-tight text-white" data-testid="text-footer-brand">Lighter™</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              Lighter shows you how to listen to your body, lower cortisol, and find what actually works to feel energized again.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#dashboard" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-dashboard">Dashboard</a></li>
              <li><a href="#features" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-features">Features</a></li>
              <li><a href="#learn" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-learn">Learn</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-pricing">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:support@getlighterapp.com" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-contact">Contact Us</a></li>
              <li><a href="/privacy" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy</a></li>
              <li><a href="/terms" className="text-white/60 hover:text-white transition-colors" data-testid="link-footer-terms">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">{new Date().getFullYear()} Lighter™. All rights reserved.</p>
          <div className="text-xs text-white/40 text-center md:text-right max-w-xs">
            Lighter provides wellness and lifestyle guidance and does not provide medical advice.
          </div>
        </div>
      </div>
    </footer>
  );
};
