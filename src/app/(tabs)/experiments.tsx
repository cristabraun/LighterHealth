import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FlaskConical, Check, ChevronRight, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllExperiments, createExperiment } from '@/api/experiments';
import { SUBSCRIPTION_PRICE, useSubscription } from '@/lib/subscription';
import { theme } from '@/lib/theme';
import type { ExperimentTemplateId } from '@/api/types';

// Experiment templates with metadata
const EXPERIMENT_TEMPLATES: {
  id: ExperimentTemplateId;
  title: string;
  description: string;
  duration: number;
  category: string;
}[] = [
  {
    id: 'raw-carrot-salad',
    title: 'Raw Carrot Salad',
    description: 'Daily raw carrot salad to support estrogen metabolism',
    duration: 30,
    category: 'Digestion',
  },
  {
    id: 'oj-before-coffee',
    title: 'OJ Before Coffee',
    description: 'Orange juice 20 min before coffee to buffer cortisol',
    duration: 30,
    category: 'Energy',
  },
  {
    id: 'gelatin-before-bed',
    title: 'Gelatin Before Bed',
    description: 'Glycine-rich gelatin to support sleep quality',
    duration: 30,
    category: 'Sleep',
  },
  {
    id: 'coffee-with-sugar',
    title: 'Coffee With Sugar',
    description: 'Adding sugar to coffee to prevent stress response',
    duration: 30,
    category: 'Energy',
  },
  {
    id: 'afternoon-sunlight',
    title: 'Afternoon Sunlight',
    description: '15+ min of afternoon sun exposure daily',
    duration: 30,
    category: 'Mood',
  },
  {
    id: 'warm-bath-before-bed',
    title: 'Warm Bath Before Bed',
    description: 'Warm bath 1-2 hours before sleep',
    duration: 30,
    category: 'Sleep',
  },
  {
    id: 'honey-salt-nighttime',
    title: 'Honey & Salt Nighttime',
    description: 'Honey + salt mixture to prevent nighttime cortisol',
    duration: 30,
    category: 'Sleep',
  },
  {
    id: 'liver-weekly',
    title: 'Liver Weekly',
    description: 'Eating liver once a week for vitamin A & minerals',
    duration: 21,
    category: 'Nutrition',
  },
  {
    id: 'shellfish-weekly',
    title: 'Shellfish Weekly',
    description: 'Oysters or shrimp weekly for zinc & copper',
    duration: 21,
    category: 'Nutrition',
  },
  {
    id: 'no-raw-greens',
    title: 'No Raw Greens',
    description: 'Eliminating raw greens to test thyroid response',
    duration: 3,
    category: 'Digestion',
  },
  {
    id: 'dairy-support-test',
    title: 'Dairy Support Test',
    description: 'Testing milk & cheese as metabolic support',
    duration: 3,
    category: 'Nutrition',
  },
  {
    id: 'warm-vs-cold-foods',
    title: 'Warm vs Cold Foods',
    description: 'Compare warm vs cold foods impact on digestion',
    duration: 3,
    category: 'Digestion',
  },
];

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

export default function ExperimentsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const subscription = useSubscription();

  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof EXPERIMENT_TEMPLATES[0] | null>(null);

  const experimentsQuery = useQuery({
    queryKey: ['experiments'],
    queryFn: getAllExperiments,
  });

  const startExperimentMutation = useMutation({
    mutationFn: (templateId: ExperimentTemplateId) =>
      createExperiment({
        experimentId: templateId,
        startDate: new Date().toISOString().split('T')[0],
      }),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
      setShowStartModal(false);
      setSelectedTemplate(null);
    },
  });

  const experiments = experimentsQuery.data ?? [];
  const activeExperiments = experiments.filter((exp) => !exp.completed);
  const completedExperiments = experiments.filter((exp) => exp.completed);

  // Get active experiment IDs to filter out from available templates
  const activeExperimentIds = new Set(activeExperiments.map((exp) => exp.experimentId));
  const availableTemplates = EXPERIMENT_TEMPLATES.filter(
    (template) => !activeExperimentIds.has(template.id)
  );

  const openExperimentDetail = (experimentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/experiment/${experimentId}`);
  };

  const handleStartExperiment = (template: typeof EXPERIMENT_TEMPLATES[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedTemplate(template);
    setShowStartModal(true);
  };

  if (subscription.isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.background.primary }}>
        <ActivityIndicator size="large" color={theme.accent.primary} />
        <Text className="mt-3" style={{ color: theme.text.secondary }}>Checking subscription...</Text>
      </View>
    );
  }

  if (!subscription.isPremium) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
        <SafeAreaView edges={['top']} className="flex-1 items-center justify-center px-6">
          <View className="items-center">
            <View className="rounded-full p-6 mb-5" style={{ backgroundColor: theme.accent.muted }}>
              <FlaskConical size={42} color={theme.accent.primary} />
            </View>
            <Text className="text-2xl font-bold text-center mb-2" style={{ color: theme.text.primary }}>
              Experiments are included with Lighter Premium
            </Text>
            <Text className="text-center mb-6" style={{ color: theme.text.secondary }}>
              Start your free trial. Then {SUBSCRIPTION_PRICE}. Cancel anytime.
            </Text>
            <Pressable
              onPress={() => router.push('/paywall?feature=Experiments')}
              className="rounded-2xl px-6 py-4"
              style={{ backgroundColor: theme.accent.primary }}
            >
              <Text className="text-white font-bold">Start Free Trial</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <Text className="text-2xl font-bold" style={{ color: theme.text.primary }}>
            Experiments
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.text.secondary }}>
            Test metabolic interventions and track results
          </Text>
        </View>

        {experimentsQuery.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.accent.primary} />
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={experimentsQuery.isRefetching}
                onRefresh={() => experimentsQuery.refetch()}
                tintColor={theme.accent.primary}
              />
            }
          >
            {/* Active Experiments */}
            {activeExperiments.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(100).springify()}
                className="px-6 mb-6"
              >
                <Text
                  className="text-sm font-medium uppercase tracking-wider mb-3"
                  style={{ color: theme.text.secondary }}
                >
                  Active ({activeExperiments.length})
                </Text>
                {activeExperiments.map((exp) => {
                  const template = EXPERIMENT_TEMPLATES.find((t) => t.id === exp.experimentId);
                  const categoryColor = getCategoryColor(template?.category ?? '');
                  return (
                    <Pressable
                      key={exp.id}
                      onPress={() => openExperimentDetail(exp.experimentId)}
                      className="rounded-2xl p-4 mb-3"
                      style={{
                        backgroundColor: theme.background.card,
                        borderWidth: 1,
                        borderColor: theme.border.primary,
                      }}
                    >
                      <View className="flex-row items-start justify-between">
                        <View className="flex-row items-center flex-1">
                          <View
                            className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                            style={{ backgroundColor: `${categoryColor}20` }}
                          >
                            <FlaskConical size={24} color={categoryColor} />
                          </View>
                          <View className="flex-1">
                            <Text className="font-semibold" style={{ color: theme.text.primary }}>
                              {template?.title ?? exp.experimentId}
                            </Text>
                            <Text className="text-sm" style={{ color: theme.text.secondary }}>
                              Day {exp.currentDay} of {template?.duration ?? 30}
                            </Text>
                          </View>
                        </View>
                        <ChevronRight size={20} color={theme.text.disabled} />
                      </View>
                      {/* Progress bar */}
                      <View
                        className="mt-3 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: theme.background.elevated }}
                      >
                        <View
                          className="h-full rounded-full"
                          style={{
                            width: `${(exp.currentDay / (template?.duration ?? 30)) * 100}%`,
                            backgroundColor: categoryColor,
                          }}
                        />
                      </View>
                    </Pressable>
                  );
                })}
              </Animated.View>
            )}

            {/* Available Experiments */}
            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              className="px-6 mb-6"
            >
              <Text
                className="text-sm font-medium uppercase tracking-wider mb-3"
                style={{ color: theme.text.secondary }}
              >
                Available to Start
              </Text>
              {availableTemplates.map((template) => {
                const categoryColor = getCategoryColor(template.category);
                return (
                  <Pressable
                    key={template.id}
                    onPress={() => handleStartExperiment(template)}
                    className="rounded-2xl p-4 mb-3"
                    style={{
                      backgroundColor: theme.background.card,
                      borderWidth: 1,
                      borderColor: theme.border.primary,
                    }}
                  >
                    <View className="flex-row items-start">
                      <View
                        className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                        style={{ backgroundColor: `${categoryColor}20` }}
                      >
                        <FlaskConical size={24} color={categoryColor} />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="font-semibold mr-2" style={{ color: theme.text.primary }}>
                            {template.title}
                          </Text>
                          <View
                            className="px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${categoryColor}20` }}
                          >
                            <Text className="text-xs font-medium" style={{ color: categoryColor }}>
                              {template.category}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-sm mb-2" style={{ color: theme.text.secondary }}>
                          {template.description}
                        </Text>
                        <Text className="text-xs" style={{ color: theme.text.tertiary }}>
                          {template.duration} days
                        </Text>
                      </View>
                      <View
                        className="w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: theme.accent.muted }}
                      >
                        <Play size={16} color={theme.accent.primary} />
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </Animated.View>

            {/* Completed Experiments */}
            {completedExperiments.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(300).springify()}
                className="px-6"
              >
                <Text
                  className="text-sm font-medium uppercase tracking-wider mb-3"
                  style={{ color: theme.text.secondary }}
                >
                  Completed ({completedExperiments.length})
                </Text>
                {completedExperiments.map((exp) => {
                  const template = EXPERIMENT_TEMPLATES.find((t) => t.id === exp.experimentId);
                  return (
                    <Pressable
                      key={exp.id}
                      onPress={() => openExperimentDetail(exp.experimentId)}
                      className="rounded-2xl p-4 mb-3 opacity-70"
                      style={{
                        backgroundColor: theme.background.card,
                        borderWidth: 1,
                        borderColor: theme.border.primary,
                      }}
                    >
                      <View className="flex-row items-center">
                        <View
                          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                          style={{ backgroundColor: theme.status.successBg }}
                        >
                          <Check size={20} color={theme.status.success} />
                        </View>
                        <View className="flex-1">
                          <Text className="font-semibold" style={{ color: theme.text.primary }}>
                            {template?.title ?? exp.experimentId}
                          </Text>
                          <Text className="text-sm" style={{ color: theme.text.secondary }}>
                            Completed{' '}
                            {exp.completedAt
                              ? new Date(exp.completedAt).toLocaleDateString()
                              : ''}
                          </Text>
                        </View>
                        <ChevronRight size={20} color={theme.text.disabled} />
                      </View>
                    </Pressable>
                  );
                })}
              </Animated.View>
            )}
          </ScrollView>
        )}

        {/* Start Experiment Modal */}
        {showStartModal && selectedTemplate && (
          <Pressable
            className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onPress={() => setShowStartModal(false)}
          >
            <Pressable
              className="rounded-3xl p-6 mx-6 w-full max-w-sm"
              style={{ backgroundColor: theme.background.card }}
              onPress={(e) => e.stopPropagation()}
            >
              <View className="items-center mb-4">
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
                  style={{ backgroundColor: `${getCategoryColor(selectedTemplate.category)}20` }}
                >
                  <FlaskConical size={32} color={getCategoryColor(selectedTemplate.category)} />
                </View>
                <Text className="text-xl font-bold text-center" style={{ color: theme.text.primary }}>
                  Start {selectedTemplate.title}?
                </Text>
              </View>
              <Text className="text-center mb-2" style={{ color: theme.text.secondary }}>
                {selectedTemplate.description}
              </Text>
              <Text className="text-sm text-center mb-6" style={{ color: theme.text.tertiary }}>
                This experiment runs for {selectedTemplate.duration} days.
              </Text>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setShowStartModal(false)}
                  className="flex-1 rounded-xl py-3"
                  style={{ backgroundColor: theme.background.elevated }}
                >
                  <Text className="font-semibold text-center" style={{ color: theme.text.primary }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => startExperimentMutation.mutate(selectedTemplate.id)}
                  disabled={startExperimentMutation.isPending}
                  className="flex-1 rounded-xl py-3"
                  style={{ backgroundColor: theme.accent.primary }}
                >
                  {startExperimentMutation.isPending ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold text-center">Start</Text>
                  )}
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        )}
      </SafeAreaView>
    </View>
  );
}
