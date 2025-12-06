import React, { useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Learn', href: '#learn' },
    { name: 'Track', href: '#track' },
    { name: 'Experiments', href: '#experiments' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in delay-0 backdrop-blur-xl bg-black/20 border-b border-white/10" style={{ animationPlayState: 'running' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:py-6 pt-4 pb-4 items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-black">
              <Activity size={20} />
            </div>
            <span className="text-xl font-display font-semibold tracking-tight">Lighter™</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" 
                href={link.href}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-xl">
              Log In
            </button>
            <button className="group relative inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/20">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 blur-lg group-hover:opacity-20 transition-opacity"></div>
            </button>
            <button 
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg text-white/80 hover:text-white py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button className="w-full h-12 rounded-xl border border-white/10 bg-white/5 font-medium">Log In</button>
          <button className="w-full h-12 rounded-xl bg-white text-black font-semibold">Get Started</button>
        </div>
      )}
    </header>
  );
};