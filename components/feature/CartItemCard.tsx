import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CartItem } from '../../services/cartService';
import { formatPrice, calculateItemTotal } from '../../services/cartService';
import { theme } from '../../constants/theme';
import { useCart } from '../../hooks/useCart';

interface CartItemCardProps {
  cartItem: CartItem;
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();
  const { item, quantity } = cartItem;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{item.image}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <Pressable
          onPress={handleDecrease}
          style={({ pressed }) => [styles.quantityButton, pressed && styles.pressed]}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </Pressable>
        
        <Text style={styles.quantity}>{quantity}</Text>
        
        <Pressable
          onPress={handleIncrease}
          style={({ pressed }) => [styles.quantityButton, pressed && styles.pressed]}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </Pressable>
      </View>
      
      <Text style={styles.total}>{formatPrice(calculateItemTotal(cartItem))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  image: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: 4,
    includeFontPadding: false,
  },
  price: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSubtle,
    includeFontPadding: false,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pressed: {
    opacity: 0.6,
  },
  quantityButtonText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    includeFontPadding: false,
  },
  quantity: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    minWidth: 24,
    textAlign: 'center',
    includeFontPadding: false,
  },
  total: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    minWidth: 80,
    textAlign: 'right',
    includeFontPadding: false,
  },
});
