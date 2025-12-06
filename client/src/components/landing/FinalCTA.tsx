import { ChevronRight } from 'lucide-react';

interface FinalCTAProps {
  onStartTrial: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartTrial }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
        <img 
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200" 
          alt="Background Texture" 
          className="w-full h-full object-cover"
          style={{ filter: 'hue-rotate(10deg) saturate(1.2) brightness(0.8) blur(2px)' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f11]/80 to-[#0f0f11] pointer-events-none" />
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-light tracking-tighter mb-8 text-white">
          Ready to Feel Lighter?
        </h2>
        <p className="text-xl text-white/70 mb-10">
          Join the community of women healing their metabolism today.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={onStartTrial}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-12 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20"
            data-testid="button-final-trial"
          >
            <span>Start Your 3-Day Trial</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-white/50">Cancel anytime. No pressure.</p>
        </div>
      </div>
    </section>
  );
};
