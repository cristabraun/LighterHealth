import React from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Thermometer,
  Heart,
  Battery,
  Moon,
  Plus,
  ChevronRight,
  FlaskConical,
  Utensils,
  MessageSquare,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/stores/authStore';
import { getAllLogs } from '@/api/logs';
import { getAllExperiments } from '@/api/experiments';
import { theme } from '@/lib/theme';
import type { DailyLog } from '@/api/types';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export default function DashboardScreen() {
  const router = useRouter();
  const user = useUser();

  const logsQuery = useQuery({
    queryKey: ['logs'],
    queryFn: getAllLogs,
  });

  const experimentsQuery = useQuery({
    queryKey: ['experiments'],
    queryFn: getAllExperiments,
  });

  const todayLog = logsQuery.data?.find((log) => log.date === getTodayDate());
  const activeExperiments = experimentsQuery.data?.filter((exp) => !exp.completed) ?? [];
  const recentLogs = logsQuery.data?.slice(0, 5) ?? [];

  const isRefreshing = logsQuery.isRefetching || experimentsQuery.isRefetching;
  const isInitialLoading =
    (logsQuery.isLoading || experimentsQuery.isLoading) &&
    !logsQuery.data &&
    !experimentsQuery.data;

  const onRefresh = () => {
    logsQuery.refetch();
    experimentsQuery.refetch();
  };

  const openLogEntry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/log-entry');
  };

  const openLogs = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/logs');
  };

  const openExperiments = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/experiments');
  };

  const openFoodLogs = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/food-logs');
  };

  const openMessages = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/messages');
  };

  const StatCard = ({
    icon,
    label,
    value,
    unit,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number | null;
    unit?: string;
    color: string;
  }) => (
    <View
      className="flex-1 rounded-2xl p-4"
      style={{
        backgroundColor: theme.background.card,
        borderWidth: 1,
        borderColor: theme.border.primary,
      }}
    >
      <View className="flex-row items-center mb-2">
        <View
          className="w-8 h-8 rounded-lg items-center justify-center mr-2"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </View>
        <Text className="text-xs font-medium" style={{ color: theme.text.secondary }}>
          {label}
        </Text>
      </View>
      <Text className="text-xl font-bold" style={{ color: theme.text.primary }}>
        {value ?? '--'}
        {unit && (
          <Text className="text-sm font-normal" style={{ color: theme.text.tertiary }}>
            {' '}{unit}
          </Text>
        )}
      </Text>
    </View>
  );

  if (isInitialLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.background.primary }}>
        <ActivityIndicator size="large" color={theme.colors.primary} accessibilityLabel="Loading" />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          accessible={true}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={theme.accent.primary}
            />
          }
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="px-6 pt-4 pb-2"
          >
            <Text className="text-base" style={{ color: theme.text.secondary }}>
              Welcome back,
            </Text>
            <Text className="text-2xl font-bold" style={{ color: theme.text.primary }} accessibilityRole="header">
              {user?.name || user?.firstName || 'there'}
            </Text>
          </Animated.View>

          {/* Today's Log Quick Action */}
          <Animated.View
            entering={FadeInDown.delay(150).springify()}
            className="px-6 pt-4"
          >
            <Pressable onPress={openLogEntry} accessibilityRole="button" accessibilityLabel={todayLog ? "Update today's log" : "Log today's metrics"}>
              {({ pressed }) => (
                <View
                  className="rounded-2xl p-5 flex-row items-center justify-between"
                  style={{
                    backgroundColor: theme.accent.primary,
                    ...theme.shadow.accent,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                      <Plus size={24} color="white" strokeWidth={2.5} accessible={false} accessibilityRole="image" />
                    </View>
                    <View>
                      <Text className="text-white text-lg font-bold">
                        {todayLog ? "Update Today's Log" : "Log Today's Metrics"}
                      </Text>
                      <Text className="text-white/80 text-sm">
                        Temp, pulse, energy, sleep & more
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={24} color="white" accessible={false} accessibilityRole="image" />
                </View>
              )}
            </Pressable>
          </Animated.View>

          {/* Today's Stats */}
          {todayLog && (
            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              className="px-6 pt-6"
            >
              <Text className="text-lg font-semibold mb-3" style={{ color: theme.text.primary }} accessibilityRole="header">
                Today's Metrics
              </Text>
              <View className="flex-row gap-3 mb-3">
                <StatCard
                  icon={<Thermometer size={16} color={theme.category.temperature} accessible={false} accessibilityRole="image" />}
                  label="Temperature"
                  value={todayLog.temperature}
                  unit="°F"
                  color={theme.category.temperature}
                />
                <StatCard
                  icon={<Heart size={16} color={theme.category.pulse} accessible={false} accessibilityRole="image" />}
                  label="Pulse"
                  value={todayLog.pulse}
                  unit="bpm"
                  color={theme.category.pulse}
                />
              </View>
              <View className="flex-row gap-3">
                <StatCard
                  icon={<Battery size={16} color={theme.category.energy} accessible={false} accessibilityRole="image" />}
                  label="Energy"
                  value={todayLog.energy}
                  unit="/10"
                  color={theme.category.energy}
                />
                <StatCard
                  icon={<Moon size={16} color={theme.category.sleep} accessible={false} accessibilityRole="image" />}
                  label="Sleep"
                  value={todayLog.sleep}
                  unit="/10"
                  color={theme.category.sleep}
                />
              </View>
            </Animated.View>
          )}

          {/* Active Experiments */}
          {activeExperiments.length > 0 && (
            <Animated.View
              entering={FadeInDown.delay(250).springify()}
              className="px-6 pt-6"
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold" style={{ color: theme.text.primary }} accessibilityRole="header">
                  Active Experiments
                </Text>
                <Pressable onPress={openExperiments} accessibilityRole="button" accessibilityLabel="See all experiments">
                  <Text className="text-sm font-medium" style={{ color: theme.accent.primary }}>
                    See All
                  </Text>
                </Pressable>
              </View>
              {activeExperiments.slice(0, 2).map((exp) => (
                <Pressable
                  key={exp.id}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push(`/experiment/${exp.experimentId}`);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Open experiment ${exp.experimentId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`}
                  className="rounded-2xl p-4 mb-3 flex-row items-center"
                  style={{
                    backgroundColor: theme.background.card,
                    borderWidth: 1,
                    borderColor: theme.border.primary,
                  }}
                >
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: `${theme.category.sleep}20` }}
                  >
                    <FlaskConical size={20} color={theme.category.sleep} accessible={false} accessibilityRole="image" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold" style={{ color: theme.text.primary }}>
                      {exp.experimentId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Text>
                    <Text className="text-sm" style={{ color: theme.text.secondary }}>
                      Day {exp.currentDay}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={theme.text.disabled} accessible={false} accessibilityRole="image" />
                </Pressable>
              ))}
            </Animated.View>
          )}

          {/* Quick Links */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            className="px-6 pt-6"
          >
            <Text className="text-lg font-semibold mb-3" style={{ color: theme.text.primary }} accessibilityRole="header">
              Quick Access
            </Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={openFoodLogs}
                accessibilityRole="button"
                accessibilityLabel="Open food logs"
                className="flex-1 rounded-2xl p-4 items-center"
                style={{
                  backgroundColor: theme.background.card,
                  borderWidth: 1,
                  borderColor: theme.border.primary,
                }}
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                  style={{ backgroundColor: `${theme.status.warning}20` }}
                >
                  <Utensils size={20} color={theme.status.warning} accessible={false} accessibilityRole="image" />
                </View>
                <Text className="font-medium text-sm" style={{ color: theme.text.primary }}>
                  Food Logs
                </Text>
              </Pressable>
              <Pressable
                onPress={openMessages}
                accessibilityRole="button"
                accessibilityLabel="Open messages"
                className="flex-1 rounded-2xl p-4 items-center"
                style={{
                  backgroundColor: theme.background.card,
                  borderWidth: 1,
                  borderColor: theme.border.primary,
                }}
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                  style={{ backgroundColor: `${theme.status.info}20` }}
                >
                  <MessageSquare size={20} color={theme.status.info} accessible={false} accessibilityRole="image" />
                </View>
                <Text className="font-medium text-sm" style={{ color: theme.text.primary }}>
                  Messages
                </Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* Recent Logs */}
          {recentLogs.length > 0 && (
            <Animated.View
              entering={FadeInDown.delay(350).springify()}
              className="px-6 pt-6"
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold" style={{ color: theme.text.primary }} accessibilityRole="header">
                  Recent Logs
                </Text>
                <Pressable onPress={openLogs} accessibilityRole="button" accessibilityLabel="See all logs">
                  <Text className="text-sm font-medium" style={{ color: theme.accent.primary }}>
                    See All
                  </Text>
                </Pressable>
              </View>
              {recentLogs.map((log) => (
                <View
                  key={log.id}
                  className="rounded-xl p-3 mb-2 flex-row items-center justify-between"
                  style={{
                    backgroundColor: theme.background.card,
                    borderWidth: 1,
                    borderColor: theme.border.primary,
                  }}
                >
                  <Text className="font-medium" style={{ color: theme.text.secondary }}>
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <View className="flex-row items-center gap-4">
                    <Text className="text-sm" style={{ color: theme.text.tertiary }}>
                      {log.temperature}°F
                    </Text>
                    <Text className="text-sm" style={{ color: theme.text.tertiary }}>
                      {log.pulse} bpm
                    </Text>
                    <Text className="text-sm" style={{ color: theme.text.tertiary }}>
                      E: {log.energy}
                    </Text>
                  </View>
                </View>
              ))}
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
