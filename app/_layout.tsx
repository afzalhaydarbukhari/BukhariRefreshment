import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { CartProvider } from '../contexts/CartContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Checkout', presentation: 'modal' }} />
          </Stack>
        </CartProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
