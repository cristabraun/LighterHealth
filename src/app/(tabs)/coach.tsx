import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Send, Sparkles, User, AlertCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAiLimit, askQuestion } from '@/api/ai';
import { SUBSCRIPTION_PRICE, useSubscription } from '@/lib/subscription';
import { theme } from '@/lib/theme';
import type { AskQuestionResponse } from '@/api/types';

const DAILY_LIMIT = 25;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function CoachScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const subscription = useSubscription();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const limitQuery = useQuery({
    queryKey: ['ai-limit'],
    queryFn: getAiLimit,
  });

  const askMutation = useMutation({
    mutationFn: (question: string) => askQuestion({ question }),
    onSuccess: (data: AskQuestionResponse) => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      limitQuery.refetch();
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    },
    onError: (error: Error) => {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: error.message || 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleAskQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || askMutation.isPending) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    askMutation.mutate(trimmed);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = () => {
    handleAskQuestion(input);
  };

  const remaining = limitQuery.data?.remaining ?? DAILY_LIMIT;
  const limit = limitQuery.data?.limit ?? DAILY_LIMIT;

  if (subscription.isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.background.primary }}>
        <ActivityIndicator size="large" color={theme.accent.primary} />
        <Text className="mt-3" style={{ color: theme.text.secondary }}>Checking subscription...</Text>
      </View>
    );
  }

  if (!subscription.isPremium) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
        <SafeAreaView edges={['top']} className="flex-1 items-center justify-center px-6">
          <View className="items-center">
            <View className="rounded-full p-6 mb-5" style={{ backgroundColor: theme.accent.muted }}>
              <Sparkles size={42} color={theme.accent.primary} />
            </View>
            <Text className="text-2xl font-bold text-center mb-2" style={{ color: theme.text.primary }}>
              AI Coach is included with Lighter Premium
            </Text>
            <Text className="text-center mb-6" style={{ color: theme.text.secondary }}>
              Start your free trial. Then {SUBSCRIPTION_PRICE}. Cancel anytime.
            </Text>
            <Pressable
              onPress={() => router.push('/paywall?feature=AI%20Coach')}
              className="rounded-2xl px-6 py-4"
              style={{ backgroundColor: theme.accent.primary }}
            >
              <Text className="text-white font-bold">Start Free Trial</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background.primary }}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View
          className="px-6 pt-4 pb-4"
          style={{ borderBottomWidth: 1, borderBottomColor: theme.border.primary }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold" style={{ color: theme.text.primary }}>
                AI Coach
              </Text>
              <Text className="text-sm" style={{ color: theme.text.secondary }}>
                Ask me anything about metabolic health
              </Text>
            </View>
            <View
              className="rounded-xl px-3 py-2"
              style={{ backgroundColor: theme.accent.muted }}
            >
              {limitQuery.isLoading ? (
                <ActivityIndicator size="small" color={theme.accent.primary} />
              ) : (
                <Text className="text-sm font-semibold" style={{ color: theme.accent.primary }}>
                  {remaining}/{limit} left
                </Text>
              )}
              <Text className="text-xs mt-0.5" style={{ color: theme.text.secondary }}>
                {limit} questions/day
              </Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={100}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              paddingBottom: 120,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View className="flex-1 items-center justify-center">
                <Animated.View entering={FadeInDown.springify()} className="items-center">
                  <View
                    className="rounded-full p-6 mb-4"
                    style={{ backgroundColor: theme.accent.muted }}
                  >
                    <Sparkles size={40} color={theme.accent.primary} />
                  </View>
                  <Text
                    className="text-xl font-semibold mb-2 text-center"
                    style={{ color: theme.text.primary }}
                  >
                    Your AI Metabolic Coach
                  </Text>
                  <Text
                    className="text-center px-8 mb-6"
                    style={{ color: theme.text.secondary }}
                  >
                    Ask questions about nutrition, thyroid health, energy, sleep, and metabolic optimization.
                  </Text>
                  <View className="gap-2 w-full px-4">
                    {[
                      'What foods support thyroid function?',
                      'Why is my temperature always low?',
                      'How can I improve my sleep quality?',
                    ].map((suggestion, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setInput(suggestion);
                          handleAskQuestion(suggestion);
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }}
                        className="rounded-xl p-3"
                        style={{
                          backgroundColor: theme.background.card,
                          borderWidth: 1,
                          borderColor: theme.border.primary,
                        }}
                      >
                        <Text className="text-sm" style={{ color: theme.text.secondary }}>
                          {suggestion}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </Animated.View>
              </View>
            ) : (
              messages.map((message, index) => (
                <Animated.View
                  key={message.id}
                  entering={FadeInUp.delay(index * 50).springify()}
                  className={`mb-4 flex-row ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center mr-2 mt-1"
                      style={{ backgroundColor: theme.accent.muted }}
                    >
                      <Sparkles size={16} color={theme.accent.primary} />
                    </View>
                  )}
                  <View
                    className="max-w-[80%] rounded-2xl px-4 py-3"
                    style={{
                      backgroundColor:
                        message.role === 'user' ? theme.accent.primary : theme.background.card,
                      borderWidth: message.role === 'assistant' ? 1 : 0,
                      borderColor: theme.border.primary,
                    }}
                  >
                    <Text
                      className="text-base leading-6"
                      style={{
                        color: message.role === 'user' ? 'white' : theme.text.primary,
                      }}
                    >
                      {message.content}
                    </Text>
                  </View>
                  {message.role === 'user' && (
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center ml-2 mt-1"
                      style={{ backgroundColor: theme.background.card }}
                    >
                      <User size={16} color={theme.text.secondary} />
                    </View>
                  )}
                </Animated.View>
              ))
            )}

            {/* Loading indicator */}
            {askMutation.isPending && (
              <View className="flex-row items-center mb-4">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: theme.accent.muted }}
                >
                  <Sparkles size={16} color={theme.accent.primary} />
                </View>
                <View
                  className="rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: theme.background.card,
                    borderWidth: 1,
                    borderColor: theme.border.primary,
                  }}
                >
                  <ActivityIndicator size="small" color={theme.accent.primary} />
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View
            className="px-4 pb-4"
            style={{
              borderTopWidth: 1,
              borderTopColor: theme.border.primary,
              backgroundColor: theme.background.primary,
            }}
          >
            {remaining === 0 ? (
              <View
                className="flex-row items-center rounded-xl p-4 mt-4"
                style={{ backgroundColor: theme.status.warningBg }}
              >
                <AlertCircle size={20} color={theme.status.warning} />
                <Text className="ml-3 flex-1" style={{ color: theme.status.warning }}>
                  You've used all {limit} questions for today. They reset at midnight.
                </Text>
              </View>
            ) : (
              <View className="flex-row items-end gap-3 mt-4">
                <View
                  className="flex-1 rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: theme.background.card,
                    borderWidth: 1,
                    borderColor: theme.border.primary,
                  }}
                >
                  <TextInput
                    className="text-base max-h-24"
                    style={{ color: theme.text.primary }}
                    placeholder="Ask a question..."
                    placeholderTextColor={theme.text.disabled}
                    value={input}
                    onChangeText={setInput}
                    multiline
                    editable={!askMutation.isPending}
                    onSubmitEditing={handleSend}
                  />
                </View>
                <Pressable
                  onPress={handleSend}
                  disabled={!input.trim() || askMutation.isPending}
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{
                    backgroundColor:
                      input.trim() && !askMutation.isPending
                        ? theme.accent.primary
                        : theme.background.elevated,
                  }}
                >
                  <Send
                    size={20}
                    color={input.trim() && !askMutation.isPending ? 'white' : theme.text.disabled}
                  />
                </Pressable>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
