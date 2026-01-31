import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Pressable, BackHandler, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Flame, WifiOff, RefreshCw, MessageCircle, ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import NetInfo from '@react-native-community/netinfo';
import { useColorScheme } from '@/lib/useColorScheme';

const LIGHTER_URL = 'https://getlighterapp.com';

type WebViewState = 'loading' | 'loaded' | 'error';

export default function LighterScreen() {
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [webViewState, setWebViewState] = useState<WebViewState>('loading');
  const [canGoBack, setCanGoBack] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Handle Android back button
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  const handleLoadStart = useCallback(() => {
    setWebViewState('loading');
  }, []);

  const handleLoadEnd = useCallback(() => {
    setWebViewState('loaded');
  }, []);

  const handleError = useCallback(() => {
    setWebViewState('error');
  }, []);

  const handleRetry = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWebViewState('loading');
    webViewRef.current?.reload();
  }, []);

  const handleGoBack = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      webViewRef.current.goBack();
    } else {
      router.push('/(tabs)/');
    }
  }, [canGoBack, router]);

  const openSupport = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/support');
  }, [router]);

  // Loading Screen
  const LoadingScreen = () => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 items-center justify-center z-10"
    >
      <View className="items-center">
        <View className="bg-orange-500/10 dark:bg-orange-500/20 rounded-full p-6 mb-6">
          <Flame size={48} color="#f97316" strokeWidth={1.5} fill="#f97316" />
        </View>
        <Text className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold mb-4">
          Lighter™
        </Text>
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-neutral-500 dark:text-neutral-400 text-sm mt-4">
          Loading your experience...
        </Text>
      </View>
    </Animated.View>
  );

  // Error/Offline Screen
  const ErrorScreen = () => (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950 items-center justify-center px-6">
      <View className="bg-neutral-200 dark:bg-neutral-800 rounded-full p-6 mb-6">
        <WifiOff size={48} color={isDark ? '#737373' : '#525252'} />
      </View>
      <Text className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold mb-2 text-center">
        Unable to Connect
      </Text>
      <Text className="text-neutral-500 dark:text-neutral-400 text-base text-center mb-8">
        {isOffline
          ? "You appear to be offline. Check your internet connection and try again."
          : "We couldn't load Lighter. Please check your connection and try again."}
      </Text>

      <View className="w-full gap-3">
        <Pressable onPress={handleRetry}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? ['#ea580c', '#c2410c'] : ['#f97316', '#ea580c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 16,
                padding: 16,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              }}
            >
              <View className="flex-row items-center justify-center">
                <RefreshCw size={20} color="white" />
                <Text className="text-white text-base font-semibold ml-2">
                  Retry
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        <Pressable
          onPress={openSupport}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 flex-row items-center justify-center active:opacity-80"
        >
          <MessageCircle size={20} color="#3b82f6" />
          <Text className="text-neutral-900 dark:text-neutral-100 text-base font-semibold ml-2">
            Open Support
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      {/* Back button when WebView can go back */}
      {canGoBack && webViewState === 'loaded' && (
        <SafeAreaView edges={['top']} className="absolute top-0 left-0 z-20">
          <Pressable
            onPress={handleGoBack}
            className="ml-4 mt-2 bg-black/50 dark:bg-white/20 rounded-full p-2 active:opacity-70"
          >
            <ArrowLeft size={24} color="white" />
          </Pressable>
        </SafeAreaView>
      )}

      {webViewState === 'error' || (isOffline && webViewState !== 'loaded') ? (
        <ErrorScreen />
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: LIGHTER_URL }}
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onHttpError={handleError}
            startInLoadingState={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            sharedCookiesEnabled={true}
            allowsBackForwardNavigationGestures={true}
            pullToRefreshEnabled={true}
            style={{ flex: 1 }}
          />
          {webViewState === 'loading' && <LoadingScreen />}
        </>
      )}
    </View>
  );
}
