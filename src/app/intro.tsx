import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Flame } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { theme } from '@/lib/theme';

const { width } = Dimensions.get('window');

export default function IntroScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/login');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      {/* Soft radial gradient glow in center */}
      <LinearGradient
        colors={['transparent', 'rgba(245, 166, 35, 0.03)', 'rgba(245, 166, 35, 0.06)', 'rgba(245, 166, 35, 0.03)', 'transparent']}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        style={{
          position: 'absolute',
          top: '25%',
          left: -width * 0.25,
          right: -width * 0.25,
          height: width * 1.5,
          borderRadius: width,
        }}
      />

      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <View className="flex-1" style={{ paddingHorizontal: 24 }}>

          {/* Header - Same as Login screen */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="items-center pt-16 pb-8"
          >
            <View
              className="rounded-full p-5 mb-4"
              style={{
                backgroundColor: `${theme.accent.primary}15`,
                ...theme.shadow.accent,
              }}
            >
              <Flame
                size={56}
                color={theme.accent.primary}
                strokeWidth={1.5}
                fill={theme.accent.primary}
              />
            </View>
            <Text className="text-3xl font-bold" style={{ color: theme.text.primary }}>
              Lighter™
            </Text>
          </Animated.View>

          {/* Middle Section - Content */}
          <View className="flex-1 justify-center items-center" style={{ width: '100%' }}>
            <View style={{ width: '85%' }}>
              {/* Headline */}
              <Animated.View entering={FadeIn.delay(300).duration(1000)}>
                <Text
                  className="text-center"
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: theme.text.primary,
                    lineHeight: 26,
                    letterSpacing: -0.2,
                  }}
                >
                  Track the key vitals that reveal the state of your metabolism, your energy, and what's been holding your fat loss back.
                </Text>
              </Animated.View>

              {/* Subtitle */}
              <Animated.View entering={FadeIn.delay(500).duration(1000)}>
                <Text
                  className="text-center"
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#999999',
                    lineHeight: 22,
                    letterSpacing: -0.1,
                    marginTop: 20,
                  }}
                >
                  Plus simple experiments to help you heal, restore your energy, and thrive in your body again.
                </Text>
              </Animated.View>
            </View>
          </View>

          {/* Bottom Section - Button */}
          <Animated.View
            entering={FadeIn.delay(700).duration(800)}
            style={{ paddingBottom: 24 }}
            className="items-center"
          >
            <Pressable onPress={handleGetStarted}>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor: pressed ? theme.accent.secondary : theme.accent.primary,
                    borderRadius: 24,
                    paddingVertical: 14,
                    paddingHorizontal: 48,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  }}
                >
                  <Text
                    style={{
                      color: '#0D0D0D',
                      fontSize: 14,
                      fontWeight: '600',
                      letterSpacing: 0.3,
                    }}
                  >
                    Get Started
                  </Text>
                </View>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
