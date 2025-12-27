import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MenuItem as MenuItemType } from '../../services/menuService';
import { formatPrice } from '../../services/cartService';
import { theme } from '../../constants/theme';
import { useCart } from '../../hooks/useCart';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => addItem(item)}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{item.image}</Text>
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          
          {quantity > 0 ? (
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
          ) : (
            <View style={styles.addButton}>
              <Text style={styles.addText}>Add +</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    backgroundColor: theme.colors.surfaceAlt,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    fontSize: 64,
  },
  popularBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  popularText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
    includeFontPadding: false,
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    includeFontPadding: false,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSubtle,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
    includeFontPadding: false,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    includeFontPadding: false,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  addText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    includeFontPadding: false,
  },
  quantityBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    includeFontPadding: false,
  },
});
