import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useMessages } from '../../hooks/useMessages';
import { sendMessage } from '../../services/messageService';
import { ChatBubble } from '../../components/feature/ChatBubble';
import { theme } from '../../constants/theme';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { messages, loading, refreshMessages } = useMessages();
  const [messageText, setMessageText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showInfoForm, setShowInfoForm] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSaveInfo = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      showAlert('Required Information', 'Please enter your name and phone number');
      return;
    }
    setShowInfoForm(false);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      return;
    }

    setSending(true);
    const { error } = await sendMessage({
      customer_name: customerName,
      customer_phone: customerPhone,
      message: messageText.trim(),
    });

    setSending(false);

    if (error) {
      showAlert('Error', 'Failed to send message. Please try again.');
      return;
    }

    setMessageText('');
    await refreshMessages();
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  if (showInfoForm) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat with Us</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Welcome! 👋</Text>
          <Text style={styles.formSubtitle}>
            Please provide your details to start chatting
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textSubtle}
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.textSubtle}
              value={customerPhone}
              onChangeText={setCustomerPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.startChatButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSaveInfo}
          >
            <Text style={styles.startChatText}>Start Chatting</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Chat with Bukhari</Text>
          <Text style={styles.subtitle}>We typically reply within minutes</Text>
        </View>
        <Pressable
          style={styles.infoButton}
          onPress={() => setShowInfoForm(true)}
        >
          <MaterialIcons name="person" size={24} color={theme.colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyText}>Loading messages...</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>Start the conversation</Text>
            <Text style={styles.emptyText}>Send us a message and we will get back to you shortly</Text>
          </View>
        ) : (
          messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, theme.spacing.md) }]}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.textSubtle}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            pressed && styles.pressed,
            (!messageText.trim() || sending) && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!messageText.trim() || sending}
        >
          <MaterialIcons 
            name="send" 
            size={24} 
            color={messageText.trim() && !sending ? theme.colors.textLight : theme.colors.textSubtle} 
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSubtle,
    marginTop: 4,
    includeFontPadding: false,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
  },
  formTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    includeFontPadding: false,
  },
  formSubtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSubtle,
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
    includeFontPadding: false,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    includeFontPadding: false,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  startChatButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    ...theme.shadows.md,
  },
  startChatText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    includeFontPadding: false,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: theme.spacing.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    includeFontPadding: false,
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSubtle,
    textAlign: 'center',
    lineHeight: 22,
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  messageInput: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    maxHeight: 100,
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.surfaceAlt,
  },
  pressed: {
    opacity: 0.7,
  },
});
