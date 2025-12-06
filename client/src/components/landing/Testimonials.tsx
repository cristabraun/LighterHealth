import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Quote } from 'lucide-react';
import cristaProfile from '@assets/crista-profile-peach.png';

export const Testimonials: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-light tracking-tighter text-white">
            The Story Behind
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter">
              Lighter
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl hover:from-white/15 hover:to-white/10 transition-all duration-500">
            <div className="mb-6">
              <div className="flex gap-1 text-amber-400 mb-4">
                 {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-8 rounded-full bg-amber-500/50"></div>)}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Over 15 years in health and fitness</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                With over 15 years in the health and fitness world, coaching and studying real women's struggles up close, I learned that true transformation happens when you focus on rebuilding the body from the inside out - not chasing symptoms, but healing the root cause.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl hover:from-white/15 hover:to-white/10 transition-all duration-500 flex flex-col justify-between">
            <Quote className="absolute top-8 right-8 text-white/10 w-12 h-12" />
            <div className="relative z-10">
              <blockquote className="text-white/90 text-lg leading-relaxed italic mb-8">
                "I created Lighter because I saw too many people stuck in stress-driven habits and diet cycles that break the body down instead of healing it. This app is the calm, clear roadmap I wish existed when I needed it most."
              </blockquote>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
               <div className="h-14 w-14 rounded-full bg-white/10 ring-2 ring-white/10 overflow-hidden flex-shrink-0">
                  <img 
                    src={cristaProfile} 
                    alt="Crista" 
                    className="h-full w-full object-cover"
                  />
               </div>
               <div>
                 <div className="text-white font-medium text-lg">Crista</div>
                 <div className="text-amber-400/80 text-sm">Creator of Lighter</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
