import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  PressableProps,
  TextInputProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, gradients } from '@/lib/theme';
import { cn } from '@/lib/cn';
import { LucideIcon } from 'lucide-react-native';

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = true,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { paddingVertical: 10, paddingHorizontal: 16 },
    md: { paddingVertical: 14, paddingHorizontal: 20 },
    lg: { paddingVertical: 18, paddingHorizontal: 24 },
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  if (variant === 'primary') {
    return (
      <Pressable disabled={isDisabled} {...props}>
        {({ pressed }) => (
          <LinearGradient
            colors={isDisabled ? gradients.disabled : pressed ? gradients.accentPressed : gradients.accent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              {
                borderRadius: theme.radius.lg,
                opacity: isDisabled ? 0.6 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
                ...sizeStyles[size],
              },
              fullWidth ? { width: '100%' } : {},
            ]}
          >
            <View className="flex-row items-center justify-center">
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  {Icon && iconPosition === 'left' && (
                    <Icon size={iconSizes[size]} color="white" style={{ marginRight: 8 }} />
                  )}
                  <Text className={cn('text-white font-bold', textSizes[size])}>
                    {children}
                  </Text>
                  {Icon && iconPosition === 'right' && (
                    <Icon size={iconSizes[size]} color="white" style={{ marginLeft: 8 }} />
                  )}
                </>
              )}
            </View>
          </LinearGradient>
        )}
      </Pressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <Pressable
        disabled={isDisabled}
        className={cn(
          'rounded-2xl border border-[#333333]',
          fullWidth && 'w-full',
          className
        )}
        style={[
          {
            backgroundColor: theme.background.card,
            ...sizeStyles[size],
            opacity: isDisabled ? 0.6 : 1,
          },
        ]}
        {...props}
      >
        {({ pressed }) => (
          <View
            className="flex-row items-center justify-center"
            style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
          >
            {loading ? (
              <ActivityIndicator color={theme.text.primary} />
            ) : (
              <>
                {Icon && iconPosition === 'left' && (
                  <Icon size={iconSizes[size]} color={theme.text.primary} style={{ marginRight: 8 }} />
                )}
                <Text className={cn('text-[#F2F2F2] font-semibold', textSizes[size])}>
                  {children}
                </Text>
                {Icon && iconPosition === 'right' && (
                  <Icon size={iconSizes[size]} color={theme.text.primary} style={{ marginLeft: 8 }} />
                )}
              </>
            )}
          </View>
        )}
      </Pressable>
    );
  }

  // Ghost variant
  return (
    <Pressable
      disabled={isDisabled}
      className={cn(fullWidth && 'w-full', className)}
      style={{ ...sizeStyles[size], opacity: isDisabled ? 0.6 : 1 }}
      {...props}
    >
      {({ pressed }) => (
        <View
          className="flex-row items-center justify-center"
          style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
        >
          {loading ? (
            <ActivityIndicator color={theme.text.secondary} />
          ) : (
            <>
              {Icon && iconPosition === 'left' && (
                <Icon size={iconSizes[size]} color={theme.text.secondary} style={{ marginRight: 8 }} />
              )}
              <Text className={cn('text-[#C7C7C7] font-medium', textSizes[size])}>
                {children}
              </Text>
              {Icon && iconPosition === 'right' && (
                <Icon size={iconSizes[size]} color={theme.text.secondary} style={{ marginLeft: 8 }} />
              )}
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}

// ============================================================================
// INPUT COMPONENT
// ============================================================================

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  icon?: LucideIcon;
  iconRight?: React.ReactNode;
}

export function Input({
  label,
  error,
  helper,
  icon: Icon,
  iconRight,
  className,
  ...props
}: InputProps) {
  return (
    <View className={cn('w-full', className)}>
      {label && (
        <Text className="text-[#C7C7C7] text-sm font-medium mb-2 ml-1">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'flex-row items-center rounded-2xl border px-4',
          error ? 'border-red-500' : 'border-[#333333]'
        )}
        style={{ backgroundColor: theme.background.card }}
      >
        {Icon && (
          <Icon size={20} color={theme.text.tertiary} style={{ marginRight: 12 }} />
        )}
        <TextInput
          className="flex-1 py-4 text-[#F2F2F2] text-base"
          placeholderTextColor={theme.text.disabled}
          {...props}
        />
        {iconRight}
      </View>
      {error && (
        <Text className="text-red-400 text-sm mt-1 ml-1">{error}</Text>
      )}
      {helper && !error && (
        <Text className="text-[#888888] text-sm mt-1 ml-1">{helper}</Text>
      )}
    </View>
  );
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className,
  style,
  onPress,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    none: 0,
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.background.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.border.primary,
    padding: paddingStyles[padding],
    ...style,
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={cardStyle} className={className}>
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} className={className}>
      {children}
    </View>
  );
}

// ============================================================================
// SCREEN CONTAINER COMPONENT
// ============================================================================

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function ScreenContainer({
  children,
  className,
  style,
}: ScreenContainerProps) {
  return (
    <View
      className={cn('flex-1', className)}
      style={[{ backgroundColor: theme.background.primary }, style]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// ERROR MESSAGE COMPONENT
// ============================================================================

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <View
      className={cn('rounded-2xl p-4', className)}
      style={{ backgroundColor: theme.status.errorBg }}
    >
      <Text className="text-red-400 text-sm text-center">{message}</Text>
    </View>
  );
}

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  className?: string;
}

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <View className={cn('flex-row items-center justify-between', className)}>
      <Text className="text-[#F2F2F2] text-lg font-semibold">{title}</Text>
      {action && (
        <Pressable onPress={action.onPress}>
          <Text className="text-[#F5A623] text-sm font-medium">{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}

// ============================================================================
// CATEGORY LABEL COMPONENT
// ============================================================================

interface CategoryLabelProps {
  label: string;
  color: string;
  className?: string;
}

export function CategoryLabel({ label, color, className }: CategoryLabelProps) {
  return (
    <View
      className={cn('px-2 py-0.5 rounded-full', className)}
      style={{ backgroundColor: `${color}20` }}
    >
      <Text className="text-xs font-medium" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
