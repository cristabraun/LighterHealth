import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Mail,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
  ExternalLink,
  User,
  Trash2,
  CreditCard,
  RefreshCcw,
} from 'lucide-react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as Application from 'expo-application';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore, useUser } from '@/stores/authStore';
import { deleteAccount } from '@/api/auth';
import {
  APPLE_EULA_URL,
  PRIVACY_URL,
  SUBSCRIPTION_PRICE,
  SUBSCRIPTION_TITLE,
  TERMS_URL,
  useSubscription,
} from '@/lib/subscription';
import { theme } from '@/lib/theme';

const SUPPORT_EMAIL = 'support@getlighterapp.com';

export default function SettingsScreen() {
  const user = useUser();
  const logout = useAuthStore((s) => s.logout);
  const subscription = useSubscription();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const appVersion = Application.nativeApplicationVersion ?? '1.0.0';
  const buildNumber = Application.nativeBuildVersion ?? '1';

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      logout();
    },
  });

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await logout();
    router.replace('/login');
  };

  const openEmail = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Lighter App Support`);
    } catch {
      // Email client not available
    }
  };

  const openPrivacy = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Linking.openURL(PRIVACY_URL);
  };

  const openTerms = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Linking.openURL(TERMS_URL);
  };

  const openEula = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Linking.openURL(APPLE_EULA_URL);
  };

  const openManageSubscription = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Linking.openURL('https://apps.apple.com/account/subscriptions');
  };

  const restorePurchases = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await subscription.restoreMutation.mutateAsync();
  };

  const SettingsRow = ({
    icon,
    iconBgColor,
    title,
    subtitle,
    onPress,
    showExternal = false,
    danger = false,
  }: {
    icon: React.ReactNode;
    iconBgColor: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showExternal?: boolean;
    danger?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="rounded-2xl p-4 flex-row items-center justify-between active:opacity-80"
      style={{
        backgroundColor: theme.background.card,
        borderWidth: 1,
        borderColor: theme.border.primary,
      }}
    >
      <View className="flex-row items-center flex-1">
        <View className="rounded-xl p-3 mr-4" style={{ backgroundColor: iconBgColor }}>
          {icon}
        </View>
        <View className="flex-1">
          <Text
            className="text-base font-semibold"
            style={{ color: danger ? theme.status.error : theme.text.primary }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm mt-0.5" style={{ color: theme.text.secondary }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showExternal ? (
        <ExternalLink size={18} color={theme.text.disabled} accessible={false} accessibilityRole="image" />
      ) : (
        <ChevronRight size={20} color={theme.text.disabled} accessible={false} accessibilityRole="image" />
      )}
    </Pressable>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          accessible={true}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="px-6 pt-4 pb-6"
          >
            <Text className="text-2xl font-bold" style={{ color: theme.text.primary }} accessibilityRole="header">
              Settings
            </Text>
          </Animated.View>

          {/* Account Section */}
          <Animated.View
            entering={FadeInDown.delay(150).springify()}
            className="px-6 mb-6"
          >
            <Text
              className="text-sm font-medium uppercase tracking-wider mb-3 ml-1"
              style={{ color: theme.text.secondary }}
              accessibilityRole="header"
            >
              Account
            </Text>
            <View
              className="rounded-2xl p-4 flex-row items-center"
              style={{
                backgroundColor: theme.background.card,
                borderWidth: 1,
                borderColor: theme.border.primary,
              }}
            >
              <View
                className="w-14 h-14 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: `${theme.accent.primary}15` }}
              >
                <User size={28} color={theme.accent.primary} accessible={false} accessibilityRole="image" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold" style={{ color: theme.text.primary }}>
                  {user?.name || `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'User'}
                </Text>
                <Text className="text-sm" style={{ color: theme.text.secondary }}>
                  {user?.email}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Subscription Section */}
          <Animated.View
            entering={FadeInDown.delay(175).springify()}
            className="px-6 mb-6"
          >
            <Text
              className="text-sm font-medium uppercase tracking-wider mb-3 ml-1"
              style={{ color: theme.text.secondary }}
              accessibilityRole="header"
            >
              Subscription
            </Text>
            <View
              className="rounded-2xl p-4 mb-3"
              style={{
                backgroundColor: theme.background.card,
                borderWidth: 1,
                borderColor: theme.border.primary,
              }}
            >
              <Text className="text-base font-semibold mb-1" style={{ color: theme.text.primary }}>
                {SUBSCRIPTION_TITLE}
              </Text>
              <Text className="text-sm mb-2" style={{ color: theme.text.secondary }}>
                Monthly subscription - {SUBSCRIPTION_PRICE}
              </Text>
              <Text className="text-sm" style={{ color: theme.text.secondary }}>
                Status: {subscription.isPremium ? 'Active' : 'Not active'}
              </Text>
            </View>
            <View className="gap-3">
              {!subscription.isPremium && (
                <SettingsRow
                  icon={<CreditCard size={22} color={theme.accent.primary} accessible={false} accessibilityRole="image" />}
                  iconBgColor={theme.accent.muted}
                  title="Start Free Trial"
                  subtitle={`${SUBSCRIPTION_PRICE}. Cancel anytime.`}
                  onPress={() => router.push('/paywall')}
                />
              )}
              <SettingsRow
                icon={<RefreshCcw size={22} color={theme.status.info} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.status.infoBg}
                title="Restore Purchases"
                subtitle={subscription.restoreMutation.isPending ? 'Restoring...' : 'Recover an existing Apple purchase'}
                onPress={restorePurchases}
              />
              <SettingsRow
                icon={<CreditCard size={22} color={theme.category.sleep} accessible={false} accessibilityRole="image" />}
                iconBgColor={`${theme.category.sleep}15`}
                title="Manage Subscription"
                subtitle="Open Apple subscription settings"
                onPress={openManageSubscription}
                showExternal
              />
            </View>
          </Animated.View>

          {/* Support Section */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="px-6 mb-6"
          >
            <Text
              className="text-sm font-medium uppercase tracking-wider mb-3 ml-1"
              style={{ color: theme.text.secondary }}
              accessibilityRole="header"
            >
              Support
            </Text>
            <View className="gap-3">
              <SettingsRow
                icon={<Mail size={22} color={theme.status.info} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.status.infoBg}
                title="Contact Support"
                subtitle={SUPPORT_EMAIL}
                onPress={openEmail}
                showExternal
              />
            </View>
          </Animated.View>

          {/* Legal Section */}
          <Animated.View
            entering={FadeInDown.delay(250).springify()}
            className="px-6 mb-6"
          >
            <Text
              className="text-sm font-medium uppercase tracking-wider mb-3 ml-1"
              style={{ color: theme.text.secondary }}
              accessibilityRole="header"
            >
              Legal
            </Text>
            <View className="gap-3">
              <SettingsRow
                icon={<Shield size={22} color={theme.status.success} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.status.successBg}
                title="Privacy Policy"
                onPress={openPrivacy}
                showExternal
              />
              <SettingsRow
                icon={<FileText size={22} color={theme.category.sleep} accessible={false} accessibilityRole="image" />}
                iconBgColor={`${theme.category.sleep}15`}
                title="Terms of Service"
                onPress={openTerms}
                showExternal
              />
              <SettingsRow
                icon={<FileText size={22} color={theme.accent.primary} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.accent.muted}
                title="Apple Standard EULA"
                onPress={openEula}
                showExternal
              />
            </View>
          </Animated.View>

          {/* Account Actions */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            className="px-6 mb-6"
          >
            <Text
              className="text-sm font-medium uppercase tracking-wider mb-3 ml-1"
              style={{ color: theme.text.secondary }}
              accessibilityRole="header"
            >
              Account Actions
            </Text>
            <View className="gap-3">
              <SettingsRow
                icon={<LogOut size={22} color={theme.accent.primary} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.accent.muted}
                title="Sign Out"
                onPress={handleLogout}
              />
              <SettingsRow
                icon={<Trash2 size={22} color={theme.status.error} accessible={false} accessibilityRole="image" />}
                iconBgColor={theme.status.errorBg}
                title="Delete Account"
                subtitle="Permanently delete your account and data"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  setShowDeleteModal(true);
                }}
                danger
              />
            </View>
          </Animated.View>

          {/* Version Info */}
          <Animated.View
            entering={FadeInDown.delay(350).springify()}
            className="px-6 pt-4"
          >
            <View className="items-center py-6">
              <Text className="text-sm" style={{ color: theme.text.tertiary }}>
                Lighter v{appVersion} ({buildNumber})
              </Text>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <Pressable
            className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onPress={() => setShowDeleteModal(false)}
            accessibilityRole="button"
            accessibilityLabel="Close dialog"
          >
            <Pressable
              className="rounded-3xl p-6 mx-6 w-full max-w-sm"
              style={{ backgroundColor: theme.background.card }}
              onPress={(e) => e.stopPropagation()}
            >
              <View className="items-center mb-4">
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
                  style={{ backgroundColor: theme.status.errorBg }}
                >
                  <Trash2 size={32} color={theme.status.error} accessible={false} accessibilityRole="image" />
                </View>
                <Text className="text-xl font-bold text-center" style={{ color: theme.text.primary }}>
                  Delete Account?
                </Text>
              </View>
              <Text className="text-center mb-6" style={{ color: theme.text.secondary }}>
                This will permanently delete your account and all associated data. This action cannot
                be undone.
              </Text>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setShowDeleteModal(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel delete account"
                  className="flex-1 rounded-xl py-3"
                  style={{ backgroundColor: theme.background.elevated }}
                >
                  <Text className="font-semibold text-center" style={{ color: theme.text.primary }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                  accessibilityRole="button"
                  accessibilityLabel="Delete account"
                  className="flex-1 rounded-xl py-3"
                  style={{ backgroundColor: theme.status.error }}
                >
                  {deleteMutation.isPending ? (
                    <ActivityIndicator color="white" accessibilityLabel="Loading" />
                  ) : (
                    <Text className="text-white font-semibold text-center">Delete</Text>
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
