import { CircleGauge, Layers, Star, ListOrdered, User } from 'lucide-react';

export const admin_profile_links = [
  {
    path: '/dashboard/overview',
    label: 'Dashboard',
    icon: CircleGauge,
  },
  {
    path: '/dashboard/profile',
    label: 'Profile',
    icon: User,
  },
  {
    path: '/dashboard/products',
    label: 'Products',
    icon: Layers,
  },
  {
    path: '/dashboard/reviews',
    label: 'Reviews',
    icon: Star,
  },
  {
    path: '/dashboard/orders',
    label: 'Orders',
    icon: ListOrdered,
  },
];

export const user_profile_links = [
  {
    path: '/user/profile',
    label: 'Profile',
    icon: User,
  },
  {
    path: '/user/orders',
    label: 'Orders',
    icon: ListOrdered,
  },
  {
    path: '/user/settings',
    label: 'Settings',
    icon: CircleGauge,
  },
];
