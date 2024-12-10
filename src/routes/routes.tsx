import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import client_route_config, {
  user_profile_config,
  vendor_profile_config,
} from '@/constants/routes.constants';
import Client from '@/layouts/Client';
import UserDashboard from '@/layouts/UserDashboard';
import { useAppSelector } from '@/redux/hooks';
import routeGenerator from '@/utils/route_generator';
import { useMemo } from 'react';
import ProtectedRoute from './ProtectedRoute';

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
        },
        {
          path: '/user',
          element: (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ),
          children: routeGenerator(profile_config),
        },
      ]),
    [profile_config]
  );

  return <RouterProvider router={routes} />;
};

export default Routes;
