import { useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';

interface NavigationProps {
  onLogin: () => void;
  onGetStarted: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLogin, onGetStarted }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Features', href: '#features' },
    { name: 'Learn', href: '#learn' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:py-6 pt-4 pb-4 items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" data-testid="link-home">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-black">
              <Activity size={20} />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Lighter™</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" 
                href={link.href}
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onLogin}
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-xl"
              data-testid="button-login"
            >
              Log In
            </button>
            <button 
              onClick={onGetStarted}
              className="group relative inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/20"
              data-testid="button-get-started"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 blur-lg group-hover:opacity-20 transition-opacity"></div>
            </button>
            <button 
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg text-white/80 hover:text-white py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button 
            onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
            className="w-full h-12 rounded-xl border border-white/10 bg-white/5 font-medium text-white"
            data-testid="button-mobile-login"
          >
            Log In
          </button>
          <button 
            onClick={() => { onGetStarted(); setIsMobileMenuOpen(false); }}
            className="w-full h-12 rounded-xl bg-white text-black font-semibold"
            data-testid="button-mobile-get-started"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};
