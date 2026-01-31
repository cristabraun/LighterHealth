import React from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Thermometer,
  Heart,
  Battery,
  Moon,
  Smile,
  Meh,
  Frown,
  Plus,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery } from '@tanstack/react-query';
import { getAllLogs } from '@/api/logs';
import { theme } from '@/lib/theme';
import type { DailyLog, Mood, Digestion } from '@/api/types';

const getMoodIcon = (mood: Mood | null) => {
  switch (mood) {
    case 'good':
      return <Smile size={16} color={theme.status.success} />;
    case 'okay':
      return <Meh size={16} color={theme.status.warning} />;
    case 'bad':
      return <Frown size={16} color={theme.status.error} />;
    default:
      return null;
  }
};

const getDigestionColor = (digestion: Digestion) => {
  switch (digestion) {
    case 'good':
      return theme.status.success;
    case 'okay':
      return theme.status.warning;
    case 'poor':
      return theme.status.error;
  }
};

export default function LogsScreen() {
  const router = useRouter();

  const logsQuery = useQuery({
    queryKey: ['logs'],
    queryFn: getAllLogs,
  });

  const logs = logsQuery.data ?? [];

  const openLogEntry = (date?: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (date) {
      router.push(`/log-entry?date=${date}`);
    } else {
      router.push('/log-entry');
    }
  };

  // Group logs by month
  const groupedLogs = logs.reduce<Record<string, DailyLog[]>>((acc, log) => {
    const date = new Date(log.date);
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(log);
    return acc;
  }, {});

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold" style={{ color: theme.text.primary }}>
            Daily Logs
          </Text>
          <Pressable
            onPress={() => openLogEntry()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: theme.accent.primary,
              ...theme.shadow.accent,
            }}
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
          </Pressable>
        </View>

        {logsQuery.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.accent.primary} />
          </View>
        ) : logs.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Animated.View entering={FadeInDown.springify()} className="items-center">
              <View
                className="rounded-full p-6 mb-4"
                style={{ backgroundColor: theme.background.card }}
              >
                <Thermometer size={40} color={theme.text.disabled} />
              </View>
              <Text className="text-xl font-semibold mb-2" style={{ color: theme.text.primary }}>
                No logs yet
              </Text>
              <Text className="text-center mb-6" style={{ color: theme.text.secondary }}>
                Start tracking your temperature, pulse, energy, and more to see patterns over time.
              </Text>
              <Pressable
                onPress={() => openLogEntry()}
                className="rounded-xl px-6 py-3"
                style={{ backgroundColor: theme.accent.primary }}
              >
                <Text className="text-white font-semibold">Create Your First Log</Text>
              </Pressable>
            </Animated.View>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={logsQuery.isRefetching}
                onRefresh={() => logsQuery.refetch()}
                tintColor={theme.accent.primary}
              />
            }
          >
            {Object.entries(groupedLogs).map(([month, monthLogs], monthIndex) => (
              <Animated.View
                key={month}
                entering={FadeInDown.delay(monthIndex * 50).springify()}
                className="px-6 mb-6"
              >
                <Text
                  className="text-sm font-medium uppercase tracking-wider mb-3"
                  style={{ color: theme.text.secondary }}
                >
                  {month}
                </Text>
                {monthLogs.map((log) => (
                  <Pressable
                    key={log.id}
                    onPress={() => openLogEntry(log.date)}
                    className="rounded-2xl p-4 mb-3"
                    style={{
                      backgroundColor: theme.background.card,
                      borderWidth: 1,
                      borderColor: theme.border.primary,
                    }}
                  >
                    {/* Date & Mood */}
                    <View className="flex-row items-center justify-between mb-3">
                      <Text className="font-semibold" style={{ color: theme.text.primary }}>
                        {new Date(log.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        {getMoodIcon(log.mood)}
                        <View
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getDigestionColor(log.digestion) }}
                        />
                      </View>
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row gap-4">
                      <View className="flex-row items-center">
                        <Thermometer size={14} color={theme.category.temperature} />
                        <Text className="text-sm ml-1" style={{ color: theme.text.secondary }}>
                          {log.temperature}°F
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Heart size={14} color={theme.category.pulse} />
                        <Text className="text-sm ml-1" style={{ color: theme.text.secondary }}>
                          {log.pulse}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Battery size={14} color={theme.category.energy} />
                        <Text className="text-sm ml-1" style={{ color: theme.text.secondary }}>
                          {log.energy}/10
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Moon size={14} color={theme.category.sleep} />
                        <Text className="text-sm ml-1" style={{ color: theme.text.secondary }}>
                          {log.sleep}/10
                        </Text>
                      </View>
                    </View>

                    {/* Notes preview */}
                    {(log.howYouFeelNotes || log.moodNotes) && (
                      <Text
                        className="text-sm mt-2"
                        style={{ color: theme.text.tertiary }}
                        numberOfLines={1}
                      >
                        {log.howYouFeelNotes || log.moodNotes}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
