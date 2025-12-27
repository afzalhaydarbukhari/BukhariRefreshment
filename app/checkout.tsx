import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useAlert } from '@/template';
import { useCart } from '../hooks/useCart';
import { calculateSubtotal, calculateTax, calculateTotal, formatPrice } from '../services/cartService';
import { Button } from '../components/ui/Button';
import { theme } from '../constants/theme';

export default function CheckoutScreen() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  const handlePayment = () => {
    if (!name.trim() || !phone.trim() || !tableNumber.trim()) {
      showAlert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      clearCart();
      
      showAlert(
        'Order Placed Successfully!',
        `Your order will be delivered to Table ${tableNumber} shortly. Total: ${formatPrice(total)}`,
        [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/(tabs)');
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.textSubtle}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor={theme.colors.textSubtle}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Table Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter table number"
            placeholderTextColor={theme.colors.textSubtle}
            value={tableNumber}
            onChangeText={setTableNumber}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        
        {items.map((cartItem) => (
          <View key={cartItem.item.id} style={styles.orderItem}>
            <View style={styles.orderItemLeft}>
              <Text style={styles.orderItemName}>{cartItem.item.name}</Text>
              <Text style={styles.orderItemQty}>Qty: {cartItem.quantity}</Text>
            </View>
            <Text style={styles.orderItemPrice}>
              {formatPrice(cartItem.item.price * cartItem.quantity)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (5%)</Text>
          <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentIcon}>💵</Text>
          <Text style={styles.paymentText}>Cash on Delivery</Text>
        </View>
      </View>

      <Button
        title={processing ? 'Processing...' : 'Place Order'}
        onPress={handlePayment}
        size="large"
        disabled={processing}
        style={styles.payButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    includeFontPadding: false,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    includeFontPadding: false,
  },
  input: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  orderItemLeft: {
    flex: 1,
  },
  orderItemName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: 4,
    includeFontPadding: false,
  },
  orderItemQty: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSubtle,
    includeFontPadding: false,
  },
  orderItemPrice: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    includeFontPadding: false,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSubtle,
    includeFontPadding: false,
  },
  summaryValue: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    includeFontPadding: false,
  },
  totalRow: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalLabel: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    includeFontPadding: false,
  },
  totalValue: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    includeFontPadding: false,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  paymentText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    includeFontPadding: false,
  },
  payButton: {
    marginTop: theme.spacing.md,
  },
});
