export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'drinks' | 'snacks' | 'meals' | 'desserts';
  image: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Mango Lassi',
    description: 'Fresh mango blended with yogurt and cream',
    price: 150,
    category: 'drinks',
    image: '🥭',
    popular: true,
  },
  {
    id: '2',
    name: 'Kashmiri Chai',
    description: 'Pink tea with almonds and cardamom',
    price: 80,
    category: 'drinks',
    image: '🍵',
    popular: true,
  },
  {
    id: '3',
    name: 'Fresh Juice',
    description: 'Orange, apple, or mixed fruit juice',
    price: 120,
    category: 'drinks',
    image: '🧃',
  },
  {
    id: '4',
    name: 'Cold Coffee',
    description: 'Iced coffee with cream and chocolate',
    price: 180,
    category: 'drinks',
    image: '☕',
  },
  {
    id: '5',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes',
    price: 50,
    category: 'snacks',
    image: '🥟',
    popular: true,
  },
  {
    id: '6',
    name: 'Pakora Plate',
    description: 'Mixed vegetable fritters with chutney',
    price: 100,
    category: 'snacks',
    image: '🍤',
  },
  {
    id: '7',
    name: 'Spring Rolls',
    description: 'Crispy rolls with vegetable filling',
    price: 120,
    category: 'snacks',
    image: '🌯',
  },
  {
    id: '8',
    name: 'Chicken Burger',
    description: 'Grilled chicken with fresh vegetables',
    price: 300,
    category: 'meals',
    image: '🍔',
    popular: true,
  },
  {
    id: '9',
    name: 'Club Sandwich',
    description: 'Triple-decker with chicken and cheese',
    price: 350,
    category: 'meals',
    image: '🥪',
  },
  {
    id: '10',
    name: 'Biryani Plate',
    description: 'Fragrant rice with spiced chicken',
    price: 400,
    category: 'meals',
    image: '🍛',
  },
  {
    id: '11',
    name: 'Ice Cream Cup',
    description: 'Vanilla, chocolate, or strawberry',
    price: 100,
    category: 'desserts',
    image: '🍨',
  },
  {
    id: '12',
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings in syrup',
    price: 80,
    category: 'desserts',
    image: '🍡',
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'snacks', name: 'Snacks', icon: '🍟' },
  { id: 'meals', name: 'Meals', icon: '🍽️' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export function getMenuItems(): MenuItem[] {
  return menuItems;
}

export function getItemsByCategory(category: string): MenuItem[] {
  if (category === 'all') {
    return menuItems;
  }
  return menuItems.filter((item) => item.category === category);
}

export function getPopularItems(): MenuItem[] {
  return menuItems.filter((item) => item.popular);
}

export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}
