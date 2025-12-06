export const LightBeam: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-end">
      <div className="relative w-full h-full max-w-lg flex justify-center items-end">
        <div className="w-2 h-full bg-gradient-to-t from-amber-200 via-orange-500 to-transparent opacity-0 animate-beam-core blur-sm" />
        <div className="absolute bottom-0 w-32 h-[80%] bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent blur-3xl opacity-0 animate-beam-glow" />
        <div className="absolute bottom-0 w-64 h-[60%] bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent blur-3xl opacity-0 animate-beam-wide" />
        
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-particle-1 opacity-0" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-particle-2 opacity-0" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full animate-particle-3 opacity-0" />
        </div>
      </div>
      
      <style>{`
        @keyframes beam-core {
          0%, 100% { opacity: 0.3; height: 0%; }
          50% { opacity: 0.8; height: 100%; }
        }
        @keyframes beam-glow {
          0%, 100% { opacity: 0.1; height: 20%; }
          50% { opacity: 0.5; height: 90%; }
        }
        @keyframes beam-wide {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          50% { opacity: 0.3; transform: scaleX(1.5); }
        }
        @keyframes particle-1 {
          0% { transform: translate(-50%, 0) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-20px, -60vh) scale(1); opacity: 0; }
        }
        @keyframes particle-2 {
          0% { transform: translate(-50%, 0) scale(0); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translate(20px, -50vh) scale(0.5); opacity: 0; }
        }
        @keyframes particle-3 {
          0% { transform: translate(-50%, 0) scale(0); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: translate(0px, -70vh) scale(1.5); opacity: 0; }
        }
        
        .animate-beam-core { animation: beam-core 4s ease-in-out infinite; }
        .animate-beam-glow { animation: beam-glow 4s ease-in-out infinite; }
        .animate-beam-wide { animation: beam-wide 4s ease-in-out infinite; }
        .animate-particle-1 { animation: particle-1 3s ease-out infinite 0.5s; }
        .animate-particle-2 { animation: particle-2 3.5s ease-out infinite 1s; }
        .animate-particle-3 { animation: particle-3 4s ease-out infinite 1.5s; }
      `}</style>
    </div>
  );
};
