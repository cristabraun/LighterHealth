import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Flame, Check, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMutation } from '@tanstack/react-query';
import { completeOnboarding } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { ApiClientError } from '@/api/client';
import { theme, gradients } from '@/lib/theme';

const SYMPTOMS = [
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'cold_hands', label: 'Cold hands/feet' },
  { id: 'brain_fog', label: 'Brain fog' },
  { id: 'weight_gain', label: 'Weight gain' },
  { id: 'hair_loss', label: 'Hair loss' },
  { id: 'low_libido', label: 'Low libido' },
  { id: 'constipation', label: 'Constipation' },
  { id: 'dry_skin', label: 'Dry skin' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'depression', label: 'Depression' },
  { id: 'insomnia', label: 'Insomnia' },
  { id: 'pms', label: 'PMS symptoms' },
];

export default function OnboardingScreen() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.firstName || '');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onboardingMutation = useMutation({
    mutationFn: () => completeOnboarding({ name, symptoms: selectedSymptoms }),
    onSuccess: (updatedUser) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setUser(updatedUser);
      router.replace('/(tabs)');
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

  const toggleSymptom = (symptomId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      setError(null);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setStep(2);
    } else {
      onboardingMutation.mutate();
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="items-center pt-12 pb-6"
          >
            <View
              className="rounded-full p-4 mb-3"
              style={{ backgroundColor: theme.accent.muted }}
            >
              <Flame size={40} color={theme.accent.primary} strokeWidth={1.5} fill={theme.accent.primary} />
            </View>
            <Text className="text-sm" style={{ color: theme.text.secondary }}>
              Step {step} of 2
            </Text>
          </Animated.View>

          {step === 1 ? (
            <Animated.View
              entering={FadeInRight.springify()}
              key="step1"
              className="flex-1"
            >
              <Text className="text-2xl font-bold text-center mb-2" style={{ color: theme.text.primary }}>
                What should we call you?
              </Text>
              <Text className="text-base text-center mb-8" style={{ color: theme.text.secondary }}>
                This helps personalize your experience
              </Text>

              {error && (
                <View
                  className="rounded-xl p-4 mb-4"
                  style={{ backgroundColor: theme.status.errorBg }}
                >
                  <Text className="text-sm text-center" style={{ color: theme.status.error }}>
                    {error}
                  </Text>
                </View>
              )}

              <View
                className="rounded-xl border px-4"
                style={{
                  backgroundColor: theme.background.card,
                  borderColor: theme.border.primary,
                }}
              >
                <TextInput
                  className="py-4 text-lg text-center"
                  style={{ color: theme.text.primary }}
                  placeholder="Your name"
                  placeholderTextColor={theme.text.disabled}
                  value={name}
                  onChangeText={setName}
                  autoFocus
                />
              </View>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeInRight.springify()}
              key="step2"
              className="flex-1"
            >
              <Text className="text-2xl font-bold text-center mb-2" style={{ color: theme.text.primary }}>
                Any symptoms to track?
              </Text>
              <Text className="text-base text-center mb-6" style={{ color: theme.text.secondary }}>
                Select any that apply (optional)
              </Text>

              {error && (
                <View
                  className="rounded-xl p-4 mb-4"
                  style={{ backgroundColor: theme.status.errorBg }}
                >
                  <Text className="text-sm text-center" style={{ color: theme.status.error }}>
                    {error}
                  </Text>
                </View>
              )}

              <View className="flex-row flex-wrap gap-3 justify-center">
                {SYMPTOMS.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <Pressable
                      key={symptom.id}
                      onPress={() => toggleSymptom(symptom.id)}
                      className="flex-row items-center px-4 py-3 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? theme.accent.primary : theme.background.card,
                        borderColor: isSelected ? theme.accent.primary : theme.border.primary,
                      }}
                    >
                      {isSelected && (
                        <Check size={16} color="white" style={{ marginRight: 6 }} />
                      )}
                      <Text
                        className="text-sm font-medium"
                        style={{ color: isSelected ? 'white' : theme.text.secondary }}
                      >
                        {symptom.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>
          )}

          {/* Next Button */}
          <View className="py-8">
            <Pressable
              onPress={handleNextStep}
              disabled={onboardingMutation.isPending}
            >
              {({ pressed }) => (
                <LinearGradient
                  colors={
                    onboardingMutation.isPending
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
                    opacity: onboardingMutation.isPending ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    {onboardingMutation.isPending ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <>
                        <Text className="text-white text-base font-bold mr-2">
                          {step === 1 ? 'Continue' : 'Get Started'}
                        </Text>
                        <ChevronRight size={20} color="white" />
                      </>
                    )}
                  </View>
                </LinearGradient>
              )}
            </Pressable>

            {step === 2 && (
              <Pressable
                onPress={() => onboardingMutation.mutate()}
                disabled={onboardingMutation.isPending}
                className="mt-4"
              >
                <Text className="text-base text-center" style={{ color: theme.text.tertiary }}>
                  Skip for now
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
