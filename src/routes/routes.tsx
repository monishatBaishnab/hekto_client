import { createBrowserRouter } from "react-router-dom";
import Client from "@/layouts/Client";
import Home from "@/pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default routes;
