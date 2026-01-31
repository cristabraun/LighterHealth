import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { cn } from '@/lib/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradientColors: readonly [string, string, ...string[]];
  onPress?: () => void;
  className?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  gradientColors,
  onPress,
  className
}: MetricCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={animatedStyle}
      className={cn("flex-1 min-h-[140px]", className)}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 24,
          padding: 16,
          shadowColor: gradientColors[0],
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white/80 text-sm font-medium">{title}</Text>
          <View className="opacity-80">{icon}</View>
        </View>

        <View className="flex-1 justify-end">
          <View className="flex-row items-baseline">
            <Text className="text-white text-3xl font-bold">{value}</Text>
            {unit && <Text className="text-white/70 text-lg ml-1">{unit}</Text>}
          </View>
          {subtitle && (
            <Text className="text-white/60 text-xs mt-1">{subtitle}</Text>
          )}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

interface ActionButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function ActionButton({
  onPress,
  title,
  icon,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false
}: ActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(scale.value, [0.95, 1], [0.8, 1]),
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }
  };

  const sizeStyles = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const variantStyles = {
    primary: 'bg-amber-600',
    secondary: 'bg-stone-200 dark:bg-stone-800',
    ghost: 'bg-transparent',
  };

  const textVariantStyles = {
    primary: 'text-white',
    secondary: 'text-stone-900 dark:text-stone-100',
    ghost: 'text-amber-600 dark:text-amber-500',
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={animatedStyle}
      disabled={disabled}
      className={cn(
        "rounded-2xl flex-row items-center justify-center",
        sizeStyles[size],
        variantStyles[variant],
        disabled && "opacity-50",
        className
      )}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={cn(
        "font-semibold text-base",
        textVariantStyles[variant]
      )}>{title}</Text>
    </AnimatedPressable>
  );
}

interface InputCardProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  unit?: string;
  icon?: React.ReactNode;
}

export function InputCard({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  unit,
  icon
}: InputCardProps) {
  return (
    <View className="bg-stone-100 dark:bg-stone-900 rounded-2xl p-4">
      <View className="flex-row items-center mb-2">
        {icon && <View className="mr-2 opacity-60">{icon}</View>}
        <Text className="text-stone-500 dark:text-stone-400 text-sm font-medium">{label}</Text>
      </View>
      <View className="flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a8a29e"
          keyboardType={keyboardType}
          className="flex-1 text-stone-900 dark:text-stone-100 text-2xl font-semibold"
        />
        {unit && (
          <Text className="text-stone-400 dark:text-stone-500 text-lg ml-2">{unit}</Text>
        )}
      </View>
    </View>
  );
}

interface QuickLogCardProps {
  title: string;
  time: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export function QuickLogCard({ title, time, value, icon, color }: QuickLogCardProps) {
  return (
    <View className="bg-white dark:bg-stone-900 rounded-2xl p-4 flex-row items-center border border-stone-100 dark:border-stone-800">
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: color + '20' }}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-stone-900 dark:text-stone-100 font-semibold">{title}</Text>
        <Text className="text-stone-400 dark:text-stone-500 text-sm">{time}</Text>
      </View>
      <Text className="text-stone-700 dark:text-stone-300 font-medium">{value}</Text>
    </View>
  );
}

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-stone-900 dark:text-stone-100 text-lg font-bold">{title}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text className="text-amber-600 dark:text-amber-500 font-medium">{action}</Text>
        </Pressable>
      )}
    </View>
  );
}
