import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, Zap, Activity } from 'lucide-react';
import { Spotlight } from './Spotlight';

const FeatureCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  imgSrc: string;
  testId?: string;
}> = ({ icon, title, description, imgSrc, testId }) => (
  <Spotlight className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl hover:from-white/15 hover:to-white/10 transition-all duration-500" data-testid={testId}>
    <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6 z-20">
      <img 
        src={imgSrc} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'sepia(100%) hue-rotate(-15deg) saturate(1.5) contrast(1.1)' }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <div className="absolute top-3 right-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20 backdrop-blur-xl text-white">
          {icon}
        </div>
      </div>
    </div>
    <div className="relative z-20">
      <h3 className="text-xl font-semibold tracking-tight mb-3 text-white">{title}</h3>
      <p className="text-white/70 leading-relaxed mb-6">{description}</p>
    </div>
  </Spotlight>
);

export const Features: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section id="learn" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-light tracking-tighter text-white">
            Lighter
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter">
              Supports
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white/70 leading-relaxed">
            A comprehensive approach to feeling and looking your best by healing your metabolism and lowering stress.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 lg:p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-amber-500/5 blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            <FeatureCard 
              icon={<Heart size={18} />}
              title="Calm Your System"
              description="When your nervous system calms down, your metabolism finally shifts out of survival mode and starts working the way it's meant to."
              imgSrc="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b535e27a-5611-40e0-a6fd-24d3fdc4aa08_800w.jpg"
              testId="card-feature-calm"
            />
            <FeatureCard 
              icon={<Zap size={18} />}
              title="Restore Your Energy"
              description="Through simple experiments and daily tracking, you learn which foods, habits, and rhythms actually support your energy, digestion, and mood."
              imgSrc="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8eb0f134-ad73-4767-934c-a816876c5a4c_800w.jpg"
              testId="card-feature-energy"
            />
            <FeatureCard 
              icon={<Activity size={18} />}
              title="Renew Your Metabolism"
              description="When your body knows how to use energy efficiently again, weight loss becomes a side effect — not a struggle."
              imgSrc="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b3f1ce1e-0214-4406-9122-f084f36f4fc8_800w.jpg"
              testId="card-feature-metabolism"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
