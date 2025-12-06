import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { LightBeam } from './LightBeam';
import { Spotlight } from './Spotlight';

const Counter: React.FC<{ target: number; suffix?: string; label: string }> = ({ target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <div className="text-3xl sm:text-4xl text-white font-light tracking-tighter">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm sm:text-base text-white/60 mt-1">{label}</div>
    </div>
  );
};

interface HeroProps {
  onStartTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTrial }) => {
  const scrollToDashboard = () => {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative lg:pt-32 lg:pb-16 pt-28 pb-12 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[120vh] -z-10 opacity-60 pointer-events-none">
        <LightBeam />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 xl:gap-16">
          
          <div className="relative z-10 lg:col-span-6 xl:col-span-6">
            <div className="absolute -top-32 -left-32 w-[150%] h-[150%] bg-amber-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-[80px] opacity-60 animate-float mix-blend-screen -z-10"></div>

            <div className="relative z-10">
              <h1 className="animate-slide-up text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 font-light tracking-tighter text-white">
                Heal Your
                <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter">
                  Metabolism.
                </span>
              </h1>
              
              <p className="animate-slide-up max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70 mb-6" style={{ animationDelay: '200ms' }}>
                Exhausted all the time? Weight won't budge? Running on stress and caffeine? The Lighter app shows you how to listen to your body, lower cortisol, and find what actually works to feel like you again.
              </p>
              
              <div className="animate-slide-up flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ animationDelay: '400ms' }}>
                <button 
                  onClick={onStartTrial}
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20"
                  data-testid="button-hero-trial"
                >
                  <span>Start Your 3-Day Trial</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl group-hover:opacity-25 transition-opacity"></div>
                </button>
                <button 
                  onClick={scrollToDashboard}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl"
                  data-testid="button-hero-see-inside"
                >
                  <span>See Inside</span>
                </button>
              </div>
              
              <div className="animate-slide-up grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 max-w-2xl" style={{ animationDelay: '600ms' }}>
                <Counter target={5} suffix="" label="Daily Signals" />
                <Counter target={10} suffix="+" label="Healing Experiments" />
                <Counter target={365} suffix="" label="Days Tracking" />
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <Spotlight 
              className="animate-blur-in relative aspect-square w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/5 shadow-2xl shadow-black/40 group"
              glowColor="rgba(245, 158, 11, 0.4)"
            >
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2012f549-ddcb-4a4a-beb4-d602bbe116c2_1600w.jpg" 
                alt="Ethereal Landscape" 
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                style={{ filter: 'hue-rotate(135deg) saturate(1.5) brightness(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              
              <div 
                className="absolute inset-0 opacity-50 pointer-events-none mix-blend-screen animate-pulse"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2), transparent 70%)',
                }}
              />
            </Spotlight>
          </div>

        </div>
      </div>
    </section>
  );
};
