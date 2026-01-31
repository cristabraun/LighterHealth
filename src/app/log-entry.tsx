import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  X,
  Thermometer,
  Heart,
  Battery,
  Moon,
  Brain,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  Hand,
  ThumbsDown,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { getLogByDate, createOrUpdateLog } from '@/api/logs';
import { theme, gradients } from '@/lib/theme';
import type { Digestion, Mood, CreateLogRequest } from '@/api/types';
import { ApiClientError } from '@/api/client';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export default function LogEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ date?: string }>();
  const queryClient = useQueryClient();

  const date = params.date || getTodayDate();

  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [energy, setEnergy] = useState<number | null>(null);
  const [sleep, setSleep] = useState<number | null>(null);
  const [stress, setStress] = useState<number | null>(null);
  const [digestion, setDigestion] = useState<Digestion | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [howYouFeelNotes, setHowYouFeelNotes] = useState('');
  const [moodNotes, setMoodNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch existing log for this date
  const existingLogQuery = useQuery({
    queryKey: ['log', date],
    queryFn: () => getLogByDate(date),
    retry: false,
  });

  // Populate form with existing data
  useEffect(() => {
    if (existingLogQuery.data) {
      const log = existingLogQuery.data;
      setTemperature(log.temperature.toString());
      setPulse(log.pulse.toString());
      setEnergy(log.energy);
      setSleep(log.sleep);
      setStress(log.stress);
      setDigestion(log.digestion);
      setMood(log.mood);
      setHowYouFeelNotes(log.howYouFeelNotes || '');
      setMoodNotes(log.moodNotes || '');
    }
  }, [existingLogQuery.data]);

  const saveMutation = useMutation({
    mutationFn: (data: CreateLogRequest) => createOrUpdateLog(data),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['log', date] });
      router.back();
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to save log. Please try again.');
      }
    },
  });

  const handleSave = () => {
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
    if (energy === null) {
      setError('Please rate your energy level');
      return;
    }
    if (sleep === null) {
      setError('Please rate your sleep quality');
      return;
    }
    if (digestion === null) {
      setError('Please select digestion status');
      return;
    }

    saveMutation.mutate({
      date,
      temperature: tempNum,
      pulse: pulseNum,
      energy,
      sleep,
      digestion,
      stress: stress ?? undefined,
      mood: mood ?? undefined,
      howYouFeelNotes: howYouFeelNotes.trim() || undefined,
      moodNotes: moodNotes.trim() || undefined,
    });
  };

  const close = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const SliderButtons = ({
    value,
    onChange,
    max = 10,
    color,
  }: {
    value: number | null;
    onChange: (v: number) => void;
    max?: number;
    color: string;
  }) => (
    <View className="flex-row flex-wrap gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
        <Pressable
          key={num}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onChange(num);
          }}
          className="w-9 h-9 rounded-lg items-center justify-center"
          style={{
            backgroundColor: value === num ? color : theme.background.elevated,
          }}
        >
          <Text
            className="font-semibold"
            style={{ color: value === num ? 'white' : theme.text.tertiary }}
          >
            {num}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const OptionButton = ({
    selected,
    onPress,
    icon,
    label,
    color,
  }: {
    selected: boolean;
    onPress: () => void;
    icon: React.ReactNode;
    label: string;
    color: string;
  }) => (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className="flex-1 items-center py-3 rounded-xl border"
      style={{
        backgroundColor: selected ? `${color}20` : theme.background.card,
        borderColor: selected ? color : theme.border.primary,
      }}
    >
      {icon}
      <Text
        className="text-xs mt-1 font-medium"
        style={{ color: selected ? color : theme.text.tertiary }}
      >
        {label}
      </Text>
    </Pressable>
  );

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View
            className="px-6 py-4 flex-row items-center justify-between"
            style={{ borderBottomWidth: 1, borderBottomColor: theme.border.primary }}
          >
            <View>
              <Text className="text-xl font-bold" style={{ color: theme.text.primary }}>
                Daily Log
              </Text>
              <Text className="text-sm" style={{ color: theme.text.secondary }}>
                {formattedDate}
              </Text>
            </View>
            <Pressable
              onPress={close}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.background.card }}
            >
              <X size={20} color={theme.text.primary} />
            </Pressable>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Error */}
            {error && (
              <Animated.View
                entering={FadeInDown.springify()}
                className="rounded-xl p-4 mt-4"
                style={{ backgroundColor: theme.status.errorBg }}
              >
                <Text className="text-sm text-center" style={{ color: theme.status.error }}>
                  {error}
                </Text>
              </Animated.View>
            )}

            {/* Temperature & Pulse */}
            <View className="flex-row gap-4 mt-6">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Thermometer size={16} color={theme.category.temperature} />
                  <Text className="text-sm font-medium ml-2" style={{ color: theme.text.secondary }}>
                    Temperature (°F)
                  </Text>
                </View>
                <View
                  className="rounded-xl border px-4"
                  style={{
                    backgroundColor: theme.background.card,
                    borderColor: theme.border.primary,
                  }}
                >
                  <TextInput
                    className="py-3 text-lg text-center"
                    style={{ color: theme.text.primary }}
                    placeholder="98.6"
                    placeholderTextColor={theme.text.disabled}
                    keyboardType="decimal-pad"
                    value={temperature}
                    onChangeText={setTemperature}
                  />
                </View>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Heart size={16} color={theme.category.pulse} />
                  <Text className="text-sm font-medium ml-2" style={{ color: theme.text.secondary }}>
                    Pulse (bpm)
                  </Text>
                </View>
                <View
                  className="rounded-xl border px-4"
                  style={{
                    backgroundColor: theme.background.card,
                    borderColor: theme.border.primary,
                  }}
                >
                  <TextInput
                    className="py-3 text-lg text-center"
                    style={{ color: theme.text.primary }}
                    placeholder="72"
                    placeholderTextColor={theme.text.disabled}
                    keyboardType="number-pad"
                    value={pulse}
                    onChangeText={setPulse}
                  />
                </View>
              </View>
            </View>

            {/* Energy */}
            <View className="mt-6">
              <View className="flex-row items-center mb-3">
                <Battery size={16} color={theme.category.energy} />
                <Text className="text-sm font-medium ml-2" style={{ color: theme.text.secondary }}>
                  Energy Level
                </Text>
              </View>
              <SliderButtons value={energy} onChange={setEnergy} color={theme.category.energy} />
            </View>

            {/* Sleep */}
            <View className="mt-6">
              <View className="flex-row items-center mb-3">
                <Moon size={16} color={theme.category.sleep} />
                <Text className="text-sm font-medium ml-2" style={{ color: theme.text.secondary }}>
                  Sleep Quality
                </Text>
              </View>
              <SliderButtons value={sleep} onChange={setSleep} color={theme.category.sleep} />
            </View>

            {/* Stress */}
            <View className="mt-6">
              <View className="flex-row items-center mb-3">
                <Brain size={16} color={theme.status.warning} />
                <Text className="text-sm font-medium ml-2" style={{ color: theme.text.secondary }}>
                  Stress Level (optional)
                </Text>
              </View>
              <SliderButtons value={stress} onChange={setStress} color={theme.status.warning} />
            </View>

            {/* Digestion */}
            <View className="mt-6">
              <Text className="text-sm font-medium mb-3" style={{ color: theme.text.secondary }}>
                Digestion
              </Text>
              <View className="flex-row gap-3">
                <OptionButton
                  selected={digestion === 'good'}
                  onPress={() => setDigestion('good')}
                  icon={<ThumbsUp size={20} color={digestion === 'good' ? theme.status.success : theme.text.disabled} />}
                  label="Good"
                  color={theme.status.success}
                />
                <OptionButton
                  selected={digestion === 'okay'}
                  onPress={() => setDigestion('okay')}
                  icon={<Hand size={20} color={digestion === 'okay' ? theme.status.warning : theme.text.disabled} />}
                  label="Okay"
                  color={theme.status.warning}
                />
                <OptionButton
                  selected={digestion === 'poor'}
                  onPress={() => setDigestion('poor')}
                  icon={<ThumbsDown size={20} color={digestion === 'poor' ? theme.status.error : theme.text.disabled} />}
                  label="Poor"
                  color={theme.status.error}
                />
              </View>
            </View>

            {/* Mood */}
            <View className="mt-6">
              <Text className="text-sm font-medium mb-3" style={{ color: theme.text.secondary }}>
                Mood (optional)
              </Text>
              <View className="flex-row gap-3">
                <OptionButton
                  selected={mood === 'good'}
                  onPress={() => setMood('good')}
                  icon={<Smile size={20} color={mood === 'good' ? theme.status.success : theme.text.disabled} />}
                  label="Good"
                  color={theme.status.success}
                />
                <OptionButton
                  selected={mood === 'okay'}
                  onPress={() => setMood('okay')}
                  icon={<Meh size={20} color={mood === 'okay' ? theme.status.warning : theme.text.disabled} />}
                  label="Okay"
                  color={theme.status.warning}
                />
                <OptionButton
                  selected={mood === 'bad'}
                  onPress={() => setMood('bad')}
                  icon={<Frown size={20} color={mood === 'bad' ? theme.status.error : theme.text.disabled} />}
                  label="Bad"
                  color={theme.status.error}
                />
              </View>
            </View>

            {/* Notes */}
            <View className="mt-6">
              <Text className="text-sm font-medium mb-2" style={{ color: theme.text.secondary }}>
                How are you feeling? (optional)
              </Text>
              <View
                className="rounded-xl border px-4"
                style={{
                  backgroundColor: theme.background.card,
                  borderColor: theme.border.primary,
                }}
              >
                <TextInput
                  className="py-3 text-base min-h-[80px]"
                  style={{ color: theme.text.primary }}
                  placeholder="Describe how you're feeling today..."
                  placeholderTextColor={theme.text.disabled}
                  multiline
                  textAlignVertical="top"
                  value={howYouFeelNotes}
                  onChangeText={setHowYouFeelNotes}
                />
              </View>
            </View>

            {/* Save Button */}
            <View className="mt-8">
              <Pressable onPress={handleSave} disabled={saveMutation.isPending}>
                {({ pressed }) => (
                  <LinearGradient
                    colors={
                      saveMutation.isPending
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
                      opacity: saveMutation.isPending ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    }}
                  >
                    <View className="flex-row items-center justify-center">
                      {saveMutation.isPending ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className="text-white text-base font-bold">
                          {existingLogQuery.data ? 'Update Log' : 'Save Log'}
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
