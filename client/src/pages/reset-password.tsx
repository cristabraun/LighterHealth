import { useState, FormEvent, useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft, Sparkles, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const token = urlParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: 'Invalid link',
        description: 'This password reset link is invalid or has expired.',
        variant: 'destructive',
      });
    }
  }, [token]);

  const resetMutation = useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) => {
      const res = await apiRequest('POST', '/api/auth/reset-password', data);
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    },
    onError: (error: Error) => {
      toast({
        title: 'Reset failed',
        description: error.message || 'Failed to reset password. The link may have expired.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords don\'t match',
        description: 'Please make sure your passwords match',
        variant: 'destructive',
      });
      return;
    }

    if (!token) {
      toast({
        title: 'Invalid link',
        description: 'This password reset link is invalid.',
        variant: 'destructive',
      });
      return;
    }

    resetMutation.mutate({ token, newPassword });
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
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
      </div>

      <div className="w-full max-w-md z-10">
        <button
          onClick={() => setLocation('/auth')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          data-testid="button-back-to-login"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sign in</span>
        </button>

        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Lighter™
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-xl bg-amber-500/5 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            {!token ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-light tracking-tight text-white mb-2">
                  Invalid reset link
                </h2>
                <p className="text-white/60 text-base mb-6">
                  This password reset link is invalid or has expired.
                </p>
                <button
                  onClick={() => setLocation('/auth/reset-request')}
                  className="text-amber-400 hover:text-amber-300"
                  data-testid="link-request-new-reset"
                >
                  Request a new reset link
                </button>
              </div>
            ) : success ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-light tracking-tight text-white mb-2">
                  Password reset successful
                </h2>
                <p className="text-white/60 text-base">
                  Your password has been updated. Redirecting you to your dashboard...
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-light tracking-tight text-white mb-2">
                    Create new password
                  </h2>
                  <p className="text-white/60 text-base">
                    Enter your new password below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white/80">New password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                        data-testid="input-new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white/80">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      data-testid="input-confirm-password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={resetMutation.isPending}
                    className="group relative w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-reset-password"
                  >
                    <span>{resetMutation.isPending ? 'Resetting...' : 'Reset password'}</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
