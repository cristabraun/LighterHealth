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
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '@/api/auth';
import { ApiClientError } from '@/api/client';
import { theme, gradients } from '@/lib/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetMutation = useMutation({
    mutationFn: () => requestPasswordReset({ email: email.trim().toLowerCase() }),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setSuccess(true);
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    },
  });

  const handleReset = () => {
    setError(null);
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    resetMutation.mutate();
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  if (success) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
        <SafeAreaView edges={['top', 'bottom']} className="flex-1">
          <View className="px-4 pt-2">
            <Pressable
              onPress={goBack}
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.background.card }}
            >
              <ArrowLeft size={20} color={theme.text.primary} />
            </Pressable>
          </View>

          <View className="flex-1 items-center justify-center px-6">
            <Animated.View entering={FadeInDown.springify()} className="items-center">
              <View
                className="rounded-full p-5 mb-6"
                style={{ backgroundColor: theme.status.successBg }}
              >
                <CheckCircle size={56} color={theme.status.success} />
              </View>
              <Text className="text-2xl font-bold text-center mb-3" style={{ color: theme.text.primary }}>
                Check Your Email
              </Text>
              <Text className="text-base text-center leading-6" style={{ color: theme.text.secondary }}>
                If an account exists for {email}, we've sent a password reset link.
              </Text>
              <Pressable
                onPress={goBack}
                className="mt-8 rounded-xl px-6 py-3"
                style={{ backgroundColor: theme.background.card }}
              >
                <Text className="font-semibold" style={{ color: theme.text.primary }}>
                  Back to Sign In
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
            {/* Header */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="pt-12 pb-8"
            >
              <Text className="text-3xl font-bold" style={{ color: theme.text.primary }}>
                Forgot Password?
              </Text>
              <Text className="text-base mt-2 leading-6" style={{ color: theme.text.secondary }}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View entering={FadeInDown.delay(200).springify()} className="gap-4">
              {/* Error */}
              {error && (
                <View
                  className="rounded-xl p-4"
                  style={{ backgroundColor: theme.status.errorBg }}
                >
                  <Text className="text-sm text-center" style={{ color: theme.status.error }}>
                    {error}
                  </Text>
                </View>
              )}

              {/* Email */}
              <View>
                <Text className="text-sm font-medium mb-2 ml-1" style={{ color: theme.text.secondary }}>
                  Email
                </Text>
                <View
                  className="flex-row items-center rounded-xl border px-4"
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
                    editable={!resetMutation.isPending}
                  />
                </View>
              </View>

              {/* Reset Button */}
              <Pressable
                onPress={handleReset}
                disabled={resetMutation.isPending}
                className="mt-4"
              >
                {({ pressed }) => (
                  <LinearGradient
                    colors={
                      resetMutation.isPending
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
                      opacity: resetMutation.isPending ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View className="flex-row items-center justify-center">
                      {resetMutation.isPending ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className="text-white text-base font-bold">
                          Send Reset Link
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                )}
              </Pressable>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
