import {
  admin_route_config,
  client_route_config,
  user_route_config,
  vendor_route_config,
} from '@/constants/routes.constants';
import useUser from './useUser';
import { LucideProps } from 'lucide-react';

type TConfig = (
  | {
      path: string;
      element: JSX.Element;
      label?: undefined;
      icon?: undefined;
    }
  | {
      path: string;
      label: string;
      element: JSX.Element;
      icon: React.ForwardRefExoticComponent<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Omit<LucideProps, 'ref'> & React.RefAttributes<any>
      >;
    }
)[];

const useRouter = () => {
  const { role } = useUser();
  let profile_routes: TConfig = [];
  let routes = admin_route_config;
  if (role === 'VENDOR') {
    routes = vendor_route_config;
  } else if (role === 'CUSTOMER') {
    profile_routes = user_route_config;
  }

  return {
    dashboard_config: routes,
    profile_config: profile_routes,
    client_config: client_route_config,
  };
};

export default useRouter;
