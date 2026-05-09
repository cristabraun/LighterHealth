import React from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, RefreshCcw, Shield, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import {
  APPLE_EULA_URL,
  PRIVACY_URL,
  SUBSCRIPTION_LENGTH,
  SUBSCRIPTION_TITLE,
  TERMS_URL,
  isRevenueCatConfigured,
  packagePriceText,
  useSubscription,
} from '@/lib/subscription';
import { theme } from '@/lib/theme';

export default function PaywallScreen() {
  const { feature } = useLocalSearchParams<{ feature?: string }>();
  const subscription = useSubscription();
  const monthlyPackage = subscription.monthlyPackage;
  const priceText = packagePriceText(monthlyPackage);

  const handlePurchase = async () => {
    if (!monthlyPackage) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await subscription.purchaseMutation.mutateAsync(monthlyPackage);
    router.back();
  };

  const handleRestore = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await subscription.restoreMutation.mutateAsync();
    if (subscription.isPremium) router.back();
  };

  const openUrl = (url: string) => Linking.openURL(url);

  const errorMessage =
    subscription.error instanceof Error ? subscription.error.message : 'Unable to load subscription options.';

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 48 }}>
          <View className="flex-row justify-end mb-4">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Close subscription screen"
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.background.card }}
            >
              <X size={22} color={theme.text.primary} />
            </Pressable>
          </View>

          <Text className="text-3xl font-bold mb-2" style={{ color: theme.text.primary }}>
            Start your free trial.
          </Text>
          <Text className="text-base mb-6" style={{ color: theme.text.secondary }}>
            {feature ? `${feature} is included with Lighter Premium.` : 'Unlock Lighter Premium.'}
          </Text>

          <View
            className="rounded-3xl p-5 mb-5"
            style={{ backgroundColor: theme.background.card, borderWidth: 1, borderColor: theme.border.primary }}
          >
            <Text className="text-xl font-bold mb-1" style={{ color: theme.text.primary }}>
              {SUBSCRIPTION_TITLE}
            </Text>
            <Text className="text-sm mb-4" style={{ color: theme.text.secondary }}>
              {SUBSCRIPTION_LENGTH}
            </Text>
            <Text className="text-2xl font-bold mb-2" style={{ color: theme.accent.primary }}>
              {priceText}
            </Text>
            <Text className="text-sm" style={{ color: theme.text.secondary }}>
              Auto-renews monthly unless canceled at least 24 hours before renewal. Manage or cancel in Apple subscription settings.
            </Text>
          </View>

          <View className="gap-3 mb-6">
            {['Premium AI Coach', 'Experiments and protocols', 'Pattern insights and progress tracking'].map((item) => (
              <View key={item} className="flex-row items-center">
                <Check size={18} color={theme.status.success} />
                <Text className="ml-3 text-base" style={{ color: theme.text.primary }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {subscription.isLoading ? (
            <View className="items-center py-5">
              <ActivityIndicator color={theme.accent.primary} />
              <Text className="mt-3 text-sm" style={{ color: theme.text.secondary }}>
                Loading subscription options...
              </Text>
            </View>
          ) : subscription.isError || !monthlyPackage ? (
            <View
              className="rounded-2xl p-4 mb-4"
              style={{ backgroundColor: theme.status.errorBg, borderWidth: 1, borderColor: theme.status.error }}
            >
              <Text className="font-semibold mb-2" style={{ color: theme.status.error }}>
                Unable to load subscription options
              </Text>
              <Text className="text-sm mb-4" style={{ color: theme.text.secondary }}>
                {isRevenueCatConfigured()
                  ? errorMessage
                  : 'Subscription options are temporarily unavailable. Please try again shortly.'}
              </Text>
              <Pressable
                onPress={() => subscription.refetch()}
                className="rounded-xl py-3 flex-row items-center justify-center"
                style={{ backgroundColor: theme.background.elevated }}
              >
                <RefreshCcw size={16} color={theme.text.primary} />
                <Text className="ml-2 font-semibold" style={{ color: theme.text.primary }}>
                  Retry
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={handlePurchase}
              disabled={subscription.purchaseMutation.isPending}
              accessibilityRole="button"
              accessibilityLabel="Start free trial"
              className="rounded-2xl py-4 items-center mb-3"
              style={{ backgroundColor: theme.accent.primary }}
            >
              {subscription.purchaseMutation.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-base font-bold">Start Free Trial</Text>
              )}
            </Pressable>
          )}

          <Pressable
            onPress={handleRestore}
            disabled={subscription.restoreMutation.isPending}
            accessibilityRole="button"
            accessibilityLabel="Restore purchases"
            className="rounded-2xl py-4 items-center mb-5"
            style={{ backgroundColor: theme.background.card, borderWidth: 1, borderColor: theme.border.primary }}
          >
            <Text className="font-semibold" style={{ color: theme.text.primary }}>
              Restore Purchases
            </Text>
          </Pressable>

          <View className="flex-row items-start mb-5">
            <Shield size={16} color={theme.text.secondary} style={{ marginTop: 2 }} />
            <Text className="ml-2 text-xs flex-1" style={{ color: theme.text.secondary }}>
              Payment is charged to your Apple ID at confirmation of purchase. The subscription renews monthly unless canceled in Apple subscription settings.
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-4">
            <Pressable onPress={() => openUrl(PRIVACY_URL)}>
              <Text className="text-sm underline" style={{ color: theme.accent.primary }}>Privacy Policy</Text>
            </Pressable>
            <Pressable onPress={() => openUrl(TERMS_URL)}>
              <Text className="text-sm underline" style={{ color: theme.accent.primary }}>Terms</Text>
            </Pressable>
            <Pressable onPress={() => openUrl(APPLE_EULA_URL)}>
              <Text className="text-sm underline" style={{ color: theme.accent.primary }}>Apple EULA</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
