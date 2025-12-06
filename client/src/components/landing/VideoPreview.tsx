import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Spotlight } from './Spotlight';

export const VideoPreview: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-light tracking-tighter text-white">
            Take a Peek
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-light tracking-tighter">
              Inside the App
            </span>
          </h2>
        </div>

        <Spotlight 
          className="group relative w-full aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-[#0E0E12] shadow-2xl shadow-black/50 ring-1 ring-white/5"
          glowColor="rgba(245, 158, 11, 0.25)"
        >
          <video 
            className="w-full h-full object-cover rounded-[2rem]"
            controls
            playsInline
            poster="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200"
          >
            <source src="/attached_assets/Exploring_the_Lighter_App__Your_Guide_to_Stress_Healing_and_Me_1764905687606.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Spotlight>
      </div>
    </section>
  );
};
