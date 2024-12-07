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
import { Layers, Star, User, Settings as SettingsIcon } from 'lucide-react';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export const profile_routes_config = [
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
    label: 'Login',
    element: <Login />,
  },
  {
    path: '/register',
    label: 'Register',
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
