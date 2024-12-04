import { createBrowserRouter } from "react-router-dom";
import Client from "@/layouts/Client";
import routeGenerator from "@/utils/route_generator";
import client_route_config from "@/constants/routes.constants";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: routeGenerator(client_route_config),
  },
]);

export default routes;
