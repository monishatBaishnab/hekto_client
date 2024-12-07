import { createBrowserRouter } from "react-router-dom";
import Client from "@/layouts/Client";
import routeGenerator from "@/utils/route_generator";
import client_route_config, { profile_routes_config } from "@/constants/routes.constants";
import UserDashboard from "@/layouts/UserDashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: routeGenerator(client_route_config),
  },
  
  {
    path: '/user',
    element: <UserDashboard />,
    children: routeGenerator(profile_routes_config)
  }
]);

export default routes;
