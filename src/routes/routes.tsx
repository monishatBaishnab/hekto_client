import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import client_route_config, {
  dashboard_route_config,
  user_profile_config,
  vendor_profile_config,
} from '@/constants/routes.constants';
import Client from '@/layouts/Client';
import UserDashboard from '@/layouts/UserDashboard';
import { useAppSelector } from '@/redux/hooks';
import routeGenerator from '@/utils/route_generator';
import { useMemo } from 'react';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import Empty from '@/pages/Empty';

const Routes = () => {
  const user = useAppSelector((state) => state.auth.user);

  let profile_config = user_profile_config;

  if (user?.role !== 'CUSTOMER') {
    profile_config = vendor_profile_config;
  }

  const routes = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Client />,
          children: routeGenerator(client_route_config),
          errorElement: <Empty />,
        },
        {
          path: '/user',
          element: (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ),
          children: routeGenerator(profile_config),
          errorElement: <Empty />,
        },
        {
          path: '/dashboard',
          element: (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: routeGenerator(dashboard_route_config),
          errorElement: <Empty />,
        },
      ]),
    [profile_config]
  );

  return <RouterProvider router={routes} />;
};

export default Routes;
