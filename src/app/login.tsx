import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Flame, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMutation } from '@tanstack/react-query';
import { loginWithToken } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { ApiClientError } from '@/api/client';
import { theme, gradients } from '@/lib/theme';

export default function LoginScreen() {
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: () => loginWithToken({ email: email.trim().toLowerCase(), password }),
    onSuccess: (data) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setUser(data.user);
      setToken(data.token);

      // Navigate based on onboarding status
      if (data.user.onboardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.log('[Login] Error:', err);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        if (err.message.includes('Network request failed')) {
          setError('Unable to connect. Please check your internet connection.');
        } else {
          setError(err.message || 'Something went wrong. Please try again.');
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    },
  });

  const handleLogin = () => {
    setError(null);
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    loginMutation.mutate();
  };

  const goToRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/register');
  };

  const goToForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/forgot-password');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="items-center pt-16 pb-8"
            >
              <View
                className="rounded-full p-5 mb-4"
                style={{
                  backgroundColor: `${theme.accent.primary}15`,
                  ...theme.shadow.accent,
                }}
              >
                <Flame
                  size={56}
                  color={theme.accent.primary}
                  strokeWidth={1.5}
                  fill={theme.accent.primary}
                />
              </View>
              <Text className="text-3xl font-bold" style={{ color: theme.text.primary }}>
                Lighter™
              </Text>
              <Text className="text-base mt-2" style={{ color: theme.text.secondary }}>
                Welcome back
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View entering={FadeInDown.delay(200).springify()} className="gap-4">
              {/* Error */}
              {error && (
                <View
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: theme.status.errorBg }}
                >
                  <Text className="text-sm text-center" style={{ color: '#EF4444' }}>
                    {error}
                  </Text>
                </View>
              )}

              {/* Email */}
              <View>
                <Text
                  className="text-sm font-medium mb-2 ml-1"
                  style={{ color: theme.text.secondary }}
                >
                  Email
                </Text>
                <View
                  className="flex-row items-center rounded-2xl border px-4"
                  style={{
                    backgroundColor: theme.background.card,
                    borderColor: theme.border.primary,
                  }}
                >
                  <Mail size={20} color={theme.text.tertiary} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-base"
                    style={{ color: theme.text.primary }}
                    placeholder="you@example.com"
                    placeholderTextColor={theme.text.disabled}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    editable={!loginMutation.isPending}
                  />
                </View>
              </View>

              {/* Password */}
              <View>
                <Text
                  className="text-sm font-medium mb-2 ml-1"
                  style={{ color: theme.text.secondary }}
                >
                  Password
                </Text>
                <View
                  className="flex-row items-center rounded-2xl border px-4"
                  style={{
                    backgroundColor: theme.background.card,
                    borderColor: theme.border.primary,
                  }}
                >
                  <Lock size={20} color={theme.text.tertiary} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-base"
                    style={{ color: theme.text.primary }}
                    placeholder="Your password"
                    placeholderTextColor={theme.text.disabled}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    editable={!loginMutation.isPending}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={8}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={theme.text.tertiary} />
                    ) : (
                      <Eye size={20} color={theme.text.tertiary} />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Forgot Password */}
              <Pressable onPress={goToForgotPassword} className="self-end">
                <Text className="text-sm font-medium" style={{ color: theme.accent.primary }}>
                  Forgot password?
                </Text>
              </Pressable>

              {/* Login Button */}
              <Pressable
                onPress={handleLogin}
                disabled={loginMutation.isPending}
                className="mt-4"
              >
                {({ pressed }) => (
                  <LinearGradient
                    colors={
                      loginMutation.isPending
                        ? gradients.disabled
                        : pressed
                        ? gradients.accentPressed
                        : gradients.accent
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: theme.radius.lg,
                      padding: 16,
                      opacity: loginMutation.isPending ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View className="flex-row items-center justify-center">
                      {loginMutation.isPending ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className="text-white text-base font-bold">
                          Sign In
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                )}
              </Pressable>
            </Animated.View>

            {/* Register Link */}
            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              className="flex-1 justify-end pb-8"
            >
              <Pressable onPress={goToRegister} className="flex-row justify-center py-4">
                <Text className="text-base" style={{ color: theme.text.secondary }}>
                  Don't have an account?{' '}
                </Text>
                <Text className="text-base font-semibold" style={{ color: theme.accent.primary }}>
                  Sign Up
                </Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
