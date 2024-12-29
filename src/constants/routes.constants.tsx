import Book from '@/pages/Book';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Home from '@/pages/Home';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import Profile from '@/pages/user/Profile';
import Shop from '@/pages/Shop';
import ShopDetails from '@/pages/ShopDetails';
import Settings from '@/pages/user/Settings';
import {
  Layers,
  Star,
  User,
  Settings as SettingsIcon,
  Users as UsersIcon,
  ListOrdered,
  UserPen,
  CircleGauge,
} from 'lucide-react';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Recent from '@/pages/Recent';
import Flash from '@/pages/Flash';
import Orders from '@/pages/user/Orders';
import PasswordRecovery from '@/pages/PasswordRecovery';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/dashboard/Dashboard';
import DProfile from '@/pages/dashboard/DProfile';
import DProducts from '@/pages/dashboard/DProducts';
import DCategories from '@/pages/dashboard/DCategories';
import DReviews from '@/pages/dashboard/DReviews';
import DOrders from '@/pages/dashboard/DOrders';
import DUsers from '@/pages/dashboard/DUsers';
import DStores from '@/pages/dashboard/DStores';
import DSettings from '@/pages/dashboard/DSettings';

export const user_route_config = [
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
    path: '/orders',
    label: 'Orders',
    element: <Orders />,
    icon: ListOrdered,
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
    element: <Dashboard />,
  },
  {
    path: '/overview',
    label: 'Dashboard',
    element: <Dashboard />,
    icon: CircleGauge,
  },
  {
    path: '/profile',
    label: 'Profile',
    element: <DProfile />,
    icon: UserPen,
  },
  {
    path: '/products',
    label: 'Products',
    element: <DProducts />,
    icon: Layers,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    element: <DReviews />,
    icon: Star,
  },
  {
    path: '/orders',
    label: 'Orders',
    element: <DOrders />,
    icon: ListOrdered,
  },
  {
    path: '/users',
    label: 'Users',
    element: <DUsers />,
    icon: UsersIcon,
  },
  {
    path: '/shops',
    label: 'Stores',
    element: <DStores />,
    icon: ListOrdered,
  },
  {
    path: '/settings',
    label: 'Settings',
    element: <DSettings />,
    icon: SettingsIcon,
  },
];

export const vendor_route_config = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/overview',
    label: 'Dashboard',
    element: <Dashboard />,
    icon: CircleGauge,
  },
  {
    path: '/profile',
    label: 'Profile',
    element: <DProfile />,
    icon: UserPen,
  },
  {
    path: '/products',
    label: 'Products',
    element: <DProducts />,
    icon: Layers,
  },
  {
    path: '/categories',
    label: 'Categories',
    element: <DCategories />,
    icon: ListOrdered,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    element: <DReviews />,
    icon: Star,
  },
  {
    path: '/orders',
    label: 'Orders',
    element: <DOrders />,
    icon: ListOrdered,
  },
  {
    path: '/settings',
    label: 'Settings',
    element: <DSettings />,
    icon: SettingsIcon,
  },
];

export const client_route_config = [
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
    path: '/recent',
    label: 'Recent',
    element: <Recent />,
  },
  {
    path: '/flash',
    label: 'Flash',
    element: <Flash />,
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
    path: '/contact',
    label: 'Contact',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <PasswordRecovery />,
  },
  {
    path: '/password-recovery',
    element: <PasswordRecovery />,
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
