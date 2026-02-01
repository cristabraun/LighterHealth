import React, { useState, useCallback } from 'react';
import { Platform, SafeAreaView, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Flame, WifiOff, RefreshCw, MessageCircle, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { useColorScheme } from '@/lib/useColorScheme';

const LIGHTER_URL = 'https://getlighterapp.com';

type WebViewState = 'loading' | 'loaded' | 'error';

export default function LighterScreenWeb() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [webViewState, setWebViewState] = useState<WebViewState>('loading');

  const handleLoad = useCallback(() => {
    setWebViewState('loaded');
  }, []);

  const handleError = useCallback(() => {
    setWebViewState('error');
  }, []);

  const handleRetry = useCallback(() => {
    setWebViewState('loading');
    // Force iframe refresh by re-mounting
    setWebViewState('loading');
  }, []);

  const openSupport = useCallback(() => {
    router.push('/support');
  }, [router]);

  const openInBrowser = useCallback(() => {
    Linking.openURL(LIGHTER_URL);
  }, []);

  // Loading Screen
  const LoadingScreen = () => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? '#0a0a0a' : '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: isDark ? 'rgba(249, 115, 22, 0.2)' : 'rgba(249, 115, 22, 0.1)',
            borderRadius: 999,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <Flame size={48} color="#f97316" strokeWidth={1.5} fill="#f97316" />
        </View>
        <Text
          style={{
            color: isDark ? '#f5f5f5' : '#171717',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
          }}
        >
          Lighter™
        </Text>
        <ActivityIndicator size="large" color="#f97316" />
        <Text
          style={{
            color: isDark ? '#a3a3a3' : '#737373',
            fontSize: 14,
            marginTop: 16,
          }}
        >
          Loading your experience...
        </Text>
      </View>
    </Animated.View>
  );

  // Error Screen
  const ErrorScreen = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? '#0a0a0a' : '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          backgroundColor: isDark ? '#262626' : '#e5e5e5',
          borderRadius: 999,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <WifiOff size={48} color={isDark ? '#737373' : '#525252'} />
      </View>
      <Text
        style={{
          color: isDark ? '#f5f5f5' : '#171717',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        Unable to Connect
      </Text>
      <Text
        style={{
          color: isDark ? '#a3a3a3' : '#737373',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        We couldn't load Lighter. Please check your connection and try again.
      </Text>

      <View style={{ width: '100%', gap: 12 }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>
                  Retry
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        <Pressable
          onPress={openSupport}
          style={{
            backgroundColor: isDark ? '#171717' : 'white',
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? '#262626' : '#e5e5e5',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MessageCircle size={20} color="#3b82f6" />
          <Text
            style={{
              color: isDark ? '#f5f5f5' : '#171717',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8,
            }}
          >
            Open Support
          </Text>
        </Pressable>
      </View>
    </View>
  );

  if (webViewState === 'error') {
    return <ErrorScreen />;
  }

  const TopWrapper = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#fafafa' }}>
      {/* Open in browser button */}
      <TopWrapper>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Pressable
            onPress={openInBrowser}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isDark ? '#262626' : '#f5f5f5',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <ExternalLink size={16} color={isDark ? '#a3a3a3' : '#525252'} />
            <Text
              style={{
                color: isDark ? '#a3a3a3' : '#525252',
                fontSize: 12,
                marginLeft: 6,
              }}
            >
              Open in Browser
            </Text>
          </Pressable>
        </View>
      </TopWrapper>

      {/* Iframe for web */}
      <iframe
        src={LIGHTER_URL}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        onLoad={handleLoad}
        onError={handleError}
      />

      {webViewState === 'loading' && <LoadingScreen />}
    </View>
  );
}
