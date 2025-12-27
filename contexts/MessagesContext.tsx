import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Message, fetchMessages } from '../services/messageService';

interface MessagesContextType {
  messages: Message[];
  loading: boolean;
  refreshMessages: () => Promise<void>;
}

export const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    const { data, error } = await fetchMessages();
    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();

    // Poll for new messages every 5 seconds
    const interval = setInterval(loadMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshMessages = async () => {
    await loadMessages();
  };

  return (
    <MessagesContext.Provider value={{ messages, loading, refreshMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}
