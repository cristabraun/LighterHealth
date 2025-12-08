import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Spotlight } from './Spotlight';
import dashboardScreenshot from '@assets/Screenshot_2025-12-03_at_12.01.50_AM_1765005506223.png';
import trackingScreenshot from '@assets/Screenshot_2025-12-03_at_12.05.48_AM_1765005506229.png';

interface DashboardPreviewProps {
  onStartTrial: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onStartTrial }) => {
  const ref = useScrollReveal();

  return (
    <section id="dashboard" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-light tracking-tighter text-white">
            See Inside
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter">
              The App
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            Lighter helps you see what's really been happening beneath the surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start justify-center max-w-4xl mx-auto">
          
          <Spotlight 
            className="group relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            <div className="w-full relative p-3">
              <img 
                src={dashboardScreenshot}
                alt="Lighter Dashboard" 
                className="w-full h-auto rounded-xl opacity-90 transition-transform duration-700 group-hover:scale-[1.02]" 
                style={{ filter: 'brightness(0.95)' }}
              />
            </div>
          </Spotlight>

          <Spotlight 
            className="group relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            <div className="w-full relative p-3">
              <img 
                src={trackingScreenshot}
                alt="Lighter Daily Tracking" 
                className="w-full h-auto rounded-xl opacity-90 transition-transform duration-700 group-hover:scale-[1.02]" 
                style={{ filter: 'brightness(0.95)' }}
              />
            </div>
          </Spotlight>

        </div>

        <div className="text-center mt-16">
          <button 
            onClick={onStartTrial}
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl"
            data-testid="button-dashboard-trial"
          >
             Join the Free 30-Day Beta
          </button>
        </div>
      </div>
    </section>
  );
};
