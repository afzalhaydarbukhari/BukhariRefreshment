import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../services/messageService';
import { theme } from '../../constants/theme';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAdmin = message.is_admin_reply;
  const messageTime = new Date(message.created_at);
  const timeString = messageTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <View style={[styles.container, isAdmin ? styles.adminContainer : styles.customerContainer]}>
      <View style={[styles.bubble, isAdmin ? styles.adminBubble : styles.customerBubble]}>
        {!isAdmin && (
          <Text style={styles.senderName}>{message.customer_name}</Text>
        )}
        <Text style={[styles.messageText, isAdmin && styles.adminMessageText]}>
          {message.message}
        </Text>
        <Text style={[styles.timeText, isAdmin && styles.adminTimeText]}>
          {timeString}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  customerContainer: {
    alignItems: 'flex-start',
  },
  adminContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  customerBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
  },
  adminBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    marginBottom: 4,
    includeFontPadding: false,
  },
  messageText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    lineHeight: 22,
    marginBottom: 4,
    includeFontPadding: false,
  },
  adminMessageText: {
    color: theme.colors.textLight,
  },
  timeText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSubtle,
    includeFontPadding: false,
  },
  adminTimeText: {
    color: theme.colors.textLight,
    opacity: 0.8,
  },
});
