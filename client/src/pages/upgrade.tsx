import { useLocation } from 'wouter';
import { Sparkles, ChevronRight, Clock, Heart, TrendingUp, MessageCircle } from 'lucide-react';

export default function Upgrade() {
  const [, setLocation] = useLocation();

  const handleUpgrade = () => {
    // Stripe checkout will be enabled here after beta ends
    // For now, this is a placeholder
    alert('Subscriptions will be available soon! Thank you for being a beta user.');
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(
                circle 1400px at 50% -10%,
                rgba(180, 83, 9, 0.15),
                transparent 60%
              ),
              radial-gradient(
                circle 800px at 50% 50%,
                rgba(245, 158, 11, 0.05),
                transparent 40%
              ),
              linear-gradient(to bottom, rgba(15, 15, 17, 1), #0f0f11)
            `,
            backgroundColor: '#0f0f11'
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[500px] bg-amber-100/10 blur-[120px] z-0" />
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-orange-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-amber-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="w-full max-w-lg z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Lighter™
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-xl bg-amber-500/5 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
            
            <h2 className="text-2xl font-light tracking-tight text-white mb-3" data-testid="text-upgrade-title">
              Your Beta Period Has Ended
            </h2>
            <p className="text-white/60 text-base mb-8">
              Thank you for being an early supporter! Continue your metabolic healing journey with full access.
            </p>

            <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-medium text-white mb-4">Continue with Lighter™</h3>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl text-white font-light tracking-tighter">$19</span>
                <span className="text-sm text-neutral-400">/month</span>
              </div>
              
              <ul className="space-y-3 text-sm text-neutral-200">
                <li className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-amber-400" />
                  Daily vital tracking
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Personalized experiments
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  Direct messaging support
                </li>
              </ul>
            </div>

            <button
              onClick={handleUpgrade}
              className="group relative w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-8 py-4 text-base font-semibold text-black hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-2xl shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-upgrade"
            >
              <span>Upgrade Now</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-white/40 text-xs mt-4">
              Subscriptions coming soon. Thank you for your patience!
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setLocation('/')}
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
            data-testid="button-back-to-home"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
