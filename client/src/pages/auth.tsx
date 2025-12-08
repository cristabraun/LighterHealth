import { useState, FormEvent, useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft, Sparkles, Eye, EyeOff, ChevronRight } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const initialMode = urlParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const modeParam = urlParams.get('mode');
    if (modeParam === 'register' && mode !== 'register') {
      setMode('register');
    }
  }, [searchString]);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await apiRequest('POST', '/api/auth/login', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setLocation('/');
    },
    onError: (error: Error) => {
      toast({
        title: 'Login failed',
        description: error.message.includes('401') ? 'Invalid email or password' : error.message,
        variant: 'destructive',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { email: string; password: string; firstName?: string; lastName?: string }) => {
      const res = await apiRequest('POST', '/api/auth/register', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setLocation('/');
    },
    onError: (error: Error) => {
      toast({
        title: 'Registration failed',
        description: error.message.includes('409') ? 'Email already registered' : error.message,
        variant: 'destructive',
      });
    },
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginEmail || !validateEmail(loginEmail)) {
      newErrors.loginEmail = 'Please enter a valid email';
    }
    if (!loginPassword || loginPassword.length < 6) {
      newErrors.loginPassword = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      loginMutation.mutate({ email: loginEmail, password: loginPassword });
    }
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!registerEmail || !validateEmail(registerEmail)) {
      newErrors.registerEmail = 'Please enter a valid email';
    }
    if (!registerPassword || registerPassword.length < 6) {
      newErrors.registerPassword = 'Password must be at least 6 characters';
    }
    if (registerPassword !== registerConfirmPassword) {
      newErrors.registerConfirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      registerMutation.mutate({
        email: registerEmail,
        password: registerPassword,
        firstName: registerFirstName || undefined,
        lastName: registerLastName || undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects matching landing page */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(
                circle 1400px at 50% -10%,
                rgba(180, 83, 9, 0.15),
                transparent 60%
              ),
              radial-gradient(
                circle 800px at 50% 50%,
                rgba(245, 158, 11, 0.05),
                transparent 40%
              ),
              linear-gradient(to bottom, rgba(15, 15, 17, 1), #0f0f11)
            `,
            backgroundColor: '#0f0f11'
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[500px] bg-amber-100/10 blur-[120px] z-0" />
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-orange-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-amber-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="w-full max-w-md z-10">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>

        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Lighter™
          </span>
        </div>

        {/* Frosted glass card matching landing page */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-xl bg-amber-500/5 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-2xl font-light tracking-tight text-white mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create your free beta account'}
              </h2>
              <p className="text-white/60 text-base">
                {mode === 'login'
                  ? 'Sign in to continue your metabolic healing journey'
                  : 'Get free access for 30 days - no credit card required'}
              </p>
            </div>
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-white/80">Email</Label>
                  <Input
                    id="login-email"
                    type="text"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-testid="input-email"
                  />
                  {errors.loginEmail && <p className="text-red-400 text-sm">{errors.loginEmail}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-white/80">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.loginPassword && <p className="text-red-400 text-sm">{errors.loginPassword}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="group relative w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-login"
                >
                  <span>{loginMutation.isPending ? 'Signing in...' : 'Sign in'}</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl group-hover:opacity-25 transition-opacity" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-first-name" className="text-white/80">First name</Label>
                    <Input
                      id="register-first-name"
                      placeholder="Jane"
                      value={registerFirstName}
                      onChange={(e) => setRegisterFirstName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-last-name" className="text-white/80">Last name</Label>
                    <Input
                      id="register-last-name"
                      placeholder="Doe"
                      value={registerLastName}
                      onChange={(e) => setRegisterLastName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white/80">Email</Label>
                  <Input
                    id="register-email"
                    type="text"
                    placeholder="you@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-testid="input-register-email"
                  />
                  {errors.registerEmail && <p className="text-red-400 text-sm">{errors.registerEmail}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white/80">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                      data-testid="input-register-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      data-testid="button-toggle-register-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.registerPassword && <p className="text-red-400 text-sm">{errors.registerPassword}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-white/80">Confirm password</Label>
                  <Input
                    id="register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-testid="input-confirm-password"
                  />
                  {errors.registerConfirmPassword && <p className="text-red-400 text-sm">{errors.registerConfirmPassword}</p>}
                </div>
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="group relative w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-register"
                >
                  <span>{registerMutation.isPending ? 'Creating account...' : 'Join the Free Beta'}</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl group-hover:opacity-25 transition-opacity" />
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              {mode === 'login' ? (
                <p className="text-white/60 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setMode('register'); setErrors({}); }}
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    data-testid="button-switch-to-register"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-white/60 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setErrors({}); }}
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    data-testid="button-switch-to-login"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-amber-400/80 hover:text-amber-300 transition-colors">Terms</a>
          {' '}and{' '}
          <a href="/privacy" className="text-amber-400/80 hover:text-amber-300 transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
