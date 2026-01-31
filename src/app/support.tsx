import React from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Mail, RefreshCw, ArrowLeft, HelpCircle, MessageSquare } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from '@/lib/useColorScheme';

const SUPPORT_EMAIL = 'support@getlighterapp.com';

export default function SupportScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const openEmail = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Linking.openURL(
        `mailto:${SUPPORT_EMAIL}?subject=Lighter App Support Request`
      );
    } catch {
      // Email client not available
    }
  };

  const retryApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(tabs)/lighter');
  };

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <Pressable
            onPress={goBack}
            className="p-2 -ml-2 rounded-full active:bg-neutral-200 dark:active:bg-neutral-800"
          >
            <ArrowLeft size={24} color={isDark ? '#f5f5f5' : '#171717'} />
          </Pressable>
          <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold ml-2">
            Support
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="px-6 pt-8 pb-6 items-center"
          >
            <View className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-5 mb-4">
              <HelpCircle size={48} color="#3b82f6" />
            </View>
            <Text className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold text-center">
              Need Help?
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400 text-base text-center mt-2 px-4">
              We're here to help you get the most out of Lighter.
            </Text>
          </Animated.View>

          {/* Help Text */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="mx-6 mb-6"
          >
            <View className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800">
              <View className="flex-row items-start mb-4">
                <MessageSquare size={20} color="#f97316" className="mt-0.5" />
                <View className="ml-3 flex-1">
                  <Text className="text-neutral-900 dark:text-neutral-100 font-semibold mb-1">
                    Common Questions
                  </Text>
                  <Text className="text-neutral-600 dark:text-neutral-400 text-sm leading-5">
                    Having trouble loading the app? Make sure you have a stable internet connection. If the problem persists, try the "Retry Loading App" button below.
                  </Text>
                </View>
              </View>
              <View className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                <Text className="text-neutral-600 dark:text-neutral-400 text-sm leading-5">
                  For account issues, feature requests, or bug reports, please contact our support team using the email button below.
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            className="mx-6 gap-3"
          >
            {/* Email Support */}
            <Pressable onPress={openEmail}>
              {({ pressed }) => (
                <LinearGradient
                  colors={pressed ? ['#2563eb', '#1d4ed8'] : ['#3b82f6', '#2563eb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 18,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    <Mail size={22} color="white" />
                    <Text className="text-white text-base font-semibold ml-3">
                      Email Support
                    </Text>
                  </View>
                </LinearGradient>
              )}
            </Pressable>

            {/* Retry Loading */}
            <Pressable onPress={retryApp}>
              {({ pressed }) => (
                <LinearGradient
                  colors={pressed ? ['#ea580c', '#c2410c'] : ['#f97316', '#ea580c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 18,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    <RefreshCw size={22} color="white" />
                    <Text className="text-white text-base font-semibold ml-3">
                      Retry Loading App
                    </Text>
                  </View>
                </LinearGradient>
              )}
            </Pressable>
          </Animated.View>

          {/* Contact Info */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="mx-6 mt-8"
          >
            <View className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5 items-center">
              <Text className="text-neutral-500 dark:text-neutral-400 text-sm text-center">
                Email us at
              </Text>
              <Text className="text-neutral-900 dark:text-neutral-100 font-semibold mt-1">
                {SUPPORT_EMAIL}
              </Text>
              <Text className="text-neutral-400 dark:text-neutral-600 text-xs text-center mt-2">
                We typically respond within 24 hours
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
