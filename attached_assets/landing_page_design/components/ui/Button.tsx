import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 ease-out active:scale-95";
  
  const variants = {
    primary: "bg-white text-black shadow-[0_10px_15px_-3px_rgba(255,255,255,0.2)] hover:opacity-90 hover:scale-[1.02]",
    secondary: "bg-white/5 text-white/90 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};