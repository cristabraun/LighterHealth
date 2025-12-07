import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl" />
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
          <Sparkles className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Lighter™
          </span>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </CardTitle>
            <CardDescription className="text-white/60">
              {mode === 'login'
                ? 'Sign in to continue your metabolic healing journey'
                : 'Start your 3-day free trial today'}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                </Button>
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
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium"
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? 'Creating account...' : 'Start free trial'}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              {mode === 'login' ? (
                <p className="text-white/60 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setMode('register'); setErrors({}); }}
                    className="text-orange-400 hover:text-orange-300 font-medium"
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
                    className="text-orange-400 hover:text-orange-300 font-medium"
                    data-testid="button-switch-to-login"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-orange-400/80 hover:text-orange-300">Terms</a>
          {' '}and{' '}
          <a href="/privacy" className="text-orange-400/80 hover:text-orange-300">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
