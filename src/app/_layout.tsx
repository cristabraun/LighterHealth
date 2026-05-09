import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthStore, useIsAuthenticated, useIsInitialized, useOnboardingCompleted, setupUnauthorizedHandler } from '@/stores/authStore';
import { theme } from '@/lib/theme';

export const unstable_settings = {
  initialRouteName: 'intro',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup 401 handler for API client
setupUnauthorizedHandler();

const queryClient = new QueryClient();

// Custom dark theme based on our design system
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.accent.primary,
    background: theme.background.primary,
    card: theme.background.card,
    text: theme.text.primary,
    border: theme.border.primary,
    notification: theme.accent.primary,
  },
};

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isInitialized = useIsInitialized();
  const onboardingCompleted = useOnboardingCompleted();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'forgot-password';
    const inIntro = segments[0] === 'intro';
    const inOnboarding = segments[0] === 'onboarding';

    if (!isAuthenticated && !inAuthGroup && !inIntro) {
      // Not authenticated and not on auth/intro screens, redirect to intro
      router.replace('/intro');
    } else if (isAuthenticated && !onboardingCompleted && !inOnboarding) {
      // Authenticated but onboarding not complete
      router.replace('/onboarding');
    } else if (isAuthenticated && onboardingCompleted && (inAuthGroup || inOnboarding || inIntro)) {
      // Authenticated and onboarding complete, but on auth/onboarding/intro screen
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitialized, onboardingCompleted, segments, router]);
}

function RootLayoutNav() {
  const isInitialized = useIsInitialized();
  const initialize = useAuthStore((s) => s.initialize);

  useProtectedRoute();

  useEffect(() => {
    initialize().then(() => {
      SplashScreen.hideAsync();
    });
  }, [initialize]);

  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={theme.accent.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background.primary },
          headerTintColor: theme.text.primary,
          contentStyle: { backgroundColor: theme.background.primary },
        }}
      >
        {/* Intro screen */}
        <Stack.Screen name="intro" options={{ headerShown: false }} />

        {/* Auth screens */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />

        {/* Main app */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other screens */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="support" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="privacy-terms" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="paywall" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="food-logs" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="messages" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="log-entry" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="experiment/[id]" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <StatusBar style="light" />
          <ErrorBoundary fallback={<Text>Something went wrong.</Text>}>
            <RootLayoutNav />
          </ErrorBoundary>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
