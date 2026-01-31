import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Shield, FileText, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';
import { useColorScheme } from '@/lib/useColorScheme';

const PRIVACY_URL = 'https://getlighterapp.com/privacy';
const TERMS_URL = 'https://getlighterapp.com/terms';

export default function PrivacyTermsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const openPrivacy = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await WebBrowser.openBrowserAsync(PRIVACY_URL, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    });
  };

  const openTerms = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await WebBrowser.openBrowserAsync(TERMS_URL, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    });
  };

  const LinkCard = ({
    icon,
    iconBgColor,
    title,
    description,
    onPress,
  }: {
    icon: React.ReactNode;
    iconBgColor: string;
    title: string;
    description: string;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 active:opacity-80"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <View
            className="rounded-xl p-3 mr-4"
            style={{ backgroundColor: iconBgColor }}
          >
            {icon}
          </View>
          <View className="flex-1">
            <Text className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold mb-1">
              {title}
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400 text-sm leading-5">
              {description}
            </Text>
          </View>
        </View>
        <ExternalLink size={18} color={isDark ? '#525252' : '#a3a3a3'} className="mt-1" />
      </View>
    </Pressable>
  );

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
            Privacy & Terms
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Description */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="px-6 pt-6 pb-4"
          >
            <Text className="text-neutral-500 dark:text-neutral-400 text-base leading-6">
              Review our privacy policy and terms of service to understand how we protect your data and the terms of using Lighter.
            </Text>
          </Animated.View>

          {/* Links */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="mx-6 gap-4"
          >
            <LinkCard
              icon={<Shield size={24} color="#10b981" />}
              iconBgColor={isDark ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5'}
              title="Privacy Policy"
              description="Learn how we collect, use, and protect your personal information."
              onPress={openPrivacy}
            />

            <LinkCard
              icon={<FileText size={24} color="#8b5cf6" />}
              iconBgColor={isDark ? 'rgba(139, 92, 246, 0.15)' : '#ede9fe'}
              title="Terms of Service"
              description="Read the terms and conditions for using the Lighter app."
              onPress={openTerms}
            />
          </Animated.View>

          {/* Additional Info */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            className="mx-6 mt-8"
          >
            <View className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5">
              <Text className="text-neutral-900 dark:text-neutral-100 font-semibold mb-2">
                Your Data, Your Control
              </Text>
              <Text className="text-neutral-500 dark:text-neutral-400 text-sm leading-5">
                Lighter is committed to protecting your privacy. Your health data is stored securely and is never sold to third parties. You can request deletion of your data at any time by contacting our support team.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
