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
import { Flame, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMutation } from '@tanstack/react-query';
import { registerAndGetToken } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { ApiClientError } from '@/api/client';
import { theme, gradients } from '@/lib/theme';

export default function RegisterScreen() {
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: () =>
      registerAndGetToken({
        email: email.trim().toLowerCase(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }),
    onSuccess: (data) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setUser(data.user);
      setToken(data.token);
      // New users always go to onboarding
      router.replace('/onboarding');
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.log('[Register] Error:', err);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    },
  });

  const handleRegister = () => {
    setError(null);
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }
    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    registerMutation.mutate();
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Back Button */}
          <View className="px-4 pt-2">
            <Pressable
              onPress={goBack}
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.background.card }}
            >
              <ArrowLeft size={20} color={theme.text.primary} />
            </Pressable>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="items-center pt-8 pb-6"
            >
              <View
                className="rounded-full p-4 mb-3"
                style={{
                  backgroundColor: `${theme.accent.primary}15`,
                }}
              >
                <Flame
                  size={40}
                  color={theme.accent.primary}
                  strokeWidth={1.5}
                  fill={theme.accent.primary}
                />
              </View>
              <Text className="text-2xl font-bold" style={{ color: theme.text.primary }}>
                Create Account
              </Text>
              <Text className="text-base mt-1" style={{ color: theme.text.secondary }}>
                Start your metabolic health journey
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

              {/* Name Row */}
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text
                    className="text-sm font-medium mb-2 ml-1"
                    style={{ color: theme.text.secondary }}
                  >
                    First Name
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl border px-4"
                    style={{
                      backgroundColor: theme.background.card,
                      borderColor: theme.border.primary,
                    }}
                  >
                    <User size={20} color={theme.text.tertiary} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-base"
                      style={{ color: theme.text.primary }}
                      placeholder="Jane"
                      placeholderTextColor={theme.text.disabled}
                      autoCapitalize="words"
                      value={firstName}
                      onChangeText={setFirstName}
                      editable={!registerMutation.isPending}
                    />
                  </View>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-sm font-medium mb-2 ml-1"
                    style={{ color: theme.text.secondary }}
                  >
                    Last Name
                  </Text>
                  <View
                    className="flex-row items-center rounded-2xl border px-4"
                    style={{
                      backgroundColor: theme.background.card,
                      borderColor: theme.border.primary,
                    }}
                  >
                    <TextInput
                      className="flex-1 py-4 px-3 text-base"
                      style={{ color: theme.text.primary }}
                      placeholder="Doe"
                      placeholderTextColor={theme.text.disabled}
                      autoCapitalize="words"
                      value={lastName}
                      onChangeText={setLastName}
                      editable={!registerMutation.isPending}
                    />
                  </View>
                </View>
              </View>

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
                    editable={!registerMutation.isPending}
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
                    placeholder="At least 6 characters"
                    placeholderTextColor={theme.text.disabled}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    editable={!registerMutation.isPending}
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

              {/* Register Button */}
              <Pressable
                onPress={handleRegister}
                disabled={registerMutation.isPending}
                className="mt-4"
              >
                {({ pressed }) => (
                  <LinearGradient
                    colors={
                      registerMutation.isPending
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
                      opacity: registerMutation.isPending ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View className="flex-row items-center justify-center">
                      {registerMutation.isPending ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className="text-white text-base font-bold">
                          Create Account
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                )}
              </Pressable>

              {/* Terms */}
              <Text
                className="text-xs text-center mt-2 px-4"
                style={{ color: theme.text.tertiary }}
              >
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </Text>
            </Animated.View>

            {/* Login Link */}
            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              className="flex-1 justify-end pb-8"
            >
              <Pressable onPress={goBack} className="flex-row justify-center py-4">
                <Text className="text-base" style={{ color: theme.text.secondary }}>
                  Already have an account?{' '}
                </Text>
                <Text className="text-base font-semibold" style={{ color: theme.accent.primary }}>
                  Sign In
                </Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
