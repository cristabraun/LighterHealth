import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Activity, Beaker, BookOpen, MessageCircle, BarChart2, ShieldCheck } from 'lucide-react';
import { Spotlight } from './Spotlight';

const DetailItem: React.FC<{ icon: React.ReactNode; title: string; desc: string; testId: string }> = ({ icon, title, desc, testId }) => (
  <Spotlight className="group relative flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300" data-testid={testId}>
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white shadow-inner ring-1 ring-white/10 group-hover:bg-amber-500/20 group-hover:text-amber-200 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-medium text-white mb-2 group-hover:text-white transition-colors">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{desc}</p>
    </div>
  </Spotlight>
);

export const DetailedFeatures: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="scroll-animate">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter mb-4 text-white">
              What you get with 
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent ml-2">Lighter™</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Comprehensive tools designed for your metabolic journey, available daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailItem 
              icon={<Activity size={24} />}
              title="Daily vital tracking"
              desc="Understand your energy, stress, and metabolic patterns with simple daily check-ins."
              testId="card-detail-tracking"
            />
            <DetailItem 
              icon={<Beaker size={24} />}
              title="Personalized experiments"
              desc="Find what works for your body with guided, gentle metabolic experiments."
              testId="card-detail-experiments"
            />
            <DetailItem 
              icon={<ShieldCheck size={24} />}
              title="Science-backed protocols"
              desc="Follow simple, proven steps that support thyroid health, lower stress, and boost energy."
              testId="card-detail-protocols"
            />
            <DetailItem 
              icon={<MessageCircle size={24} />}
              title="Direct messaging"
              desc="Get personalized support when you need clarity or encouragement."
              testId="card-detail-messaging"
            />
            <DetailItem 
              icon={<BarChart2 size={24} />}
              title="Beautiful progress charts"
              desc="See your improvements over time so you stay motivated and confident."
              testId="card-detail-charts"
            />
            <DetailItem 
              icon={<BookOpen size={24} />}
              title="Educational library"
              desc="Learn the 'why' behind your symptoms, hunger, energy shifts, and mood changes."
              testId="card-detail-library"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
