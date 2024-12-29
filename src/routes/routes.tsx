import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Client from '@/layouts/Client';
import UserDashboard from '@/layouts/UserDashboard';
import routeGenerator from '@/utils/route_generator';
import { useMemo } from 'react';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import Empty from '@/pages/Empty';
import useRouter from '@/hooks/useRouter';

const Routes = () => {
  const { dashboard_config, client_config, profile_config } = useRouter();
  const routes = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Client />,
          children: routeGenerator(client_config),
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
          children: routeGenerator(dashboard_config),
          errorElement: <Empty />,
        },
      ]),
    [profile_config]
  );

  return <RouterProvider router={routes} />;
};

export default Routes;
