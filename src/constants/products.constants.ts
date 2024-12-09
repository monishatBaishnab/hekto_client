import {
  ShoppingCart,
  GitCompare,
  Trash2,
  FilePenLine,
  Copy,
} from 'lucide-react';

export const price_ranges = [
  { label: '$0.00 - $150.00', min: 0, max: 150 },
  { label: '$150.00 - $300.00', min: 150, max: 350 },
  { label: '$300.00 - $450.00', min: 150, max: 504 },
  { label: '$450.00 - $600.00', min: 450, max: 650 },
];

export const user_actions = [
  {
    key: 'cart',
    label: 'Add to cart',
    icon: ShoppingCart,
  },
  {
    key: 'compere',
    label: 'Compere',
    icon: GitCompare,
  },
];

export const vendor_actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
  {
    key: 'edit',
    label: 'Edit',
    icon: FilePenLine,
  },
  {
    key: 'duplicate',
    label: 'Duplicate',
    icon: Copy,
  },
];
