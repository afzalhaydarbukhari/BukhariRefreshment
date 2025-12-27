import { useContext } from 'react';
import { MessagesContext } from '../contexts/MessagesContext';

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
}
