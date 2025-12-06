import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Spotlight } from './Spotlight';
import dashboardScreenshot from '@assets/generated_images/lighter_app_tracking_dashboard_screenshot.png';

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start justify-center">
          
          <Spotlight 
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            <div className="aspect-[9/19] w-full relative">
              <img 
                src={dashboardScreenshot}
                alt="Lighter Dashboard" 
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                style={{ filter: 'brightness(0.95)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>
          </Spotlight>

          <Spotlight 
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            <div className="aspect-[9/19] w-full relative bg-gradient-to-br from-amber-900/20 to-orange-900/20">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                  <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Daily Tracking</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  Track your temperature, pulse, energy levels, sleep quality, and mood every day to uncover your metabolic patterns.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>
          </Spotlight>

        </div>

        <div className="text-center mt-16">
          <button 
            onClick={onStartTrial}
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl"
            data-testid="button-dashboard-trial"
          >
             Start Your 3-Day Trial
          </button>
        </div>
      </div>
    </section>
  );
};
