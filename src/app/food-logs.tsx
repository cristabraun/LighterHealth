import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Plus, Utensils, Trash2, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/lib/useColorScheme';
import { theme } from '@/lib/theme';
import { getAllFoodLogs, createFoodLog, deleteFoodLog } from '@/api/foodLogs';
import type { FoodLog, MealType, CreateFoodLogRequest } from '@/api/types';
import { ApiClientError } from '@/api/client';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

const MEAL_TYPES: { value: MealType; label: string; color: string }[] = [
  { value: 'breakfast', label: 'Breakfast', color: theme.colors.primary },
  { value: 'lunch', label: 'Lunch', color: '#22c55e' },
  { value: 'dinner', label: 'Dinner', color: '#3b82f6' },
  { value: 'snack', label: 'Snack', color: '#8b5cf6' },
];

export default function FoodLogsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const foodLogsQuery = useQuery({
    queryKey: ['food-logs'],
    queryFn: () => getAllFoodLogs(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateFoodLogRequest) => createFoodLog(data),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['food-logs'] });
      resetForm();
      setShowAddModal(false);
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to add food log. Please try again.');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFoodLog(id),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['food-logs'] });
    },
  });

  const resetForm = () => {
    setSelectedMeal('breakfast');
    setFoodItem('');
    setCalories('');
    setNotes('');
    setError(null);
  };

  const handleAdd = () => {
    setError(null);
    if (!foodItem.trim()) {
      setError('Please enter a food item');
      return;
    }

    const caloriesNum = calories ? parseInt(calories, 10) : undefined;
    if (calories && (isNaN(caloriesNum!) || caloriesNum! < 0)) {
      setError('Calories must be a positive number');
      return;
    }

    createMutation.mutate({
      date: getTodayDate(),
      meal: selectedMeal,
      foodItem: foodItem.trim(),
      energyIntake: caloriesNum,
      notes: notes.trim() || undefined,
    });
  };

  const handleDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteMutation.mutate(id);
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const foodLogs = foodLogsQuery.data ?? [];
  const isInitialLoading = foodLogsQuery.isLoading && foodLogs.length === 0;
  const skeletonColor =
    (theme.text as { quaternary?: string }).quaternary ?? theme.text.tertiary;

  // Group by date
  const groupedLogs = foodLogs.reduce<Record<string, FoodLog[]>>((acc, log) => {
    if (!acc[log.date]) {
      acc[log.date] = [];
    }
    acc[log.date].push(log);
    return acc;
  }, {});

  const getMealInfo = (meal: MealType) => MEAL_TYPES.find((m) => m.value === meal)!;

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-2 pb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 mr-3"
            >
              <ArrowLeft size={20} color={isDark ? '#f5f5f5' : '#171717'} accessible={false} accessibilityRole="image" />
            </Pressable>
            <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold" accessibilityRole="header">
              Food Logs
            </Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowAddModal(true);
            }}
            accessibilityRole="button"
            accessibilityLabel="Add food log"
            className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center"
          >
            <Plus size={20} color="white" strokeWidth={2.5} accessible={false} accessibilityRole="image" />
          </Pressable>
        </View>

        {isInitialLoading ? (
          <View className="flex-1 px-6">
            {[0, 1, 2, 3].map((item) => (
              <View
                key={item}
                className="rounded-2xl mb-3"
                style={{ height: 88, backgroundColor: skeletonColor }}
              />
            ))}
          </View>
        ) : foodLogsQuery.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.colors.primary} accessibilityLabel="Loading" />
          </View>
        ) : foodLogs.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Animated.View entering={FadeInDown.springify()} className="items-center">
              <View className="bg-neutral-200 dark:bg-neutral-800 rounded-full p-6 mb-4">
                <Utensils size={40} color={isDark ? '#525252' : '#a3a3a3'} accessible={false} accessibilityRole="image" />
              </View>
              <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-2">
                No food logs yet
              </Text>
              <Text className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
                Track what you eat to see patterns in how food affects your energy and metabolism.
              </Text>
              <Pressable
                onPress={() => setShowAddModal(true)}
                accessibilityRole="button"
                accessibilityLabel="Add food log"
                className="bg-orange-500 rounded-xl px-6 py-3"
              >
                <Text className="text-white font-semibold">Log Your First Meal</Text>
              </Pressable>
            </Animated.View>
          </View>
        ) : (
        <ScrollView
          accessible={true}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                  refreshing={foodLogsQuery.isRefetching}
                  onRefresh={() => foodLogsQuery.refetch()}
                  tintColor={theme.colors.primary}
                />
              }
            >
            {Object.entries(groupedLogs)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([date, logs], dateIndex) => (
                <Animated.View
                  key={date}
                  entering={FadeInDown.delay(dateIndex * 50).springify()}
                  className="px-6 mb-6"
                >
                  <Text className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-3">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  {logs.map((log) => {
                    const mealInfo = getMealInfo(log.meal);
                    return (
                      <View
                        key={log.id}
                        className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 mb-2 flex-row items-start"
                      >
                        <View
                          className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                          style={{ backgroundColor: `${mealInfo.color}20` }}
                        >
                          <Utensils size={18} color={mealInfo.color} accessible={false} accessibilityRole="image" />
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center mb-1">
                            <Text
                              className="text-xs font-medium mr-2"
                              style={{ color: mealInfo.color }}
                            >
                              {mealInfo.label}
                            </Text>
                            {log.energyIntake && (
                              <Text className="text-neutral-400 dark:text-neutral-500 text-xs">
                                {log.energyIntake} cal
                              </Text>
                            )}
                          </View>
                          <Text className="text-neutral-900 dark:text-neutral-100 font-medium">
                            {log.foodItem}
                          </Text>
                          {log.notes && (
                            <Text className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                              {log.notes}
                            </Text>
                          )}
                        </View>
                        <Pressable
                          onPress={() => handleDelete(log.id)}
                          accessibilityRole="button"
                          accessibilityLabel="Delete log"
                          className="p-2"
                          hitSlop={8}
                        >
                          <Trash2 size={18} color="#ef4444" accessible={false} accessibilityRole="image" />
                        </Pressable>
                      </View>
                    );
                  })}
                </Animated.View>
              ))}
          </ScrollView>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <Pressable
            className="absolute inset-0 bg-black/50 justify-end"
            onPress={() => {
              setShowAddModal(false);
              resetForm();
            }}
            accessibilityRole="button"
            accessibilityLabel="Close add food log"
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Pressable
                className="bg-white dark:bg-neutral-900 rounded-t-3xl"
                onPress={(e) => e.stopPropagation()}
              >
                <SafeAreaView edges={['bottom']}>
                  <View className="p-6">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                      <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold" accessibilityRole="header">
                        Add Food Log
                      </Text>
                      <Pressable
                        onPress={() => {
                          setShowAddModal(false);
                          resetForm();
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Close add food log"
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

                    {/* Meal Type */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Meal
                    </Text>
                    <View className="flex-row gap-2 mb-4">
                      {MEAL_TYPES.map((meal) => (
                        <Pressable
                          key={meal.value}
                          onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setSelectedMeal(meal.value);
                          }}
                          accessibilityRole="button"
                          accessibilityLabel={meal.label}
                          className={`flex-1 py-2 rounded-lg items-center border ${
                            selectedMeal === meal.value
                              ? 'border-transparent'
                              : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                          style={
                            selectedMeal === meal.value
                              ? { backgroundColor: `${meal.color}20` }
                              : undefined
                          }
                        >
                          <Text
                            className={`text-xs font-medium ${
                              selectedMeal === meal.value
                                ? ''
                                : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                            style={selectedMeal === meal.value ? { color: meal.color } : undefined}
                          >
                            {meal.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>

                    {/* Food Item */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Food Item
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-4">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base"
                        placeholder="e.g., Eggs with toast and OJ"
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        value={foodItem}
                        onChangeText={setFoodItem}
                      />
                    </View>

                    {/* Calories */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Calories (optional)
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-4">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base"
                        placeholder="e.g., 450"
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        keyboardType="number-pad"
                        value={calories}
                        onChangeText={setCalories}
                      />
                    </View>

                    {/* Notes */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Notes (optional)
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-6">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base"
                        placeholder="How did you feel after?"
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        value={notes}
                        onChangeText={setNotes}
                      />
                    </View>

                    {/* Submit */}
                    <Pressable onPress={handleAdd} disabled={createMutation.isPending} accessibilityRole="button" accessibilityLabel="Add food log">
                      {({ pressed }) => (
                        <LinearGradient
                          colors={
                            createMutation.isPending
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
                            opacity: createMutation.isPending ? 0.7 : 1,
                          }}
                        >
                          {createMutation.isPending ? (
                            <ActivityIndicator color="white" accessibilityLabel="Loading" />
                          ) : (
                            <Text className="text-white text-base font-bold text-center">
                              Add Food Log
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
