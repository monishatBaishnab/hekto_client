import { CircleGauge, Layers, Star, ListOrdered, User } from 'lucide-react';

export const admin_profile_links = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: CircleGauge,
  },
  {
    path: '/dashboard/posts',
    label: 'Posts',
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
  {
    path: '/dashboard/settings',
    label: 'Settings',
    icon: CircleGauge,
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
