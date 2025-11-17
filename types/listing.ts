export interface Listing {
  id: string;
  title: string;
  price: number;
  description?: string;
  category: string;
  image_url: string;
  created_at: string;
  sold?: boolean;
}

export type Category =
  | 'Electronics'
  | 'Furniture'
  | 'Clothing'
  | 'Books'
  | 'Toys'
  | 'Kitchen'
  | 'Sports'
  | 'Garden'
  | 'Tools'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Toys',
  'Kitchen',
  'Sports',
  'Garden',
  'Tools',
  'Other',
];
