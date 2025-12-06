import { ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

interface FinalCTAProps {
  onStartTrial: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartTrial }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Animated orange gradient background that follows mouse */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(251, 146, 60, 0.15), transparent 50%)`,
        }}
      />
      
      {/* Secondary floating glow */}
      <div 
        className="absolute pointer-events-none transition-all duration-700 ease-out rounded-full blur-[120px]"
        style={{
          width: '500px',
          height: '500px',
          left: `calc(${mousePosition.x * 100}% - 250px)`,
          top: `calc(${mousePosition.y * 100}% - 250px)`,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(234, 88, 12, 0.1) 50%, transparent 70%)',
        }}
      />

      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-pulse" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
        <div className="absolute w-1.5 h-1.5 bg-orange-400/25 rounded-full animate-pulse" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }} />
        <div className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse" style={{ top: '75%', left: '25%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-amber-500/20 rounded-full animate-pulse" style={{ top: '30%', left: '70%', animationDelay: '1.5s' }} />
      </div>
      
      {/* Bottom ambient glow */}
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
