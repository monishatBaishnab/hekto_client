import Book from '@/pages/Book';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Home from '@/pages/Home';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import Profile from '@/pages/user/Profile';
import Shop from '@/pages/Shop';
import ShopDetails from '@/pages/ShopDetails';
import Listing from '@/pages/user/Listing';
import Reviews from '@/pages/user/Reviews';
import Settings from '@/pages/user/Settings';
import {
  Layers,
  Star,
  User,
  Settings as SettingsIcon,
  Users as UsersIcon,
  MessagesSquare,
  ListOrdered,
} from 'lucide-react';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AUsers from '@/pages/admin/AUsers';
import AProducts from '@/pages/admin/AProducts';
import AReviews from '@/pages/admin/AReviews';
import AOrders from '@/pages/admin/AOrders';

export const vendor_profile_config = [
  {
    path: '/',
    element: <Profile />,
  },
  {
    path: '/profile',
    label: 'Profile',
    element: <Profile />,
    icon: User,
  },
  {
    path: '/listing',
    label: 'My Listing',
    element: <Listing />,
    icon: Layers,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    element: <Reviews />,
    icon: Star,
  },
  {
    path: '/settings',
    label: 'Settings',
    element: <Settings />,
    icon: SettingsIcon,
  },
];

export const user_profile_config = [
  {
    path: '/',
    element: <Profile />,
  },
  {
    path: '/profile',
    label: 'Profile',
    element: <Profile />,
    icon: User,
  },
  {
    path: '/settings',
    label: 'Settings',
    element: <Settings />,
    icon: SettingsIcon,
  },
];

export const admin_route_config = [
  {
    path: '/',
    element: <AUsers />,
  },
  {
    path: '/users',
    label: 'Users',
    element: <AUsers />,
    icon: UsersIcon,
  },
  {
    path: '/products',
    label: 'Products',
    element: <AProducts />,
    icon: MessagesSquare,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    element: <AReviews />,
    icon: MessagesSquare,
  },
  {
    path: '/orders',
    label: 'Orders',
    element: <AOrders />,
    icon: ListOrdered,
  },
];

const client_route_config = [
  {
    path: '/',
    label: 'Home',
    element: <Home />,
  },
  {
    path: '/products',
    label: 'Products',
    element: <Products />,
  },
  {
    path: '/products/:id',
    element: <ProductDetails />,
  },
  {
    path: '/shop',
    label: 'Shop',
    element: <Shop />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/shop/:id',
    element: <ShopDetails />,
  },
  {
    path: '/book',
    element: <Book />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
];
export default client_route_config;
