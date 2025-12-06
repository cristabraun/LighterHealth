import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Quote } from 'lucide-react';
import cristaProfile from '@assets/crista-orange-bg.png';

export const Testimonials: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-light tracking-tighter text-white leading-tight">
            The Story Behind
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter leading-tight py-1">
              Lighter™
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl hover:from-white/15 hover:to-white/10 transition-all duration-500" data-testid="card-testimonial-story">
            <Quote className="absolute top-8 right-8 text-white/10 w-12 h-12" />
            
            <div className="relative z-10 mb-8">
              <p className="text-white/80 leading-relaxed mb-6">
                With over 15 years in the health and fitness world, coaching and studying real women's struggles up close, I learned that true transformation happens when you focus on rebuilding the body from the inside out - not chasing symptoms, but healing the root cause.
              </p>
              <blockquote className="text-white/90 text-lg leading-relaxed italic" data-testid="text-testimonial-quote">
                "I created Lighter because I saw too many people stuck in stress-driven habits and diet cycles that break the body down instead of healing it. This app is the calm, clear roadmap I wish existed when I needed it most."
              </blockquote>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
               <div className="h-16 w-16 rounded-full bg-white/10 ring-2 ring-amber-400/30 overflow-hidden flex-shrink-0">
                  <img 
                    src={cristaProfile} 
                    alt="Crista" 
                    className="h-full w-full object-cover"
                  />
               </div>
               <div>
                 <div className="text-white font-medium text-lg">Crista</div>
                 <div className="text-amber-400/80 text-sm">Creator of Lighter™</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
