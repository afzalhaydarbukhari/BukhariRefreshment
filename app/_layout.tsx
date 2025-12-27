import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { CartProvider } from '../contexts/CartContext';
import { MessagesProvider } from '../contexts/MessagesContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <CartProvider>
          <MessagesProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Checkout', presentation: 'modal' }} />
            </Stack>
          </MessagesProvider>
        </CartProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
