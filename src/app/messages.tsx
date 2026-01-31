import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Plus, MessageSquare, X, CheckCircle, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/lib/useColorScheme';
import { getAllMessages, createMessage } from '@/api/messages';
import type { Message, CreateMessageRequest } from '@/api/types';
import { ApiClientError } from '@/api/client';

export default function MessagesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const queryClient = useQueryClient();

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const messagesQuery = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateMessageRequest) => createMessage(data),
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      resetForm();
      setShowComposeModal(false);
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to send message. Please try again.');
      }
    },
  });

  const resetForm = () => {
    setSubject('');
    setMessageText('');
    setError(null);
  };

  const handleSend = () => {
    setError(null);
    if (!subject.trim()) {
      setError('Please enter a subject');
      return;
    }
    if (!messageText.trim()) {
      setError('Please enter a message');
      return;
    }

    createMutation.mutate({
      subject: subject.trim(),
      message: messageText.trim(),
    });
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const messages = messagesQuery.data ?? [];

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-2 pb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Pressable
              onPress={goBack}
              className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 mr-3"
            >
              <ArrowLeft size={20} color={isDark ? '#f5f5f5' : '#171717'} />
            </Pressable>
            <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold">
              Messages
            </Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowComposeModal(true);
            }}
            className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center"
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
          </Pressable>
        </View>

        {messagesQuery.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#f97316" />
          </View>
        ) : messages.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Animated.View entering={FadeInDown.springify()} className="items-center">
              <View className="bg-neutral-200 dark:bg-neutral-800 rounded-full p-6 mb-4">
                <MessageSquare size={40} color={isDark ? '#525252' : '#a3a3a3'} />
              </View>
              <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-2">
                No messages yet
              </Text>
              <Text className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
                Have a question about metabolic health? Send us a message and we'll get back to you.
              </Text>
              <Pressable
                onPress={() => setShowComposeModal(true)}
                className="bg-orange-500 rounded-xl px-6 py-3"
              >
                <Text className="text-white font-semibold">Send a Message</Text>
              </Pressable>
            </Animated.View>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={messagesQuery.isRefetching}
                onRefresh={() => messagesQuery.refetch()}
                tintColor="#f97316"
              />
            }
          >
            <View className="px-6">
              {messages.map((msg, index) => (
                <Animated.View
                  key={msg.id}
                  entering={FadeInDown.delay(index * 50).springify()}
                >
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedMessage(msg);
                    }}
                    className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 mb-3"
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1 mr-3">
                        <Text className="text-neutral-900 dark:text-neutral-100 font-semibold">
                          {msg.subject}
                        </Text>
                        <Text className="text-neutral-400 dark:text-neutral-500 text-xs mt-1">
                          {new Date(msg.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>
                      {msg.status === 'responded' ? (
                        <View className="flex-row items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                          <CheckCircle size={12} color="#22c55e" />
                          <Text className="text-green-600 dark:text-green-400 text-xs ml-1 font-medium">
                            Replied
                          </Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                          <Clock size={12} color="#f59e0b" />
                          <Text className="text-amber-600 dark:text-amber-400 text-xs ml-1 font-medium">
                            Pending
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                      numberOfLines={2}
                    >
                      {msg.message}
                    </Text>
                    {msg.response && (
                      <View className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                        <Text className="text-orange-500 text-xs font-medium mb-1">
                          Response:
                        </Text>
                        <Text
                          className="text-neutral-600 dark:text-neutral-400 text-sm"
                          numberOfLines={2}
                        >
                          {msg.response}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Compose Modal */}
        {showComposeModal && (
          <Pressable
            className="absolute inset-0 bg-black/50 justify-end"
            onPress={() => {
              setShowComposeModal(false);
              resetForm();
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Pressable
                className="bg-white dark:bg-neutral-900 rounded-t-3xl"
                onPress={(e) => e.stopPropagation()}
              >
                <SafeAreaView edges={['bottom']}>
                  <View className="p-6">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                      <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold">
                        New Message
                      </Text>
                      <Pressable
                        onPress={() => {
                          setShowComposeModal(false);
                          resetForm();
                        }}
                        className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full items-center justify-center"
                      >
                        <X size={18} color={isDark ? '#f5f5f5' : '#171717'} />
                      </Pressable>
                    </View>

                    {/* Error */}
                    {error && (
                      <View className="bg-red-100 dark:bg-red-900/30 rounded-xl p-3 mb-4">
                        <Text className="text-red-600 dark:text-red-400 text-sm text-center">
                          {error}
                        </Text>
                      </View>
                    )}

                    {/* Subject */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Subject
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-4">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base"
                        placeholder="e.g., Question about temperature"
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        value={subject}
                        onChangeText={setSubject}
                      />
                    </View>

                    {/* Message */}
                    <Text className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                      Message
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 mb-6">
                      <TextInput
                        className="py-3 text-neutral-900 dark:text-neutral-100 text-base min-h-[120px]"
                        placeholder="Describe your question or concern..."
                        placeholderTextColor={isDark ? '#525252' : '#a3a3a3'}
                        multiline
                        textAlignVertical="top"
                        value={messageText}
                        onChangeText={setMessageText}
                      />
                    </View>

                    {/* Submit */}
                    <Pressable onPress={handleSend} disabled={createMutation.isPending}>
                      {({ pressed }) => (
                        <LinearGradient
                          colors={
                            createMutation.isPending
                              ? ['#9ca3af', '#6b7280']
                              : pressed
                              ? ['#ea580c', '#c2410c']
                              : ['#f97316', '#ea580c']
                          }
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            borderRadius: 12,
                            padding: 16,
                            opacity: createMutation.isPending ? 0.7 : 1,
                          }}
                        >
                          {createMutation.isPending ? (
                            <ActivityIndicator color="white" />
                          ) : (
                            <Text className="text-white text-base font-bold text-center">
                              Send Message
                            </Text>
                          )}
                        </LinearGradient>
                      )}
                    </Pressable>
                  </View>
                </SafeAreaView>
              </Pressable>
            </KeyboardAvoidingView>
          </Pressable>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && (
          <Pressable
            className="absolute inset-0 bg-black/50 justify-end"
            onPress={() => setSelectedMessage(null)}
          >
            <Pressable
              className="bg-white dark:bg-neutral-900 rounded-t-3xl max-h-[80%]"
              onPress={(e) => e.stopPropagation()}
            >
              <SafeAreaView edges={['bottom']}>
                <ScrollView className="p-6">
                  {/* Header */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-1 mr-3">
                      <Text className="text-neutral-900 dark:text-neutral-100 text-xl font-bold">
                        {selectedMessage.subject}
                      </Text>
                      <Text className="text-neutral-400 dark:text-neutral-500 text-sm mt-1">
                        {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => setSelectedMessage(null)}
                      className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full items-center justify-center"
                    >
                      <X size={18} color={isDark ? '#f5f5f5' : '#171717'} />
                    </Pressable>
                  </View>

                  {/* Your Message */}
                  <View className="mb-4">
                    <Text className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2">
                      Your Message
                    </Text>
                    <View className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
                      <Text className="text-neutral-900 dark:text-neutral-100">
                        {selectedMessage.message}
                      </Text>
                    </View>
                  </View>

                  {/* Response */}
                  {selectedMessage.response ? (
                    <View>
                      <Text className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2">
                        Response
                      </Text>
                      <View className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                        <Text className="text-neutral-900 dark:text-neutral-100">
                          {selectedMessage.response}
                        </Text>
                        {selectedMessage.respondedAt && (
                          <Text className="text-neutral-400 dark:text-neutral-500 text-xs mt-2">
                            Replied{' '}
                            {new Date(selectedMessage.respondedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </Text>
                        )}
                      </View>
                    </View>
                  ) : (
                    <View className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800 flex-row items-center">
                      <Clock size={18} color="#f59e0b" />
                      <Text className="text-amber-700 dark:text-amber-400 ml-3">
                        Waiting for response...
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </SafeAreaView>
            </Pressable>
          </Pressable>
        )}
      </SafeAreaView>
    </View>
  );
}
