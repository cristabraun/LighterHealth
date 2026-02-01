import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  ArrowLeft,
  FlaskConical,
  Plus,
  Check,
  Calendar,
  Thermometer,
  Heart,
  X,
  Sparkles,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/lib/useColorScheme';
import { theme } from '@/lib/theme';
import {
  getExperimentByTemplate,
  addExperimentLog,
  completeExperiment,
} from '@/api/experiments';
import { getExperimentInsight } from '@/api/ai';
import type { ExperimentTemplateId, ExperimentLogEntry } from '@/api/types';
import { ApiClientError } from '@/api/client';

// Same templates as experiments screen
const EXPERIMENT_TEMPLATES: Record<
  string,
  { title: string; description: string; duration: number; category: string; instructions: string }
> = {
  'raw-carrot-salad': {
    title: 'Raw Carrot Salad',
    description: 'Daily raw carrot salad to support estrogen metabolism',
    duration: 30,
    category: 'Digestion',
    instructions:
      'Eat a raw carrot salad daily (1 medium carrot, shredded, with coconut oil and apple cider vinegar). Eat between meals, not with other food. Track your temperature and pulse before and 1 hour after.',
  },
  'oj-before-coffee': {
    title: 'OJ Before Coffee',
    description: 'Orange juice 20 min before coffee to buffer cortisol',
    duration: 30,
    category: 'Energy',
    instructions:
      'Drink 4-8 oz of fresh orange juice 15-20 minutes before your morning coffee. This helps provide glucose to buffer the cortisol response from caffeine.',
  },
  'gelatin-before-bed': {
    title: 'Gelatin Before Bed',
    description: 'Glycine-rich gelatin to support sleep quality',
    duration: 30,
    category: 'Sleep',
    instructions:
      'Take 1-2 tablespoons of gelatin (or glycine supplement) mixed in warm water or herbal tea 30-60 minutes before bed.',
  },
  'coffee-with-sugar': {
    title: 'Coffee With Sugar',
    description: 'Adding sugar to coffee to prevent stress response',
    duration: 30,
    category: 'Energy',
    instructions:
      'Add 1-2 teaspoons of sugar (or honey) to your coffee. This provides quick glucose to prevent the stress hormone spike from caffeine on an empty stomach.',
  },
  'afternoon-sunlight': {
    title: 'Afternoon Sunlight',
    description: '15+ min of afternoon sun exposure daily',
    duration: 30,
    category: 'Mood',
    instructions:
      'Get at least 15 minutes of direct sunlight exposure in the afternoon (ideally 2-5 PM). No sunglasses. Can be walking, sitting outside, etc.',
  },
  'warm-bath-before-bed': {
    title: 'Warm Bath Before Bed',
    description: 'Warm bath 1-2 hours before sleep',
    duration: 30,
    category: 'Sleep',
    instructions:
      'Take a warm (not hot) bath 1-2 hours before bed for 15-20 minutes. Track sleep quality, temperature, and pulse the next morning.',
  },
  'honey-salt-nighttime': {
    title: 'Honey & Salt Nighttime',
    description: 'Honey + salt mixture to prevent nighttime cortisol',
    duration: 30,
    category: 'Sleep',
    instructions:
      'Mix 1 teaspoon of honey with a small pinch of salt before bed. If you wake at night, repeat the mixture. Track night wakings and morning energy.',
  },
  'liver-weekly': {
    title: 'Liver Weekly',
    description: 'Eating liver once a week for vitamin A & minerals',
    duration: 21,
    category: 'Nutrition',
    instructions:
      'Eat 3-4 oz of cooked liver once per week. Note digestion, energy, and temperature changes the following day.',
  },
  'shellfish-weekly': {
    title: 'Shellfish Weekly',
    description: 'Oysters or shrimp weekly for zinc & copper',
    duration: 21,
    category: 'Nutrition',
    instructions:
      'Have a shellfish serving once per week (e.g., 6 oysters or 4-6 oz shrimp). Track energy, temperature, and any digestion changes.',
  },
  'no-raw-greens': {
    title: 'No Raw Greens',
    description: 'Eliminating raw greens to test thyroid response',
    duration: 3,
    category: 'Digestion',
    instructions:
      'Avoid raw leafy greens for 3 days. If you eat greens, cook them thoroughly. Track digestion, temperature, and pulse.',
  },
  'dairy-support-test': {
    title: 'Dairy Support Test',
    description: 'Testing milk & cheese as metabolic support',
    duration: 3,
    category: 'Nutrition',
    instructions:
      'Include milk and/or cheese with meals for 3 days. Note digestion, energy, and sleep changes.',
  },
  'warm-vs-cold-foods': {
    title: 'Warm vs Cold Foods',
    description: 'Compare warm vs cold foods impact on digestion',
    duration: 3,
    category: 'Digestion',
    instructions:
      'Days 1-2: prioritize warm, cooked foods and drinks. Day 3: include at least one cold meal or drink and compare digestion.',
  },
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Digestion':
      return theme.category.digestion;
    case 'Energy':
      return theme.status.warning;
    case 'Sleep':
      return theme.category.sleep;
    case 'Mood':
      return theme.category.mood;
    case 'Nutrition':
      return theme.status.info;
    default:
      return theme.text.tertiary;
  }
};

export default function ExperimentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const queryClient = useQueryClient();

  const [showLogModal, setShowLogModal] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [insight, setInsight] = useState<string | null>(null);

  const templateId = id as ExperimentTemplateId;
  const template = EXPERIMENT_TEMPLATES[templateId] ?? {
    title: templateId?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? 'Experiment',
    description: '',
    duration: 30,
    category: 'Other',
    instructions: '',
  };

  const experimentQuery = useQuery({
    queryKey: ['experiment', templateId],
    queryFn: () => getExperimentByTemplate(templateId),
    enabled: !!templateId,
  });

  const addLogMutation = useMutation({
    mutationFn: (data: { temp: number; pulse: number; notes?: string }) =>
      addExperimentLog(templateId, {
        date: new Date().toISOString(),
        temp: data.temp,
        pulse: data.pulse,
        notes: data.notes,
      }),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['experiment', templateId] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
      resetForm();
      setShowLogModal(false);
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to add log. Please try again.');
      }
    },
  });

  const completeMutation = useMutation({
    mutationFn: () => completeExperiment(templateId),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['experiment', templateId] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  const insightMutation = useMutation({
    mutationFn: (logs: ExperimentLogEntry[]) =>
      getExperimentInsight({
        experimentId: templateId,
        experimentTitle: template.title,
        logs,
        date: new Date().toISOString(),
      }),
    onSuccess: (data) => {
      setInsight(data.insight);
    },
  });

  const resetForm = () => {
    setTemperature('');
    setPulse('');
    setNotes('');
    setError(null);
  };

  const handleAddLog = () => {
    setError(null);
    const tempNum = parseFloat(temperature);
    const pulseNum = parseInt(pulse, 10);

    if (isNaN(tempNum) || tempNum < 94 || tempNum > 102) {
      setError('Temperature must be between 94-102°F');
      return;
    }
    if (isNaN(pulseNum) || pulseNum < 40 || pulseNum > 150) {
      setError('Pulse must be between 40-150 bpm');
      return;
    }

    addLogMutation.mutate({
      temp: tempNum,
      pulse: pulseNum,
      notes: notes.trim() || undefined,
    });
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const experiment = experimentQuery.data;
  const logs: ExperimentLogEntry[] = experiment?.logs ? JSON.parse(experiment.logs) : [];
  const progress = experiment ? (experiment.currentDay / template.duration) * 100 : 0;
  const categoryColor = getCategoryColor(template.category);

  const handleGetInsight = () => {
    if (logs.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      insightMutation.mutate(logs);
    }
  };

  if (experimentQuery.isLoading) {
    return (
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-950 items-center justify-center">
        <ActivityIndicator size="large" color={theme.colors.primary} accessibilityLabel="Loading" />
      </View>
    );
  }

  if (!experiment) {
    return (
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
        <SafeAreaView edges={['top']} className="flex-1 items-center justify-center px-6">
          <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-2">
            Experiment not found
          </Text>
          <Pressable onPress={goBack} className="mt-4" accessibilityRole="button" accessibilityLabel="Go back">
            <Text className="text-orange-500 font-semibold">Go Back</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-2 pb-4 flex-row items-center">
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 mr-3"
          >
            <ArrowLeft size={20} color={isDark ? '#f5f5f5' : '#171717'} accessible={false} accessibilityRole="image" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold" accessibilityRole="header">
              {template.title}
            </Text>
            <View className="flex-row items-center mt-1">
              <View
                className="px-2 py-0.5 rounded-full mr-2"
                style={{ backgroundColor: `${categoryColor}20` }}
              >
                <Text className="text-xs font-medium" style={{ color: categoryColor }}>
                  {template.category}
                </Text>
              </View>
              {experiment.completed ? (
                <View className="flex-row items-center">
                  <Check size={14} color="#22c55e" accessible={false} accessibilityRole="image" />
                  <Text className="text-green-600 dark:text-green-400 text-xs ml-1">
                    Completed
                  </Text>
                </View>
              ) : (
                <Text className="text-neutral-500 dark:text-neutral-400 text-xs">
                  Day {experiment.currentDay} of {template.duration}
                </Text>
              )}
            </View>
          </View>
        </View>

        <ScrollView
          accessible={true}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress */}
          <Animated.View entering={FadeInDown.delay(100).springify()} className="px-6 mb-6">
            <View className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-neutral-700 dark:text-neutral-300 font-medium" accessibilityRole="header">
                  Progress
                </Text>
                <Text className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {Math.round(progress)}%
                </Text>
              </View>
              <View className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: categoryColor }}
                />
              </View>
            </View>
          </Animated.View>

          {/* Instructions */}
          {template.instructions && (
            <Animated.View entering={FadeInDown.delay(150).springify()} className="px-6 mb-6">
              <Text className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2" accessibilityRole="header">
                Instructions
              </Text>
              <View className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800">
                <Text className="text-neutral-700 dark:text-neutral-300 leading-6">
                  {template.instructions}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Log Entry Button */}
          {!experiment.completed && (
            <Animated.View entering={FadeInDown.delay(200).springify()} className="px-6 mb-6">
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setShowLogModal(true);
                }}
                accessibilityRole="button"
                accessibilityLabel="Log today's entry"
              >
                {({ pressed }) => (
                  <LinearGradient
                    colors={
                      pressed
                        ? [theme.colors.primary, theme.colors.primary]
                        : [theme.colors.primary, theme.colors.primary]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 16,
                      padding: 16,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View className="flex-row items-center justify-center">
                      <Plus size={20} color="white" strokeWidth={2.5} accessible={false} accessibilityRole="image" />
                      <Text className="text-white text-base font-bold ml-2">
                        Log Today's Entry
                      </Text>
                    </View>
                  </LinearGradient>
                )}
              </Pressable>
            </Animated.View>
          )}

          {/* AI Insight */}
          {logs.length > 0 && (
            <Animated.View entering={FadeInDown.delay(250).springify()} className="px-6 mb-6">
              <Text className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2" accessibilityRole="header">
                AI Insight
              </Text>
              {insight ? (
                <View className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
                  <View className="flex-row items-center mb-2">
                    <Sparkles size={16} color="#a855f7" accessible={false} accessibilityRole="image" />
                    <Text className="text-purple-600 dark:text-purple-400 font-medium ml-2">
                      Analysis
                    </Text>
                  </View>
                  <Text className="text-neutral-700 dark:text-neutral-300 leading-6">
                    {insight}
                  </Text>
                </View>
              ) : (
                <Pressable
                  onPress={handleGetInsight}
                  disabled={insightMutation.isPending}
                  accessibilityRole="button"
                  accessibilityLabel="Get AI analysis"
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 flex-row items-center justify-center"
                >
                  {insightMutation.isPending ? (
                    <ActivityIndicator size="small" color="#a855f7" accessibilityLabel="Loading" />
                  ) : (
                    <>
                      <Sparkles size={18} color="#a855f7" accessible={false} accessibilityRole="image" />
                      <Text className="text-purple-600 dark:text-purple-400 font-medium ml-2">
                        Get AI Analysis
                      </Text>
                    </>
                  )}
                </Pressable>
              )}
            </Animated.View>
          )}

          {/* Logs */}
          <Animated.View entering={FadeInDown.delay(300).springify()} className="px-6">
            <Text className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2" accessibilityRole="header">
              Log Entries ({logs.length})
            </Text>
            {logs.length === 0 ? (
              <View className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 items-center">
                <Calendar size={32} color={isDark ? '#525252' : '#a3a3a3'} accessible={false} accessibilityRole="image" />
                <Text className="text-neutral-500 dark:text-neutral-400 mt-2 text-center">
                  No entries yet. Add your first log!
                </Text>
              </View>
            ) : (
              logs
                .slice()
                .reverse()
                .map((log, index) => (
                  <View
                    key={index}
                    className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 mb-2"
                  >
                    <Text className="text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </Text>
                    <View className="flex-row gap-4">
                      <View className="flex-row items-center">
                        <Thermometer size={14} color="#ef4444" accessible={false} accessibilityRole="image" />
                        <Text className="text-neutral-700 dark:text-neutral-300 text-sm ml-1">
                          {log.temp}°F
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Heart size={14} color="#ec4899" accessible={false} accessibilityRole="image" />
                        <Text className="text-neutral-700 dark:text-neutral-300 text-sm ml-1">
                          {log.pulse} bpm
                        </Text>
                      </View>
                    </View>
                    {log.notes && (
                      <Text className="text-neutral-500 dark:text-neutral-400 text-sm mt-2">
                        {log.notes}
                      </Text>
                    )}
                  </View>
                ))
            )}
          </Animated.View>

          {/* Complete Button */}
          {!experiment.completed && experiment.currentDay >= template.duration && (
            <Animated.View entering={FadeInDown.delay(350).springify()} className="px-6 mt-6">
              <Pressable
                onPress={() => completeMutation.mutate()}
                disabled={completeMutation.isPending}
                accessibilityRole="button"
                accessibilityLabel="Mark experiment as complete"
                className="bg-green-500 rounded-xl py-4"
              >
                {completeMutation.isPending ? (
                  <ActivityIndicator color="white" accessibilityLabel="Loading" />
                ) : (
                  <View className="flex-row items-center justify-center">
                    <Check size={20} color="white" accessible={false} accessibilityRole="image" />
                    <Text className="text-white font-bold ml-2">Mark as Complete</Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          )}
        </ScrollView>

        {/* Add Log Modal */}
        {showLogModal && (
          <Pressable
            className="absolute inset-0 bg-black/50 justify-end"
            onPress={() => {
              setShowLogModal(false);
              resetForm();
            }}
            accessibilityRole="button"
            accessibilityLabel="Close log entry"
          >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Pressable
                className="bg-white dark:bg-neutral-900 rounded-t-3xl"
                onPress={(e) => e.stopPropagation()}
              >
                <SafeAreaView edges={['bottom']}>
                  <View className="p-6">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                      <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold" accessibilityRole="header">
                        Log Entry
                      </Text>
                      <Pressable
                        onPress={() => {
                          setShowLogModal(false);
                          resetForm();
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Close log entry"
                        className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full items-center justify-center"
                      >
                        <X size={18} color={isDark ? '#f5f5f5' : '#171717'} accessible={false} accessibilityRole="image" />
                      </Pressable>
                    </View>

                    {/* Error */}
                    {error && (
                      <View className="bg-red-100 dark:bg-red-900/30 rounded-xl p-3 mb-4">
                        <Text className="text-red-600 dark:text-red-400 text-sm text-center">
                          {error}
                        </Text>
                      </View>
                    )}

                    {/* Temp & Pulse */}
                    <View className="flex-row gap-4 mb-4">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                          <Thermometer size={14} color="#ef4444" accessible={false} accessibilityRole="image" />
                          <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium ml-2">
                            Temp (°F)
                          </Text>
                        </View>
                        <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4">
                          <TextInput
                            className="py-3 text-neutral-900 dark:text-neutral-100 text-center text-lg"
                            placeholder="98.6"
                            placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                            keyboardType="decimal-pad"
                            value={temperature}
                            onChangeText={setTemperature}
                          />
                        </View>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                          <Heart size={14} color="#ec4899" accessible={false} accessibilityRole="image" />
                          <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium ml-2">
                            Pulse (bpm)
                          </Text>
                        </View>
                        <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4">
                          <TextInput
                            className="py-3 text-neutral-900 dark:text-neutral-100 text-center text-lg"
                            placeholder="72"
                            placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                            keyboardType="number-pad"
                            value={pulse}
                            onChangeText={setPulse}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Notes */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Notes (optional)
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-6">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base"
                        placeholder="How do you feel?"
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        value={notes}
                        onChangeText={setNotes}
                      />
                    </View>

                    {/* Submit */}
                    <Pressable onPress={handleAddLog} disabled={addLogMutation.isPending} accessibilityRole="button" accessibilityLabel="Save entry">
                      {({ pressed }) => (
                        <LinearGradient
                          colors={
                            addLogMutation.isPending
                              ? ['#9ca3af', '#6b7280']
                              : pressed
                              ? [theme.colors.primary, theme.colors.primary]
                              : [theme.colors.primary, theme.colors.primary]
                          }
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            borderRadius: 12,
                            padding: 16,
                            opacity: addLogMutation.isPending ? 0.7 : 1,
                          }}
                        >
                          {addLogMutation.isPending ? (
                            <ActivityIndicator color="white" accessibilityLabel="Loading" />
                          ) : (
                            <Text className="text-white text-base font-bold text-center">
                              Save Entry
                            </Text>
                          )}
                        </LinearGradient>
                      )}
                    </Pressable>
                  </View>
                </SafeAreaView>
              </Pressable>
            </KeyboardAvoidingView>
          </Pressable>
        )}
      </SafeAreaView>
    </View>
  );
}
